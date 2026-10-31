import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categoryName, getProduct, products } from "@/data/catalog";
import { defaultShopSearch, useShop, whatsappLink } from "@/lib/shop-store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} | Jumbo Steel Mills` },
          {
            name: "description",
            content: `${loaderData.product.name} — ${loaderData.product.priceLabel}. Order from Jumbo Steel Mills, Rabai.`,
          },
        ]
      : [{ title: "Product | Jumbo Steel Mills" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const add = useShop((state) => state.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  const quote = `Hello Jumbo Steel Mills, I would like a quote for ${qty} x ${product.name} (${product.priceLabel}).`;

  return (
    <div className="wrap py-8">
      <p className="text-sm text-muted">
        <Link to="/shop" search={defaultShopSearch} className="text-primary">Shop</Link>
        {" / "}
        <Link to="/shop" search={{ ...defaultShopSearch, cat: product.category }} className="text-primary">
          {categoryName(product.category)}
        </Link>
      </p>
      <div className="mt-4 grid items-start gap-8 lg:grid-cols-2">
        <img src={product.image} alt={product.name} className="w-full rounded-card border border-line bg-canvas object-contain" />
        <div>
          <h1 className="font-display text-4xl font-bold tracking-wide">{product.name}</h1>
          <p className="mt-3 text-2xl font-bold text-primary">{product.priceLabel}</p>
          <p className="mt-4 max-w-xl text-muted">
            Supplied by Jumbo Steel Mills for contractors, hardware shops, and home builds. The figure
            shown is a guide price. Final cost depends on size, quantity, and delivery point.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm font-semibold" htmlFor="qty">Qty</label>
            <input
              id="qty"
              type="number"
              min={1}
              value={qty}
              onChange={(event) => setQty(Math.max(1, Number(event.target.value) || 1))}
              className="min-h-11 w-20 rounded-md border border-line px-3"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                add(product.id, qty);
                setAdded(true);
              }}
            >
              {added ? "Added to cart" : "Add to cart"}
            </button>
            <a href={whatsappLink(quote)} target="_blank" rel="noreferrer" className="btn bg-whatsapp text-paper">
              WhatsApp quote
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">Free delivery on orders over KSh 50,000. 30-day returns on unused goods.</p>
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-3xl font-bold">More in {categoryName(product.category)}</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
