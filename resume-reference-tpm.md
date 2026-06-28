# Resume Reference File (TPM Variant) — Micah Davis
> **Conditional variant — not the default language source.**
> Default resume language lives in `resume-reference.md` (Senior Security
> Program Manager voice) — use that unless the rule below applies.
>
> **Use this file instead when** the JD title or lead requirements
> explicitly signal a Technical Program Manager / platform-engineering
> framing — e.g. title contains "Technical Program Manager," or the JD
> leads with platform architecture, engineering partnership, or technical
> build ownership rather than program governance. This corresponds to the
> Tier 1 target title "Technical Program Manager, Security Infrastructure"
> in `candidate-profile.md` Section 4.
>
> **Do not use this as the default voice for governance-track Senior PM
> roles.** It leads with platform/code-ownership framing and pushes
> executive QBR / CAB / vendor-portfolio authority to the skills section —
> appropriate for TPM-titled postings, but it under-signals Dimension 1
> (Security Program & Governance Leadership), the floor-rule dimension for
> most other target titles. Leading with this voice for a Senior Security
> Program Manager posting risks anchoring toward a lower comp band than the
> governance framing supports. See `docs/STRATEGY.md` decisions log,
> 2026-06-23 entry, for the full reasoning.

---

## Summary

Technical Program Manager specializing in converged security platform architecture, AI orchestration, and engineering team leverage across enterprise infrastructure. Designs and ships operational platforms — not just programs — applying a three-tier AI orchestration model to translate security requirements into production-grade systems. Currently owns platform development direction, vendor API integration, and cross-domain infrastructure programs across 36 sites at TikTok USDS, with direct C-suite visibility.

---

## Experience

### Security Program Manager, Converged Security | TikTok USDS | New York, NY | January 2025 – Present

- Architected CST ServiceHub from problem definition through production deployment — an 8-module security operations platform (~21,000 lines of code, 1,188 automated tests, Kubernetes with CI/CD) built to consolidate 10+ fragmented tools into a single operational layer. Owned product direction, data model design, module scoping, and acceptance criteria throughout.

- Designed a three-tier AI orchestration model governing platform development: internal AI for operational context extraction, strategic AI for cross-domain translation and prioritization, and implementation AI for code generation and testing. This model is now the standard operating pattern for all platform feature development.

- Built REST API integrations across a production security stack including 2N intercom, Axis cameras, Avigilon, Safetrust, Ambient.ai, Meraki, and Lark — translating vendor API documentation into workflow automation specs and directing implementation through AI-assisted development (Devin). Authored sequential validation checklists and intent-classification prompts for natural language command execution.

- Established a manual-step elimination framework as the technical acceptance standard for platform development — 20 documented workflows each quantified by execution frequency, per-instance time cost, and failure consequence. Every platform feature ships against a documented time-recovery outcome; 900+ hours per year targeted for elimination.

- Directed 22-site card reader modernization across data center PoPs — owned technical sequencing decisions, maintenance window design, and go/no-go authority per site. Maintained 98.9% uptime across ~967 devices against a 99% SLA target throughout active rollout on segmented corporate, OT/IoT, and data center networks simultaneously.

- Designed an intelligence-based operational assessment methodology — extracting structured signal from 1,488 operational messages and 49+ vendor communications using a cross-domain data model, then producing a 20-finding roadmap structured around a P-Security / P-Ops dual-priority framework. Introduced PII governance practices for all AI-generated operational artifacts.

- Governed MPLS circuit provisioning across all 21 PoP sites and led Nashville Phase 2 & 3 go-live security validation — 47 card readers, 122 cameras, Ambient.ai and REX integration — coordinating technical commissioning across vendor teams and validating platform readiness before site operationalization.

### Security Project Manager | Edward Jones | New York, NY | September 2023 – January 2025

- Led Splunk and ServiceNow integration to align detection, triage, and remediation workflows across security teams — designed the cross-system data flow, defined escalation logic, and reduced false positives by 15% and remediation timelines by 20% against pre-integration baseline.

- Governed enterprise patch management for 7,000+ servers using SCCM and Ansible — defined risk-based prioritization logic, enforced SLAs across infrastructure and security teams, and achieved 90% vulnerability closure. Built PowerBI dashboards tracking exposure trends, MTTR, and SLA adherence for executive visibility.

- Operationalized ISO 27001 and NIST CSF controls by translating regulatory requirements into auditable system processes — authored SOPs, built pre-audit validation workflows, and reduced audit preparation effort by 50%. Established exception handling and compensating control governance for delayed remediation with documented risk acceptance decisions.

### Technical Project Manager | Papa John's | Tampa, FL | January 2022 – January 2023

- Coordinated IAM governance across cloud environments using Google IAM and VPC Service Controls — defined access standards, implemented lifecycle controls, and facilitated threat modeling within the SDLC to reduce unauthorized access incidents by 15% and critical vulnerability findings by 30%.

### Project Coordinator | ADT | Tampa, FL | December 2020 – January 2022

- Managed physical security and IoT deployment workflows across distributed customer sites — coordinated 70+ field technicians, multi-vendor execution, and deployment sequencing to achieve 90% on-time delivery across large-scale installations.

---

## Skills

**Platform Development:** Product ownership, data model design, module architecture, acceptance criteria, Kubernetes, CI/CD, REST APIs, Python

**AI Orchestration:** Three-tier orchestration design (context extraction → strategic translation → implementation), Devin, Claude, intent classification, MCP integrations, Zapier, Lark bots

**Security Stack:** Lenel/LenelS2 (OnGuard 8.3), Safetrust, RightCrowd, Ambient.ai, 2N, Axis, Avigilon, SmartHub, Cisco Meraki, SailPoint, REX systems

**Infrastructure:** PACS governance, IoT/OT networks, MPLS provisioning, segmented network environments, data center PoP operations, site commissioning

**Governance & GRC:** CAB authority, SLA enforcement, ISO 27001, NIST CSF, SIEM (Splunk), ITSM (ServiceNow, Jira, Meego), vulnerability management (Rapid7)

---

*Source: Resume "2026 TPM" variant — title-conditional, not primary.*
*Companion file: candidate-profile.md (scoring, surfacing, and brief generation logic)*
*Default voice: resume-reference.md*
