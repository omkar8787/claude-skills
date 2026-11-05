"use client";
import { useEffect, useState } from "react";
export function RefLine() {
  const [ref, setRef] = useState<string | null>(null);
  useEffect(() => { setRef(new URLSearchParams(window.location.search).get("ref")); }, []);
  if (!ref) return null;
  return <p className="ledger mt-6 text-bronze-soft">Reference · {ref}. Keep it for future correspondence.</p>;
}
