import React, { useState, useEffect, useRef } from "react";
import {
  Activity, AlertTriangle, BarChart3, Bell, CheckCircle2, ChevronDown,
  Database, FileText, Globe, GraduationCap, Layers, Lock, Mail, MapPin,
  MessageSquare, Network, School, ShieldCheck, Smartphone, Target,
  TrendingUp, Users, Zap, ArrowRight, X, Building2, Workflow, Gauge,
  Sparkles, Phone, MonitorPlay, ChevronLeft, ChevronRight, Eye
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, AreaChart, Area,
  Tooltip, CartesianGrid, Cell
} from "recharts";

/* ──────────────────────────────────────────────────────────────────────
   SchoolBridge / ProvinceBridge — Gauteng Executive Presentation
   Single-file premium microsite. Illustrative data only.
   ────────────────────────────────────────────────────────────────────── */

const C = {
  navy: "#071A2F", blue: "#003B71", teal: "#00A3A3", green: "#00B050",
  gold: "#F5A623", soft: "#F4F6F8", white: "#FFFFFF", grey: "#5B6770",
};

const SECTIONS = [
  { id: "hero", label: "Vision" },
  { id: "challenge", label: "Challenge" },
  { id: "vision", label: "Ecosystem" },
  { id: "admission", label: "AdmissionBridge" },
  { id: "demand", label: "Demand" },
  { id: "school", label: "SchoolBridge" },
  { id: "province", label: "ProvinceBridge" },
  { id: "attendance", label: "Attendance" },
  { id: "comms", label: "Communication" },
  { id: "study", label: "StudyBridge" },
  { id: "stakeholders", label: "Stakeholders" },
  { id: "roadmap", label: "Roadmap" },
  { id: "pilot", label: "Pilot" },
  { id: "security", label: "Security" },
  { id: "closing", label: "2030" },
];

const fmt = (n, d = 0) =>
  Number(n).toLocaleString("en-ZA", { minimumFractionDigits: d, maximumFractionDigits: d });

/* ── hooks ─────────────────────────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); o.unobserve(el); } },
      { threshold }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, run, dur = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf; const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(target * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, dur]);
  return val;
}

/* ── primitives ────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Stat({ value, prefix = "", suffix = "", decimals = 0, label, accent = C.teal, dark }) {
  const [ref, inView] = useInView();
  const v = useCountUp(value, inView);
  return (
    <div ref={ref}>
      <div className="mono" style={{ fontSize: "clamp(28px,3vw,44px)", fontWeight: 600, color: accent, lineHeight: 1 }}>
        {prefix}{fmt(v, decimals)}{suffix}
      </div>
      <div style={{ marginTop: 8, fontSize: 13, letterSpacing: ".02em", color: dark ? "rgba(255,255,255,.62)" : C.grey }}>{label}</div>
    </div>
  );
}

function Kicker({ children, dark }) {
  return (
    <div className="mono" style={{
      fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase",
      color: dark ? C.teal : C.blue, display: "flex", alignItems: "center", gap: 10, marginBottom: 18,
    }}>
      <span style={{ width: 28, height: 1, background: dark ? C.teal : C.blue, display: "inline-block" }} />
      {children}
    </div>
  );
}

function Illustrative({ light }) {
  return (
    <span className="mono" style={{
      fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase",
      padding: "3px 9px", borderRadius: 999, fontWeight: 500,
      color: light ? "rgba(255,255,255,.65)" : C.grey,
      border: `1px solid ${light ? "rgba(255,255,255,.22)" : "rgba(0,0,0,.12)"}`,
    }}>Illustrative data</span>
  );
}

/* ── ecosystem radial diagram ──────────────────────────────────────── */
function EcosystemDiagram() {
  const nodes = ["Parents", "Teachers", "Schools", "Districts", "Province", "Partners"];
  const cx = 260, cy = 230, R = 165;
  return (
    <svg viewBox="0 0 520 460" style={{ width: "100%", height: "auto" }}>
      {nodes.map((_, i) => {
        const a = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + R * Math.cos(a)} y2={cy + R * Math.sin(a)}
          stroke="rgba(0,163,163,.4)" strokeWidth="1.4" strokeDasharray="3 5" />;
      })}
      <circle cx={cx} cy={cy} r="64" fill={C.teal} opacity=".12" />
      <circle cx={cx} cy={cy} r="48" fill={C.teal} />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="Hanken Grotesk">Learner</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,.85)" fontFamily="IBM Plex Mono">at the centre</text>
      {nodes.map((n, i) => {
        const a = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
        const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
        return (
          <g key={n}>
            <circle cx={x} cy={y} r="40" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#fff" fontFamily="Hanken Grotesk">{n}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Gauteng abstract region map ───────────────────────────────────── */
const REGIONS = [
  { name: "Tshwane", heat: "High", util: 94, x: 150, y: 30, w: 200, h: 110 },
  { name: "Ekurhuleni", heat: "High", util: 91, x: 330, y: 150, w: 150, h: 120 },
  { name: "Johannesburg", heat: "Medium", util: 82, x: 130, y: 155, w: 185, h: 110 },
  { name: "West Rand", heat: "Available", util: 64, x: 20, y: 175, w: 95, h: 95 },
  { name: "Sedibeng", heat: "Available", util: 58, x: 175, y: 285, w: 160, h: 90 },
];
const HEAT = { High: C.gold, Medium: C.teal, Available: C.green };

function GautengMap() {
  return (
    <svg viewBox="0 0 500 400" style={{ width: "100%", height: "auto" }}>
      {REGIONS.map((r) => (
        <g key={r.name}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="14"
            fill={HEAT[r.heat]} opacity={r.heat === "High" ? 0.92 : r.heat === "Medium" ? 0.78 : 0.7} />
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="14" fill="none" stroke="rgba(255,255,255,.25)" />
          <text x={r.x + r.w / 2} y={r.y + r.h / 2 - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="Hanken Grotesk">{r.name}</text>
          <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 14} textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,.9)" fontFamily="IBM Plex Mono">{r.util}% capacity</text>
        </g>
      ))}
    </svg>
  );
}

/* ── small reusable cards ──────────────────────────────────────────── */
function ChallengeCard({ icon: Icon, title, body, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="card-dark">
        <div className="icon-chip"><Icon size={20} color={C.teal} /></div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "#fff", margin: "16px 0 8px" }}>{title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>{body}</p>
      </div>
    </Reveal>
  );
}

function PillarCard({ tag, name, desc, accent, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="card-light" style={{ borderTop: `3px solid ${accent}` }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: ".15em", color: accent, textTransform: "uppercase" }}>{tag}</div>
        <h3 className="serif" style={{ fontSize: 24, fontWeight: 600, margin: "10px 0 10px", color: C.navy }}>{name}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: C.grey }}>{desc}</p>
      </div>
    </Reveal>
  );
}

function MetricTile({ value, prefix, suffix, decimals, label, accent, sub }) {
  return (
    <div className="metric-tile">
      <Stat value={value} prefix={prefix} suffix={suffix} decimals={decimals} label={label} accent={accent} dark />
      {sub && <div className="mono" style={{ marginTop: 10, fontSize: 11, color: C.green }}>{sub}</div>}
    </div>
  );
}

/* ── data for charts ───────────────────────────────────────────────── */
const demandData = [
  { region: "Tshwane", demand: 94 }, { region: "Ekurhuleni", demand: 91 },
  { region: "Johannesburg", demand: 82 }, { region: "West Rand", demand: 64 },
  { region: "Sedibeng", demand: 58 },
];
const attendanceTrend = [
  { d: "Mon", v: 93.1 }, { d: "Tue", v: 93.8 }, { d: "Wed", v: 92.4 },
  { d: "Thu", v: 90.6 }, { d: "Fri", v: 88.9 }, { d: "Mon", v: 91.2 }, { d: "Tue", v: 92.7 },
];
const subjectData = [
  { s: "Maths", v: 58 }, { s: "Phys Sci", v: 61 }, { s: "Languages", v: 74 },
  { s: "Life Sci", v: 69 }, { s: "Accounting", v: 64 }, { s: "Geography", v: 71 },
];

/* ── MAIN ──────────────────────────────────────────────────────────── */
export default function App() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("hero");
  const [presenting, setPresenting] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? top / h : 0);
      let cur = "hero";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) cur = s.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (idx) => {
    const i = Math.max(0, Math.min(SECTIONS.length - 1, idx));
    document.getElementById(SECTIONS[i].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKey = (e) => {
      const idx = SECTIONS.findIndex((s) => s.id === active);
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(idx + 1); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(idx - 1); }
      if (e.key === "Escape") setPresenting(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const curIdx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div className="sb-root">
      <style>{CSS}</style>

      {/* progress bar */}
      <div className="progress-track"><div className="progress-fill" style={{ transform: `scaleX(${progress})` }} /></div>

      {/* top nav */}
      <nav className={`topnav ${active === "hero" ? "on-dark" : ""}`}>
        <div className="brand">
          <div className="brand-mark">SB</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: ".01em" }}>SchoolBridge</div>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".18em", opacity: .65, textTransform: "uppercase" }}>Provincial Education OS</div>
          </div>
        </div>
        <div className="nav-links">
          {SECTIONS.slice(0, 10).map((s) => (
            <button key={s.id} className={active === s.id ? "active" : ""} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}>{s.label}</button>
          ))}
        </div>
        <button className="present-btn" onClick={() => { setPresenting(true); go(0); }}>
          <MonitorPlay size={15} /> Present
        </button>
      </nav>

      {/* presentation controls */}
      {presenting && (
        <div className="present-bar">
          <button onClick={() => go(curIdx - 1)} disabled={curIdx === 0}><ChevronLeft size={18} /></button>
          <span className="mono">{String(curIdx + 1).padStart(2, "0")} / {SECTIONS.length} · {SECTIONS[curIdx]?.label}</span>
          <button onClick={() => go(curIdx + 1)} disabled={curIdx === SECTIONS.length - 1}><ChevronRight size={18} /></button>
          <button className="exit" onClick={() => setPresenting(false)}><X size={16} /> Exit</button>
        </div>
      )}

      {/* ── 1. HERO ── */}
      <section id="hero" className="hero">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <Reveal>
            <Kicker dark>Gauteng Provincial Digital Education Strategy</Kicker>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="serif hero-title">Building Africa's Most<br /><span style={{ color: C.teal }}>Connected</span> Education System</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="hero-sub">Transforming Gauteng education through digital intelligence, real-time data and learner-centred innovation — one integrated platform from the classroom to the Provincial command centre.</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="hero-pills">
              {["SchoolBridge", "ProvinceBridge", "AdmissionBridge", "StudyBridge"].map((p, i) => (
                <span key={p} className="hero-pill" style={{ borderColor: [C.teal, C.gold, C.green, "#5aa9e6"][i] }}>{p}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => document.getElementById("vision")?.scrollIntoView({ behavior: "smooth" })}>View Provincial Vision <ArrowRight size={16} /></button>
              <button className="btn-ghost" onClick={() => document.getElementById("admission")?.scrollIntoView({ behavior: "smooth" })}>Explore Platform Ecosystem</button>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="hero-dash">
              <div className="hero-dash-head">
                <span className="mono" style={{ fontSize: 11, letterSpacing: ".15em", color: C.teal }}>PROVINCEBRIDGE · LIVE COMMAND VIEW</span>
                <span className="live-dot">● LIVE</span>
              </div>
              <div className="hero-dash-grid">
                <MetricTile value={2148} label="Schools online" accent={C.teal} sub="▲ real-time" />
                <MetricTile value={92.7} suffix="%" decimals={1} label="Attendance today" accent={C.green} />
                <MetricTile value={1.42} prefix="" suffix="M" decimals={2} label="Messages delivered" accent={C.gold} />
                <MetricTile value={37} label="District alerts" accent="#5aa9e6" />
              </div>
              <div style={{ marginTop: 16 }}><Illustrative light /></div>
            </div>
          </Reveal>
        </div>
        <div className="scroll-hint"><ChevronDown size={20} /></div>
      </section>

      {/* ── 2. CHALLENGE ── */}
      <section id="challenge" className="sec dark">
        <div className="container">
          <Reveal><Kicker dark>The Context</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title light">The Gauteng Education Challenge</h2></Reveal>
          <Reveal delay={120}><p className="sec-lead light">Gauteng manages one of the continent's largest and fastest-growing education systems. Today, critical decisions are made on fragmented, delayed and manually-assembled information — long after the moment to act has passed.</p></Reveal>
          <div className="grid-3" style={{ marginTop: 48 }}>
            <ChallengeCard icon={Users} title="Learner placement pressure" body="Annual surges in applications without a year-round, data-led view of where demand will land next." delay={0} />
            <ChallengeCard icon={Building2} title="Overcrowded schools" body="Capacity strain concentrates in specific regions while available space elsewhere goes unseen." delay={60} />
            <ChallengeCard icon={FileText} title="Delayed reporting" body="District and provincial reporting arrives weeks late, assembled by hand from disconnected sources." delay={120} />
            <ChallengeCard icon={MessageSquare} title="Fragmented communication" body="No single, reliable channel from Province down to every parent and learner in the system." delay={180} />
            <ChallengeCard icon={Layers} title="Manual administration" body="Schools and districts carry heavy paper-based admin that drains time from teaching and oversight." delay={240} />
            <ChallengeCard icon={Eye} title="Limited predictive intelligence" body="Decisions remain reactive — there is little ability to forecast pressure before it becomes a crisis." delay={300} />
          </div>
          <Reveal delay={120}>
            <div className="outcome-strip">
              <AlertTriangle size={22} color={C.gold} />
              <span><strong>Learning outcome gaps</strong> persist because interventions are designed without timely, school-level and learner-level evidence of what is actually happening.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. PROVINCIAL VISION ── */}
      <section id="vision" className="sec light">
        <div className="container">
          <Reveal><Kicker>The Provincial Vision</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title">One Learner. One Journey.<br />One Digital Ecosystem.</h2></Reveal>
          <div className="vision-grid">
            <Reveal delay={120}>
              <div className="diagram-frame">
                <EcosystemDiagram />
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div>
                <p className="sec-lead">The learner sits at the centre of a single connected ecosystem. Every stakeholder — from parents to the Province — works from the same trusted information, in real time, across one platform.</p>
                <div className="pillar-mini-grid">
                  {[
                    { n: "AdmissionBridge", a: C.gold, d: "Year-round placement intelligence" },
                    { n: "SchoolBridge", a: C.teal, d: "The digital OS for every school" },
                    { n: "ProvinceBridge", a: C.blue, d: "Real-time provincial command centre" },
                    { n: "StudyBridge", a: C.green, d: "Learning outcomes & intervention" },
                  ].map((p, i) => (
                    <div key={p.n} className="pillar-mini" style={{ borderLeft: `3px solid ${p.a}` }}>
                      <div style={{ fontWeight: 700, color: C.navy }}>{p.n}</div>
                      <div style={{ fontSize: 13, color: C.grey, marginTop: 3 }}>{p.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. ADMISSIONBRIDGE ── */}
      <section id="admission" className="sec dark">
        <div className="container">
          <Reveal><Kicker dark>AdmissionBridge</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title light">Predict. Plan. Place.</h2></Reveal>
          <Reveal delay={120}><p className="sec-lead light">A year-round admissions intelligence platform — not just an annual application window. AdmissionBridge moves Gauteng from reactive admissions pressure to proactive, continuous learner placement planning.</p></Reveal>

          <Reveal delay={160}>
            <div className="workflow">
              {["Application", "Verification", "Assessment", "Placement", "Enrollment", "Capacity Planning"].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <div className="workflow-step">
                    <span className="mono workflow-num">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="workflow-arrow" size={16} />}
                </React.Fragment>
              ))}
            </div>
          </Reveal>

          <div className="grid-3" style={{ marginTop: 44 }}>
            {[
              { l: "Applications received", v: 184320, a: C.teal, ic: FileText },
              { l: "Placed learners", v: 142680, a: C.green, ic: CheckCircle2 },
              { l: "Capacity utilisation", v: 87, suf: "%", a: C.gold, ic: Gauge },
              { l: "Waiting-list risk schools", v: 214, a: C.gold, ic: AlertTriangle },
              { l: "Late applications", v: 9640, a: "#5aa9e6", ic: Bell },
              { l: "High-demand schools", v: 312, a: C.teal, ic: TrendingUp },
            ].map((m, i) => (
              <Reveal key={m.l} delay={i * 60}>
                <div className="dash-card">
                  <div className="dash-card-top"><m.ic size={18} color={m.a} /><Illustrative light /></div>
                  <Stat value={m.v} suffix={m.suf || ""} label={m.l} accent={m.a} dark />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="keymsg dark">
              <Target size={20} color={C.teal} />
              Move Gauteng from reactive admissions pressure to proactive, year-round learner placement planning.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. DEMAND FORECASTING ── */}
      <section id="demand" className="sec light">
        <div className="container">
          <Reveal><Kicker>Provincial Demand Forecasting</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title">See next year's placement pressure<br />before it becomes a crisis.</h2></Reveal>
          <div className="demand-grid">
            <Reveal delay={120}>
              <div className="map-frame">
                <GautengMap />
                <div className="map-legend">
                  {Object.entries(HEAT).map(([k, v]) => (
                    <span key={k}><span className="dot" style={{ background: v }} />{k === "High" ? "High demand" : k === "Medium" ? "Medium demand" : "Available capacity"}</span>
                  ))}
                </div>
                <div style={{ marginTop: 10 }}><Illustrative /></div>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div>
                <p className="sec-lead">Projected placement demand by region for the coming intake — surfaced months ahead, so capacity, staffing and infrastructure can be planned deliberately rather than under crisis.</p>
                <div style={{ height: 260, marginTop: 24 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={demandData} layout="vertical" margin={{ left: 10, right: 24 }}>
                      <CartesianGrid horizontal={false} stroke="rgba(0,0,0,.06)" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: C.grey }} unit="%" />
                      <YAxis type="category" dataKey="region" width={92} tick={{ fontSize: 12, fill: C.navy }} />
                      <Tooltip cursor={{ fill: "rgba(0,0,0,.03)" }} formatter={(v) => [`${v}% projected`, "Demand"]} />
                      <Bar dataKey="demand" radius={[0, 6, 6, 0]} barSize={22}>
                        {demandData.map((d, i) => (
                          <Cell key={i} fill={d.demand >= 90 ? C.gold : d.demand >= 75 ? C.teal : C.green} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 6. SCHOOLBRIDGE ── */}
      <section id="school" className="sec dark">
        <div className="container">
          <Reveal><Kicker dark>SchoolBridge</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title light">Digitising Every School</h2></Reveal>
          <Reveal delay={120}><p className="sec-lead light">The complete digital operating system for the individual school — replacing scattered paper, spreadsheets and disconnected tools with one connected platform for staff, parents and learners.</p></Reveal>
          <div className="school-layout">
            <Reveal delay={140}>
              <div className="module-grid">
                {[
                  { n: "Communication", ic: MessageSquare }, { n: "Attendance", ic: Activity },
                  { n: "Homework", ic: FileText }, { n: "Events", ic: Bell },
                  { n: "Fees", ic: BarChart3 }, { n: "Parent App", ic: Smartphone },
                  { n: "Teacher Portal", ic: GraduationCap }, { n: "Principal Dashboard", ic: Gauge },
                  { n: "Learner App", ic: Users }, { n: "School Website", ic: Globe },
                ].map((m, i) => (
                  <div key={m.n} className="module-chip">
                    <m.ic size={17} color={C.teal} /><span>{m.n}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="device-mock">
                <div className="device-bar"><span /><span /><span /></div>
                <div className="device-screen">
                  <div className="ds-head"><span style={{ fontWeight: 700, color: "#fff" }}>Principal Dashboard</span><span className="mono" style={{ fontSize: 10, color: C.teal }}>Today</span></div>
                  <div className="ds-row"><span>Attendance</span><strong style={{ color: C.green }}>94.2%</strong></div>
                  <div className="ds-bar"><div style={{ width: "94%", background: C.green }} /></div>
                  <div className="ds-row"><span>Fees collected</span><strong style={{ color: C.gold }}>R 1.84M</strong></div>
                  <div className="ds-bar"><div style={{ width: "76%", background: C.gold }} /></div>
                  <div className="ds-row"><span>Messages sent</span><strong style={{ color: C.teal }}>3,210</strong></div>
                  <div className="ds-bar"><div style={{ width: "88%", background: C.teal }} /></div>
                  <div className="ds-foot"><Illustrative light /></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 7. PROVINCEBRIDGE ── */}
      <section id="province" className="sec command">
        <div className="container">
          <Reveal><Kicker dark>ProvinceBridge</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title light">The Provincial Command Centre</h2></Reveal>
          <Reveal delay={120}><p className="sec-lead light">From reactive administration to real-time governance. A single executive view of the entire provincial system — every school, every district, every day.</p></Reveal>
          <Reveal delay={160}>
            <div className="command-dash">
              <div className="command-head">
                <span className="mono" style={{ letterSpacing: ".15em", color: C.teal, fontSize: 12 }}>PROVINCEBRIDGE · EXECUTIVE COMMAND VIEW</span>
                <span className="live-dot">● LIVE</span>
              </div>
              <div className="command-grid">
                {[
                  { l: "Schools online", v: 2148, a: C.teal },
                  { l: "Attendance today", v: 92.7, suf: "%", dec: 1, a: C.green },
                  { l: "Communication reach", v: 96.4, suf: "%", dec: 1, a: C.gold },
                  { l: "Admission pipeline", v: 184320, a: "#5aa9e6" },
                  { l: "At-risk schools", v: 86, a: C.gold },
                  { l: "Learning performance idx", v: 68.2, dec: 1, a: C.teal },
                  { l: "District alerts", v: 37, a: "#e07a5f" },
                  { l: "Interventions tracked", v: 412, a: C.green },
                ].map((m) => (
                  <div key={m.l} className="cmd-tile">
                    <Stat value={m.v} suffix={m.suf || ""} decimals={m.dec || 0} label={m.l} accent={m.a} dark />
                  </div>
                ))}
              </div>
              <div className="command-foot"><Illustrative light /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. ATTENDANCE INTELLIGENCE ── */}
      <section id="attendance" className="sec light">
        <div className="container">
          <Reveal><Kicker>Attendance Intelligence</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title">Attendance as an early-warning system</h2></Reveal>
          <div className="att-grid">
            <Reveal delay={120}>
              <div className="att-kpis">
                {[
                  { l: "Today's attendance", v: 92.7, suf: "%", dec: 1, a: C.green },
                  { l: "Learners absent", v: 148620, a: C.gold },
                  { l: "Schools reporting", v: 2106, a: C.teal },
                  { l: "District alerts", v: 37, a: "#e07a5f" },
                ].map((m) => (
                  <div key={m.l} className="att-kpi">
                    <Stat value={m.v} suffix={m.suf || ""} decimals={m.dec || 0} label={m.l} accent={m.a} />
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="att-chart">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: C.navy }}>Provincial risk trend</span><Illustrative />
                </div>
                <div style={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={attendanceTrend} margin={{ left: -18, right: 8 }}>
                      <defs>
                        <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={C.teal} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(0,0,0,.06)" vertical={false} />
                      <XAxis dataKey="d" tick={{ fontSize: 11, fill: C.grey }} />
                      <YAxis domain={[85, 96]} tick={{ fontSize: 11, fill: C.grey }} unit="%" />
                      <Tooltip formatter={(v) => [`${v}%`, "Attendance"]} />
                      <Area type="monotone" dataKey="v" stroke={C.teal} strokeWidth={2.5} fill="url(#att)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="ai-card">
              <div className="ai-badge"><Sparkles size={15} /> AI INSIGHT</div>
              <p>Attendance drop detected in a selected district over three consecutive days. <strong>Recommended action: deploy district intervention support.</strong></p>
              <Illustrative light />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9. COMMUNICATION ── */}
      <section id="comms" className="sec dark">
        <div className="container">
          <Reveal><Kicker dark>Communication at Provincial Scale</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title light">Critical communication delivered<br />in minutes, not weeks.</h2></Reveal>
          <Reveal delay={140}>
            <div className="comm-flow">
              {["Province", "District", "School", "Parent / Learner"].map((n, i, arr) => (
                <React.Fragment key={n}>
                  <div className="comm-node"><Network size={18} color={C.teal} /><span>{n}</span></div>
                  {i < arr.length - 1 && <div className="comm-line" />}
                </React.Fragment>
              ))}
            </div>
          </Reveal>
          <div className="grid-3" style={{ marginTop: 44 }}>
            {[
              { n: "SMS", ic: Smartphone, s: "Available" }, { n: "Email", ic: Mail, s: "Available" },
              { n: "Mobile Push", ic: Bell, s: "Available" }, { n: "In-App", ic: MessageSquare, s: "Available" },
              { n: "Website", ic: Globe, s: "Available" }, { n: "WhatsApp", ic: Phone, s: "Future integration" },
            ].map((c, i) => (
              <Reveal key={c.n} delay={i * 50}>
                <div className="channel-card">
                  <c.ic size={20} color={c.s === "Available" ? C.teal : C.gold} />
                  <div>
                    <div style={{ fontWeight: 600, color: "#fff" }}>{c.n}</div>
                    <div className="mono" style={{ fontSize: 11, color: c.s === "Available" ? C.green : C.gold }}>{c.s}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. STUDYBRIDGE ── */}
      <section id="study" className="sec light">
        <div className="container">
          <Reveal><Kicker>StudyBridge</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title">Improving Learning Outcomes</h2></Reveal>
          <Reveal delay={140}>
            <div className="workflow light-flow">
              {["Practice", "Assessment", "Gamification", "Intervention", "Exam Prep", "Analytics"].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <div className="workflow-step light"><span className="mono workflow-num light">{i + 1}</span><span>{step}</span></div>
                  {i < arr.length - 1 && <ArrowRight className="workflow-arrow" size={16} color={C.grey} />}
                </React.Fragment>
              ))}
            </div>
          </Reveal>
          <div className="study-grid">
            <Reveal delay={160}>
              <div className="study-chart">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontWeight: 600, color: C.navy }}>Subject performance index</span><Illustrative />
                </div>
                <div style={{ height: 230 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectData} margin={{ left: -18, right: 8 }}>
                      <CartesianGrid stroke="rgba(0,0,0,.06)" vertical={false} />
                      <XAxis dataKey="s" tick={{ fontSize: 10.5, fill: C.grey }} interval={0} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: C.grey }} />
                      <Tooltip cursor={{ fill: "rgba(0,0,0,.03)" }} formatter={(v) => [`${v}%`, "Index"]} />
                      <Bar dataKey="v" radius={[6, 6, 0, 0]} barSize={30}>
                        {subjectData.map((d, i) => <Cell key={i} fill={d.v < 65 ? C.gold : C.green} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="study-cards">
                {[
                  { l: "Subject performance", v: "Tracked live", ic: BarChart3, a: C.teal },
                  { l: "Learner risk index", v: "12,480 flagged", ic: AlertTriangle, a: C.gold },
                  { l: "District ranking", v: "Real-time", ic: TrendingUp, a: C.green },
                  { l: "School ranking", v: "Real-time", ic: Building2, a: C.blue },
                  { l: "Intervention recommendations", v: "AI-assisted", ic: Sparkles, a: C.teal },
                ].map((c, i) => (
                  <div key={c.l} className="study-card">
                    <c.ic size={18} color={c.a} />
                    <div><div style={{ fontWeight: 600, color: C.navy, fontSize: 14 }}>{c.l}</div><div className="mono" style={{ fontSize: 11.5, color: C.grey }}>{c.v}</div></div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 11. STAKEHOLDERS ── */}
      <section id="stakeholders" className="sec dark">
        <div className="container">
          <Reveal><Kicker dark>Stakeholder Benefits</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title light">Value at every level of the system</h2></Reveal>
          <div className="stake-grid">
            {[
              { r: "MEC", b: "Strategic visibility across the entire province", ic: Eye },
              { r: "HOD", b: "Confident, evidence-based policy execution", ic: ShieldCheck },
              { r: "Districts", b: "Real-time operational oversight of every school", ic: Network },
              { r: "Principals", b: "Better, simpler school management", ic: Building2 },
              { r: "Teachers", b: "Reduced administrative burden", ic: GraduationCap },
              { r: "Parents", b: "Direct, reliable engagement", ic: Users },
              { r: "Learners", b: "Improved, targeted support", ic: Sparkles },
            ].map((s, i) => (
              <Reveal key={s.r} delay={i * 50}>
                <div className="stake-card">
                  <div className="icon-chip"><s.ic size={18} color={C.teal} /></div>
                  <div className="serif" style={{ fontSize: 20, color: "#fff", fontWeight: 600, margin: "12px 0 6px" }}>{s.r}</div>
                  <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.62)", lineHeight: 1.55 }}>{s.b}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. ROADMAP ── */}
      <section id="roadmap" className="sec light">
        <div className="container">
          <Reveal><Kicker>Implementation Roadmap</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title">A deliberate, phased rollout</h2></Reveal>
          <div className="roadmap">
            {[
              { p: "Phase 1", t: "Admissions Intelligence Pilot", d: "Establish year-round placement visibility in a focused set of schools.", a: C.gold },
              { p: "Phase 2", t: "SchoolBridge School Digitisation", d: "Digitise daily operations across participating schools.", a: C.teal },
              { p: "Phase 3", t: "ProvinceBridge Command Centre", d: "Stand up the real-time provincial executive view.", a: C.blue },
              { p: "Phase 4", t: "StudyBridge Learning Intelligence", d: "Connect learning outcomes, risk and intervention.", a: C.green },
              { p: "Phase 5", t: "AI-powered Provincial Ecosystem", d: "Predictive, integrated, self-improving education system.", a: "#5aa9e6" },
            ].map((ph, i) => (
              <Reveal key={ph.p} delay={i * 70}>
                <div className="road-step">
                  <div className="road-num" style={{ background: ph.a }}>{i + 1}</div>
                  <div className="road-body">
                    <div className="mono" style={{ fontSize: 11, letterSpacing: ".12em", color: ph.a, textTransform: "uppercase" }}>{ph.p}</div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: C.navy, margin: "4px 0 5px" }}>{ph.t}</div>
                    <div style={{ fontSize: 14, color: C.grey }}>{ph.d}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. PILOT PROPOSAL ── */}
      <section id="pilot" className="sec dark">
        <div className="container">
          <Reveal><Kicker dark>Pilot Proposal</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title light">Start focused. Scale with evidence.</h2></Reveal>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {[
              { t: "50-School Pilot", s: "Proof of value", d: "A focused pilot to demonstrate placement visibility and rapid school onboarding.", a: C.teal, feat: false },
              { t: "250-School District Expansion", s: "District-wide", d: "Expand across a full district to prove operational and communication scale.", a: C.gold, feat: true },
              { t: "Province-Wide Rollout", s: "Full ecosystem", d: "Complete provincial deployment of the integrated education operating system.", a: C.green, feat: false },
            ].map((o, i) => (
              <Reveal key={o.t} delay={i * 80}>
                <div className={`pilot-card ${o.feat ? "feat" : ""}`} style={{ borderTop: `4px solid ${o.a}` }}>
                  {o.feat && <span className="pilot-tag">Recommended start</span>}
                  <div className="mono" style={{ fontSize: 11, letterSpacing: ".15em", color: o.a, textTransform: "uppercase" }}>{o.s}</div>
                  <h3 className="serif" style={{ fontSize: 23, color: "#fff", fontWeight: 600, margin: "10px 0 10px" }}>{o.t}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.6 }}>{o.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="metrics-row">
              <div className="mono" style={{ fontSize: 11, letterSpacing: ".15em", color: C.teal, marginBottom: 14 }}>SUCCESS METRICS</div>
              <div className="metrics-chips">
                {["Placement visibility", "School onboarding", "Parent engagement", "Attendance reporting", "Communication delivery", "Learning insights"].map((m) => (
                  <span key={m} className="metric-chip"><CheckCircle2 size={14} color={C.green} />{m}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 14. SECURITY / POPIA ── */}
      <section id="security" className="sec light">
        <div className="container">
          <Reveal><Kicker>Data, Security & POPIA</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title">Built for public-sector trust</h2></Reveal>
          <Reveal delay={120}><p className="sec-lead">The platform is architected for the data-protection, governance and integration standards a provincial education department requires.</p></Reveal>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {[
              { t: "POPIA-aligned data handling", ic: ShieldCheck },
              { t: "Role-based access control", ic: Lock },
              { t: "Comprehensive audit logs", ic: FileText },
              { t: "Secure hosting", ic: Database },
              { t: "Data segregation", ic: Layers },
              { t: "Provincial reporting layer", ic: BarChart3 },
              { t: "Integration-ready architecture", ic: Workflow },
              { t: "Continuous monitoring", ic: Activity },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 50}>
                <div className="sec-card">
                  <s.ic size={20} color={C.blue} />
                  <span>{s.t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 15. CLOSING ── */}
      <section id="closing" className="sec closing">
        <div className="closing-bg" />
        <div className="container closing-inner">
          <Reveal><Kicker dark>Gauteng Education 2030</Kicker></Reveal>
          <Reveal delay={80}>
            <blockquote className="serif closing-quote">
              "Every learner connected.<br />Every school visible.<br /><span style={{ color: C.teal }}>Every decision informed by data.</span>"
            </blockquote>
          </Reveal>
          <Reveal delay={200}>
            <button className="btn-primary lg" onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}>
              Let's build Africa's most connected provincial education system <ArrowRight size={18} />
            </button>
          </Reveal>
        </div>
        <footer className="footer">
          <div className="container footer-inner">
            <div className="footer-brand">Bridge Platforms</div>
            <div className="footer-links">
              {["SchoolBridge", "ProvinceBridge", "AdmissionBridge", "StudyBridge"].map((p) => <span key={p}>{p}</span>)}
            </div>
            <div className="mono" style={{ fontSize: 11, opacity: .5 }}>All figures shown are illustrative. No official Gauteng statistics are presented as fact.</div>
          </div>
        </footer>
      </section>
    </div>
  );
}

/* ── styles ────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Hanken+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
.sb-root{font-family:'Hanken Grotesk',-apple-system,sans-serif;color:${C.navy};background:${C.white};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
.serif{font-family:'Fraunces',Georgia,serif;}
.mono{font-family:'IBM Plex Mono',monospace;}
.container{max-width:1280px;margin:0 auto;padding:0 40px;}
.reveal{opacity:0;transform:translateY(30px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1);}
.reveal.in{opacity:1;transform:none;}

/* progress + nav */
.progress-track{position:fixed;top:0;left:0;right:0;height:3px;background:rgba(0,0,0,.06);z-index:1000;}
.progress-fill{height:100%;background:linear-gradient(90deg,${C.teal},${C.green});transform-origin:left;transition:transform .1s linear;}
.topnav{position:fixed;top:3px;left:0;right:0;z-index:900;display:flex;align-items:center;justify-content:space-between;padding:14px 40px;background:rgba(255,255,255,.82);backdrop-filter:blur(14px);border-bottom:1px solid rgba(0,0,0,.06);transition:.3s;}
.topnav.on-dark{background:rgba(7,26,47,.55);border-bottom-color:rgba(255,255,255,.08);color:#fff;}
.topnav.on-dark .nav-links button{color:rgba(255,255,255,.7);}
.topnav.on-dark .brand-mark{background:${C.teal};color:#fff;}
.brand{display:flex;align-items:center;gap:12px;}
.brand-mark{width:38px;height:38px;border-radius:9px;background:${C.navy};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;letter-spacing:-.02em;}
.nav-links{display:flex;gap:4px;}
.nav-links button{background:none;border:none;cursor:pointer;font-family:inherit;font-size:13px;color:${C.grey};padding:7px 11px;border-radius:7px;transition:.2s;}
.nav-links button:hover{color:${C.teal};}
.nav-links button.active{color:${C.teal};font-weight:600;}
.present-btn{display:flex;align-items:center;gap:7px;background:${C.teal};color:#fff;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;padding:9px 16px;border-radius:9px;transition:.2s;}
.present-btn:hover{background:#008f8f;}
.present-bar{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:1100;display:flex;align-items:center;gap:14px;background:rgba(7,26,47,.92);backdrop-filter:blur(12px);padding:10px 16px;border-radius:14px;border:1px solid rgba(255,255,255,.12);box-shadow:0 14px 40px rgba(0,0,0,.4);}
.present-bar button{background:rgba(255,255,255,.08);border:none;color:#fff;width:38px;height:38px;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;}
.present-bar button:hover:not(:disabled){background:${C.teal};}
.present-bar button:disabled{opacity:.3;cursor:default;}
.present-bar .mono{color:#fff;font-size:12px;letter-spacing:.08em;min-width:170px;text-align:center;}
.present-bar .exit{width:auto;padding:0 14px;gap:6px;font-family:inherit;font-size:12px;}

/* sections */
.sec{padding:120px 0;position:relative;}
.sec.dark{background:${C.navy};}
.sec.light{background:${C.soft};}
.sec.command{background:linear-gradient(160deg,#04101f 0%,${C.blue} 140%);}
.sec-title{font-size:clamp(30px,4vw,52px);font-weight:600;line-height:1.08;letter-spacing:-.02em;color:${C.navy};max-width:18ch;}
.sec-title.light{color:#fff;}
.sec-lead{font-size:clamp(16px,1.4vw,19px);line-height:1.65;color:${C.grey};max-width:62ch;margin-top:20px;}
.sec-lead.light{color:rgba(255,255,255,.66);}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}

/* hero */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;padding:120px 0 80px;background:${C.navy};overflow:hidden;}
.hero-bg{position:absolute;inset:0;background:
  radial-gradient(900px 600px at 78% 18%,rgba(0,163,163,.18),transparent 60%),
  radial-gradient(700px 500px at 10% 80%,rgba(0,59,113,.4),transparent 60%),
  linear-gradient(180deg,#04101f,${C.navy});}
.hero-bg::after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:54px 54px;mask-image:radial-gradient(900px 700px at 60% 40%,#000,transparent);}
.hero-inner{position:relative;z-index:2;}
.hero-title{font-size:clamp(38px,6vw,82px);font-weight:600;line-height:1.02;letter-spacing:-.03em;color:#fff;}
.hero-sub{font-size:clamp(16px,1.5vw,21px);color:rgba(255,255,255,.66);max-width:60ch;margin-top:26px;line-height:1.6;}
.hero-pills{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px;}
.hero-pill{font-family:'IBM Plex Mono',monospace;font-size:12.5px;letter-spacing:.05em;color:#fff;padding:8px 16px;border-radius:999px;border:1px solid;background:rgba(255,255,255,.04);}
.hero-cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:38px;}
.btn-primary{display:inline-flex;align-items:center;gap:9px;background:${C.teal};color:#fff;border:none;cursor:pointer;font-family:inherit;font-size:15px;font-weight:600;padding:15px 26px;border-radius:11px;transition:.25s;box-shadow:0 10px 30px rgba(0,163,163,.3);}
.btn-primary:hover{transform:translateY(-2px);background:#00b3b3;}
.btn-primary.lg{font-size:17px;padding:18px 32px;margin-top:36px;}
.btn-ghost{background:rgba(255,255,255,.06);color:#fff;border:1px solid rgba(255,255,255,.2);cursor:pointer;font-family:inherit;font-size:15px;font-weight:500;padding:15px 26px;border-radius:11px;transition:.25s;}
.btn-ghost:hover{background:rgba(255,255,255,.12);}
.hero-dash{margin-top:56px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:24px;backdrop-filter:blur(10px);max-width:880px;}
.hero-dash-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.live-dot{font-family:'IBM Plex Mono',monospace;font-size:11px;color:${C.green};letter-spacing:.1em;}
.hero-dash-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}
.metric-tile{}
.scroll-hint{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.4);animation:bob 2s infinite;z-index:2;}
@keyframes bob{0%,100%{transform:translate(-50%,0);}50%{transform:translate(-50%,8px);}}

/* cards */
.card-dark{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:26px;height:100%;transition:.3s;}
.card-dark:hover{border-color:rgba(0,163,163,.4);transform:translateY(-3px);}
.card-light{background:#fff;border:1px solid rgba(0,0,0,.06);border-radius:16px;padding:28px;height:100%;box-shadow:0 8px 30px rgba(7,26,47,.05);transition:.3s;}
.card-light:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(7,26,47,.1);}
.icon-chip{width:46px;height:46px;border-radius:12px;background:rgba(0,163,163,.12);display:flex;align-items:center;justify-content:center;}
.outcome-strip{display:flex;align-items:center;gap:16px;margin-top:32px;background:rgba(245,166,35,.08);border:1px solid rgba(245,166,35,.25);border-radius:14px;padding:22px 26px;color:rgba(255,255,255,.78);font-size:15.5px;line-height:1.55;}
.outcome-strip strong{color:#fff;}

/* vision */
.vision-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;margin-top:48px;}
.diagram-frame{background:linear-gradient(160deg,#04101f,${C.blue});border-radius:20px;padding:30px;border:1px solid rgba(0,163,163,.2);}
.pillar-mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:28px;}
.pillar-mini{background:#fff;border-radius:12px;padding:16px 18px;box-shadow:0 6px 20px rgba(7,26,47,.05);}

/* workflow */
.workflow{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:40px;}
.workflow-step{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:11px;padding:13px 18px;color:#fff;font-weight:500;font-size:14.5px;}
.workflow-step.light{background:#fff;border-color:rgba(0,0,0,.07);color:${C.navy};box-shadow:0 6px 18px rgba(7,26,47,.05);}
.workflow-num{width:24px;height:24px;border-radius:7px;background:${C.teal};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;}
.workflow-num.light{background:${C.navy};}
.workflow-arrow{color:rgba(255,255,255,.35);flex-shrink:0;}
.dash-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:15px;padding:22px;transition:.3s;}
.dash-card:hover{border-color:rgba(0,163,163,.4);}
.dash-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;}
.keymsg{display:flex;align-items:center;gap:16px;margin-top:36px;font-family:'Fraunces',serif;font-size:clamp(18px,2vw,26px);font-weight:500;line-height:1.4;padding:28px 32px;border-radius:16px;}
.keymsg.dark{background:rgba(0,163,163,.08);border:1px solid rgba(0,163,163,.25);color:#fff;}

/* demand map */
.demand-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;margin-top:48px;}
.map-frame{background:#fff;border-radius:20px;padding:24px;box-shadow:0 12px 40px rgba(7,26,47,.08);}
.map-legend{display:flex;gap:20px;flex-wrap:wrap;margin-top:14px;font-size:12.5px;color:${C.grey};}
.map-legend span{display:flex;align-items:center;gap:7px;}
.map-legend .dot{width:11px;height:11px;border-radius:50%;display:inline-block;}

/* schoolbridge */
.school-layout{display:grid;grid-template-columns:1.2fr 1fr;gap:48px;align-items:center;margin-top:48px;}
.module-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.module-chip{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:11px;padding:15px 16px;color:#fff;font-size:14.5px;font-weight:500;transition:.25s;}
.module-chip:hover{background:rgba(0,163,163,.1);border-color:rgba(0,163,163,.4);}
.device-mock{background:#0d2237;border-radius:18px;padding:14px;border:1px solid rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(0,0,0,.45);}
.device-bar{display:flex;gap:7px;padding:4px 6px 12px;}
.device-bar span{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.18);}
.device-screen{background:#081726;border-radius:12px;padding:20px;}
.ds-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;}
.ds-row{display:flex;justify-content:space-between;font-size:13.5px;color:rgba(255,255,255,.7);margin:14px 0 6px;}
.ds-bar{height:7px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;}
.ds-bar div{height:100%;border-radius:99px;}
.ds-foot{margin-top:18px;}

/* command */
.command-dash{margin-top:44px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:30px;backdrop-filter:blur(10px);}
.command-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;}
.command-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}
.cmd-tile{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:22px;}
.command-foot{margin-top:24px;}

/* attendance */
.att-grid{display:grid;grid-template-columns:1fr 1.3fr;gap:40px;margin-top:48px;align-items:start;}
.att-kpis{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.att-kpi{background:#fff;border-radius:15px;padding:24px;box-shadow:0 8px 26px rgba(7,26,47,.06);}
.att-chart{background:#fff;border-radius:18px;padding:24px;box-shadow:0 12px 40px rgba(7,26,47,.08);}
.ai-card{margin-top:32px;background:linear-gradient(135deg,${C.navy},${C.blue});border-radius:18px;padding:30px 34px;color:#fff;position:relative;overflow:hidden;}
.ai-card p{font-size:17px;line-height:1.6;max-width:70ch;margin:14px 0 16px;color:rgba(255,255,255,.85);}
.ai-card strong{color:${C.teal};}
.ai-badge{display:inline-flex;align-items:center;gap:8px;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.15em;color:${C.teal};background:rgba(0,163,163,.15);padding:6px 12px;border-radius:99px;}

/* comms */
.comm-flow{display:flex;align-items:center;gap:0;margin-top:44px;flex-wrap:wrap;}
.comm-node{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:16px 22px;color:#fff;font-weight:600;font-size:15px;}
.comm-line{flex:1;min-width:30px;height:2px;background:linear-gradient(90deg,${C.teal},rgba(0,163,163,.2));margin:0 4px;}
.channel-card{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:13px;padding:20px 22px;}

/* study */
.light-flow{margin-top:40px;}
.study-grid{display:grid;grid-template-columns:1.3fr 1fr;gap:36px;margin-top:44px;align-items:start;}
.study-chart{background:#fff;border-radius:18px;padding:24px;box-shadow:0 12px 40px rgba(7,26,47,.08);}
.study-cards{display:flex;flex-direction:column;gap:12px;}
.study-card{display:flex;align-items:center;gap:14px;background:#fff;border-radius:13px;padding:18px 20px;box-shadow:0 6px 20px rgba(7,26,47,.05);}

/* stakeholders */
.stake-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:48px;}
.stake-card{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:24px;transition:.3s;}
.stake-card:hover{transform:translateY(-3px);border-color:rgba(0,163,163,.4);}

/* roadmap */
.roadmap{margin-top:48px;display:flex;flex-direction:column;gap:8px;}
.road-step{display:flex;gap:24px;align-items:flex-start;background:#fff;border-radius:14px;padding:24px 28px;box-shadow:0 6px 22px rgba(7,26,47,.05);position:relative;}
.road-num{flex-shrink:0;width:44px;height:44px;border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;font-family:'IBM Plex Mono',monospace;}

/* pilot */
.pilot-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:30px;height:100%;position:relative;transition:.3s;}
.pilot-card.feat{background:rgba(0,163,163,.07);border-color:rgba(0,163,163,.4);transform:scale(1.02);}
.pilot-card:hover{transform:translateY(-4px);}
.pilot-card.feat:hover{transform:scale(1.02) translateY(-4px);}
.pilot-tag{position:absolute;top:-12px;left:30px;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;background:${C.teal};color:#fff;padding:5px 12px;border-radius:99px;}
.metrics-row{margin-top:44px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:28px 32px;}
.metrics-chips{display:flex;flex-wrap:wrap;gap:12px;}
.metric-chip{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:99px;padding:9px 16px;color:#fff;font-size:13.5px;}

/* security */
.sec-card{display:flex;align-items:center;gap:14px;background:#fff;border-radius:13px;padding:22px 24px;box-shadow:0 6px 20px rgba(7,26,47,.05);font-weight:600;color:${C.navy};font-size:14.5px;transition:.3s;}
.sec-card:hover{transform:translateY(-3px);box-shadow:0 14px 34px rgba(7,26,47,.1);}

/* closing */
.closing{background:${C.navy};text-align:center;padding:160px 0 0;position:relative;overflow:hidden;}
.closing-bg{position:absolute;inset:0;background:radial-gradient(800px 500px at 50% 0%,rgba(0,163,163,.2),transparent 60%),radial-gradient(600px 400px at 50% 100%,rgba(0,59,113,.5),transparent 70%),${C.navy};}
.closing-inner{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;}
.closing-quote{font-size:clamp(30px,5vw,62px);font-weight:500;line-height:1.18;color:#fff;letter-spacing:-.02em;margin:10px 0;}
.footer{margin-top:130px;border-top:1px solid rgba(255,255,255,.1);padding:40px 0;position:relative;z-index:2;}
.footer-inner{display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;}
.footer-brand{font-family:'Fraunces',serif;font-size:20px;font-weight:600;color:#fff;}
.footer-links{display:flex;gap:24px;flex-wrap:wrap;justify-content:center;color:rgba(255,255,255,.6);font-size:13.5px;}

/* responsive */
@media(max-width:980px){
  .nav-links{display:none;}
  .grid-3,.command-grid,.hero-dash-grid,.stake-grid{grid-template-columns:1fr 1fr;}
  .vision-grid,.demand-grid,.school-layout,.att-grid,.study-grid{grid-template-columns:1fr;}
  .att-kpis{grid-template-columns:1fr 1fr;}
}
@media(max-width:620px){
  .container{padding:0 22px;}
  .sec{padding:80px 0;}
  .grid-3,.command-grid,.hero-dash-grid,.stake-grid,.pillar-mini-grid{grid-template-columns:1fr;}
  .topnav{padding:12px 20px;}
  .present-bar .mono{min-width:120px;font-size:11px;}
}
`;
