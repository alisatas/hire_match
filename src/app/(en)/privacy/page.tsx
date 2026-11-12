import type { Metadata } from "next";
import { ContactLine, LegalPage } from "@/components/legal-page";
import { OG_IMAGE } from "@/lib/site";

const title = "Privacy Policy";
const description = "How CVXray handles your CV, job descriptions, analytics and payment data. Your CV is never stored.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", siteName: "CVXray", url: "/privacy", title, description, images: [OG_IMAGE] },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      title={title}
      description={description}
      intro={
        <p>
          CVXray is built so that your CV stays yours. This page explains exactly what is processed, where, and
          for how long. CVXray is run by an individual based in the Netherlands, who is the data controller for
          the site.
        </p>
      }
      sections={[
        {
          title: "Your CV",
          body: (
            <ul>
              <li><strong>Pasted text</strong> never leaves your browser. The match analysis runs entirely on your device.</li>
              <li>
                <strong>Uploaded PDFs</strong> are sent to our server only to extract the text, which is sent back to your
                browser. The file and its text are discarded immediately — never written to a database, file or log.
              </li>
              <li>CV content is never used for analytics, advertising or training anything.</li>
            </ul>
          ),
        },
        {
          title: "Job descriptions",
          body: (
            <p>
              If you paste a job link, our server fetches that public page, extracts the text and returns it to your
              browser. The link and the page content are not stored.
            </p>
          ),
        },
        {
          title: "Stored in your browser",
          body: (
            <p>
              Your browser keeps your last three match scores (score, label and skill counts — no CV text) and your
              cookie choice, so the site can show them next time. Clear your browser&apos;s site data to remove them.
            </p>
          ),
        },
        {
          title: "Analytics and advertising measurement",
          body: (
            <>
              <p>
                Only if you click &ldquo;Accept all&rdquo; in the cookie banner, Google Tag Manager loads Google Analytics and
                Google Ads measurement. They record anonymous usage such as page views and whether an analysis was
                completed — never the content of your CV or the job description. You can change your choice any
                time with &ldquo;Cookie settings&rdquo; in the footer.
              </p>
              <p>
                We also use Vercel Web Analytics, which counts page views without cookies and without identifying
                you.
              </p>
            </>
          ),
        },
        {
          title: "Payments",
          body: (
            <p>
              Optional support payments are handled by Lemon Squeezy as merchant of record. Lemon Squeezy collects
              your payment details under its own privacy policy; we never see your card details. We receive the
              order details needed to run the service and handle refunds: your name, email address, amount and
              country.
            </p>
          ),
        },
        {
          title: "Hosting and security",
          body: (
            <p>
              The site is hosted by Vercel. To deliver pages and protect the site from abuse, your IP address is
              processed in server logs and, for rate limiting, kept in memory for about a minute.
            </p>
          ),
        },
        {
          title: "Your rights",
          body: (
            <p>
              Under the GDPR you can ask to access, correct or delete personal data we hold about you, or object to
              its use. Because we store no CV data, there is usually nothing to delete beyond payment records, which
              we must keep for tax purposes. You can also complain to the Dutch data protection authority
              (Autoriteit Persoonsgegevens).
            </p>
          ),
        },
        {
          title: "Contact",
          body: <p>For privacy questions, <ContactLine />.</p>,
        },
      ]}
    />
  );
}
