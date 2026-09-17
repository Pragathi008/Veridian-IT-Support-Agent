import { BrandLockup, Footer, Kicker } from '../../slideShared';

export default function Slide3() {
  return (
    <div className="deck-slide relative h-screen w-screen overflow-hidden px-[6vw] py-[7vh]">
      <div className="flex items-start justify-between"><div><BrandLockup /><Kicker>Product surface</Kicker></div><span className="number-stamp">03</span></div>
      <div className="mt-[2.4vh] flex items-end justify-between"><h2 className="max-w-[54vw] text-[3.6vw] font-extrabold leading-[1.02] tracking-[-.07em] text-primary">One workspace for the full support surface</h2><p className="max-w-[22vw] text-right text-[1.3vw] leading-[1.35] text-muted">Six views, one policy boundary, one auditable route.</p></div>
      <div className="mt-[4vh] grid grid-cols-3 gap-[1.2vw]">
        <div className="content-card rounded-[1.1vw] p-[1.5vw]"><p className="panel-label text-accent">01 / Overview</p><h3 className="mt-[2vh] text-[1.75vw] font-extrabold text-primary">Dashboard</h3><p className="mt-[1.3vh] text-[1.55vw] leading-[1.35] text-muted">Counts, recent requests, and policy coverage</p></div>
        <div className="content-card rounded-[1.1vw] p-[1.5vw]"><p className="panel-label text-accent">02 / Conversation</p><h3 className="mt-[2vh] text-[1.75vw] font-extrabold text-primary">AI Support</h3><p className="mt-[1.3vh] text-[1.55vw] leading-[1.35] text-muted">Working chat with concise decisions</p></div>
        <div className="content-card rounded-[1.1vw] p-[1.5vw]"><p className="panel-label text-accent">03 / Intake</p><h3 className="mt-[2vh] text-[1.75vw] font-extrabold text-primary">Employee Requests</h3><p className="mt-[1.3vh] text-[1.55vw] leading-[1.35] text-muted">Searchable request intake and detail views</p></div>
        <div className="content-card rounded-[1.1vw] p-[1.5vw]"><p className="panel-label text-accent">04 / Fulfillment</p><h3 className="mt-[2vh] text-[1.75vw] font-extrabold text-primary">Ticket Queue</h3><p className="mt-[1.3vh] text-[1.55vw] leading-[1.35] text-muted">Active and closed operational context</p></div>
        <div className="content-card rounded-[1.1vw] p-[1.5vw]"><p className="panel-label text-accent">05 / Authority</p><h3 className="mt-[2vh] text-[1.75vw] font-extrabold text-primary">Knowledge Base</h3><p className="mt-[1.3vh] text-[1.55vw] leading-[1.35] text-muted">KB-01 through KB-10 plus Asset Management Policy</p></div>
        <div className="rounded-[1.1vw] bg-primary p-[1.5vw] text-white shadow-[0_1.6vh_3vw_rgba(20,43,87,.16)]"><p className="panel-label text-accent">06 / Audit</p><h3 className="mt-[2vh] text-[1.75vw] font-extrabold">Decision Log</h3><p className="mt-[1.3vh] text-[1.55vw] leading-[1.35] text-white/68">Concise, browser-persisted audit trail</p></div>
      </div>
      <Footer number="03" label="Workspace / navigation" />
    </div>
  );
}
