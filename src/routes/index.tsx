import { createFileRoute, Link } from "@tanstack/react-router";
import { Headset, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products, type FeatureTab } from "@/data/catalog";
import { defaultShopSearch } from "@/lib/shop-store";

const tabs: { id: FeatureTab; label: string }[] = [
  { id: "new", label: "New Arrival" },
  { id: "best", label: "Best Selling" },
  { id: "top", label: "Top Rated" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jumbo Steel Mills | Steel & Building Materials" },
      {
        name: "description",
        content:
          "Season offers on pipes, roofing, tanks, tools and construction materials from Jumbo Steel Mills, Rabai, Kenya.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HardwareStore",
          name: "Jumbo Steel Mills Limited",
          url: "https://www.jumbosteelmill.co.ke/",
          telephone: "+254756005660",
          email: "jumbo@jubileegroup.org",
          address: {
            "@type": "PostalAddress",
            streetAddress: "C111",
            addressLocality: "Rabai",
            addressRegion: "Kilifi County",
            addressCountry: "KE",
          },
          openingHours: "Mo-Fr 08:00-17:00",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [tab, setTab] = useState<FeatureTab>("new");
  const featured = products.filter((product) => product.tabs.includes(tab)).slice(0, 10);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-paper">
        <img
          src="/brand/hero-mill.jpg"
          alt="Jumbo Steel Mills Limited sign at the Rabai mill"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="hero-frame wrap relative flex flex-col items-center justify-center py-16 text-center">
          <h1 className="font-display text-5xl font-bold tracking-wide sm:text-7xl">Season Sale</h1>
          <p className="mt-4 text-lg sm:text-2xl">Hardware & Building Materials</p>
          <p className="text-lg sm:text-2xl">Min. 35–70% Off</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/shop" search={defaultShopSearch} className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/about" className="btn btn-line">
              Read More
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="wrap grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {[
            [Truck, "Free Shipping", "On All Orders Over KSh 50,000"],
            [ShieldCheck, "Secure Payment", "We Ensure Secure Transactions"],
            [RefreshCcw, "100% Money Back", "30 Days Return Policy"],
            [Headset, "Online Support", "24/7 Dedicated Support"],
          ].map(([Icon, title, copy]) => (
            <div key={String(title)} className="flex flex-col items-center px-2 text-center">
              <Icon className="size-9 text-primary" aria-hidden="true" />
              <h2 className="mt-3 font-semibold">{String(title)}</h2>
              <p className="mt-1 text-sm text-muted">{String(copy)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap grid gap-4 py-8 lg:grid-cols-2">
        <Link to="/shop" search={{ ...defaultShopSearch, cat: "building" }} className="block overflow-hidden rounded-card">
          <img src="/brand/promo-arrivals.jpg" alt="New arrivals — building materials up to 70% off" className="h-full w-full object-cover" />
        </Link>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/shop" search={{ ...defaultShopSearch, cat: "pipes" }} className="rounded-card bg-canvas p-3 text-center">
            <img src="/brand/promo-pipes.jpg" alt="Pipes loaded for delivery" className="aspect-video w-full rounded-md object-cover" />
            <h2 className="mt-3 font-semibold">Pipes & Fittings</h2>
            <p className="text-sm text-muted">25% Off</p>
            <p className="mt-1 text-sm font-semibold text-primary">Shop Now →</p>
          </Link>
          <Link to="/shop" search={{ ...defaultShopSearch, cat: "tools" }} className="rounded-card bg-canvas p-3 text-center">
            <img src="/brand/promo-tools.jpg" alt="Hardware tools in the yard" className="aspect-video w-full rounded-md object-cover" />
            <h2 className="mt-3 font-semibold">Hardware Tools</h2>
            <p className="text-sm text-muted">45% Off</p>
            <p className="mt-1 text-sm font-semibold text-primary">Shop Now →</p>
          </Link>
        </div>
      </section>

      <section className="wrap pb-12">
        <h2 className="text-center font-display text-4xl font-bold tracking-wide">Featured Products</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold ${tab === item.id ? "bg-primary text-paper" : "bg-canvas text-ink"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="wrap grid gap-4 pb-14 md:grid-cols-2">
        <Link to="/shop" search={{ ...defaultShopSearch, cat: "plumbing" }} className="overflow-hidden rounded-card">
          <img src="/brand/banner-plumbing.jpg" alt="Plumbing supplies, flat 70% off" className="h-full w-full object-cover" />
        </Link>
        <Link to="/shop" search={{ ...defaultShopSearch, cat: "building" }} className="overflow-hidden rounded-card">
          <img src="/brand/banner-construction.jpg" alt="Construction materials, 35 to 70% off" className="h-full w-full object-cover" />
        </Link>
      </section>
    </div>
  );
}
