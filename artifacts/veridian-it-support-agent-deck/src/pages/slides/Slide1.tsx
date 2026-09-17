import { BrandLockup, Kicker } from '../../slideShared';

const base = import.meta.env.BASE_URL;

export default function Slide1() {
  return (
    <div className="deck-slide-dark relative h-screen w-screen overflow-hidden">
      <img src={base + 'hero-control-room.jpg'} alt="Dark enterprise IT support control room" crossOrigin="anonymous" className="absolute inset-0 h-full w-full object-cover opacity-80" />
      <div className="hero-overlay absolute inset-0" />
      <div className="absolute right-[6vw] top-[7vh] h-[20vw] w-[20vw] rounded-full border border-accent/25" />
      <div className="absolute right-[11vw] top-[12vh] h-[10vw] w-[10vw] rounded-full border border-accent/15" />
      <div className="relative flex h-full flex-col justify-between px-[6vw] py-[7vh]">
        <BrandLockup light />
        <div className="max-w-[63vw] pb-[6vh]">
          <Kicker light>Internal support operations / project walkthrough</Kicker>
          <h1 className="mt-[2.2vh] max-w-[62vw] text-[5.7vw] font-extrabold leading-[.98] tracking-[-.075em] text-white">Veridian Internal IT Support Agent</h1>
          <p className="mt-[3vh] max-w-[45vw] text-[1.8vw] leading-[1.35] text-white/72">AI-assisted internal IT support and request routing<br />A functional MVP for policy-grounded employee support</p>
          <div className="mt-[5vh] flex items-center gap-[1.2vw] text-[1.05vw] font-bold uppercase tracking-[.15em] text-accent"><span className="h-[.65vw] w-[.65vw] rounded-full bg-accent" /> Submission-ready prototype</div>
        </div>
        <div className="flex items-center justify-between font-mono text-[1vw] uppercase tracking-[.1em] text-white/45"><span>VERIDIAN / IT CONTROL ROOM</span><span>01 / 08</span></div>
      </div>
    </div>
  );
}
