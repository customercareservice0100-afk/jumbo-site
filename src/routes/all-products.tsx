import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { PageIntro } from "@/components/site-shell";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/all-products")({
  head: () => ({
    meta: [
      { title: "All Products | Jumbo Steel Mills" },
      {
        name: "description",
        content: "Every product stocked by Jumbo Steel Mills, ready to add to a quote.",
      },
    ],
  }),
  component: AllProductsPage,
});

function AllProductsPage() {
  return (
    <div>
      <PageIntro
        title="All products"
        lede="The full list, with no departments. Open any item to add it to a quote."
      />
      <div className="wrap py-8">
        <p className="mb-4 text-sm text-muted">{products.length} products</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
