import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery | Jumbo Steel Mills" },
      { name: "description", content: "Free delivery on Jumbo Steel Mills orders over KSh 50,000. We deliver across Kenya." },
    ],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  return (
    <div>
      <PageIntro title="Delivery" lede="Orders over KSh 50,000 ship free. Under that, we quote the run with the goods." />
      <article className="wrap max-w-3xl space-y-4 py-10 leading-relaxed">
        <p>
          Tell us the site or the yard. Long lengths, tanks, cement and sheet need a truck, not a boda, and
          the quote says which.
        </p>
        <p>
          We deliver from the Rabai mill across Kenya. Remote drops can take longer than a Nairobi or
          Mombasa run. You will get a day, not a guess, before the truck leaves.
        </p>
        <p>Payment on confirmed quotes: M-Pesa, bank transfer, or as agreed with the sales desk.</p>
      </article>
    </div>
  );
}
