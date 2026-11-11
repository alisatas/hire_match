import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { CONTACT_EMAIL, OG_IMAGE, SUPPORT } from "@/lib/site";

const title = "Refund Policy";
const description = `CVXray support payments can be refunded in full within ${SUPPORT.refundDays} days, no questions asked. Here is how to request a refund.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/refund-policy" },
  openGraph: { type: "website", siteName: "CVXray", url: "/refund-policy", title, description, images: [OG_IMAGE] },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title={title}
      intro={
        <p>
          CVXray is free. The only thing you can pay for is an optional, one-time support payment (any amount from
          €{SUPPORT.minimumEur}), processed by Lemon Squeezy. If you change your mind, you get your money back.
        </p>
      }
      sections={[
        {
          title: `Full refund within ${SUPPORT.refundDays} days`,
          body: (
            <p>
              You can ask for a full refund of a support payment within {SUPPORT.refundDays} days of paying. No
              reason is needed and nothing is deducted.
            </p>
          ),
        },
        {
          title: "How to request a refund",
          body: (
            <ul>
              <li>Reply to the receipt email you received from Lemon Squeezy, or</li>
              <li>
                find the order in your <a href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noopener noreferrer">Lemon Squeezy orders</a> and
                contact support from there{CONTACT_EMAIL ? ", or" : "."}
              </li>
              {CONTACT_EMAIL && (
                <li>email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from the address you paid with.</li>
              )}
            </ul>
          ),
        },
        {
          title: "When the money comes back",
          body: (
            <p>
              Refunds go back to the original payment method. Lemon Squeezy issues them right away; your bank or
              card provider usually shows the money within 5–10 business days.
            </p>
          ),
        },
        {
          title: `After ${SUPPORT.refundDays} days`,
          body: (
            <p>
              Accidental or duplicate payments are always refunded, whenever you notice them. For anything else
              after {SUPPORT.refundDays} days, get in touch and we&apos;ll look at it.
            </p>
          ),
        },
        {
          title: "Your legal rights",
          body: (
            <p>
              This policy adds to your statutory consumer rights and does not limit them. See also the{" "}
              <Link href="/terms">Terms of Service</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}

