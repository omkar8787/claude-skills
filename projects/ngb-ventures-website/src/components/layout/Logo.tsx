export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="20" cy="20" rx="7.5" ry="18.5" fill="none" stroke="currentColor" strokeWidth="0.9" />
      <path d="M1.5 20h37" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="20" cy="20" r="2.4" className="fill-bronze" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.6rem] tracking-[-0.01em]">NGB<span className="sr-only"> </span></span>
        <span className="font-mono text-[0.58rem] tracking-[0.32em] uppercase opacity-70 mt-0.5">Ventures</span>
      </span>
    </span>
  );
}
