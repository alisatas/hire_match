import CVAnalyzer from "@/components/features/cv-analyzer";

const faqs = [
  {
    q: "What is CVXray and how does it work?",
    a: "CVXray is a free AI-powered CV and resume matcher. Upload your PDF or paste your CV text, add a job description or job URL, and CVXray instantly calculates your match percentage using a skill-matching engine that detects 40+ skill categories and thousands of keywords.",
  },
  {
    q: "Is CVXray free? Are there any limits?",
    a: "Completely free — no account, no credit card, no scan limits. Unlike Jobscan or Resume Worded, CVXray has no paywalls or monthly limits. All analysis is instant and private.",
  },
  {
    q: "How do I check if my resume matches a job description?",
    a: "Upload your PDF CV (or paste your CV text), then paste the job description or a job URL from LinkedIn, Indeed, Glassdoor, or any company careers page. CVXray will show your match score, matched skills, and missing keywords in seconds.",
  },
  {
    q: "Does CVXray work as an ATS checker?",
    a: "Yes. CVXray acts as a free ATS (Applicant Tracking System) checker. It scans your CV for the exact keywords and skills in the job description — the same way automated ATS software filters resumes — so you can optimize your CV before applying.",
  },
  {
    q: "Does it work with LinkedIn job posts?",
    a: "Yes — paste a LinkedIn job URL and CVXray will automatically fetch the job description. Since LinkedIn blocks some scraping, pasting the job description text directly gives the most reliable results.",
  },
  {
    q: "What skills does CVXray detect?",
    a: "CVXray detects 40+ skill categories: React, TypeScript, Python, Node.js, AWS, Docker, Kubernetes, SQL, PostgreSQL, machine learning, agile, CI/CD, GraphQL, Terraform, and many more — plus thousands of raw keywords extracted directly from the job posting.",
  },
  {
    q: "Is my CV data private?",
    a: "Your CV is processed entirely in your browser and never stored or sent to any server. The only external request is the optional job URL fetch. No data, no tracking, no accounts.",
  },
  {
    q: "What are free alternatives to Jobscan?",
    a: "CVXray (cvxray.com) is the best free Jobscan alternative — no scan limits, no sign-up, fully private. Other options include Teal HQ (freemium) and Resume Worded (limited free tier), but CVXray is the only one that's completely unlimited and free.",
  },
];

export default function Home() {
  return (
    <main className="relative z-10">
      <CVAnalyzer />

      {/* FAQ — visible to users + indexed by Google and AI engines */}
      <section className="container mx-auto px-4 pb-24 max-w-3xl">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-4">
            Got questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Everything you need to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">
              know
            </span>
          </h2>
          <p className="text-white/50 text-sm">Quick answers about how JobFlare works.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/15 hover:border-cyan-500/30 rounded-2xl px-6 py-4 transition-all duration-200"
            >
              <summary className="cursor-pointer font-semibold text-white text-sm list-none flex justify-between items-center gap-4">
                {faq.q}
                <span className="text-cyan-400 group-open:rotate-45 transition-transform duration-200 text-xl leading-none shrink-0">+</span>
              </summary>
              <p className="mt-3 text-teal-300 text-sm leading-relaxed border-t border-cyan-500/20 pt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
      <footer className="text-center py-10 border-t border-white/10 text-white/50 text-sm">
        <p>&copy; 2026 JobFlare — Your CV data never leaves your device.</p>
      </footer>
    </main>
  );
}
