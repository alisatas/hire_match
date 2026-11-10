import CVAnalyzer from "@/components/features/cv-analyzer";
import { FAQS } from "@/lib/faqs";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Home() {
  return (
    <main className="relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <CVAnalyzer />

      {/* FAQ — visible to users + indexed by Google and AI engines */}
      <section className="container mx-auto px-4 pb-24 max-w-3xl">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#999999] text-xs font-semibold tracking-widest uppercase mb-4">
            Got questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-silver mb-3">
            Everything you need to{" "}
            <span className="text-silver">
              know
            </span>
          </h2>
          <p className="text-[#aaaaaa] text-sm">Quick answers about how CVXray works.</p>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="group bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/15 hover:border-cyan-500/30 rounded-2xl px-6 py-4 transition-all duration-200"
            >
              <summary className="cursor-pointer font-semibold text-silver text-sm list-none flex justify-between items-center gap-4">
                {faq.q}
                <span className="text-[#aaaaaa] group-open:rotate-45 transition-transform duration-200 text-xl leading-none shrink-0">+</span>
              </summary>
              <p className="mt-3 text-[#b3b3b3] text-sm leading-relaxed border-t border-cyan-500/20 pt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
      <footer className="text-center py-8 border-t border-white/10 text-[#666666] text-xs px-6">
        <p>&copy; 2026 CVXray &nbsp;·&nbsp; 100% private &nbsp;·&nbsp; nothing you upload is stored or shared.</p>
      </footer>
    </main>
  );
}
