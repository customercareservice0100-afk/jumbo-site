import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";
import { EMAIL } from "@/lib/shop-store";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Jumbo Steel Mills" },
      { name: "description", content: "How Jumbo Steel Mills handles the details you send with a quote." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div>
      <PageIntro title="Privacy policy" lede="We only keep what we need to quote, deliver, and support an order." />
      <article className="wrap max-w-3xl space-y-4 py-10 leading-relaxed">
        <p>
          If you send a quote by the form, WhatsApp, phone or email, we use your name, phone and message to
          reply and to fulfil that order. We do not sell that information.
        </p>
        <p>
          The cart and wishlist stay in your browser on this device. Clearing the site data removes them.
          The purchase bar on the shop is a demonstration of recent-order style updates. It is not a feed of
          live customer records.
        </p>
        <p>
          Questions: <a className="text-primary" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </article>
    </div>
  );
}
