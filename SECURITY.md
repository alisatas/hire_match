# Security policy

CVXray processes CVs, so we take security reports seriously and respond quickly.

## Reporting a vulnerability

**Please do not open a public issue for security problems.**

Report privately through GitHub: **[Report a vulnerability](https://github.com/alisatas/hire_match/security/advisories/new)**
(repository → *Security* → *Report a vulnerability*). Only the maintainer can see the report.

Please include:

- what is affected (URL, API route or file) and the impact you see
- steps to reproduce, or a proof of concept
- whether you believe the issue is already being exploited

## What to expect

- Acknowledgement within **3 working days**
- An initial assessment and planned fix timeline within **7 working days**
- Credit in the release notes if you want it, once a fix is live

## Scope

In scope: the live site at `https://cvxray.com` and the code in this repository — in particular
the job-post fetcher (`/api/scrape`), PDF parsing (`/api/extract-pdf`), the other API routes, and
anything that could expose CV contents.

Out of scope: denial-of-service through sheer request volume, reports from automated scanners
without a demonstrated impact, missing security headers that have no exploitable effect, and
vulnerabilities in third-party services (Vercel, Lemon Squeezy, Google) — report those to the
vendor.

Please test only against your own data, do not access other people's information, and give us
reasonable time to fix an issue before disclosing it publicly.

## How the project protects itself

- Secret scanning with push protection, Dependabot alerts and CodeQL code scanning on GitHub
- CI on every push: typecheck, lint, unit tests, a production build, browser and accessibility
  tests, and a dependency audit that fails on high-severity production advisories
- CVs are never stored; see the [privacy policy](https://cvxray.com/privacy)
