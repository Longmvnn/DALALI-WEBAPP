import type { Metadata } from "next";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Help & Support" };

const FAQ = [
  {
    q: "How do I request a viewing?",
    a: "Open any available property and choose Request a viewing. Pick a day and time, add a note if you like, and confirm. The dalali reviews it and you will see the status change to Confirmed on your profile.",
  },
  {
    q: "What does the Verified badge mean?",
    a: "Verified dalalis have had their identity checked by our team. Listings with the badge come from those dalalis.",
  },
  {
    q: "Are the prices final?",
    a: "Prices are monthly rent in Tanzanian shillings as set by the dalali. Some landlords ask for several months up front, so confirm the payment terms during your viewing.",
  },
  {
    q: "How do I post a property as a dalali?",
    a: "Posting listings from the web is coming soon. For now, sign in to the DALALI Android app with the same account and use Post a Listing.",
  },
  {
    q: "I forgot my password",
    a: "Contact support using the details below and we will help you reset it. Self-service reset is coming soon.",
    id: "account",
  },
];

export default function HelpPage() {
  return (
    <div className="container page stack" style={{ maxWidth: 760, gap: 28 }}>
      <div>
        <h1>Help &amp; Support</h1>
        <p className="muted" style={{ margin: "6px 0 0" }}>Answers to common questions, and how to reach us.</p>
      </div>

      <section className="card card-pad">
        <h2 style={{ marginBottom: 6 }}>Frequently asked questions</h2>
        {FAQ.map((f) => (
          <details key={f.q} className="faq" id={f.id}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      <section className="card card-pad stack" style={{ gap: 14 }}>
        <h2>Contact us</h2>
        <a href="mailto:support@dalali.co.tz" className="row"><Icon name="mail" /> support@dalali.co.tz</a>
        <a href="tel:+255700000000" className="row"><Icon name="phone" /> +255 700 000 000</a>
        <p className="small" style={{ margin: 0 }}>Monday to Saturday, 8:00 AM – 6:00 PM (EAT)</p>
      </section>

      <section className="card card-pad" id="terms">
        <h2 style={{ marginBottom: 8 }}>Terms &amp; Conditions</h2>
        <p className="small" style={{ margin: 0 }}>
          Placeholder: add your service terms here before launch. Cover how listings are verified, what DALALI is and isn&apos;t
          responsible for between seekers and dalalis, and how disputes are handled.
        </p>
      </section>

      <section className="card card-pad" id="privacy">
        <h2 style={{ marginBottom: 8 }}>Privacy Policy</h2>
        <p className="small" style={{ margin: 0 }}>
          Placeholder: add your privacy policy here before launch. Explain what personal data you collect (name, email, phone),
          why, how long you keep it, and how users can ask for it to be deleted.
        </p>
      </section>
    </div>
  );
}
