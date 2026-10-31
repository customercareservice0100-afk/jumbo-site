import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Clock,
  Heart,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { categories } from "@/data/catalog";
import {
  defaultShopSearch,
  EMAIL,
  MAP_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  useShop,
  WHATSAPP_DISPLAY,
  whatsappLink,
} from "@/lib/shop-store";
import { PurchaseBar } from "@/components/purchase-bar";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/all-products", label: "All Products" },
  { to: "/quality", label: "Quality" },
  { to: "/jubilee", label: "Jubilee" },
  { to: "/contact", label: "Contact" },
] as const;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
      />
    </svg>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const cartCount = useShop((state) => state.cart.reduce((sum, line) => sum + line.qty, 0));
  const wishCount = useShop((state) => state.wishlist.length);

  useEffect(() => setReady(true), []);
  useEffect(() => setOpen(false), [pathname]);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const q = String(data.get("q") ?? "").trim();
    navigate({ to: "/shop", search: { ...defaultShopSearch, q } });
    setSearchOpen(false);
  }

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <div className="bg-primary text-paper">
        <div className="wrap flex items-center justify-between gap-3 py-2 text-sm">
          <div className="flex items-center gap-4">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-1.5 hover:underline">
              <Mail className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">{EMAIL}</span>
            </a>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-1.5 hover:underline">
              <Phone className="size-4" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </div>
          <p className="hidden text-sm md:block">
            Welcome to Our Store <span className="mx-2 opacity-60">|</span> English{" "}
            <span className="mx-2 opacity-60">|</span> KSh (KES)
          </p>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-line bg-paper">
        <div className="wrap flex items-center gap-3 py-3">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <Link to="/" className="mr-auto flex items-center gap-2">
            <img src="/brand/logo.png" alt="Jumbo Steel Mills" className="h-12 w-auto sm:h-14" />
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  search={item.to === "/shop" ? defaultShopSearch : undefined}
                  className={`text-sm font-semibold ${active ? "text-primary underline decoration-2 underline-offset-8" : "text-ink"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-2 flex items-center">
            <Link to="/contact" aria-label="Trade account" className="inline-flex size-11 items-center justify-center">
              <User className="size-5" />
            </Link>
            <button
              type="button"
              aria-label="Search products"
              className="inline-flex size-11 items-center justify-center"
              onClick={() => setSearchOpen((value) => !value)}
            >
              <Search className="size-5" />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="relative inline-flex size-11 items-center justify-center">
              <Heart className="size-5" />
              {ready && wishCount > 0 ? (
                <span className="absolute top-1 right-0 rounded-full bg-primary px-1.5 text-xs font-bold text-paper">
                  {wishCount}
                </span>
              ) : null}
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative inline-flex size-11 items-center justify-center">
              <ShoppingCart className="size-5" />
              <span className="absolute top-1 right-0 rounded-full bg-primary px-1.5 text-xs font-bold text-paper">
                {ready ? cartCount : 0}
              </span>
            </Link>
          </div>
        </div>
        {searchOpen ? (
          <form onSubmit={onSearch} className="wrap pb-3">
            <label className="flex overflow-hidden rounded-md border border-line">
              <span className="sr-only">Search the catalogue</span>
              <input
                name="q"
                placeholder="Search pipes, tanks, sheets, tools…"
                className="min-h-11 flex-1 px-3 outline-none"
              />
              <button type="submit" className="bg-primary px-4 font-semibold text-paper">
                Search
              </button>
            </label>
          </form>
        ) : null}
        {open ? (
          <nav className="border-t border-line bg-paper lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                search={item.to === "/shop" ? defaultShopSearch : undefined}
                className="block border-b border-line px-4 py-3 font-semibold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-footer text-footer-fg">
        <div className="wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-display text-xl font-bold tracking-wide">Jumbo Steel Mills</h2>
            <span className="mt-2 block h-0.5 w-10 bg-primary" />
            <p className="mt-4 text-sm leading-relaxed text-footer-fg/80">
              Jumbo Steel Mills Limited manufactures and supplies steel and building materials from
              Rabai, Kilifi County. Wholesale and retail, with delivery across Kenya.
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Quick Links</h2>
            <span className="mt-2 block h-0.5 w-10 bg-primary" />
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-paper">Home</Link></li>
              <li><Link to="/shop" search={defaultShopSearch} className="hover:text-paper">Shop</Link></li>
              <li><Link to="/about" className="hover:text-paper">About Us</Link></li>
              <li><Link to="/quality" className="hover:text-paper">Quality Testing</Link></li>
              <li><Link to="/jubilee" className="hover:text-paper">Jubilee Group</Link></li>
              <li><Link to="/contact" className="hover:text-paper">Contact</Link></li>
              <li><Link to="/delivery" className="hover:text-paper">Delivery Information</Link></li>
              <li><Link to="/privacy" className="hover:text-paper">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-paper">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Product Categories</h2>
            <span className="mt-2 block h-0.5 w-10 bg-primary" />
            <ul className="mt-4 space-y-2 text-sm">
              {categories.filter((category) => category.id !== "all").map((category) => (
                <li key={category.id}>
                  <Link
                    to="/shop"
                    search={{ ...defaultShopSearch, cat: category.id }}
                    className="hover:text-paper"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Contact Info</h2>
            <span className="mt-2 block h-0.5 w-10 bg-primary" />
            <ul className="mt-4 space-y-3 text-sm leading-relaxed">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <a href={MAP_URL} target="_blank" rel="noreferrer" className="hover:underline">
                  Jumbo Steel Mills Limited, C111, Rabai, Kilifi County
                </a>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0" />
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0" />
                <span>Mon–Fri 8:00 AM – 5:00 PM</span>
              </li>
              <li>WhatsApp {WHATSAPP_DISPLAY}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-footer-fg/70">
          © {new Date().getFullYear()} Jumbo Steel Mills Limited
        </div>
      </footer>

      <a
        href={MAP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Jumbo Steel Mills on the map"
        className="fixed bottom-20 left-4 z-50 flex size-12 items-center justify-center rounded-full bg-pin text-paper shadow-lg"
      >
        <MapPin />
      </a>
      <div className="fixed right-4 bottom-20 z-50 flex flex-col gap-3">
        <a
          href={`tel:${PHONE_TEL}`}
          aria-label="Call Jumbo Steel Mills"
          className="flex size-12 items-center justify-center rounded-full bg-whatsapp text-paper shadow-lg"
        >
          <Phone />
        </a>
        <a
          href={whatsappLink("Hello Jumbo Steel Mills, I would like a quote.")}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Jumbo Steel Mills"
          className="flex size-12 items-center justify-center rounded-full bg-whatsapp text-paper shadow-lg"
        >
          <WhatsAppIcon />
        </a>
      </div>
      <PurchaseBar />
    </div>
  );
}

export function PageIntro({ title, lede }: { title: string; lede: string }) {
  return (
    <section className="bg-canvas border-b border-line">
      <div className="wrap py-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Jumbo Steel Mills</p>
        <h1 className="mt-1 font-display text-4xl font-bold tracking-wide text-ink sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted">{lede}</p>
      </div>
    </section>
  );
}
