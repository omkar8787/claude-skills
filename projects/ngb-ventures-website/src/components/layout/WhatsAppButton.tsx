import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/content/site";

/** Renders only when NEXT_PUBLIC_WHATSAPP_NUMBER is configured. Small, bottom-left so it never covers primary CTAs. */
export function WhatsAppButton() {
  if (!whatsappHref) return null;
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float no-print fixed bottom-20 left-4 z-40 md:bottom-5 md:left-5 inline-flex h-12 items-center gap-2 rounded-full bg-charcoal px-4 text-sm font-semibold text-ivory shadow-[0_10px_30px_-10px_rgba(0,0,0,.5)] ring-1 ring-ivory/10 transition-colors hover:bg-bronze-ink"
      aria-label="Chat with NGB Ventures on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" /> <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
