import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { PageIntro } from "@/components/site-shell";
import { categories, categoryName, products } from "@/data/catalog";
import { defaultShopSearch, type ShopSearch } from "@/lib/shop-store";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" ? search.q : "",
    cat: typeof search.cat === "string" ? search.cat : "all",
    sort: typeof search.sort === "string" ? search.sort : "featured",
  }),
  head: () => ({
    meta: [
      { title: "Shop | Jumbo Steel Mills" },
      { name: "description", content: "Shop steel, pipes, tanks, roofing, tools and building materials from Jumbo Steel Mills." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const query = search.q.trim().toLowerCase();
  let list = products.filter((product) => search.cat === "all" || product.category === search.cat);
  if (query) {
    list = list.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        categoryName(product.category).toLowerCase().includes(query),
    );
  }
  if (search.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (search.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (search.sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

  function update(next: Partial<ShopSearch>) {
    navigate({ search: { ...search, ...next } });
  }

  return (
    <div>
      <PageIntro
        title={categoryName(search.cat)}
        lede={search.q ? `Results for “${search.q}”` : "Wholesale and retail. Prices are a guide — confirm on your quote."}
      />
      <div className="wrap grid gap-8 py-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <h2 className="font-semibold">Departments</h2>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {categories.map((category) => {
              const active = search.cat === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => update({ cat: category.id })}
                  className={`min-h-11 shrink-0 rounded-full px-4 text-left text-sm font-semibold lg:rounded-md ${active ? "bg-primary text-paper" : "bg-canvas text-ink"}`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </aside>
        <div className="lg:col-span-3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">{list.length} products</p>
            <label className="text-sm font-semibold">
              Sort{" "}
              <select
                value={search.sort}
                onChange={(event) => update({ sort: event.target.value })}
                className="ml-2 min-h-11 rounded-md border border-line bg-paper px-2"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>
          {list.length === 0 ? (
            <div className="rounded-card border border-line bg-canvas p-8 text-center">
              <p className="font-semibold">Nothing matches that search.</p>
              <button type="button" className="btn btn-primary mt-4" onClick={() => navigate({ search: defaultShopSearch })}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {list.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
