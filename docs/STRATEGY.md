# JobRadar Strategy

Working doc for the foundational questions that should have preceded the build,
answered retroactively, plus the decisions that fall out of them. Filled in
incrementally as each section resolves — not written all at once.

Status key: 🔴 open · 🟡 in discussion · 🟢 resolved

---

## 1. Purpose & bottleneck 🟢

*Where in the job search funnel does time/opportunity actually get lost —
sourcing, application quality, interview conversion, negotiation, network
access? What decision is this tool meant to help make, day to day?*

**Resolved:** The bottleneck is not sourcing/discovery. It's the handoff
moment right after a recruiter reaches out: their sourcing system flags Micah
as a fit (keyword/ATS match works), but once a human reviews the resume, it
fails to confirm that fit and the recruiter ghosts rather than follows
through. Secondary bottlenecks, all downstream of the same root cause
(inability to translate real, varied domain experience into the specific
vocabulary a given JD/company uses):
- Deciphering qualification against inconsistent JD language across companies.
- Evaluating whether a role is genuinely a fit for growth/skill-building/risk
  ownership, not just whether he qualifies.
- Knowing market comp for his actual skill mix (cybersecurity domain
  expertise in demand).
- Articulating experience across technical/operational/managerial framing in
  interviews without underselling — he has the substance (e.g. the TikTok
  interview succeeded on demonstrated problem-solving method: curiosity →
  root cause → big picture) but doesn't reliably surface the connective
  tissue between disparate experience and a target role.

**Decision:** JobRadar's primary leverage point shifts from "find more
postings" to "given an inbound JD (mostly via recruiter outreach), rapidly
translate real experience into that JD's specific language" — i.e., a
positioning/translation engine triggered at the moment of outreach, not a
discovery engine.

## 2. Success metrics 🟢

*What outcome — not activity — counts as winning: interview rate, offer rate,
comp delta vs. posted range, time-to-offer, trajectory fit? How is it captured?*

**Resolved:** Two metrics define winning:
1. **Recruiter-outreach-to-screen-pass rate** — of recruiters who reach out,
   what % proceed past initial resume review to an actual conversation.
   Directly targets the resolved Section 1 bottleneck.
2. **Comp delta vs. market** — once an offer lands, is it at/above what his
   actual skill mix should command, not just at/above the posted range.

**Gap:** No current baseline exists for either metric — outreach/outcome
events aren't being logged today. Capturing them requires recording every
recruiter contact (date, company, JD, outcome) going forward; this is a
direct input to the context-storage work (tracked separately) rather than a
JobRadar UI feature on its own.

## 3. Channel validity 🟢

*Where did real past interviews/leads actually come from (referral, recruiter,
aggregator, direct apply)? Does that match where this tool looks?*

**Resolved:** Recruiter outreach is the dominant real channel — most leads
originate from recruiters reaching out, not from Micah finding postings.
Successful outcome (current TikTok role) came via recruiter outreach where
the resume/profile held up through screening. However, recruiter-sourced
success is otherwise rare: most recruiter outreach stalls right after the
resume is reviewed, suggesting the channel itself is valid (it does surface
real opportunities) but JobRadar's current design — JSearch board-scanning —
targets the wrong stage of the funnel. The tool currently looks for
postings; the actual leverage point is what happens after a lead already
exists.

**Decision:** Active board-scanning (JSearch rotation) is not the primary
mechanism going forward. It may retain a secondary role (e.g. market-rate
calibration for Section comp questions), but is not where the tool's main
value should be concentrated.

## 4. Identity & narrative 🟢

*One profile/narrative, or several? Is "resume profile" (evidenced, current)
distinct from "target profile" (aspirational, where the career is headed)?*

**Resolved:** `candidate-profile.md` (v2.0) already implements this split —
Section 2 (Current Role Context) is the evidenced profile, Section 4 (Target
Role Profile) is the aspirational profile, and Section 3 (Gaps in Active
Closure) explicitly reframes developmental gaps as in-progress initiatives
rather than raw deficits. **As of 2026-06-23, this is fully wired into
`server.js` (resume-voice selection, AI Brief trajectory/weakness reasoning)
and `app.html` (the real 9-dimension Fit Score, replacing the old generic
`SCORE_CATS`/`fitScore`).** All four `[DEFINE_WITH_CODE]` placeholders (comp
floor, company size floor, watchlist employers, dimension floor threshold)
are resolved — see Section 6 below and the decisions log.

## 5. Career roadmapping vs. job hunting 🔴

*Are these two different time horizons (0-3mo vs 1-5yr) that need two different
surfaces, or one blended view? Should roadmapping be reactive (aggregate gaps
noticed from scanned jobs) or proactive (define target roles/levels, app
computes the delta)?*

(unanswered)

## 6. Hard filters / disqualifiers 🟢

*What real eligibility cutoffs (certs, clearance, geography, comp floor,
contract tolerance) should hard-exclude rather than soft-score?*

**Resolved (2026-06-23):** Implemented in `app.html`'s `fitScore`, per
`candidate-profile.md` Section 5:
- **Clearance:** suppress if JD requires active TS/SCI or above.
- **Relocation:** suppress if JD requires relocation outside the NYC metro.
- **Seniority floor:** suppress Coordinator/Analyst/Associate/Specialist/
  Junior/Intern-titled roles, plus an explicit exclude list (Security
  Analyst, SOC Manager, IT Program Manager, Security Engineer/Architect,
  bare "Project Manager" without a seniority qualifier).
- **Posting recency:** suppress postings over 60 days old, unless the role
  scores ≥80 (an exceptional match overrides staleness).
- **Comp floor:** $130,000 base. Only enforced when the JD discloses salary;
  suppressed below the floor unless the role scores ≥80.
- **Company size:** 100–999 employees surfaces only at ≥80 ("hidden gem");
  under 100 is flagged, not suppressed; 1,000+ is unflagged default.
- **Dimension floor:** Dimensions 1 & 2 (the non-negotiable anchors) each
  need ≥2 distinct JD keyword hits or the role is ineligible regardless of
  aggregate score.

All thresholds were explicit user decisions, not inferred — see decisions
log for the full reasoning, especially the deliberate choice to replace a
named employer watchlist with a score-driven "hidden gem" heuristic instead.

## 7. Feedback loop 🔴

*How should outcomes (interview/offer/rejection) feed back into refining the
profile or scoring weights, instead of the model being static?*

(unanswered)

## 8. Confidence & communication in the UI 🔴

*Should fit be shown as a qualitative tier + visible evidence rather than a
single confident-looking number, given the model is inherently heuristic?*

(unanswered)

---

## Decisions log

**2026-06-23 — Resolved all four scoring placeholders; replaced the named
watchlist with a score-driven heuristic.** Comp floor: $130,000. Company
size: 1,000+ unflagged, 100–999 surfaces only at Fit Score ≥80 ("hidden
gem"), under 100 flagged not suppressed. Dimension floor: Dimensions 1 & 2
each need ≥2 keyword hits. Why no named watchlist: the user is deliberately
open to any industry or company that's a genuine fit — a fixed list
(Genetec, etc.) contradicted that. The 100–999/≥80 rule does the same job
(elevated brief treatment for a promising smaller company) without
requiring the company to be named in advance. All four values were direct
user decisions (via AskUserQuestion), not inferred from context — the
profile's own header explicitly warns against assuming these.

**2026-06-23 — Two resume voices, not one blended file; default to the
governance voice.** `resume-reference.md` (Senior Security Program Manager —
QBR/CAB/vendor-portfolio authority leading) is the default resume language
source wired into `server.js`. `resume-reference-tpm.md` (Technical Program
Manager — platform/code-ownership leading) is a conditional variant,
selected only when a JD title matches "Technical Program Manager."
Why: the TPM voice pushes governance signals (CAB, QBR, vendor authority)
out of the lead bullets in favor of code-volume and platform-ownership
framing. For governance-track Senior PM roles — the majority of the target
list, and the roles where the user is pursuing more seniority and comp —
that under-signals Dimension 1 (Security Program & Governance Leadership,
the floor-rule dimension) and risks anchoring toward a lower comp band than
the governance framing supports. The TPM voice is reserved for postings
where the title itself calls for it (matches Tier 1 "Technical Program
Manager, Security Infrastructure").

**2026-06-19 — Pivot primary mechanism from discovery to translation.**
Why: Micah's real funnel data shows recruiters reliably source him (their
systems flag him as a fit), but conversion fails right after resume review —
not at discovery. JSearch board-scanning solves a problem (finding postings)
that isn't the actual bottleneck. The bottleneck is translating real,
cross-domain experience into the specific vocabulary of whatever JD/company
is in front of him, fast enough to use at the moment a recruiter reaches out.
