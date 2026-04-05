import CVAnalyzer from "@/components/features/cv-analyzer";

const faqs = [
  {
    q: "How does CV Scorer work?",
    a: "CV Scorer extracts text from your PDF and compares it against the job description using a local skill-matching engine — 40+ skill categories plus raw keyword overlap. It returns a match percentage, matched skills, missing keywords, and course links.",
  },
  {
    q: "Is CV Scorer free?",
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
      <section className="container mx-auto px-4 pb-20 max-w-3xl">
        <h2 className="text-2xl font-black text-white/80 uppercase tracking-widest mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white/5 border border-white/10 rounded-2xl px-6 py-4 open:bg-white/8 transition-all"
            >
              <summary className="cursor-pointer font-bold text-white/90 text-sm uppercase tracking-wide list-none flex justify-between items-center">
                {faq.q}
                <span className="text-white/40 group-open:rotate-180 transition-transform text-lg leading-none">↓</span>
              </summary>
              <p className="mt-3 text-white/60 text-sm leading-relaxed font-medium">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
