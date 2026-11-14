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
        q: "How is the CV match score calculated?",
        a: "The score combines three parts: skills (50%) — the skills the job names that also appear on your CV, weighted by how often the posting mentions them; keywords (35%) — how much of the posting's own wording your CV shares; and experience (15%) — your years of experience against what the job asks for. Missing a skill the posting repeats three or more times lowers the score further. Results range from 5% to 95%.",
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
        a: "CVXray detects 50+ skill categories: engineering skills such as React, TypeScript, Python, Node.js, AWS, Docker, Kubernetes, SQL, CI/CD and machine learning, AI skills such as LLMs, RAG, vector databases and MLOps, plus data and business skills such as Tableau, Power BI, Excel, Salesforce, SEO, digital marketing, product management and financial modelling — and the raw keywords in the job description.",
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
        q: "Does CVXray work with CVs and job posts that are not in English?",
        a: "Yes. CVXray reads CVs and job descriptions in English, Turkish, German, Spanish, Portuguese and Chinese, and recognises skills, keywords and years of experience in each. Results are most accurate when the CV and the job post are in the same language. The site itself is available in English, Türkçe, Deutsch, Español, Português and 中文.",
    },
    {
        q: "Can I check a Word (.docx) resume or a scanned PDF?",
        a: "CVXray reads PDF CVs up to 5 MB. For a Word or Google Docs resume, save it as PDF (File → Save As or Download → PDF) and upload that, or copy the text and use \"No PDF? Paste the text\". A scanned PDF is just an image with no readable text, so paste the CV text instead; CVXray opens the paste box for you whenever a PDF can't be read.",
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
    {
        q: "What keywords should I put on my resume for my job role?",
        a: "It depends on the role and the specific posting. CVXray publishes free keyword guides for AI engineers, machine learning engineers, software engineers, frontend developers, backend engineers, data analysts, data scientists, product managers, DevOps engineers, UX designers, project managers, recruiters, customer success managers, account executives, digital marketing specialists and financial analysts at cvxray.com/resume-keywords — and for any other role, paste the job description into the checker to see the keywords it asks for.",
    },
]
