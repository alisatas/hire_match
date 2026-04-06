import CVAnalyzer from "@/components/features/cv-analyzer";

const faqs = [
  {
    q: "How does JobFlare work?",
    a: "JobFlare extracts text from your PDF and compares it against the job description using a local skill-matching engine — 40+ skill categories plus raw keyword overlap. It returns a match percentage, matched skills, missing keywords, and course links.",
  },
  {
    q: "Is JobFlare free?",
    a: "Yes, completely free. No account, no API key required. All analysis runs locally — nothing is sent to external servers.",
  },
  {
    q: "Does it work with LinkedIn job posts?",
    a: "Paste the LinkedIn job URL and we'll attempt to fetch it. Since LinkedIn blocks scraping, copying and pasting the job description text directly gives the most accurate results.",
  },
  {
    q: "What skills does it detect?",
    a: "React, TypeScript, Python, Node.js, AWS, Docker, Kubernetes, SQL, PostgreSQL, machine learning, agile, CI/CD, GraphQL, Terraform, and 30+ more categories — plus thousands of raw keywords from the job post.",
  },
  {
    q: "Is my CV data private?",
    a: "Yes. Your CV is processed entirely in your browser and never stored or logged. The only external request is the optional job URL fetch.",
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
