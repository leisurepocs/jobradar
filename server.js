const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT         = process.env.PORT || 3000;
const JSEARCH_KEY  = process.env.JSEARCH_KEY || 'ae969939ddmshb71d11cdf0d4a06p1857e1jsn440889b6fa91';
const JSEARCH_HOST = 'jsearch.p.rapidapi.com';
const STATE_FILE   = path.join(__dirname, 'state.json');
const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';
const GEMINI_KEY   = process.env.GEMINI_API_KEY || '';

// ── JSearch ───────────────────────────────────────────────────────────────────
function jsearchFetch(params) {
  return new Promise((resolve, reject) => {
    const reqPath = '/search?' + new URLSearchParams(params).toString();
    const options = {
      hostname: JSEARCH_HOST,
      path: reqPath,
      method: 'GET',
      headers: {
        'x-rapidapi-host': JSEARCH_HOST,
        'x-rapidapi-key': JSEARCH_KEY
      }
    };
    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch(e) { reject(new Error('Invalid JSON: ' + body.substring(0, 200))); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Request timed out')); });
    req.end();
  });
}

// ── File-based state (local fallback) ─────────────────────────────────────────
function readState() {
  try {
    if (fs.existsSync(STATE_FILE)) return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch (e) { console.error('[state] read error:', e.message); }
  return {};
}
function writeState(obj) {
  try { fs.writeFileSync(STATE_FILE, JSON.stringify(obj, null, 2)); return true; }
  catch (e) { console.error('[state] write error:', e.message); return false; }
}

// ── HTTP body reader ──────────────────────────────────────────────────────────
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) { reject(new Error('Body too large')); req.destroy(); }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// ── Supabase REST ─────────────────────────────────────────────────────────────
function supabaseReq(method, endpoint, body, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    if (!SUPABASE_URL || !SUPABASE_KEY) return reject(new Error('Supabase not configured'));
    const parsed = new URL(SUPABASE_URL + '/rest/v1/' + endpoint);
    const bodyStr = body ? JSON.stringify(body) : null;
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + (parsed.search || ''),
      method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        ...extraHeaders
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); }
        } else {
          reject(new Error(`Supabase ${res.statusCode}: ${data.substring(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Supabase timeout')); });
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function dbReadState() {
  try {
    const rows = await supabaseReq('GET', 'app_state?id=eq.1&select=data');
    if (Array.isArray(rows) && rows[0]) return rows[0].data;
  } catch (e) { console.error('[db] read error:', e.message); }
  return readState(); // file fallback
}

async function dbWriteState(obj) {
  try {
    await supabaseReq(
      'POST', 'app_state',
      { id: 1, data: obj, updated_at: new Date().toISOString() },
      { 'Prefer': 'resolution=merge-duplicates' }
    );
    return true;
  } catch (e) {
    console.error('[db] write error:', e.message);
    return writeState(obj); // file fallback
  }
}

async function logEvent(eventType, payload = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;
  try {
    await supabaseReq('POST', 'activity_log', {
      event_type: eventType,
      payload,
      created_at: new Date().toISOString()
    });
  } catch (e) { /* logging must never crash the app */ }
}

// ── Gemini 1.5 Flash ──────────────────────────────────────────────────────────
const CANDIDATE_PROFILE = `Candidate: Micah Davis
Current Role: Security Program Manager, TikTok USDS
Key metrics: 36 sites managed, 99.7% uptime, 83% alarm false-positive reduction, 5.2hr MTTR, 400+ P0/P1 incidents coordinated.
Confirmed strengths:
- Risk Governance & GRC (NIST CSF, ISO 27001, SOC 2, risk frameworks, control libraries, risk registers)
- Vendor & Third-Party Risk (20+ vendors, SLA compliance, contract dispute resolution, billing analysis)
- Identity & Access Governance (SailPoint, RightCrowd, PACS, IAM across 36-site footprint)
- Converged Physical/Cyber Security (36-site program, 22-site card reader modernization, cyber-physical integration)
- Incident Response (400+ P0/P1 incidents, 5.2hr MTTR, multi-site operating environment)
- Executive & Stakeholder Reporting (C-suite QBRs, board-level, strategic recommendations)
- Enterprise Program Management (multi-site portfolio governance, QBR cadence, vendor accountability, SLA frameworks)
Not strongly evidenced in resume: direct team/budget ownership, cloud-native operations (AWS/Azure/GCP).`;

function callGemini(prompt) {
  return new Promise((resolve, reject) => {
    if (!GEMINI_KEY) return reject(new Error('GEMINI_API_KEY not configured'));
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 1500 }
    });
    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const p = JSON.parse(data);
          resolve(p.candidates?.[0]?.content?.parts?.[0]?.text || '');
        } catch(e) { reject(new Error('Gemini parse error')); }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Gemini timeout')); });
    req.write(body);
    req.end();
  });
}

function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON in Gemini response');
  return JSON.parse(match[0]);
}

// ── HTTP Server ───────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);

  // ── Serve UI ─────────────────────────────────────────────────────────────
  if (parsed.pathname === '/' || parsed.pathname === '/index.html') {
    const appPath = path.join(__dirname, 'app.html');
    if (fs.existsSync(appPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(appPath));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('app.html not found');
    }
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // ── Health ────────────────────────────────────────────────────────────────
  if (parsed.pathname === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'ok',
      supabase: !!SUPABASE_URL,
      gemini: !!GEMINI_KEY,
      message: 'JobRadar proxy running'
    }));
    return;
  }

  // ── State GET ─────────────────────────────────────────────────────────────
  if (parsed.pathname === '/state' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(await dbReadState()));
    return;
  }

  // ── State POST ────────────────────────────────────────────────────────────
  if (parsed.pathname === '/state' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const incoming = JSON.parse(body);
      const ok = await dbWriteState(incoming);
      res.writeHead(ok ? 200 : 500);
      res.end(JSON.stringify({ ok }));
    } catch (e) {
      res.writeHead(400);
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
    return;
  }

  // ── Search ────────────────────────────────────────────────────────────────
  if (parsed.pathname === '/search') {
    const { query, location, date_posted, remote_only } = parsed.query;
    if (!query) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'query parameter required' }));
      return;
    }
    const t0 = Date.now();
    try {
      const params = {
        query,
        country: 'us',
        language: 'en_us',
        date_posted: date_posted || '3days',
        num_pages: '3',
        employment_types: 'FULLTIME'
      };
      if (remote_only === 'true') params.remote_jobs_only = 'true';
      console.log(`[scan] "${params.query}" | date: ${params.date_posted} | remote: ${params.remote_jobs_only || 'false'}`);
      const result = await jsearchFetch(params);
      const count = result.data?.data?.length || 0;
      console.log(`[scan] ${count} results (HTTP ${result.status})`);
      await logEvent('scan_complete', { query, location, date_posted, remote_only, results: count, duration_ms: Date.now() - t0 });
      res.writeHead(200);
      res.end(JSON.stringify(result.data));
    } catch (err) {
      console.error('[error]', err.message);
      await logEvent('error', { endpoint: '/search', message: err.message, query });
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ── AI Brief (Gemini) ─────────────────────────────────────────────────────
  if (parsed.pathname === '/brief' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const { title, company, description, score, isDirect, source } = JSON.parse(body);

      const prompt = `You are a career intelligence assistant. Analyze this job opportunity for the candidate below.

CANDIDATE PROFILE:
${CANDIDATE_PROFILE}

JOB POSTING:
Title: ${title}
Company: ${company}
Fit Score: ${score}/100
Source: ${source || 'unknown'}${isDirect ? ' (Direct ATS — company career page)' : ' (Job aggregator)'}
Description:
${(description || '').substring(0, 3000)}

Return ONLY a raw JSON object (no markdown code fences) with this exact structure:
{
  "alignment": "2-3 sentences on how this candidate fits this specific role",
  "gap": "1-2 sentences on gaps or areas to explicitly address in the application",
  "keywords": {
    "present": ["up to 8 JD keywords that match candidate confirmed background"],
    "missing": ["up to 8 JD keywords NOT in candidate confirmed background"]
  },
  "bullets": [
    "tailored resume bullet using this JD exact phrasing",
    "tailored resume bullet 2",
    "tailored resume bullet 3"
  ],
  "flags": ["watch-out item 1 if relevant"],
  "recommendation": "1-2 sentence actionable application recommendation",
  "ats_tips": "3-5 specific ATS optimizations: exact keyword strings to use, section heading recommendations, phrasing to mirror from this JD verbatim"
}`;

      const text = await callGemini(prompt);
      const brief = extractJSON(text);
      await logEvent('brief_generated', { title, company, score });
      res.writeHead(200);
      res.end(JSON.stringify(brief));
    } catch (e) {
      console.error('[brief]', e.message);
      await logEvent('error', { endpoint: '/brief', message: e.message });
      res.writeHead(500);
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── Client event log ──────────────────────────────────────────────────────
  if (parsed.pathname === '/log' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const { event_type, payload } = JSON.parse(body);
      await logEvent(event_type, payload || {});
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      res.writeHead(400);
      res.end(JSON.stringify({ ok: false }));
    }
    return;
  }

  // ── Recent logs ───────────────────────────────────────────────────────────
  if (parsed.pathname === '/logs' && req.method === 'GET') {
    if (!SUPABASE_URL) {
      res.writeHead(503);
      res.end(JSON.stringify({ error: 'Supabase not configured' }));
      return;
    }
    try {
      const limit = parseInt(parsed.query.limit) || 100;
      const logs = await supabaseReq('GET', `activity_log?order=created_at.desc&limit=${limit}`);
      res.writeHead(200);
      res.end(JSON.stringify(logs));
    } catch (e) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── Weekly assessment ─────────────────────────────────────────────────────
  if (parsed.pathname === '/logs/weekly' && req.method === 'GET') {
    if (!SUPABASE_URL) {
      res.writeHead(503);
      res.end(JSON.stringify({ error: 'Supabase not configured' }));
      return;
    }
    try {
      const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
      const logs = await supabaseReq('GET', `activity_log?created_at=gte.${since}&order=created_at.desc&limit=500`);

      const stats = {};
      for (const log of logs) stats[log.event_type] = (stats[log.event_type] || 0) + 1;

      const scans = logs.filter(l => l.event_type === 'scan_complete');
      const totalResults = scans.reduce((s, l) => s + (l.payload?.results || 0), 0);
      const avgResults = scans.length ? Math.round(totalResults / scans.length) : 0;

      if (!GEMINI_KEY) {
        res.writeHead(200);
        res.end(JSON.stringify({ logs: logs.slice(0, 100), stats, assessment: null, note: 'Set GEMINI_API_KEY for AI assessment — showing raw stats only.' }));
        return;
      }

      const prompt = `You are analyzing activity logs for JobRadar, a personal job intelligence application used by a single job seeker (Micah Davis, Senior Security Program Manager).

WEEKLY ACTIVITY SUMMARY (last 7 days):
Event counts: ${JSON.stringify(stats)}
Total scans run: ${scans.length}
Total job results returned: ${totalResults}
Average results per scan: ${avgResults}
AI briefs generated: ${stats.brief_generated || 0}
Status updates made: ${stats.status_changed || 0}
Errors: ${stats.error || 0}

RECENT EVENT SAMPLE (last 30):
${JSON.stringify(logs.slice(0, 30), null, 2)}

Assess this week's job search activity and return ONLY a raw JSON object:
{
  "period": "plain English date range",
  "search_volume": "1 sentence on scan frequency and patterns",
  "highlights": ["positive finding 1", "positive finding 2"],
  "issues": ["issue or gap if any — omit array item if none"],
  "recommendations": [
    "specific actionable recommendation 1",
    "specific actionable recommendation 2",
    "specific actionable recommendation 3"
  ],
  "technical_notes": ["technical observation if any — omit if none"]
}`;

      const text = await callGemini(prompt);
      const assessment = extractJSON(text);
      await logEvent('weekly_report_generated', { stats });
      res.writeHead(200);
      res.end(JSON.stringify({ logs: logs.slice(0, 100), stats, assessment }));
    } catch (e) {
      console.error('[weekly]', e.message);
      res.writeHead(500);
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log('');
  console.log('  JobRadar running at  → http://localhost:' + PORT);
  console.log('  State backend        → ' + (SUPABASE_URL ? 'Supabase ✓' : 'local file (set SUPABASE_URL + SUPABASE_KEY to enable)'));
  console.log('  AI briefs            → ' + (GEMINI_KEY ? 'Gemini 1.5 Flash ✓' : 'rule-based fallback (set GEMINI_API_KEY to enable)'));
  console.log('  State file           → ' + STATE_FILE);
  console.log('');
});
