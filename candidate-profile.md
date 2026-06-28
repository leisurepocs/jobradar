# Candidate Profile — Micah Davis
> **JobRadar v2 — Primary Reference File**  
> Replaces all prior profile versions entirely.  
> This file governs: role surfacing logic, Fit/Value scoring, AI Brief generation,
> trajectory classification, and partial match handling.  
> Do not assume values for any field marked `[DEFINE_WITH_CODE]` — flag as unset and prompt user to configure.

---

## 1. Identity & Positioning

**Name:** Micah Davis  
**Location:** New York City, NY  
**Target Seniority:** Senior Program Manager / Senior Security Program Manager  
**Domain:** Converged Physical + Cyber Security | Enterprise Security Program Leadership  
**Career Stage:** Mid-to-senior transition — currently operating at senior scope, targeting title and compensation alignment  
**Long-term trajectory:** Senior SPM → Department-level directional authority → C-suite adjacency → Security consulting  

---

## 2. Current Role Context

**Title:** Security Program Manager, Converged Security Technology (CST)  
**Employer:** TikTok USDS — New York, NY  
**Start:** January 2025  

**Scope:**
- 36-site converged security infrastructure (9 corporate offices, 21 data center PoPs)
- ~967 devices under operational visibility across segmented corporate, OT/IoT, and data center networks — multi-network environment, not single-domain
- 10+ active vendor integrations
- $1M+ vendor portfolio (annual)
- Executive QBR delivery — direct C-suite visibility, owner and presenter (not preparer)
- Change Advisory Board (CAB) approval authority — go/no-go on production changes
- Single accountable owner across physical access control, video analytics, identity governance, and network monitoring
- MPLS circuit provisioning project spanning all 21 PoP sites — network infrastructure program management scope
- RFP governance experience — Genea PACS vendor in active RFP pipeline, vendor selection and procurement authority

**Operational platform:**
- 14 Lark channels of operational coordination governed
- Meego (Lark Project) as primary ITSM — 321 tickets classified across 9 months
- Lark/Feishu automation workflows built on top of platform governance
- Ambient.ai enterprise-scale operational governance — rare signal; very few PMs hold this at enterprise scope

**Key achievements:**
- Architected and led deployment of CST ServiceHub — self-initiated, 8-module operations command center, ~21,000 lines of code, 1,188 automated tests, production Kubernetes with CI/CD; designed three-tier AI orchestration model (context extraction → strategic translation → implementation) governing platform development
- Directed 22-site card reader modernization across data center PoP entrances — owned vendor sequencing, maintenance window design, resourcing trade-offs, and go/no-go per site
- Diagnosed 56% repeat incident rate across 321 classified tickets — identified systemic gaps masked by individual-ticket triage; initiated platform-based remediation architecture (ServiceHub incident clustering module)
- Designed intelligence-informed assessment methodology grounded in 1,488 operational messages and 49+ vendor records — produced 20-finding roadmap using P-Security / P-Ops dual-priority framework, defensible to both audit and operational stakeholders simultaneously
- Established manual-step elimination framework — 20 documented workflows mapped to platform features, 900+ hours/year elimination target, serves as Phase 2 platform acceptance criteria
- Surfaced 5–146 day vendor silence patterns invisible to prior reporting; restructured QBR methodology across 3+ vendor portfolios; built data-grounded retention and termination cases
- Delivered Nashville Phase 2 & 3 go-live security validation (47 card readers, 122 cameras) — failure would have blocked site operationalization; delivered without delay or access control gap

---

## 3. Gaps in Active Closure
> These are known development gaps being actively closed by named initiatives.
> AI Briefs should frame these as in-progress closures, not open deficits.

| Gap Area | Closing Initiative |
|---|---|
| Force Multiplier | CST ServiceHub — platform multiplies operational output without headcount |
| Automation Mindset | Three-tier AI orchestration model; Zapier/Gemini/Lark automation PoC |
| Operational Maturity | Manual-step elimination framework; P-Security/P-Ops priority architecture |
| Judgment & Risk Management | Intelligence-informed assessment methodology; CAB approval authority exercised |
| Budget ownership title | Not yet closed — do not claim; note as awareness gap if JD requires it |
| People management / direct reports | Not yet closed — do not claim; note if JD lists as primary qualifier |

---

## 4. Target Role Profile

### Titles to Surface — Tier 1 (Primary)
- Senior Security Program Manager
- Senior Program Manager, Security / Converged Security
- Security Program Manager (enterprise, multi-site scope)
- Technical Program Manager, Security Infrastructure
- Senior Program Manager, Physical Security
- Senior Program Manager, Trust & Safety Infrastructure

### Titles to Surface — Tier 2 (Secondary)
- Cybersecurity Program Manager
- Enterprise Security Program Lead
- Program Manager, Risk & Compliance (security-adjacent only)
- Security Governance Program Manager
- Senior Program Manager, IT Security & Infrastructure

### Titles to Surface — Tier 3 (Stretch / Trajectory-Accelerating)
- Director of Converged Security
- Director of Security Operations
- Head of Physical Security Programs
- Senior Manager, Global Security Technology

### Titles to Exclude (Do Not Surface)
- Project Manager (coordinator-level framing — below target)
- Security Analyst (wrong discipline)
- SOC Manager (operations-only, no program governance)
- IT Program Manager (non-security general PM)
- Security Engineer / Security Architect (wrong discipline)
- Coordinator, Specialist, Associate (below level)

### Employer Type Preference (Ranked)
1. Enterprise technology (cloud, SaaS, infrastructure platforms)
2. Financial services (banks, fintech, trading firms, payments)
3. Consulting / advisory (Big 4, boutique security practices)
4. Healthcare / life sciences (regulated environment — acceptable)
5. Government / defense adjacent (FedRAMP, CMMC context — acceptable, no clearance required)

### Company Size
**Resolved (2026-06-23):** Three tiers, not a binary cutoff — the goal is enterprise-scale
by default while still surfacing genuinely exceptional smaller companies (see Section 8,
Hidden Gem rule):
- **1,000+ employees:** no flag — default enterprise-scale assumption.
- **100–999 employees:** surfaced only if aggregate Fit Score ≥ 80 — a "hidden gem": small,
  but the JD signal is strong enough to be worth the scope-regression risk.
- **Under 100 employees:** flagged as potential scope regression even if title matches; not
  suppressed outright, but visibly tagged so the decision to pursue is conscious.
- **No signal in JD text:** no flag applied — absence of evidence isn't treated as evidence
  of a problem.

### Compensation Floor
**Resolved (2026-06-23):** $130,000 base minimum. Roles below this floor are surfaced only
if scope signals are exceptional — defined here as the same Fit Score ≥ 80 bar used for the
Hidden Gem rule above, rather than a separately-defined "exceptional" standard. Only applies
when the JD discloses a salary; absence of salary data does not trigger this filter.

---

## 5. Role Surfacing Filters

### Hard Filters (Binary — Apply Before Scoring)
| Filter | Rule |
|---|---|
| Work arrangement | Always surface: fully remote, hybrid. Surface on-site only if employer is Tier 1 type AND scope signals are strong (multi-site, executive visibility, vendor portfolio). |
| Clearance requirement | Suppress roles requiring active TS/SCI or above. Secret and below: acceptable. |
| Relocation requirement | Suppress roles requiring relocation outside NYC metro. |
| Seniority floor | Suppress roles titled Coordinator, Analyst, Associate, Specialist, or Junior. |
| Posting recency | Priority surface: posted within 30 days. Flag as lower priority: 31–60 days. Suppress: 60+ days unless scope signals are exceptional or employer is on priority watchlist. |

### ATS Source Quality
- Weight direct ATS postings (company career pages) higher than aggregator postings in surfacing priority
- Note source in brief — direct ATS roles should be flagged for faster application action given recency decay

---

## 6. Dimension Scoring — 9-Dimension Taxonomy

> **Weighting instruction:** Dimensions are not equal. Apply weights below when computing aggregate Fit score. Resolved numeric weights (sum to 100): Highest=20 (Dim 1), High=14 (Dims 2–4), Medium=10 (Dims 5–7), Lower=4 (Dims 8–9).
> **Floor rule:** If Dimension 1 (Security Program & Governance Leadership) OR Dimension 2 (Converged / Physical Security) score below threshold, do not surface the role regardless of aggregate score. These are non-negotiable anchors. **Resolved threshold (2026-06-23):** each dimension needs at least 2 distinct JD keyword matches to clear the floor — a single passing phrase isn't enough signal on its own.
> **Unscored dimension protocol:** If a JD does not provide enough signal to score a dimension, mark it `UNSCORED` — do not default to neutral. Flag unscored dimensions in the AI Brief as questions to ask during screening.

### Dimension 1 — Security Program & Governance Leadership
**Weight: Highest | Floor: Required**  
**Proficiency: Expert**  
Executive QBR ownership (presenter, not preparer), CAB approval authority, multi-vendor SLA enforcement, risk acceptance decisions, cross-domain program accountability, preventive maintenance governance across 21 PoPs, incident lifecycle ownership.

*Score higher when JD includes:* program governance, executive reporting, security leadership, multi-site ownership, risk management, SLA accountability, CAB, change governance, operational continuity

---

### Dimension 2 — Converged / Physical Security
**Weight: High | Floor: Required**  
**Proficiency: Expert**  
PACS governance (Lenel/LenelS2 — OnGuard 8.3 certified, Safetrust, RightCrowd, Genea incoming), video analytics (Ambient.ai — enterprise-scale, rare signal), IoT/environmental (SmartHub), REX systems, card reader modernization at scale, commissioning and go-live validation. Multi-network complexity: corporate, OT/IoT, and data center simultaneously.

*Score higher when JD includes:* physical security, PACS, access control, converged security, IoT, data center security, site commissioning, OnGuard, Lenel, Ambient.ai, low-voltage systems, REX

*Rare direct-match signals — elevate brief priority if present:*
- Ambient.ai named explicitly
- LenelS2 OnGuard named explicitly
- Multi-network or OT/IoT security scope

---

### Dimension 3 — Vendor Management & Portfolio Governance
**Weight: High**  
**Proficiency: Expert**  
Multi-million dollar portfolio governance, QBR methodology, MTTR and repeat rate analytics, vendor silence pattern detection (surfaced 5–146 day gaps invisible to prior reporting), retention and termination case development, escalation authority, RFP governance and vendor selection authority. Active vendors: Unlimited Technology ($260K/year), Ambient.ai, Lenel/LenelS2, Safetrust, RightCrowd, Meraki, SmartHub, SailPoint, Genea (pipeline).

*Score higher when JD includes:* vendor management, contract governance, SLA, third-party risk, vendor portfolio, multi-vendor, vendor selection, RFP, procurement governance

---

### Dimension 4 — Stakeholder Management & Executive Communication
**Weight: High**  
**Proficiency: Expert**  
C-suite QBR delivery at SPM level (uncommon — typically belongs to senior PMs). Stakeholder map: CST team, GSOC operators, site technicians, multi-vendor account management, Principal, executive leadership. Cross-functional authority across security, IT, identity, and network domains.

*Score higher when JD includes:* executive stakeholder, C-suite, cross-functional leadership, executive reporting, leadership communication, VP or above visibility

---

### Dimension 5 — Incident & Service Operations
**Weight: Medium**  
**Proficiency: Proficient–Expert**  
P0/P1 incident lifecycle ownership, severity management, 321-ticket classification across 9 months (35.7/month baseline), repeat incident diagnosis (56% rate — systemic, not ticket-level), cross-source triage coordination, service health and uptime metrics (98.9% across active rollout against 99% SLA).

*Score higher when JD includes:* incident management, service operations, P0/P1, MTTR, uptime, operational continuity, severity management, on-call governance

---

### Dimension 6 — AI Orchestration & Automation
**Weight: Medium**  
**Proficiency: Practitioner — frontier capability for PM discipline**  
Three-tier AI orchestration model (context extraction → strategic translation → implementation). Active tools: Devin, Claude, Zapier, Gemini, Lark bots, MCP integrations. PII governance practices for AI-generated artifacts. AI Brief generation. Platform development direction via AI-assisted implementation. In-progress: Zapier/Gemini/Lark automation PoC (stale vendor response detection, escalation language generation, weekly vendor adherence summary).

*Score higher when JD includes:* AI, automation, ML, intelligent operations, workflow automation, platform development, orchestration, AI-assisted tooling, generative AI

---

### Dimension 7 — Platform & Technical Program Fluency
**Weight: Medium**  
**Proficiency: Advanced — architectural fluency, not engineering ownership**  
CST ServiceHub architecture and product ownership (~21,000 lines, Kubernetes, CI/CD, 1,188 automated tests). REST API literacy across 2N, Axis, Avigilon, Safetrust, Ambient.ai, Meraki, Lark, Jira production stack. Python awareness. MPLS circuit provisioning across 21 PoP sites — network infrastructure program management. Technical depth sufficient for architectural decisions, vendor evaluations, and platform development direction without engineering overhead.

*Score higher when JD includes:* technical program management, platform development, engineering partnership, API, infrastructure, cloud-adjacent, network infrastructure, data center operations

---

### Dimension 8 — Cyber Risk & GRC
**Weight: Lower**  
**Proficiency: Proficient**  
ISO 27001, NIST CSF, risk acceptance frameworks, compensating controls, exception handling governance, audit readiness. SailPoint identity governance integration. Not primary domain — secondary to program and converged security leadership.

*Score higher when JD includes:* GRC, risk management, compliance, ISO 27001, NIST, audit, identity governance, regulatory frameworks

---

### Dimension 9 — Identity, Access & Network Infrastructure
**Weight: Lower**  
**Proficiency: Proficient**  
SailPoint identity governance, SSO/OIDC awareness, Cisco Meraki network monitoring, Safetrust credential management, RightCrowd PACS management. Not primary domain — supporting layer to converged security program work.

*Score higher when JD includes:* identity governance, IAM, access management, network infrastructure, zero trust, SailPoint, credential management

---

## 7. Trajectory Classification

> For every surfaced role, classify before generating the AI Brief.  
> Include classification and one-sentence rationale in the brief header.

| Classification | Definition |
|---|---|
| **Accelerating** | New authority surface (budget, headcount, or broader domain), larger scope than current, or domain expansion toward target trajectory |
| **Lateral** | Same scope, comparable authority — improvement in title, compensation, or employer brand without structural role change |
| **Regressive** | Smaller operational scope, reduced visibility, or authority surface below current role |

**Flag explicitly when:**
- Title matches (Senior SPM) but site/portfolio scope is smaller than current 36-site, $1M+ footprint — classify as Lateral or Regressive accordingly
- Role is at a company below the defined size floor — flag scope compression risk regardless of title
- Role lacks C-suite or executive visibility — flag as visibility reduction even if other signals are strong

---

## 8. AI Brief Generation Instructions

### On Strong Match (Fit score: high across Dimensions 1–4)
1. Open with trajectory classification and one-sentence rationale
2. Lead with the strongest dimension match — identify which dimension the JD weights most heavily and anchor there
3. Surface the single highest-leverage positioning angle — what makes this candidate unusual relative to a standard PM applicant
4. Draft 3 tailored talking points grounded in specific achievements from this profile — no generic PM language
5. Generate 2–3 candidate-directed interview questions to assess whether the role is actually right (scope, authority, visibility, growth path)
6. Close with a one-sentence Fit note on trajectory alignment

### On Partial Match (Fit score: moderate — strong in some dimensions, absent in others)
1. Open with trajectory classification
2. Name what's strong and why
3. Name the gap explicitly — distinguish between: closeable in interview (framing gap), closeable in 6–12 months (credential or experience gap), or structural mismatch (role requires something this profile doesn't have and won't have soon)
4. Draft 2 talking points for the strong dimensions
5. Generate 1–2 candidate-directed questions targeting the gap dimensions to assess real requirements vs. JD boilerplate
6. Close with a recommendation: pursue, pursue with caveat, or deprioritize

### On Scope Compression (Title matches, scope is smaller than current)
1. Flag immediately in brief header: "SCOPE COMPRESSION RISK"
2. Note the specific delta — how many sites, what portfolio size, what visibility level
3. Classify as Lateral or Regressive
4. Only recommend pursuing if: compensation delta is significant, employer is on priority watchlist, or role offers a trajectory unlock not available at current scope

### On Unscored Dimensions
- Do not default unscored dimensions to neutral
- Flag each unscored dimension in the brief as: "Unable to score from JD — recommend asking: [specific question]"

### Hidden Gem Rule (replaces a named watchlist)
**Resolved (2026-06-23):** No fixed employer watchlist — the candidate is explicitly open to
any industry, company, or role that's a genuine fit, not a pre-selected short list. Elevated
brief treatment (full brief, generated even on a partial match) is instead triggered by
signal, not by name: any company in the 100–999 employee range that clears Fit Score ≥ 80
qualifies as a "hidden gem" and receives the same elevated treatment a watchlist employer
used to get. See Section 4, Company Size, for the full tier definition.

---

## 9. Credentials & Education

| Credential | Issuer | Status | Valid |
|---|---|---|---|
| CC — Certified in Cybersecurity | ISC2 | Active | July 2023 – July 2026 |
| Microsoft SC-900 | Microsoft | Active | March 2024 – March 2027 |
| LenelS2 OnGuard 8.3 Certified Associate | LenelS2 | Active | July 2025 – Present |
| CISSP | ISC2 | In Progress | — |

> LenelS2 OnGuard 8.3 is a direct-match signal for roles naming OnGuard explicitly. Surface this credential prominently in briefs where it matches.

**Education:**  
Queensborough Community College — Cybersecurity (December 2025 – Present)

---

## 9.5 Resume Language Source Selection

> Resume prose lives outside this file, in two companion files — this file
> governs scoring/surfacing; those govern voice. Do not paraphrase resume
> language into generic PM phrasing — pull directly from the selected file.

| File | Voice | When to use |
|---|---|---|
| `resume-reference.md` | Senior Security Program Manager — leads with executive QBR ownership, $1M+ vendor portfolio, CAB approval authority, multi-site governance | **Default.** Use for all surfaced roles unless the rule below applies. |
| `resume-reference-tpm.md` | Technical Program Manager — leads with platform architecture, code/data-model ownership, AI orchestration build work | **Conditional.** Use only when the JD title contains "Technical Program Manager" or the JD's lead requirements emphasize platform/engineering build ownership over program governance (matches the Tier 1 title "Technical Program Manager, Security Infrastructure" in Section 4). |

**Why two voices instead of one blended file:** the TPM variant under-signals
Dimension 1 (Security Program & Governance Leadership — the floor-rule,
highest-weighted dimension) by pushing QBR/CAB/vendor-authority language to
the skills section in favor of leading with code volume and platform
ownership. For governance-track Senior PM roles — the majority of the
target list — that framing risks anchoring toward a lower comp band than
the governance voice supports. Reserve it for postings where the title
itself calls for it. See decisions log, 2026-06-23, for the full reasoning.

---

## 10. Positioning Language

### Differentiators — Foreground in Briefs
- Single accountable owner across domains typically governed by separate program teams
- Executive QBR ownership at SPM level — uncommon; typically belongs to senior PMs
- Self-initiated platform development (CST ServiceHub) — rare for non-engineering program leaders
- AI orchestration design at practitioner level — frontier capability for PM discipline
- Cross-domain convergence: physical + cyber + identity + network in one role
- Lark/Feishu operational fluency — differentiated signal for APAC-headquartered or ByteDance-adjacent employers
- Ambient.ai enterprise governance — very few PMs hold this at enterprise scale
- RFP and vendor selection authority — not just ongoing governance
- Multi-network complexity: corporate, OT/IoT, and data center simultaneously
- MPLS circuit provisioning at PoP scale — network infrastructure PM depth beyond standard security scope

### Language to Use
Architected, owned, established, directed, diagnosed, designed, governed, operationalized, surfaced, initiated, instrumented, codified

### Language to Avoid
Helped with, supported, contributed to, assisted, participated in, worked on, responsible for

---

## 11. Configuration Placeholders
> The following values are not yet set. Do not assume or interpolate.  
> Prompt user to define these values before executing scoring or surfacing logic that depends on them.

| Field | Status | Purpose |
|---|---|---|
| Compensation floor | `[DEFINE_WITH_CODE]` | Suppress or flag roles below this base salary threshold |
| Company size floor | `[DEFINE_WITH_CODE]` | Flag scope regression risk for employers below this headcount or revenue threshold |
| Priority watchlist employers (beyond Genetec) | `[DEFINE_WITH_CODE]` | Employers that receive elevated brief treatment regardless of match score |
| Dimension score threshold for floor rule | `[DEFINE_WITH_CODE]` | Numeric threshold below which Dimensions 1 and 2 trigger suppression |

---

*Version: 2.0 | Last updated: June 2026 | Source: Resume v2 rewrite + career context transfer + stress test audit*
