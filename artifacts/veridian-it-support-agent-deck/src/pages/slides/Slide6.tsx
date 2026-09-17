import { BrandLockup, Footer, Kicker } from '../../slideShared';

export default function Slide6() {
  return (
    <div className="deck-slide relative h-screen w-screen overflow-hidden px-[6vw] py-[7vh]">
      <div className="flex items-start justify-between"><div><BrandLockup /><Kicker>Supplied data</Kicker></div><span className="number-stamp">06</span></div>
      <div className="mt-[2.6vh] flex items-end justify-between"><h2 className="max-w-[52vw] text-[3.8vw] font-extrabold leading-[1.02] tracking-[-.07em] text-primary">The supplied operating picture</h2><p className="max-w-[20vw] text-right text-[1.5vw] leading-[1.35] text-muted">No fake company statistics. Only the assignment data is in scope.</p></div>
      <div className="mt-[4.6vh] grid grid-cols-4 gap-[1.2vw]"><div className="stat-card rounded-[1.1vw]"><p className="panel-label text-muted">Employee requests</p><p className="stat-number mt-[4vh]">15</p></div><div className="stat-card rounded-[1.1vw]"><p className="panel-label text-muted">Tickets</p><p className="stat-number mt-[4vh]">10</p><p className="mt-[1vh] text-[1.5vw] text-muted">4 active / 6 closed</p></div><div className="stat-card rounded-[1.1vw]"><p className="panel-label text-muted">Policy sources</p><p className="stat-number mt-[4vh]">11</p><p className="mt-[1vh] text-[1.5vw] text-muted">10 KB articles + Asset Management Policy</p></div><div className="stat-card rounded-[1.1vw]"><p className="panel-label text-muted">Security escalations</p><p className="stat-number mt-[4vh]">02</p><p className="mt-[1vh] text-[1.5vw] text-muted">REQ-08 and TK-1048</p></div></div>
      <div className="mt-[4vh] flex items-center gap-[1.2vw] border-t border-slide-line pt-[2vh] text-[1.35vw] font-semibold text-primary"><span className="grid h-[2.5vw] w-[2.5vw] place-items-center rounded-[.7vw] bg-accent-soft font-mono text-[1vw] text-primary">→</span>Requests and tickets remain searchable, filterable, and inspectable</div>
      <Footer number="06" label="Data / supplied operating picture" />
    </div>
  );
}
