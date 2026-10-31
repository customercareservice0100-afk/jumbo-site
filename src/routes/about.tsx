import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Jumbo Steel Mills" },
      {
        name: "description",
        content: "Jumbo Steel Mills Limited, part of the Jubilee Group. Our vision is to build a better and stronger Kenya.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <PageIntro title="About us" lede="A Kenyan mill, started from a hardware counter in 1990." />
      <article className="wrap grid items-start gap-8 py-10 lg:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed">
          <p className="font-display text-2xl font-semibold italic text-primary">
            “Our vision is to Build a Better and Stronger Kenya.”
          </p>
          <p>
            The Jumbo Group of Companies is a privately-owned group whose business operations began in
            October 1990 with the incorporation of Jubilee Jumbo Hardware Limited.
          </p>
          <p>
            Jumbo group has developed a strong presence with exemplary product quality and exceptional
            customer service over the years. The growth in our trading division allowed us to set up Jumbo
            Steel Mills Limited.
          </p>
          <p>
            In a short time, Jumbo Steel is considered a renowned steel manufacturing company in Kenya. The
            mill launched operations on 15 August 2016, opened by Hon. Jeffah Amason Kingi, then Governor of
            Kilifi County.
          </p>
          <p>
            The works sit at Rabai Power Station, Kilifi County. From there we roll and stock sections,
            sheet, pipe and the building lines hardware shops and contractors order every week.
          </p>
          <Link to="/contact" className="btn btn-primary">Get a quote</Link>
        </div>
        <img src="/brand/factory.jpg" alt="Rolling line inside Jumbo Steel Mills" className="w-full rounded-card object-cover" />
      </article>
    </div>
  );
}
