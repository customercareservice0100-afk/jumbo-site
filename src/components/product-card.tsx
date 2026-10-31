import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

const badgeLabel = { new: "New", sale: "Sale", popular: "Popular" } as const;

export function ProductCard({ product }: { product: Product }) {
  const wished = useShop((state) => state.wishlist.includes(product.id));
  const toggleWish = useShop((state) => state.toggleWish);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-paper shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
        aria-pressed={wished}
        onClick={() => toggleWish(product.id)}
        className="absolute right-2 bottom-auto top-2 z-10 flex size-11 items-center justify-center rounded-full bg-paper/95 text-ink shadow-sm"
      >
        <Heart className={`size-5 ${wished ? "fill-pin text-pin" : ""}`} />
      </button>
      {product.badge ? (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-paper">
          {badgeLabel[product.badge]}
        </span>
      ) : null}
      <Link to="/product/$id" params={{ id: product.id }} className="flex h-full flex-col">
        <span className="block aspect-square overflow-hidden bg-canvas">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </span>
        <span className="flex flex-1 flex-col items-center gap-1 px-3 py-4 text-center">
          <span className="text-sm font-semibold leading-snug text-ink">{product.name}</span>
          <span className="text-sm font-bold text-primary">{product.priceLabel}</span>
        </span>
      </Link>
    </article>
  );
}
