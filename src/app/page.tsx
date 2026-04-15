import CVAnalyzer from "@/components/features/cv-analyzer";

const faqs = [
  {
    q: "What's the best free tool to check if my resume matches a job?",
    a: "CVXray instantly scores your resume against any job description for free. It shows which skills you have, which keywords are missing, and recommends courses to close the gaps — no sign-up, no limits, no credit card.",
  },
  {
    q: "How do I check if my resume matches a job description?",
    a: "Upload your PDF CV (or paste your CV text), then paste the job description or a job URL from LinkedIn, Indeed, Glassdoor, or any company careers page. CVXray shows your match score, matched skills, and missing keywords in seconds.",
  },
  {
    q: "Does CVXray store or share my resume data?",
    a: "No. CVXray never stores or logs your CV. PDF text is extracted server-side and immediately discarded — never written to any database. The CV analysis runs in your browser. Nothing is retained after your session ends.",
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
          <p className="text-cyan-300/80 text-sm">Quick answers about how CVXray works.</p>
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
      <footer className="text-center py-8 border-t border-white/10 text-cyan-300/60 text-xs px-6">
        <p>&copy; 2026 CVXray &nbsp;·&nbsp; 100% private &nbsp;·&nbsp; nothing you upload is stored or shared.</p>
      </footer>
    </main>
  );
}
