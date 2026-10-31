import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";

const checks = [
  ["Incoming steel", "Heat, surface and section are checked before a billet or coil is accepted onto the floor."],
  ["In-process", "Length, gauge and straightness are checked on the line, not only at the gate."],
  ["Finished goods", "Bars, sheet, mesh and pipe are inspected again before they are tagged for the yard."],
  ["Tanks and fittings", "Capacity, seams and fittings are checked against the size on the label before dispatch."],
];

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality Testing | Jumbo Steel Mills" },
      { name: "description", content: "How Jumbo Steel Mills checks steel, pipe, mesh and tanks before they leave Rabai." },
    ],
  }),
  component: QualityPage,
});

function QualityPage() {
  return (
    <div>
      <PageIntro title="Quality testing" lede="Quality is checked at each stage of the sale, not only on a certificate on the wall." />
      <div className="wrap grid gap-4 py-10 md:grid-cols-2">
        {checks.map(([title, copy]) => (
          <article key={title} className="rounded-card border border-line p-6">
            <h2 className="font-display text-2xl font-bold text-primary">{title}</h2>
            <p className="mt-2 text-muted">{copy}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
