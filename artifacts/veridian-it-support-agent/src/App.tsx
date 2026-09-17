import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  ExternalLink,
  FileText,
  Filter,
  LayoutDashboard,
  LifeBuoy,
  ListFilter,
  Menu,
  MessageSquareText,
  PanelLeftClose,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Ticket,
  UserRound,
  X,
  Zap,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

type Status = string;
type RequestItem = { id: string; name: string; text: string; status: Status };
type TicketItem = { id: string; name: string; text: string; status: Status; active: boolean };
type Decision = { relevantKB: string; decision: string; action: string; routing?: string; tone: 'resolved' | 'review' | 'security' | 'clarify' };
type LogEntry = Decision & { timestamp: string; question: string };

const requests: RequestItem[] = [
  { id: 'REQ-01', name: 'Aditi Sharma', text: "My laptop won't turn on at all, it's completely dead, had it about 3.5 years now.", status: 'Not started' },
  { id: 'REQ-02', name: 'Vikram Chawla', text: 'Can I get Wi-Fi access for a guest visiting our office tomorrow?', status: 'Not started' },
  { id: 'REQ-03', name: 'Karan Mehta', text: "I'm locked out of my account, tried my password 6 times.", status: 'In progress — reset queued' },
  { id: 'REQ-04', name: 'Ritu Bhatia', text: "Need approval to install a data-analysis tool that's not in the software catalog.", status: 'Waiting on Security review' },
  { id: 'REQ-05', name: 'Sanjay Oberoi', text: 'My VPN stopped working this morning, says credentials expired.', status: 'Not started' },
  { id: 'REQ-06', name: 'Meera Iyer', text: "Printer on the 3rd floor keeps showing 'paper jam' even though there's no jam.", status: 'Investigating — technician assigned' },
  { id: 'REQ-07', name: 'Farhan Ali', text: "I've started working from home 4 days a week, how do I get a monitor?", status: 'Not started' },
  { id: 'REQ-08', name: 'Ananya Reddy', text: "I think I got a phishing email asking for my login — forwarding it to a few teammates to check.", status: 'Escalated to Security (auto-flagged)' },
  { id: 'REQ-09', name: 'Rohit Desai', text: "My mailbox is full and I can't send emails.", status: 'Not started' },
  { id: 'REQ-10', name: 'Kavya Pillai', text: 'Can someone give me admin access to the finance reporting server? Need it urgently for month-end.', status: 'Not started' },
  { id: 'REQ-11', name: 'Nikhil Bansal', text: "New contractor joining my team next week, they'll need VPN access.", status: 'Not started' },
  { id: 'REQ-12', name: 'Sneha Kulkarni', text: "I can't log into the expense tool, keeps saying invalid credentials.", status: 'Waiting on employee response' },
  { id: 'REQ-13', name: 'Aman Gupta', text: 'Laptop screen is flickering on and off, had it 2 years, might just need a fix not a replacement.', status: 'Not started' },
  { id: 'REQ-14', name: 'Tanya Chopra', text: 'Requesting approval to install a browser extension for productivity tracking.', status: 'Not started' },
  { id: 'REQ-15', name: 'Rahul Menon', text: 'hey can you help, its not working', status: 'Not started' },
];

const tickets: TicketItem[] = [
  { id: 'TK-1042', name: 'R. Verma', text: 'VPN credential expired', status: 'Resolved (closed)', active: false },
  { id: 'TK-1043', name: 'S. Iyer', text: 'Laptop replacement (3.2 yrs old)', status: 'Approved — pending fulfillment', active: true },
  { id: 'TK-1044', name: 'A. Khan', text: 'Non-catalog software request', status: 'Pending Security review', active: true },
  { id: 'TK-1045', name: 'P. Joshi', text: 'Mailbox quota increase', status: 'Approved at 35GB', active: false },
  { id: 'TK-1046', name: 'M. Das', text: 'Printer paper jam, floor 2', status: 'Resolved (closed)', active: false },
  { id: 'TK-1047', name: 'K. Singh', text: 'Home office equipment request', status: 'Pending Finance', active: true },
  { id: 'TK-1048', name: 'T. Rao', text: 'Phishing email reported', status: 'Escalated to Security — under investigation', active: true },
  { id: 'TK-1049', name: 'J. Fernandes', text: 'Password reset', status: 'Resolved (closed)', active: false },
  { id: 'TK-1050', name: 'J. Fernandes', text: 'Admin access request', status: 'Rejected — no business justification provided', active: false },
  { id: 'TK-1051', name: 'L. Menon', text: 'Guest Wi-Fi issued', status: 'Resolved (closed)', active: false },
];

type KBArticle = readonly [string, string, string];
const kbArticles: KBArticle[] = [
  ['KB-01', 'Password Reset', 'Self-service reset. After 5 failed attempts, contact IT for manual unlock. No approval.'],
  ['KB-02', 'VPN Access', 'Automatic for full-time employees. Contractors need manager approval via access request form. Credentials expire every 90 days and employee renews.'],
  ['KB-03', 'Laptop Replacement', 'Eligible after 3 years or earlier verified hardware failure. Raise at least 2 weeks before intended replacement.'],
  ['KB-04', 'Software Installation', 'Approved catalog self-install. Non-catalog requires IT Security review, typically 3–5 business days.'],
  ['KB-05', 'Printer Troubleshooting', 'Check queue and restart print spooler. If it persists, log a ticket with the asset tag.'],
  ['KB-06', 'Email Mailbox Quota', '25GB default. Archive old mail. Over 25GB requires manager approval and is capped at 50GB.'],
  ['KB-07', 'Guest Wi-Fi Access', '24-hour credentials from the front-desk kiosk. No IT ticket.'],
  ['KB-08', 'Expense Software Access', 'Finance grants access. IT helps login or technical issues once the account exists.'],
  ['KB-09', 'Security Incident Reporting', 'Suspected phishing, malware, or unauthorized access: immediately report to security@veridian-corp.example and do not forward.'],
  ['KB-10', 'Work-From-Home Equipment', 'Remote more than 3 days/week qualifies for a one-time chair/monitor allowance. Manager sign-off and Finance processing; IT ships after approval.'],
  ['POL-01', 'Asset Management Policy', 'Company hardware standard is a 4-year refresh. Early replacement outside cycle requires Finance sign-off plus IT approval.'],
] as const;

function decide(question: string): Decision {
  const q = question.toLowerCase();
  if (/(phish|malware|unauthorized access|suspicious email)/.test(q)) return { relevantKB: 'KB-09', decision: 'Requires Security', action: 'Immediately email security@veridian-corp.example. Do not forward the message further.', routing: 'Security', tone: 'security' };
  if (/locked|failed attempts|password 6|password.*tries|account/.test(q) && /6|locked|reset/.test(q)) return { relevantKB: 'KB-01', decision: 'Requires IT', action: 'Use self-service reset. After more than 5 failed attempts, route to IT for a manual unlock.', routing: 'IT Service Desk', tone: 'review' };
  if (/guest.*wi-?fi|wi-?fi.*guest/.test(q)) return { relevantKB: 'KB-07', decision: 'Resolved', action: 'Get 24-hour guest credentials from the front-desk kiosk. No IT ticket is needed.', tone: 'resolved' };
  if (/vpn/.test(q) && /(contractor|contract)/.test(q)) return { relevantKB: 'KB-02', decision: 'Requires manager approval', action: 'Submit the access request form for manager approval. Credentials renew every 90 days.', routing: 'Manager → Access Request', tone: 'review' };
  if (/vpn/.test(q) && /(expired|renew|stopped working)/.test(q)) return { relevantKB: 'KB-02', decision: 'Resolved', action: 'Renew the expired credentials. Full-time access is automatic; credentials renew every 90 days.', tone: 'resolved' };
  if (/monitor|chair|home|remote|working from home/.test(q) && /3|4|remote|home/.test(q)) return { relevantKB: 'KB-10', decision: 'Requires manager approval', action: 'Manager sign-off comes first, then Finance processes the one-time allowance. IT ships after approval.', routing: 'Manager → Finance → IT', tone: 'review' };
  if (/mailbox|email.*full|can't send|cannot send/.test(q)) return { relevantKB: 'KB-06', decision: 'Resolved for archiving', action: 'Archive old mail to recover space. Any increase above 25GB requires manager approval and is capped at 50GB.', routing: 'Manager for quota increase', tone: 'resolved' };
  if (/standard software|approved catalog/.test(q)) return { relevantKB: 'KB-04', decision: 'Resolved', action: 'Install it from the approved software catalog without separate approval.', tone: 'resolved' };
  if (/non-catalog|not in.*catalog|data-analysis|extension|browser/.test(q)) {
    if (/extension|browser/.test(q)) return { relevantKB: 'KB-04', decision: 'Requires clarification', action: 'Confirm whether the extension is in the approved catalog. Non-catalog software requires IT Security review.', routing: 'Employee → IT Security if non-catalog', tone: 'clarify' };
    return { relevantKB: 'KB-04', decision: 'Requires Security', action: 'Submit for IT Security review. Allow 3–5 business days for a non-catalog installation.', routing: 'IT Security', tone: 'review' };
  }
  if (/printer|paper jam|spooler|print/.test(q)) return { relevantKB: 'KB-05', decision: 'Requires IT', action: 'Check the print queue and restart the print spooler. If it persists, log a ticket with the asset tag.', routing: 'IT Service Desk', tone: 'review' };
  if (/laptop|screen|flicker|hardware/.test(q)) return { relevantKB: 'KB-03 + POL-01', decision: 'Requires IT', action: /dead|won't turn on|completely/.test(q) ? 'Route to IT for verified hardware-failure handling. The 4-year standard and any early-replacement approval still need review.' : 'Route to IT for human troubleshooting. Do not auto-approve a replacement.', routing: 'IT Service Desk', tone: 'review' };
  if (/expense/.test(q) && /login|credential|access/.test(q)) return { relevantKB: 'KB-08', decision: 'Requires Finance', action: 'Finance owns access. IT can help with technical login issues once the account exists; account existence is not assumed.', routing: 'Finance → IT for technical login', tone: 'review' };
  if (/admin access|finance reporting|server/.test(q)) return { relevantKB: 'No matching policy', decision: 'Requires clarification', action: 'Ask for the system owner and business context before routing. No access requirement is invented.', routing: 'Human review', tone: 'clarify' };
  if (/not working|help/.test(q)) return { relevantKB: 'No matching policy', decision: 'Requires clarification', action: 'Ask what is not working, which device or service is affected, and what has already been tried.', routing: 'Employee follow-up', tone: 'clarify' };
  if (/software|install/.test(q)) return { relevantKB: 'KB-04', decision: 'Requires clarification', action: 'Confirm whether the software is in the approved catalog. Catalog software is self-installable; non-catalog software requires IT Security review.', routing: 'Employee → IT Security if non-catalog', tone: 'clarify' };
  return { relevantKB: 'No matching policy', decision: 'Requires clarification', action: 'Ask for the affected service, device, error, and any steps already attempted.', routing: 'Human review', tone: 'clarify' };
}

function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'good' | 'warn' | 'danger' | 'accent' }) {
  const colors = { neutral: 'bg-muted text-muted-foreground', good: 'bg-emerald-50 text-emerald-700 border-emerald-200', warn: 'bg-amber-50 text-amber-800 border-amber-200', danger: 'bg-red-50 text-red-700 border-red-200', accent: 'bg-secondary text-secondary-foreground border-teal-200' };
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold leading-none ${colors[tone]}`}>{children}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const lower = status.toLowerCase();
  const tone = lower.includes('security') || lower.includes('rejected') ? 'danger' : lower.includes('pending') || lower.includes('waiting') || lower.includes('progress') || lower.includes('investigating') ? 'warn' : lower.includes('resolved') || lower.includes('approved') ? 'good' : 'neutral';
  return <Badge tone={tone}>{status}</Badge>;
}

function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/ai-support', label: 'AI Support', icon: MessageSquareText },
    { href: '/employee-requests', label: 'Employee Requests', icon: ClipboardList, count: '15' },
    { href: '/ticket-queue', label: 'Ticket Queue', icon: Ticket, count: '10' },
    { href: '/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
    { href: '/decision-log', label: 'Decision Log', icon: Activity },
  ];
  return <div className="app-noise min-h-[100dvh] bg-background text-foreground">
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex h-[82px] items-center justify-between border-b border-sidebar-border px-6">
        <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3" data-testid="link-brand">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-teal-950/20"><ShieldCheck size={20} /></span>
          <span><strong className="block text-sm tracking-tight text-white">veridian</strong><span className="section-kicker !text-[9px] !text-slate-400">IT CONTROL ROOM</span></span>
        </Link>
        <button className="rounded-md p-1 text-slate-400 hover:bg-sidebar-accent hover:text-white lg:hidden" onClick={() => setMobileOpen(false)} data-testid="button-close-sidebar"><PanelLeftClose size={18} /></button>
      </div>
      <div className="px-4 pt-7">
        <p className="section-kicker mb-3 px-3 !text-slate-500">Workspace</p>
        <nav className="space-y-1">
          {nav.map(item => {
            const active = location === item.href || (item.href !== '/' && location.startsWith(item.href));
            const Icon = item.icon;
            return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all ${active ? 'bg-sidebar-accent text-white shadow-inner' : 'text-slate-400 hover:bg-sidebar-accent/70 hover:text-white'}`}>
              <span className="flex items-center gap-3"><Icon size={17} className={active ? 'text-sidebar-primary' : 'text-slate-500 group-hover:text-slate-300'} />{item.label}</span>
              {item.count && <span className={`mono text-[10px] ${active ? 'text-sidebar-primary' : 'text-slate-600'}`}>{item.count}</span>}
            </Link>;
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent/70 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold text-white"><span className="h-2 w-2 rounded-full bg-sidebar-primary shadow-[0_0_0_4px_hsl(var(--sidebar-primary)/.14)]" />Policy engine online</div>
          <p className="text-[11px] leading-relaxed text-slate-400">Answers are grounded in the supplied Veridian policy set. Sensitive requests are routed, not guessed.</p>
          <div className="mt-4 flex items-center justify-between border-t border-sidebar-border pt-3 text-[10px] text-slate-500"><span>Policy set</span><span className="mono text-slate-300">v1.0 · 11 sources</span></div>
        </div>
      </div>
    </aside>
    {mobileOpen && <button className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation" data-testid="button-overlay" />}
    <main className="min-h-[100dvh] lg:pl-[252px]">
      <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-border bg-background/90 px-5 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3"><button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden" onClick={() => setMobileOpen(true)} data-testid="button-open-sidebar"><Menu size={20} /></button><div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Internal workspace <ChevronRight size={13} /> <span className="text-foreground">{nav.find(n => n.href === location)?.label ?? 'Support'}</span></div></div>
        <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground md:flex"><Search size={14} /><span>Quick find</span><kbd className="ml-4 rounded border border-border px-1.5 py-0.5 mono text-[9px]">/</kbd></div><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">IT</div></div>
      </header>
      <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10">{children}</div>
    </main>
  </div>;
}

function PageHeading({ kicker, title, description, action }: { kicker: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-kicker mb-2">{kicker}</p><h1 className="text-[clamp(1.7rem,3vw,2.55rem)] font-extrabold tracking-[-.045em] text-primary">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>}</div>{action}</div>;
}

function MetricCard({ label, value, detail, icon: Icon, tone = 'teal' }: { label: string; value: string; detail: string; icon: typeof Activity; tone?: 'teal' | 'amber' | 'red' | 'navy' }) {
  const color = { teal: 'bg-secondary text-secondary-foreground', amber: 'bg-amber-50 text-amber-800', red: 'bg-red-50 text-red-700', navy: 'bg-primary text-primary-foreground' }[tone];
  return <div className="soft-card rounded-2xl border border-card-border bg-card p-5 transition-transform duration-200 hover:-translate-y-0.5">
    <div className="flex items-start justify-between"><span className={`grid h-9 w-9 place-items-center rounded-xl ${color}`}><Icon size={17} /></span><span className="section-kicker !text-[9px]">LIVE</span></div>
    <p className="mt-5 text-3xl font-extrabold tracking-[-.05em] text-primary">{value}</p><p className="mt-1 text-sm font-bold text-foreground">{label}</p><p className="mt-2 text-xs text-muted-foreground">{detail}</p>
  </div>;
}

function Dashboard() {
  const [location, setLocation] = useLocation();
  const recent = requests.slice(0, 5);
  return <div className="page-enter">
     <PageHeading kicker="Operations / overview" title="Veridian Internal IT Support Agent" description="AI-assisted internal IT support and request routing. Good morning — route what needs a person; resolve the repeatable safely." action={<Link href="/ai-support" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:bg-primary/90" data-testid="link-open-ai-support"><MessageSquareText size={16} /> Open AI Support <ArrowRight size={15} /></Link>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Employee requests" value="15" detail="All supplied requests in scope" icon={ClipboardList} tone="navy" />
       <MetricCard label="Active tickets" value="4" detail="6 closed tickets remain visible" icon={Ticket} tone="teal" />
      <MetricCard label="Security escalations" value="2" detail="REQ-08 and TK-1048" icon={ShieldAlert} tone="red" />
       <MetricCard label="Human review / routing" value="12" detail="Transparent count from deterministic matching" icon={UserRound} tone="amber" />
    </div>
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
      <section className="soft-card rounded-2xl border border-card-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="section-kicker">Queue pulse</p><h2 className="mt-1 text-base font-extrabold text-primary">Recent employee requests</h2></div><Link href="/employee-requests" className="flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary-foreground" data-testid="link-view-all-requests">View all <ArrowRight size={14} /></Link></div>
        <div className="divide-y divide-border">{recent.map((item, i) => <button key={item.id} onClick={() => setLocation(`/employee-requests?request=${item.id}`)} className={`data-row flex w-full items-start gap-4 px-5 py-4 text-left delay-${i + 1} rise-in`} data-testid={`button-request-${item.id}`}><span className="mono mt-0.5 w-14 shrink-0 text-[10px] text-muted-foreground">{item.id}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-foreground">{item.name}</span><span className="mt-1 block line-clamp-1 text-xs text-muted-foreground">{item.text}</span></span><StatusBadge status={item.status} /><ChevronRight size={16} className="mt-1 shrink-0 text-muted-foreground" /></button>)}</div>
      </section>
      <section className="rounded-2xl border border-primary/10 bg-primary p-6 text-primary-foreground shadow-xl shadow-primary/15">
        <div className="flex items-center justify-between"><div className="grid h-9 w-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground"><Zap size={18} /></div><span className="section-kicker !text-slate-400">Policy coverage</span></div>
        <h2 className="mt-7 text-xl font-extrabold tracking-tight">Short answers. Defensible routes.</h2><p className="mt-3 text-sm leading-6 text-slate-300">The support agent uses only the supplied 10 KB articles and Asset Management Policy. It never fabricates approvals or claims steps were completed.</p>
         <div className="mt-7 space-y-4 border-t border-white/10 pt-5"><div className="flex justify-between text-xs"><span className="text-slate-400">Knowledge sources indexed</span><strong>11</strong></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-full rounded-full bg-sidebar-primary" /></div><div className="flex justify-between text-xs"><span className="text-slate-400">Requests with explicit routing</span><strong>12 / 15</strong></div></div>
        <Link href="/knowledge-base" className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-sidebar-primary hover:text-white" data-testid="link-browse-policy">Browse policy sources <ArrowRight size={14} /></Link>
      </section>
    </div>
  </div>;
}

function DecisionCard({ decision }: { decision: Decision }) {
  const tone = decision.tone === 'security' ? 'border-red-200 bg-red-50/60' : decision.tone === 'resolved' ? 'border-emerald-200 bg-emerald-50/60' : decision.tone === 'clarify' ? 'border-amber-200 bg-amber-50/60' : 'border-teal-200 bg-secondary/45';
  const icon = decision.tone === 'security' ? <ShieldAlert size={17} /> : decision.tone === 'resolved' ? <CheckCircle2 size={17} /> : decision.tone === 'clarify' ? <CircleHelp size={17} /> : <LifeBuoy size={17} />;
  return <div className={`rounded-2xl border p-5 ${tone}`} data-testid="card-decision"><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-2 text-sm font-extrabold text-primary">{icon}{decision.decision}</div><Badge tone={decision.tone === 'security' ? 'danger' : decision.tone === 'resolved' ? 'good' : decision.tone === 'clarify' ? 'warn' : 'accent'}>{decision.relevantKB}</Badge></div><p className="mt-4 text-sm leading-6 text-foreground">{decision.action}</p>{decision.routing && <div className="mt-4 flex items-center gap-2 border-t border-current/10 pt-3 text-xs font-bold text-muted-foreground"><ArrowRight size={14} /> Route: <span className="text-primary">{decision.routing}</span></div>}{decision.tone === 'security' && <a href="mailto:security@veridian-corp.example" className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-red-700 underline underline-offset-4" data-testid="link-email-security">Email Security <ExternalLink size={13} /></a>}</div>;
}

function AISupport() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ from: 'user' | 'agent'; text: string; decision?: Decision }[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>(() => { try { return JSON.parse(localStorage.getItem('veridian-decision-log') ?? '[]') as LogEntry[]; } catch { return []; } });
  const suggestions = ['My account is locked', 'My VPN credentials expired', 'I need guest Wi-Fi', 'I need a monitor for working from home', 'I received a phishing email', 'My mailbox is full', 'I need to install software'];
  const submit = (text = question) => {
    const clean = text.trim();
    if (!clean) return;
    const decision = decide(clean);
    const entry = { ...decision, question: clean, timestamp: new Date().toISOString() };
    const nextLogs = [entry, ...logs];
    setLogs(nextLogs); localStorage.setItem('veridian-decision-log', JSON.stringify(nextLogs));
    setMessages(prev => [...prev, { from: 'user', text: clean }, { from: 'agent', text: 'Here is the shortest policy-grounded route I can give you.', decision }]);
    setQuestion('');
  };
  return <div className="page-enter">
    <PageHeading kicker="Policy engine / live" title="AI Support" description="Ask in plain language. Get a concise answer tied to a supplied policy, with routing made explicit." action={<div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Deterministic matcher online</div>} />
    <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
      <section className="soft-card overflow-hidden rounded-2xl border border-card-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="section-kicker">Support conversation</p><h2 className="mt-1 text-base font-extrabold text-primary">What can we route for you?</h2></div><Badge tone="accent"><ShieldCheck size={12} /> Policy grounded</Badge></div>
        <div className="min-h-[340px] space-y-5 p-5 sm:p-7">{messages.length === 0 ? <div className="flex min-h-[280px] flex-col items-center justify-center text-center"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-secondary-foreground"><MessageSquareText size={25} /></div><h3 className="mt-5 text-lg font-extrabold text-primary">A clear next step, not a wall of text.</h3><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Try a suggestion or describe the service, device, or access request in your own words.</p><div className="mt-6 flex flex-wrap justify-center gap-2">{suggestions.map((s, i) => <button key={s} onClick={() => submit(s)} className="rounded-full border border-border bg-background px-3 py-2 text-xs font-bold text-foreground transition hover:border-primary/30 hover:bg-secondary" data-testid={`button-suggestion-${i}`}>{s}</button>)}</div></div> : messages.map((m, i) => <div key={`${m.text}-${i}`} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[88%] ${m.from === 'user' ? 'rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm text-primary-foreground' : 'w-full'}`}><p className={m.from === 'user' ? '' : 'mb-3 text-xs text-muted-foreground'}>{m.text}</p>{m.decision && <DecisionCard decision={m.decision} />}</div></div>)}</div>
        <form onSubmit={e => { e.preventDefault(); submit(); }} className="border-t border-border bg-muted/45 p-4 sm:p-5"><div className="flex items-end gap-3 rounded-xl border border-input bg-card p-2 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10"><textarea value={question} onChange={e => setQuestion(e.target.value)} rows={2} placeholder="Describe what you need help with..." className="min-h-[48px] flex-1 resize-none border-0 bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground" data-testid="textarea-support-question" /><button type="submit" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40" disabled={!question.trim()} data-testid="button-submit-question"><Send size={16} /></button></div><p className="mt-2 px-1 text-[10px] text-muted-foreground">No chain-of-thought is stored. The decision log keeps only the question, policy, decision, action, and route.</p></form>
      </section>
      <aside className="space-y-4"><div className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="flex items-center gap-2 text-sm font-extrabold text-amber-900"><ShieldAlert size={17} /> Sensitive request handling</div><p className="mt-3 text-xs leading-5 text-amber-800">Security signals are routed immediately. The agent will never ask you to forward a suspicious message or invent an approval.</p></div><div className="rounded-2xl border border-card-border bg-card p-5"><p className="section-kicker">Common routes</p><div className="mt-4 space-y-3">{[['Resolved', 'Guest Wi-Fi · VPN renewal'], ['IT review', 'Hardware · printer · unlock'], ['Security', 'Phishing · non-catalog software'], ['Clarify', 'Unknown service or access']].map(([a, b]) => <div key={a} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"><span className="text-xs font-bold text-foreground">{a}</span><span className="text-right text-[11px] text-muted-foreground">{b}</span></div>)}</div></div></aside>
    </div>
  </div>;
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <div className="flex items-center gap-3 rounded-xl border border-input bg-card px-3.5 py-2.5 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10"><Search size={16} className="text-muted-foreground" /><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" data-testid="input-search" /></div>;
}

function RequestsPage() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState(''); const [filter, setFilter] = useState('All'); const [selected, setSelected] = useState<RequestItem | null>(null);
  const filtered = useMemo(() => requests.filter(r => `${r.id} ${r.name} ${r.text} ${r.status}`.toLowerCase().includes(search.toLowerCase()) && (filter === 'All' || r.status.toLowerCase().includes(filter.toLowerCase()))), [search, filter]);
  return <div className="page-enter"><PageHeading kicker="Intake / employee-facing" title="Employee Requests" description="The supplied request set, searchable and ready for a policy-grounded review." action={<Link href="/ai-support" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold text-primary hover:border-primary/30 hover:bg-secondary" data-testid="link-request-support"><MessageSquareText size={16} /> Ask Support</Link>} />
    <div className="mb-5 flex flex-col gap-3 sm:flex-row"><div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search request ID, employee, or text" /></div><label className="flex items-center gap-2 rounded-xl border border-input bg-card px-3.5 text-sm"><Filter size={15} className="text-muted-foreground" /><select value={filter} onChange={e => setFilter(e.target.value)} className="bg-transparent py-2.5 font-bold outline-none" data-testid="select-request-filter"><option>All</option><option>Not started</option><option>Waiting</option><option>In progress</option><option>Escalated</option></select></label></div>
    <div className="grid gap-6 xl:grid-cols-[1fr_390px]"><section className="soft-card overflow-hidden rounded-2xl border border-card-border bg-card"><div className="flex items-center justify-between border-b border-border px-5 py-4"><span className="text-sm font-extrabold text-primary">{filtered.length} matching requests</span><span className="mono text-[10px] text-muted-foreground">SOURCE · SUPPLIED DATA</span></div><div className="divide-y divide-border">{filtered.map(item => <button key={item.id} onClick={() => { setSelected(item); setLocation(`/employee-requests?request=${item.id}`); }} className={`data-row flex w-full items-start gap-3 px-5 py-4 text-left ${selected?.id === item.id ? 'bg-secondary/50' : ''}`} data-testid={`row-request-${item.id}`}><span className="mono w-[58px] shrink-0 pt-0.5 text-[10px] font-bold text-muted-foreground">{item.id}</span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-foreground">{item.name}</span><span className="mt-1 block line-clamp-2 text-xs leading-5 text-muted-foreground">{item.text}</span></span><StatusBadge status={item.status} /><ChevronRight size={15} className="mt-1 shrink-0 text-muted-foreground" /></button>)}</div>{filtered.length === 0 && <div className="p-12 text-center text-sm text-muted-foreground">No requests match that search.</div>}</section><RequestDetail item={selected} onClose={() => setSelected(null)} /></div>
  </div>;
}

function RequestDetail({ item, onClose }: { item: RequestItem | null; onClose: () => void }) {
  if (!item) return <div className="hidden rounded-2xl border border-dashed border-border bg-card/50 p-8 xl:block"><div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center"><span className="grid h-12 w-12 place-items-center rounded-xl bg-muted text-muted-foreground"><ClipboardList size={21} /></span><h3 className="mt-4 text-sm font-extrabold text-primary">Select a request</h3><p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">Open a row to inspect its supplied text and deterministic policy route.</p></div></div>;
  const decision = decide(item.text);
  return <aside className="soft-card rounded-2xl border border-card-border bg-card p-5 sm:p-6"><div className="flex items-start justify-between"><div><span className="mono text-[10px] font-bold text-muted-foreground">{item.id}</span><h2 className="mt-1 text-lg font-extrabold text-primary">{item.name}</h2></div><button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground xl:hidden" data-testid="button-close-request"><X size={17} /></button></div><div className="mt-4"><StatusBadge status={item.status} /></div><blockquote className="mt-5 border-l-2 border-sidebar-primary pl-4 text-sm leading-6 text-foreground">“{item.text}”</blockquote><div className="mt-7"><p className="section-kicker">Policy route</p><div className="mt-3"><DecisionCard decision={decision} /></div></div></aside>;
}

function TicketQueue() {
  const [search, setSearch] = useState(''); const [filter, setFilter] = useState('All'); const [selected, setSelected] = useState<TicketItem | null>(null);
  const filtered = tickets.filter(t => `${t.id} ${t.name} ${t.text} ${t.status}`.toLowerCase().includes(search.toLowerCase()) && (filter === 'All' || (filter === 'Active' ? t.active : !t.active)));
  return <div className="page-enter"><PageHeading kicker="Operations / fulfillment" title="Ticket Queue" description="Active and closed tickets stay visible together so reviewers can trace the operational context." action={<Badge tone="accent"><Activity size={12} /> 4 active · 6 closed</Badge>} /><div className="mb-5 flex flex-col gap-3 sm:flex-row"><div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search ticket ID, owner, or issue" /></div><label className="flex items-center gap-2 rounded-xl border border-input bg-card px-3.5 text-sm"><ListFilter size={15} className="text-muted-foreground" /><select value={filter} onChange={e => setFilter(e.target.value)} className="bg-transparent py-2.5 font-bold outline-none" data-testid="select-ticket-filter"><option>All</option><option>Active</option><option>Closed</option></select></label></div><div className="grid gap-6 xl:grid-cols-[1fr_390px]"><section className="soft-card overflow-hidden rounded-2xl border border-card-border bg-card"><div className="flex items-center justify-between border-b border-border px-5 py-4"><span className="text-sm font-extrabold text-primary">{filtered.length} matching tickets</span><span className="mono text-[10px] text-muted-foreground">QUEUE · REVIEWER VIEW</span></div><div className="divide-y divide-border">{filtered.map(item => <button key={item.id} onClick={() => setSelected(item)} className={`data-row flex w-full items-start gap-3 px-5 py-4 text-left ${selected?.id === item.id ? 'bg-secondary/50' : ''}`} data-testid={`row-ticket-${item.id}`}><span className="mono w-[62px] shrink-0 pt-0.5 text-[10px] font-bold text-muted-foreground">{item.id}</span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-foreground">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.text}</span></span><StatusBadge status={item.status} /><ChevronRight size={15} className="mt-1 shrink-0 text-muted-foreground" /></button>)}</div></section><TicketDetail item={selected} onClose={() => setSelected(null)} /></div></div>;
}

function TicketDetail({ item, onClose }: { item: TicketItem | null; onClose: () => void }) {
  if (!item) return <div className="hidden rounded-2xl border border-dashed border-border bg-card/50 p-8 xl:block"><div className="flex min-h-[300px] flex-col items-center justify-center text-center"><span className="grid h-12 w-12 place-items-center rounded-xl bg-muted text-muted-foreground"><Ticket size={21} /></span><h3 className="mt-4 text-sm font-extrabold text-primary">Select a ticket</h3><p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">Inspect the current operational state and supplied issue.</p></div></div>;
  return <aside className="soft-card rounded-2xl border border-card-border bg-card p-5 sm:p-6"><div className="flex items-start justify-between"><div><span className="mono text-[10px] font-bold text-muted-foreground">{item.id}</span><h2 className="mt-1 text-lg font-extrabold text-primary">{item.text}</h2></div><button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted xl:hidden" data-testid="button-close-ticket"><X size={17} /></button></div><div className="mt-4 flex flex-wrap gap-2"><StatusBadge status={item.status} />{item.active && <Badge tone="accent">Active</Badge>}</div><div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-xl bg-muted p-3"><p className="section-kicker !text-[9px]">Owner</p><p className="mt-1 text-sm font-bold">{item.name}</p></div><div className="rounded-xl bg-muted p-3"><p className="section-kicker !text-[9px]">State</p><p className="mt-1 text-sm font-bold">{item.active ? 'Open' : 'Closed'}</p></div></div><div className="mt-6 rounded-xl border border-border p-4"><p className="section-kicker">Review note</p><p className="mt-2 text-sm leading-6 text-muted-foreground">This view reflects supplied ticket data only. No additional approval or completion state is inferred.</p></div></aside>;
}

function KnowledgeBase() {
  const [search, setSearch] = useState(''); const [selected, setSelected] = useState(kbArticles[0]);
  const filtered = kbArticles.filter(a => `${a[0]} ${a[1]} ${a[2]}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="page-enter"><PageHeading kicker="Sources / policy set" title="Knowledge Base" description="The exact source material available to the decision matcher. Search it like a reviewer, not a filing cabinet." action={<Badge tone="accent"><BookOpen size={12} /> 11 sources indexed</Badge>} /><div className="mb-5"><SearchBar value={search} onChange={setSearch} placeholder="Search policy ID, title, or guidance" /></div><div className="grid gap-6 xl:grid-cols-[360px_1fr]"><section className="soft-card overflow-hidden rounded-2xl border border-card-border bg-card"><div className="border-b border-border px-5 py-4"><span className="text-sm font-extrabold text-primary">{filtered.length} sources</span></div><div className="divide-y divide-border">{filtered.map(article => <button key={article[0]} onClick={() => setSelected(article)} className={`data-row flex w-full items-center gap-3 px-5 py-4 text-left ${selected[0] === article[0] ? 'bg-secondary/60' : ''}`} data-testid={`button-kb-${article[0]}`}><span className="mono w-14 text-[10px] font-bold text-muted-foreground">{article[0]}</span><span className="flex-1 text-sm font-bold text-foreground">{article[1]}</span><ChevronRight size={15} className="text-muted-foreground" /></button>)}</div></section><article className="soft-card rounded-2xl border border-card-border bg-card p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><span className="mono text-xs font-bold text-sidebar-primary">{selected[0]}</span><h2 className="mt-2 text-2xl font-extrabold tracking-tight text-primary">{selected[1]}</h2></div><div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-secondary-foreground"><FileText size={19} /></div></div><div className="mt-8 border-t border-border pt-6"><p className="section-kicker">Supplied guidance</p><p className="mt-4 max-w-2xl text-base leading-8 text-foreground">{selected[2]}</p></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-xl bg-muted p-4"><p className="section-kicker !text-[9px]">Used for</p><p className="mt-2 text-sm font-bold text-primary">Concise support decisions</p></div><div className="rounded-xl bg-muted p-4"><p className="section-kicker !text-[9px]">Authority</p><p className="mt-2 text-sm font-bold text-primary">Supplied Veridian policy</p></div></div></article></div></div>;
}

function DecisionLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  useEffect(() => { try { setLogs(JSON.parse(localStorage.getItem('veridian-decision-log') ?? '[]') as LogEntry[]); } catch { setLogs([]); } }, []);
  const clear = () => { localStorage.removeItem('veridian-decision-log'); setLogs([]); };
  return <div className="page-enter"><PageHeading kicker="Audit / local persistence" title="Decision Log" description="A concise local audit trail of questions processed in AI Support. It stores business justification, never chain-of-thought." action={logs.length > 0 ? <button onClick={clear} className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold text-muted-foreground transition hover:border-red-200 hover:bg-red-50 hover:text-red-700" data-testid="button-clear-log">Clear local log</button> : undefined} /><div className="mb-5 flex items-center gap-3 rounded-2xl border border-teal-200 bg-secondary/55 p-4 text-sm text-secondary-foreground"><ShieldCheck size={18} /><span>Stored in this browser only. Each entry captures timestamp, user question, relevant policy, decision, action, and route.</span></div>{logs.length === 0 ? <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-muted text-muted-foreground"><Activity size={20} /></div><h2 className="mt-4 text-base font-extrabold text-primary">No decisions yet</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Process a request in AI Support and its concise decision will appear here automatically.</p><Link href="/ai-support" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground" data-testid="link-start-decision">Start a decision <ArrowRight size={15} /></Link></div> : <div className="space-y-4">{logs.map((log, i) => <article key={`${log.timestamp}-${i}`} className="soft-card rounded-2xl border border-card-border bg-card p-5 sm:p-6"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-secondary-foreground"><Check size={17} /></span><div><p className="text-sm font-extrabold text-primary">Decision {String(logs.length - i).padStart(2, '0')}</p><p className="mono mt-1 text-[10px] text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p></div></div><Badge tone={log.tone === 'security' ? 'danger' : log.tone === 'resolved' ? 'good' : 'accent'}>{log.decision}</Badge></div><div className="mt-5 grid gap-4 border-t border-border pt-5 md:grid-cols-[1.1fr_1fr]"><div><p className="section-kicker">User question</p><p className="mt-2 text-sm leading-6 text-foreground">{log.question}</p></div><div><p className="section-kicker">Business justification</p><p className="mt-2 text-sm leading-6 text-foreground">{log.action}</p><p className="mt-3 flex items-center gap-2 text-xs font-bold text-muted-foreground"><BookOpen size={13} /> {log.relevantKB}{log.routing && <><ArrowRight size={13} /> {log.routing}</>}</p></div></div></article>)}</div>}</div>;
}

function NotFound() {
  return <div className="flex min-h-[60vh] flex-col items-center justify-center text-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-muted text-muted-foreground"><CircleHelp size={25} /></span><h1 className="mt-5 text-2xl font-extrabold text-primary">That view is not in the workspace.</h1><Link href="/" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground" data-testid="link-return-dashboard"><ArrowLeft size={15} /> Return to dashboard</Link></div>;
}

function Router() {
  return <AppShell><ErrorBoundary><Switch><Route path="/" component={Dashboard} /><Route path="/ai-support" component={AISupport} /><Route path="/employee-requests" component={RequestsPage} /><Route path="/ticket-queue" component={TicketQueue} /><Route path="/knowledge-base" component={KnowledgeBase} /><Route path="/decision-log" component={DecisionLog} /><Route component={NotFound} /></Switch></ErrorBoundary></AppShell>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;