import { BrandLockup, DarkBullet, Footer, Kicker } from '../../slideShared';

export default function Slide5() {
  return (
    <div className="deck-slide-dark relative h-screen w-screen overflow-hidden px-[6vw] py-[7vh]">
      <div className="flex items-start justify-between"><div><BrandLockup light /><Kicker light>AI Support / response contract</Kicker></div><span className="font-mono text-[5.4vw] leading-[.85] tracking-[-.12em] text-accent">05</span></div>
      <div className="mt-[2.6vh] grid grid-cols-[.85fr_1.35fr] gap-[5vw]"><div><h2 className="max-w-[28vw] text-[3.7vw] font-extrabold leading-[1.02] tracking-[-.07em] text-white">A concise decision, not chain-of-thought</h2><p className="mt-[2.4vh] max-w-[24vw] text-[1.6vw] leading-[1.45] text-white/62">The experience exposes the business decision and keeps internal reasoning out of the product.</p></div><div className="border-y border-white/15"><DarkBullet index="01">Understand the employee’s issue</DarkBullet><DarkBullet index="02">Match it to a supplied KB policy</DarkBullet><DarkBullet index="03">State the decision: Resolved, Requires IT, Security, Finance, manager approval, or clarification</DarkBullet><DarkBullet index="04">Explain the business action briefly</DarkBullet><DarkBullet index="05">Show the relevant KB ID and routing destination</DarkBullet><DarkBullet index="06">Store only the business decision in the audit log</DarkBullet></div></div>
      <Footer number="05" label="AI Support / response contract" dark />
    </div>
  );
}
