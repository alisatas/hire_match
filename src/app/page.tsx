import CVAnalyzer from "@/components/features/cv-analyzer";

const faqs = [
  {
    q: "What's the best free ATS checker for my resume?",
    a: "CVXray is a completely free ATS checker that instantly scores your resume against any job description. It detects missing keywords, analyzes skill gaps, and recommends courses to close them — no sign-up, no limits, no credit card.",
  },
  {
    q: "How do I check if my resume matches a job description?",
    a: "Upload your PDF CV (or paste your CV text), then paste the job description or a job URL from LinkedIn, Indeed, Glassdoor, or any company careers page. CVXray shows your match score, matched skills, and missing keywords in seconds.",
  },
  {
    q: "Can I paste a LinkedIn job post URL directly?",
    a: "Yes — paste a LinkedIn job URL and CVXray will automatically fetch the job description. Since LinkedIn blocks some scraping, pasting the job description text directly gives the most reliable results.",
  },
  {
    q: "How many skills and keywords can CVXray detect?",
    a: "CVXray detects 40+ skill categories — React, TypeScript, Python, Node.js, AWS, Docker, Kubernetes, SQL, machine learning, CI/CD, and many more — plus thousands of raw keywords extracted directly from the job posting.",
  },
  {
    q: "Does CVXray store or share my resume data?",
    a: "No. Your CV is processed 100% in your browser and never sent to any server. Nothing is stored, logged, or shared. Only the optional job URL fetch is an external request.",
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
          <p className="text-white/50 text-sm">Quick answers about how CVXray works.</p>
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
        <p>&copy; 2026 CVXray — 100% private — nothing you upload is stored or shared.</p>
      </footer>
    </main>
  );
}
