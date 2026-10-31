import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";

export const Route = createFileRoute("/jubilee")({
  head: () => ({
    meta: [
      { title: "Jubilee Group | Jumbo Steel Mills" },
      { name: "description", content: "Jubilee Jumbo Hardware Limited and Jumbo Steel Mills Limited — one group since 1990." },
    ],
  }),
  component: JubileePage,
});

function JubileePage() {
  return (
    <div>
      <PageIntro title="Jubilee Group" lede="Hardware trading first. The mill followed." />
      <article className="wrap max-w-3xl space-y-4 py-10 text-lg leading-relaxed">
        <p>
          Jubilee Jumbo Hardware Limited was incorporated in October 1990. It traded hardware and building
          materials, importing wire, nails, boards and tools, and it grew into one of the larger hardware
          houses in western Kenya, based on Obote Road, Kisumu.
        </p>
        <p>
          That trading business is what made Jumbo Steel Mills Limited possible. The mill at Rabai, Kilifi
          County, supplies steel products back into the same market the hardware company already knew:
          contractors, yards, and households building across Kenya.
        </p>
        <p>
          The elephant mark on our products is the group mark. You will see it on the photos in this shop.
        </p>
        <Link to="/about" className="btn btn-primary">Read the mill story</Link>
      </article>
    </div>
  );
}
