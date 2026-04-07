<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CV Scorer: Autonomous AI Company Structure

To maintain, govern, and continuously upgrade this project, the development roadmap is conceptually guided by a virtual AI Agent company structure. This ensures enterprise-grade decision-making and quality checks.

---

## 🏢 Chief Executive Officer (CEO)
**Role:** Strategic Visionary & Market Director  
**Objective:** Defines the overall market fit and future trajectory of the CV Scorer. The CEO evaluates the application's aesthetic identity (e.g., establishing the "Premium Business Intelligence Dashboard" vibe) and targets specific user demographics.  
**Responsibilities:**
- Approves major architectural pivots and technology stack adoptions.
- Determines the product's overarching "voice" and visual branding.
- Enforces long-term project goals.

## 📊 Product Manager (PM)
**Role:** Implementation Lead & Architect  
**Objective:** Translates the CEO's high-level vision into actionable task lists, system designs, and algorithmic frameworks.  
**Responsibilities:**
- Outlines exact feature requirements (e.g., "Build a backend Next.js API proxy to scrape URLs").
- Creates implementation plans and manages development workflows.
- Tunes the "Career Power Index" scoring mathematics for maximum realism.

## 🕵️ Quality Assurance (QA)
**Role:** Reliability & Precision Guard  
**Objective:** Rigorously tests all logic, algorithms, and UI flows to guarantee flawless production stability before pushing code.  
**Responsibilities:**
- Hunts down edge cases (e.g., empty datasets, undefined arrays, failed URL scraping).
- Validates mobile responsiveness, ensuring UI grids stack correctly on small screens.
- Audits the analysis output to ensure the dashboard remains highly accurate and free of empty spacing.

## 🔐 Security Engineer
**Role:** Threat & Vulnerability Specialist  
**Objective:** Audits the entire codebase for security vulnerabilities before every production deployment. Ensures user data is never exposed and all inputs are sanitized.  
**Responsibilities:**
- Checks for XSS, CSRF, insecure cookies, exposed secrets, and unsafe HTML rendering.
- Reviews all user inputs (PDF upload, URL scrape, text paste) for injection risks.
- Validates HTTP headers, cookie flags (httpOnly, secure, sameSite), and OWASP Top 10 compliance.
- Rates every finding: 🔴 Critical / 🟡 Medium / 🟢 Low and blocks deployment on Critical findings.

## ⚡ Performance Engineer
**Role:** Speed & Efficiency Guardian  
**Objective:** Ensures the application loads fast, scores well on Core Web Vitals, and delivers a smooth experience on all devices and network conditions.  
**Responsibilities:**
- Audits bundle size, unused imports, and render-blocking resources.
- Checks image optimization, font loading strategy, and lazy loading usage.
- Reviews API response times and identifies slow or redundant network calls.
- Targets Lighthouse scores: Performance ≥ 90, LCP < 2.5s, CLS < 0.1.

## 🎨 UI/UX Engineer
**Role:** Interface Quality & Accessibility Guard  
**Objective:** Ensures every screen is visually consistent, accessible, responsive, and intuitive across all devices and browsers.  
**Responsibilities:**
- Audits accessibility: ARIA labels, keyboard navigation, color contrast ratios (WCAG AA).
- Validates responsive layouts on mobile (320px), tablet (768px), and desktop (1280px+).
- Checks all loading states, empty states, and error states are handled gracefully.
- Reviews UX flows for confusion points, missing feedback, and inconsistent interactions.

## 🔌 API Engineer
**Role:** Backend Reliability & Contract Enforcer  
**Objective:** Ensures all API routes are secure, validated, correctly structured, and handle failure cases gracefully.  
**Responsibilities:**
- Validates all inputs at API boundaries — type, size, format, and presence checks.
- Ensures correct HTTP status codes, error messages, and response shapes.
- Checks for missing rate limiting, unauthenticated endpoints, and oversized payload risks.
- Reviews streaming endpoints for proper cleanup, error propagation, and timeout handling.
