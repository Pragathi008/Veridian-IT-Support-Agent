import { BrandLockup, DarkBullet, Footer, Kicker } from '../../slideShared';

export default function Slide7() {
  return (
    <div className="deck-slide-dark relative h-screen w-screen overflow-hidden px-[6vw] py-[7vh]">
      <div className="flex items-start justify-between"><div><BrandLockup light /><Kicker light>Safety boundaries</Kicker></div><span className="font-mono text-[5.4vw] leading-[.85] tracking-[-.12em] text-accent">07</span></div>
      <div className="mt-[2.7vh] grid grid-cols-[.8fr_1.45fr] gap-[5vw]"><div><h2 className="max-w-[27vw] text-[3.8vw] font-extrabold leading-[1.02] tracking-[-.07em] text-white">Where the agent stays disciplined</h2><p className="mt-[2.5vh] max-w-[23vw] text-[1.6vw] leading-[1.45] text-white/62">When the supplied data stops, the matcher stops too.</p><div className="mt-[4vh] h-[.45vw] w-[7vw] bg-accent" /></div><div className="border-y border-white/15"><DarkBullet index="01">Finance server admin access → no matching supplied policy; route for human review</DarkBullet><DarkBullet index="02">Laptop flickering after 2 years → IT troubleshooting; do not auto-approve replacement</DarkBullet><DarkBullet index="03">Browser extension request → clarify catalog status before routing</DarkBullet><DarkBullet index="04">Vague “it’s not working” request → ask what is affected and what was tried</DarkBullet><DarkBullet index="05">Security guidance links directly to security@veridian-corp.example</DarkBullet></div></div>
      <Footer number="07" label="Safety / human review" dark />
    </div>
  );
}
