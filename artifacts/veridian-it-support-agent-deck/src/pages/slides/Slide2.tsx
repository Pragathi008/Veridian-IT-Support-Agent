import { BrandLockup, Bullet, Footer, Kicker } from '../../slideShared';

export default function Slide2() {
  return (
    <div className="deck-slide relative h-screen w-screen overflow-hidden px-[6vw] py-[7vh]">
      <div className="flex items-start justify-between"><div><BrandLockup /><Kicker>The assignment</Kicker></div><span className="number-stamp">02</span></div>
      <div className="mt-[3vh] grid grid-cols-[.8fr_1.55fr] gap-[5vw]">
        <div><h2 className="max-w-[25vw] text-[4vw] font-extrabold leading-[1.02] tracking-[-.07em] text-primary">Support that stays inside the evidence.</h2><p className="mt-[2.5vh] max-w-[24vw] text-[1.6vw] leading-[1.45] text-muted">The brief is deliberately constrained: the supplied policy set is the boundary of every answer.</p><div className="mt-[4vh] h-[.45vw] w-[7vw] bg-accent" /></div>
        <div className="content-card rounded-[1.2vw] p-[1vw]"><Bullet index="01">Help employees resolve common IT issues quickly</Bullet><Bullet index="02">Match every answer to the supplied Veridian policy set</Bullet><Bullet index="03">Route sensitive or incomplete requests to the right human destination</Bullet><Bullet index="04">Never invent approvals, SLAs, employees, tickets, or policy requirements</Bullet></div>
      </div>
      <Footer number="02" label="Scope / guardrails" />
    </div>
  );
}
