import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { products } from "@/data/catalog";

const buyers = [
  ["David Kamau", "Nairobi"],
  ["Sarah Akinyi", "Thika"],
  ["John Otieno", "Kisumu"],
  ["Grace Wanjiku", "Nakuru"],
  ["Peter Mwangi", "Mombasa"],
  ["Amina Hassan", "Malindi"],
  ["Brian Kipchoge", "Eldoret"],
  ["Faith Chebet", "Kericho"],
  ["Samuel Omondi", "Kisii"],
  ["Mary Njeri", "Kiambu"],
  ["Joseph Mutua", "Machakos"],
  ["Lilian Adhiambo", "Siaya"],
];

export function PurchaseBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => value + 1), 4200);
    return () => window.clearInterval(timer);
  }, []);

  const buyer = buyers[index % buyers.length];
  const product = products[(index * 5) % products.length];
  const message = `${buyer[0]} from ${buyer[1]} just purchased ${product.name}!`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6">
      <p
        key={message}
        aria-live="polite"
        className="purchase-pop mx-auto flex max-w-5xl items-center gap-3 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-paper shadow-lg"
      >
        <ShoppingBag className="size-4 shrink-0" aria-hidden="true" />
        <span className="truncate">{message}</span>
      </p>
    </div>
  );
}
