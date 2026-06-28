# JobRadar

Personal job search intelligence tool for a Senior Security Program Manager. Not a general-purpose app — built around a specific candidate profile and bottleneck (see `docs/STRATEGY.md`).

## What it does

- **Job scanning** — searches JSearch/RapidAPI for security and program management roles
- **AI briefs** — Claude Haiku 4.5 analyzes each job against the candidate's resume, producing trajectory classification (Accelerating / Lateral / Regressive), gap analysis, tailored bullets, and ATS tips
- **Fit scoring** — rules-based scoring across title match, seniority, company size, and source type
- **Pipeline tracking** — kanban-style status tracking (new → applied → screening → interviewing → offer / closed)
- **Outreach tracker** — logs recruiter contacts and screen outcomes to measure recruiter-outreach-to-screen-pass rate
- **Phase retro** — AI-generated retrospective over a rolling window of activity log data
- **Supabase persistence** — state syncs to Supabase; falls back to local `state.json` if unconfigured

## Stack

| Layer | Tech |
|-------|------|
| Desktop shell | Electron 29 |
| Server | Node.js (no framework) |
| UI | Single-file HTML (`app.html`) |
| Job data | JSearch via RapidAPI |
| AI | Claude Haiku 4.5 (`claude-haiku-4-5`) |
| Persistence | Supabase (Postgres) |
| Cloud deploy | Railway (`node server.js`) |

## Current state (as of 2026-06-27)

- **Security hardened**: API keys moved fully to `.env` — no hardcoded fallbacks. Server binds to `127.0.0.1` only in local mode. Job description content is sandboxed in prompts to prevent injection.
- **Gemini → Claude**: AI briefs migrated from Gemini 1.5 Flash to Claude Haiku 4.5. Brief schema expanded with trajectory classification, scope compression risk, gap closeability, interview questions for the candidate to ask, and weaknesses.
- **Resume-driven briefs**: Brief prompts now load the actual resume markdown rather than a static inline profile. TPM-framed JDs get a separate resume variant (`resume-reference-tpm.md`).
- **New endpoints**: `/logs/metrics` (outreach funnel stats) and `/logs/retro` (phase retrospective).
- **Railway deployed**: `railway.toml` sets `node server.js` as the start command; Electron builder is skipped in cloud context.

## Setup

### 1. Install dependencies

```bash
npm install
```

> **Node v24 quirk**: `npm install` may not extract the Electron binary automatically. If `npm start` fails, manually extract the cached zip:
> ```bash
> unzip -o "$(ls ~/Library/Caches/electron/*/electron-v*.zip | head -1)" \
>   -d node_modules/electron/dist/
> echo -n "Electron.app/Contents/MacOS/Electron" > node_modules/electron/path.txt
> ```

### 2. Configure environment

Copy the example and fill in your keys:

```bash
cp .env.example .env   # or create .env manually
```

```
JSEARCH_KEY=your_rapidapi_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_key
```

All four are optional at startup but features degrade without them: no key = no scans (JSEARCH), local-only state (Supabase), no AI briefs (Anthropic).

### 3. Run

| Mode | Command | Use when |
|------|---------|----------|
| Desktop (Electron) | `npm start` | Daily local use |
| Web server only | `npm run server` | Railway / mobile PWA |

Health check: `http://localhost:3000/health`

## Cloud deployment (Railway)

See `CLOUD_DEPLOY.md` for the full walkthrough. Short version:

1. Push repo to GitHub
2. New Railway project → Deploy from GitHub
3. Set env vars in Railway dashboard
4. Railway auto-runs `node server.js` (via `railway.toml`)
5. Generate domain → install as PWA on iPhone via Safari → Add to Home Screen

State caveat: `state.json` resets on redeploy. Export CSV before pushing if you have data you care about. Supabase eliminates this problem.

## Key files

| File | Purpose |
|------|---------|
| `main.js` | Electron entry — creates window, starts server.js |
| `preload.js` | Security bridge (contextIsolation=true, nodeIntegration=false) |
| `server.js` | HTTP proxy + API endpoints + Claude integration |
| `app.html` | Full UI — scoring, pipeline, briefs, outreach tracker, retro |
| `resume-reference.md` | Candidate resume (security PM framing) — read by server.js for AI briefs |
| `resume-reference-tpm.md` | Alternate resume variant for TPM-titled JDs |
| `candidate-profile.md` | Candidate positioning notes and target role criteria |
| `docs/STRATEGY.md` | Foundational decisions: bottleneck, success metrics, scope |
| `schema.sql` | Supabase table definitions |

## API endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Status + configured services |
| `/search` | GET | Proxy to JSearch (`?query=&page=`) |
| `/brief` | POST | Claude AI brief for a job posting |
| `/state` | GET/POST | Read/write persisted state |
| `/logs` | GET | Activity log |
| `/logs/weekly` | GET | Weekly activity report |
| `/logs/metrics` | GET | Outreach funnel metrics |
| `/logs/retro` | GET | Phase retrospective (`?days=7`) |
| `/log` | POST | Write an activity log event |
