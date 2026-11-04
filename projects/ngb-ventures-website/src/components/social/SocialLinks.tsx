"use client";
import { useEffect, useState } from "react";
import { runtimeConfig, SOCIAL_KEYS, type SocialKey } from "@/lib/runtime-config";
import { BrandIcon, SOCIAL_LABEL } from "./icons";

/** Social profile links, read at runtime from site-config.js (no rebuild needed). Renders nothing until a handle is set. */
export function useSocial() {
  const [links, setLinks] = useState<[SocialKey, string][]>([]);
  useEffect(() => {
    const s = runtimeConfig().social ?? {};
    setLinks(SOCIAL_KEYS.filter((k) => /^https:\/\//.test(s[k] ?? "")).map((k) => [k, s[k]!]));
  }, []);
  return links;
}

export function SocialLinks({ className = "", size = "h-4 w-4", labels = false }: { className?: string; size?: string; labels?: boolean }) {
  const links = useSocial();
  if (!links.length) return null;
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="NGB Ventures on social media">
      {links.map(([k, href]) => (
        <li key={k}>
          <a href={href} target="_blank" rel="noopener noreferrer me" aria-label={`NGB Ventures on ${SOCIAL_LABEL[k]}`}
            className={`inline-flex items-center gap-2 rounded-full border border-current/25 transition-colors hover:bg-ivory hover:text-charcoal ${labels ? "px-4 py-2 text-sm" : "h-10 w-10 justify-center"}`}>
            <BrandIcon name={k} className={size} />{labels && SOCIAL_LABEL[k]}
          </a>
        </li>
      ))}
    </ul>
  );
}
