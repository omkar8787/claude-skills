import Link from "next/link";
import type { ReactNode } from "react";

/** Renders a safe subset of inline Markdown: **bold**, *italic* and [text](href). Everything else is plain text. */
export function inlineMd(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0; let m: RegExpExecArray | null; let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={k++} className="font-semibold text-charcoal">{m[1]}</strong>);
    else if (m[2]) out.push(<em key={k++}>{m[2]}</em>);
    else if (m[3]) {
      const href = m[4];
      if (href.startsWith("/")) out.push(<Link key={k++} href={href} className="underline decoration-bronze/60 underline-offset-4 hover:decoration-bronze">{m[3]}</Link>);
      else if (/^https:\/\//.test(href)) out.push(<a key={k++} href={href} target="_blank" rel="noopener" className="underline decoration-bronze/60 underline-offset-4 hover:decoration-bronze">{m[3]}</a>);
      else out.push(m[3]);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
