import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageIntro } from "@/components/site-shell";
import { EMAIL, MAP_EMBED, MAP_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/shop-store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Jumbo Steel Mills" },
      { name: "description", content: "Call, WhatsApp or email Jumbo Steel Mills at Rabai, Kilifi County." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [note, setNote] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    setNote(`Hello Jumbo Steel Mills, my name is ${name}. Phone: ${phone}. ${message}`);
  }

  return (
    <div>
      <PageIntro title="Contact" lede="The desk is open Monday to Friday, 8:00 AM to 5:00 PM. WhatsApp is monitored for quotes." />
      <div className="wrap grid gap-8 py-10 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-semibold">
            Name
            <input name="name" required className="mt-1 min-h-11 w-full rounded-md border border-line px-3" />
          </label>
          <label className="block text-sm font-semibold">
            Phone
            <input name="phone" required className="mt-1 min-h-11 w-full rounded-md border border-line px-3" />
          </label>
          <label className="block text-sm font-semibold">
            Message
            <textarea name="message" required rows={5} className="mt-1 w-full rounded-md border border-line px-3 py-2" />
          </label>
          <button type="submit" className="btn btn-primary">Prepare message</button>
          {note ? (
            <div className="rounded-card bg-canvas p-4 text-sm">
              <p>Your message is ready. It is not sent until you open WhatsApp or email.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={whatsappLink(note)} target="_blank" rel="noreferrer" className="btn bg-whatsapp text-paper">Open WhatsApp</a>
                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(note)}`} className="btn border border-primary text-primary">Email it</a>
              </div>
            </div>
          ) : null}
        </form>
        <div>
          <ul className="space-y-2 text-sm">
            <li><a className="font-semibold text-primary" href={`tel:${PHONE_TEL}`}>Call {PHONE_DISPLAY}</a></li>
            <li><a className="font-semibold text-primary" href={whatsappLink("Hello Jumbo Steel Mills")}>WhatsApp {WHATSAPP_DISPLAY}</a></li>
            <li><a className="font-semibold text-primary" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li>Jumbo Steel Mills Limited, C111, Rabai, Kilifi County</li>
          </ul>
          <iframe title="Map of Jumbo Steel Mills Limited, C111" src={MAP_EMBED} className="mt-4 h-80 w-full rounded-card border border-line" loading="lazy" />
          <a href={MAP_URL} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-primary">
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
