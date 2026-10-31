import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { PageIntro } from "@/components/site-shell";
import { getProduct } from "@/data/catalog";
import { defaultShopSearch, useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | Jumbo Steel Mills" },
      { name: "description", content: "Products you saved at Jumbo Steel Mills." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const wishlist = useShop((state) => state.wishlist);
  const saved = wishlist.map((id) => getProduct(id)).filter((item) => item !== undefined);

  return (
    <div>
      <PageIntro title="Wishlist" lede="Saved on this device. Add them to a quote when you are ready." />
      <div className="wrap py-8">
        {saved.length === 0 ? (
          <div className="rounded-card border border-line bg-canvas p-8 text-center">
            <p className="font-semibold">No saved products yet.</p>
            <Link to="/shop" search={defaultShopSearch} className="btn btn-primary mt-4">Go to the shop</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {saved.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
