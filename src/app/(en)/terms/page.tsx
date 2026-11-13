import type { Metadata } from "next";
import Link from "next/link";
import { ContactLine, LegalPage, legalMetadata } from "@/components/legal-page";
import { SUPPORT } from "@/lib/site";

const title = "Terms of Service";
const description = "The terms for using CVXray, the free CV and resume matcher: acceptable use, your data, liability and any optional support payments processed by Lemon Squeezy.";

export const metadata: Metadata = legalMetadata("en", "/terms", title, description);

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      title={title}
      description={description}
      intro={
        <p>
          These terms apply when you use CVXray at cvxray.com. CVXray is run by an individual based in the
          Netherlands. By using the site you agree to these terms. If you don&apos;t agree, please don&apos;t use it.
        </p>
      }
      sections={[
        {
          title: "What CVXray does",
          body: (
            <p>
              CVXray compares a CV or resume with a job description and shows a match score, matched and missing
              skills, keywords and course suggestions. The tool is free to use, with no account and no usage limit.
              Results are automated guidance to help you tailor your CV. They are not a prediction or guarantee of
              any interview, job offer or hiring decision.
            </p>
          ),
        },
        {
          title: "Using the site",
          body: (
            <>
              <p>You may use CVXray for your own job search or for helping others with theirs. You agree not to:</p>
              <ul>
                <li>upload content you don&apos;t have the right to use, or other people&apos;s personal data without their permission;</li>
                <li>attack, overload, scrape or try to bypass the site&apos;s security or rate limits;</li>
                <li>use the job-link feature to fetch anything other than public job postings;</li>
                <li>use the site for anything unlawful.</li>
              </ul>
              <p>We may block access that breaks these rules.</p>
            </>
          ),
        },
        {
          title: "Your CV and data",
          body: (
            <p>
              Your CV is never stored. How CV text, job descriptions, analytics and payment data are handled is
              described in the <Link href="/privacy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          title: "Optional support payments",
          body: (
            <>
              <p>
                CVXray may offer a voluntary, one-time support payment (any amount from €{SUPPORT.minimumEur}).
                Support payments don&apos;t unlock features — the tool stays free whether or not you pay.
              </p>
              <p>
                Payments are sold and processed by <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer">Lemon Squeezy</a>,
                which acts as the merchant of record. Lemon Squeezy handles checkout, payment security, invoices and
                any sales tax or VAT, and its own terms apply to the purchase. We never see your card details.
              </p>
              <p>
                You can get a full refund within {SUPPORT.refundDays} days — see the <Link href="/refund-policy">Refund Policy</Link>.
              </p>
            </>
          ),
        },
        {
          title: "Third-party links",
          body: (
            <p>
              Results link to courses, job sites and interview resources run by others. We don&apos;t control those
              sites and aren&apos;t responsible for their content, prices or availability.
            </p>
          ),
        },
        {
          title: "Availability and changes",
          body: (
            <p>
              CVXray is provided as it is. We work to keep it accurate and available but can&apos;t promise it will
              always be error-free or online, and we may change or stop features at any time.
            </p>
          ),
        },
        {
          title: "Liability",
          body: (
            <p>
              As far as the law allows, we are not liable for indirect or consequential loss, or for decisions you
              make based on the results. Nothing in these terms limits liability that cannot be limited by law, or
              your statutory rights as a consumer.
            </p>
          ),
        },
        {
          title: "Changes to these terms",
          body: (
            <p>
              We may update these terms. The date at the top shows the latest version. Continuing to use the site
              after a change means you accept the updated terms.
            </p>
          ),
        },
        {
          title: "Governing law",
          body: (
            <p>
              These terms are governed by Dutch law. If you are a consumer, you also keep the protection of the
              mandatory laws of the country where you live.
            </p>
          ),
        },
        {
          title: "Contact",
          body: <p>For questions about these terms, <ContactLine />.</p>,
        },
      ]}
    />
  );
}
