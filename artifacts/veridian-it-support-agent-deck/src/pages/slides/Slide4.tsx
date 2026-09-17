import { BrandLockup, Footer, Kicker } from '../../slideShared';

export default function Slide4() {
  return (
    <div className="deck-slide relative h-screen w-screen overflow-hidden px-[6vw] py-[7vh]">
      <div className="flex items-start justify-between"><div><BrandLockup /><Kicker>Decision logic</Kicker></div><span className="number-stamp">04</span></div>
      <div className="mt-[2.8vh] grid grid-cols-[.75fr_1.5fr] gap-[5vw]"><div><h2 className="max-w-[27vw] text-[3.8vw] font-extrabold leading-[1.02] tracking-[-.07em] text-primary">Policy-grounded routing</h2><p className="mt-[2.2vh] max-w-[25vw] text-[1.6vw] leading-[1.45] text-muted">The matcher turns supplied scenarios into short, defensible next steps.</p><div className="mt-[4vh] inline-flex items-center gap-[.8vw] rounded-full bg-accent-soft px-[1.1vw] py-[.8vh] font-mono text-[1vw] uppercase tracking-[.1em] text-primary"><span className="h-[.6vw] w-[.6vw] rounded-full bg-accent" /> Rules first</div></div>
        <div className="content-card rounded-[1.2vw] p-[1.7vw]"><div className="route-row"><span className="route-code">KB-01</span><p className="m-0 text-[1.6vw] leading-[1.25] text-text">Password lock after more than 5 failed attempts → IT manual unlock</p></div><div className="route-row"><span className="route-code">KB-02</span><p className="m-0 text-[1.6vw] leading-[1.25] text-text">Expired VPN credentials → employee renewal</p></div><div className="route-row"><span className="route-code">KB-07</span><p className="m-0 text-[1.6vw] leading-[1.25] text-text">Guest Wi-Fi → front-desk kiosk, no IT ticket</p></div><div className="route-row"><span className="route-code">KB-04</span><p className="m-0 text-[1.6vw] leading-[1.25] text-text">Non-catalog software → IT Security review, 3–5 business days</p></div><div className="route-row"><span className="route-code">KB-09</span><p className="m-0 text-[1.6vw] leading-[1.25] text-text">Phishing or malware → Security immediately, do not forward</p></div><div className="route-row"><span className="route-code">KB-10</span><p className="m-0 text-[1.6vw] leading-[1.25] text-text">Home office monitor → manager sign-off, Finance, then IT shipping</p></div></div>
      </div>
      <Footer number="04" label="Rules / routing" />
    </div>
  );
}
