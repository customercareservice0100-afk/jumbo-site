import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Jumbo Steel Mills" },
      { name: "description", content: "Ordering, guide prices, delivery and the 30-day return at Jumbo Steel Mills." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div>
      <PageIntro title="Terms & conditions" lede="A price on this site is a guide until sales confirms it." />
      <article className="wrap max-w-3xl space-y-4 py-10 leading-relaxed">
        <p>
          Placing items in the cart does not reserve stock and does not take payment. An order starts when
          we confirm the quote, the sizes, and how you will pay.
        </p>
        <p>
          Unused goods in original condition can be returned within 30 days of delivery. Cut lengths, tinted
          or made-to-measure items, and opened cement or coatings are not returnable. We refund the way you
          paid, after the goods are back and checked.
        </p>
        <p>Delivery is free on confirmed orders over KSh 50,000. Risk passes when you sign for the load.</p>
      </article>
    </div>
  );
}
