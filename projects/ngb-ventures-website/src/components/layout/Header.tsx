"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Menu, Plus, X } from "lucide-react";
import { Logo } from "./Logo";
import type { NavItem } from "@/content/site";

export type MenuLink = { label: string; href: string; meta?: string };
export type MenuData = Record<"industries" | "manufacturing" | "services" | "resources", { intro: string; links: MenuLink[]; feature: { title: string; body: string; href: string; cta: string } }>;

export function Header({ nav, menus, cta }: { nav: NavItem[]; menus: MenuData; cta: { label: string; href: string } }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const lastY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY.current + 4 && !mobile);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobile]);

  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMobile(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobile]);

  const solid = scrolled || open !== null;
  const enter = (k?: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(k ?? null); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(null), 160); };
  // Computed after mount so server and client markup always match (also on static/sub-path hosting).
  const [activePath, setActivePath] = useState<string | null>(null);
  useEffect(() => setActivePath(pathname), [pathname]);
  const isActive = (href: string) => activePath !== null && (href === "/" ? activePath === "/" : activePath.startsWith(href));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-charcoal">Skip to content</a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${hidden && !open ? "-translate-y-full" : "translate-y-0"} ${solid ? "bg-ivory/92 text-charcoal shadow-[0_1px_0_rgba(21,21,21,.08)] backdrop-blur-xl" : "bg-transparent text-ivory"}`}
        onMouseLeave={leave}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="relative z-10 shrink-0"><Logo /><span className="sr-only">, home</span></Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href} onMouseEnter={() => enter(item.menu)} className="relative">
                  <Link
                    href={item.href}
                    aria-expanded={item.menu ? open === item.menu : undefined}
                    onFocus={() => enter(item.menu)}
                    className={`relative block px-3 py-2 text-[0.8125rem] font-medium tracking-[0.01em] transition-opacity hover:opacity-100 ${isActive(item.href) ? "opacity-100" : "opacity-75"}`}
                  >
                    {item.label}
                    {isActive(item.href) && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-bronze" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href={cta.href} className={`btn hidden h-11 min-h-0 px-5 text-[0.8125rem] sm:inline-flex ${solid ? "btn-primary" : "btn-bronze"}`}>
              {cta.label} <ArrowRight className="arrow h-4 w-4" />
            </Link>
            <button type="button" onClick={() => setMobile(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/25 xl:hidden" aria-label="Open menu" aria-expanded={mobile} aria-controls="mobile-menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && menus[open as keyof MenuData] && (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-line bg-ivory text-charcoal shadow-[0_30px_60px_-30px_rgba(21,21,21,.35)] xl:block"
              onMouseEnter={() => enter(open)}
            >
              <MegaPanel data={menus[open as keyof MenuData]} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-charcoal text-ivory xl:hidden"
          >
            <div className="container-x flex h-[72px] shrink-0 items-center justify-between">
              <Link href="/" onClick={() => setMobile(false)}><Logo /></Link>
              <button type="button" onClick={() => setMobile(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25" aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto pb-8 pt-4">
              <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
                {nav.map((item, i) => {
                  const sub = item.menu ? menus[item.menu] : null;
                  const expanded = mobileSection === item.href;
                  return (
                    <motion.li key={item.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.04, duration: 0.5 }}>
                      <div className="flex items-center justify-between">
                        <Link href={item.href} onClick={() => setMobile(false)} className="flex flex-1 items-baseline gap-4 py-4">
                          <span className="ledger text-ivory/60">{String(i + 1).padStart(2, "0")}</span>
                          <span className="font-display text-[2rem] leading-none">{item.label}</span>
                        </Link>
                        {sub && (
                          <button type="button" aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`} aria-expanded={expanded} onClick={() => setMobileSection(expanded ? null : item.href)} className="flex h-11 w-11 items-center justify-center">
                            <Plus className={`h-5 w-5 transition-transform duration-300 ${expanded ? "rotate-45" : ""}`} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {sub && expanded && (
                          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid grid-cols-1 gap-x-6 overflow-hidden pb-4 pl-10 sm:grid-cols-2">
                            {sub.links.map((l) => (
                              <li key={l.href}><Link href={l.href} onClick={() => setMobile(false)} className="block py-2 text-[0.95rem] text-ivory/75 hover:text-ivory">{l.label}</Link></li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>
              <Link href={cta.href} onClick={() => setMobile(false)} className="btn btn-bronze mt-8 w-full">{cta.label} <ArrowRight className="arrow h-4 w-4" /></Link>
              <p className="ledger mt-6 text-ivory/60">Pune · Maharashtra · India</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MegaPanel({ data }: { data: MenuData[keyof MenuData] }) {
  const cols = data.links.length > 10 ? "grid-cols-3" : "grid-cols-2";
  return (
    <div className="container-x grid grid-cols-12 gap-10 py-10">
      <div className="col-span-3">
        <p className="eyebrow mb-4">Explore</p>
        <p className="text-[0.95rem] leading-relaxed text-stone-ink">{data.intro}</p>
      </div>
      <ul className={`col-span-6 grid ${cols} gap-x-8 gap-y-1`}>
        {data.links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex items-baseline gap-3 py-2 text-[0.95rem]">
              {l.meta && <span className="ledger w-6 shrink-0 text-stone-ink">{l.meta}</span>}
              <span className="link-u">{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={data.feature.href} className="group col-span-3 flex flex-col justify-between rounded-sm bg-charcoal p-6 text-ivory">
        <div>
          <p className="ledger text-bronze-soft">Featured</p>
          <p className="mt-3 font-display text-[1.75rem] leading-tight">{data.feature.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-ivory/65">{data.feature.body}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">{data.feature.cta} <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
      </Link>
    </div>
  );
}
