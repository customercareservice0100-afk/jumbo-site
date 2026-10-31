import { Analytics } from "@vercel/analytics/react";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import appCss from "../styles.css?url";

// Optional public origin (e.g. https://www.example.com), set as VITE_SITE_URL at build time so
// link previews get an absolute image URL. Without it the image path stays relative.
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/+$/, "");

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Jumbo Steel Mills" },
      { name: "description", content: "Jumbo Steel Mills Limited — steel, tanks, roofing and building materials from Rabai, Kilifi County, Kenya." },
      { name: "theme-color", content: "#013f90" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Jumbo Steel Mills" },
      { property: "og:image", content: `${SITE_URL}/og.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteShell>
          <Outlet />
        </SiteShell>
        <Scripts />
        <Analytics />
      </body>
    </html>
  ),
});
