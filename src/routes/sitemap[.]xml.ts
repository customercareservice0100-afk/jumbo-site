import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/catalog";

const pages = [
  "/",
  "/shop",
  "/about",
  "/all-products",
  "/quality",
  "/jubilee",
  "/contact",
  "/delivery",
  "/privacy",
  "/terms",
  ...products.map((product) => `/product/${product.id}`),
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const body = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...pages.map((path) => `  <url><loc>${origin}${path}</loc></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
