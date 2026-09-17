import type { ReactNode } from 'react';

export function BrandLockup({ light = false }: { light?: boolean }) {
  return (
    <div className="brand-lockup" style={{ color: light ? '#f6f9fb' : 'var(--slide-primary)' }}>
      <span className="brand-mark">V</span>
      <span>veridian</span>
    </div>
  );
}

export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={light ? 'eyebrow eyebrow-light' : 'eyebrow'}>{children}</p>;
}

export function Footer({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return <div className={dark ? 'slide-footer slide-footer-dark' : 'slide-footer'}><span>{label}</span><span>{number} / 08</span></div>;
}

export function Bullet({ index, children }: { index: string; children: ReactNode }) {
  return <div className="bullet-row"><span className="bullet-index">{index}</span><p className="m-0 text-[1.8vw] leading-[1.28] text-text">{children}</p></div>;
}

export function DarkBullet({ index, children }: { index: string; children: ReactNode }) {
  return <div className="flex items-start gap-[1.2vw] border-t border-white/15 py-[1.55vh] first:border-t-0"><span className="grid h-[2.5vw] w-[2.5vw] shrink-0 place-items-center rounded-[.7vw] bg-accent/15 font-mono text-[1.05vw] text-accent">{index}</span><p className="m-0 text-[1.75vw] leading-[1.3] text-white/85">{children}</p></div>;
}