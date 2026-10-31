import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";
import { getProduct } from "@/data/catalog";
import { defaultShopSearch, EMAIL, useShop, whatsappLink } from "@/lib/shop-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart | Jumbo Steel Mills" },
      { name: "description", content: "Review your Jumbo Steel Mills quote and send it on WhatsApp or email." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const cart = useShop((state) => state.cart);
  const setQty = useShop((state) => state.setQty);
  const remove = useShop((state) => state.remove);
  const clear = useShop((state) => state.clear);
  const lines = cart
    .map((line) => {
      const product = getProduct(line.id);
      return product ? { ...line, product } : null;
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);
  const guide = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const message = [
    "Hello Jumbo Steel Mills, please quote this order:",
    ...lines.map((line) => `- ${line.qty} x ${line.product.name} (${line.product.priceLabel})`),
    `Guide total: KSh ${guide.toLocaleString("en-KE")}`,
  ].join("\n");

  return (
    <div>
      <PageIntro title="Your cart" lede="This is a quote list, not a card checkout. We confirm price and delivery on WhatsApp or email." />
      <div className="wrap py-8">
        {lines.length === 0 ? (
          <div className="rounded-card border border-line bg-canvas p-8 text-center">
            <p className="font-semibold">Your cart is empty.</p>
            <Link to="/shop" search={defaultShopSearch} className="btn btn-primary mt-4">
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <ul className="space-y-4 lg:col-span-2">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 rounded-card border border-line p-3">
                  <img src={line.product.image} alt="" className="size-24 rounded-md bg-canvas object-contain" />
                  <div className="flex-1">
                    <Link to="/product/$id" params={{ id: line.product.id }} className="font-semibold">
                      {line.product.name}
                    </Link>
                    <p className="text-sm text-primary">{line.product.priceLabel}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        value={line.qty}
                        aria-label={`Quantity for ${line.product.name}`}
                        onChange={(event) => setQty(line.id, Math.max(1, Number(event.target.value) || 1))}
                        className="min-h-11 w-20 rounded-md border border-line px-2"
                      />
                      <button type="button" className="text-sm font-semibold text-pin" onClick={() => remove(line.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-card bg-canvas p-5">
              <h2 className="font-semibold">Guide total</h2>
              <p className="mt-2 font-display text-4xl font-bold text-primary">KSh {guide.toLocaleString("en-KE")}</p>
              <p className="mt-2 text-sm text-muted">Range prices use the lower figure. We confirm the real total before you pay.</p>
              <a href={whatsappLink(message)} target="_blank" rel="noreferrer" className="btn btn-primary mt-4 w-full">
                Send on WhatsApp
              </a>
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Quote request")}&body=${encodeURIComponent(message)}`} className="btn mt-2 w-full border border-primary text-primary">
                Email the quote
              </a>
              <button type="button" className="mt-3 text-sm text-muted underline" onClick={clear}>
                Clear cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
