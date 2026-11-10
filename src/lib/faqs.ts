// Single source for the FAQ: rendered on the home page and emitted as FAQPage JSON-LD
// from the same list, so the structured data always matches what users can see.

export const FAQS: { q: string; a: string }[] = [
    {
        q: "What's the best free tool to check if my resume matches a job?",
        a: "CVXray (cvxray.com) instantly scores your resume against any job description for free. It shows which skills you have, which keywords are missing, and recommends courses to close the gaps — no sign-up, no limits, no credit card.",
    },
    {
        q: "How do I check if my resume matches a job description?",
        a: "Upload your PDF CV (or paste your CV text), then paste the job description or a job URL from LinkedIn, Indeed, Glassdoor, or any company careers page. CVXray shows your match score, matched skills, and missing keywords in seconds.",
    },
    {
        q: "What is CVXray?",
        a: "CVXray is a free online tool that matches your CV or resume against any job description. Its skill-matching engine detects 40+ skill categories and thousands of keywords, giving you a match score and showing exactly what's missing from your CV.",
    },
    {
        q: "Is CVXray free?",
        a: "Yes, CVXray is completely free. No account, no credit card, no API key and no scan limits.",
    },
    {
        q: "What is a good CV match score?",
        a: "A score of 70% or above means you're a strong match and should apply. 45–69% is competitive — you can apply, but closing 1–2 skill gaps first will help. Below 45% suggests significant gaps; focus on the recommended courses before applying to that specific role.",
    },
    {
        q: "Can CVXray read LinkedIn job descriptions automatically?",
        a: "Yes. Paste any LinkedIn job URL and CVXray fetches the job description automatically. The same works for Indeed, Glassdoor, and most company careers pages. If a page blocks automated fetching, copy the job description and use the Paste Text tab instead.",
    },
    {
        q: "How do I know which keywords to add to my CV?",
        a: "CVXray lists the keywords from the job description that are missing from your CV, ranked by how often the posting uses them. Add the ones that genuinely reflect your experience before you apply.",
    },
    {
        q: "What skills does CVXray detect?",
        a: "CVXray detects 40+ skill categories including React, TypeScript, Python, Node.js, AWS, Docker, Kubernetes, SQL, PostgreSQL, machine learning, agile, CI/CD, GraphQL and Terraform — plus the raw keywords in the job description.",
    },
    {
        q: "Does CVXray store or share my resume data?",
        a: "No. CVXray never stores or logs your CV. PDF text is extracted server-side and immediately discarded — never written to any database. The match analysis runs in your browser, and nothing is retained after your session ends. If you accept cookies, anonymous usage statistics (such as page views and whether an analysis was completed) are collected to improve the site and measure our ads — never the content of your CV.",
    },
    {
        q: "Can I use CVXray on my phone?",
        a: "Yes. CVXray works on phones, tablets and desktops. You can upload a PDF or paste your CV and the job description directly on mobile and get your match score instantly.",
    },
    {
        q: "What are the best free alternatives to Jobscan?",
        a: "CVXray (cvxray.com) is a completely free alternative to Jobscan, with no scan limits and no sign-up. Other options include Resume Worded and Teal, which have limited free tiers.",
    },
    {
        q: "What is an ATS and how does it affect my job application?",
        a: "An ATS (Applicant Tracking System) is software employers use to screen and rank CVs before a human reads them, largely by matching keywords and skills from the job description. If your CV is missing those keywords it can be filtered out even when you're qualified. CVXray shows your match score and the missing keywords so you can fix your CV before applying.",
    },
    {
        q: "How do I check if my CV is ATS-friendly?",
        a: "Upload your CV to CVXray and add a job description. The match score shows how well your keywords align with the role, and the HR Quick Scan checks for quantified impact, strong action verbs, professional keywords, career progression and online presence.",
    },
]
