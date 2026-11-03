"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import type { AtlasExplorer as AtlasT } from "./AtlasExplorer";

const Atlas = dynamic(() => import("./AtlasExplorer").then((m) => m.AtlasExplorer), { ssr: false, loading: () => <AtlasSkeleton /> });

function AtlasSkeleton() {
  return <div className="grid min-h-[38rem] grid-cols-1 gap-10 lg:grid-cols-12" aria-hidden><div className="aspect-[612/696] w-full max-w-[620px] animate-pulse rounded-sm bg-ivory/5 lg:col-span-6" /><div className="space-y-4 lg:col-span-6"><div className="h-10 w-2/3 bg-ivory/5" /><div className="h-4 w-full bg-ivory/5" /><div className="h-4 w-5/6 bg-ivory/5" /></div></div>;
}

/** Loads the Atlas (geometry + interactivity) only when it approaches the viewport, keeping the homepage's initial JS light. */
export function AtlasLazy(props: ComponentProps<typeof AtlasT>) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref}>{show ? <Atlas {...props} /> : <AtlasSkeleton />}</div>;
}
