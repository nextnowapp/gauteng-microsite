import React, { useState, useEffect, useRef } from "react";
import { SOURCES } from "./src/data/sources.js";
import { GAUTENG_METRICS } from "./src/data/gautengEducationData.js";
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
  { id: "yearround", label: "Year-Round" },
  { id: "school", label: "SchoolBridge" },
  { id: "apps", label: "Apps" },
  { id: "province", label: "ProvinceBridge" },
  { id: "attendance", label: "Attendance" },
  { id: "comms", label: "Communication" },
  { id: "study", label: "StudyBridge" },
  { id: "stakeholders", label: "Stakeholders" },
  { id: "roadmap", label: "Roadmap" },
  { id: "pilot", label: "Pilot" },
  { id: "security", label: "Security" },
  { id: "sources", label: "Sources" },
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

function SourceBadge({ source, dark }) {
  if (!source) return null;
  if (dark) {
    return (
      <span className="mono" style={{
        fontSize: 10, letterSpacing: ".07em", color: "rgba(255,255,255,.45)",
        border: "1px solid rgba(255,255,255,.12)", borderRadius: 99, padding: "2px 8px",
      }}>{source}</span>
    );
  }
  return (
    <div className="mono" style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 10.5, letterSpacing: ".06em", color: C.grey, marginTop: 10,
    }}>
      <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.teal, display: "inline-block", flexShrink: 0 }} />
      {source}
    </div>
  );
}

function EvidencePanel({ children, title }) {
  return (
    <div style={{
      background: "rgba(0,163,163,.04)", border: "1px solid rgba(0,163,163,.18)",
      borderRadius: 18, padding: "28px 32px", marginTop: 36,
    }}>
      {title && (
        <div className="mono" style={{
          fontSize: 11, letterSpacing: ".16em", color: C.teal,
          textTransform: "uppercase", marginBottom: 20,
        }}>{title}</div>
      )}
      {children}
    </div>
  );
}

function SourceList({ sources }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {sources.map(s => (
        <div key={s.id} className="source-card">
          <div style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>{s.title}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 6, alignItems: "center", flexWrap: "wrap" }}>
            <span className="mono" style={{ fontSize: 11, color: C.teal }}>{s.publisher}</span>
            <span className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>· {s.date}</span>
          </div>
          {s.keyFacts && (
            <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
              {s.keyFacts.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>
                  <span style={{ color: C.teal, flexShrink: 0, marginTop: 2 }}>›</span>{f}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── ecosystem radial diagram ──────────────────────────────────────── */
function EcosystemDiagram() {
  const nodes = [
    { label: "Parents",   icon: "👨‍👩‍👧" },
    { label: "Teachers",  icon: "🎓" },
    { label: "Schools",   icon: "🏫" },
    { label: "Districts", icon: "📍" },
    { label: "Province",  icon: "🏛️" },
    { label: "Partners",  icon: "🤝" },
  ];
  const cx = 300, cy = 300, R = 210;
  return (
    <svg viewBox="0 0 600 600" style={{ width: "100%", height: "auto" }}>
      {/* outer ring */}
      <circle cx={cx} cy={cy} r={R + 10} fill="none" stroke="rgba(0,163,163,.12)" strokeWidth="1" />
      {/* spoke lines */}
      {nodes.map((_, i) => {
        const a = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
        return (
          <line key={i}
            x1={cx + 68 * Math.cos(a)} y1={cy + 68 * Math.sin(a)}
            x2={cx + (R - 54) * Math.cos(a)} y2={cy + (R - 54) * Math.sin(a)}
            stroke="rgba(0,163,163,.45)" strokeWidth="1.5" strokeDasharray="4 6" />
        );
      })}
      {/* centre glow */}
      <circle cx={cx} cy={cy} r="90" fill={C.teal} opacity=".08" />
      <circle cx={cx} cy={cy} r="70" fill={C.teal} opacity=".14" />
      <circle cx={cx} cy={cy} r="58" fill={C.teal} />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="Hanken Grotesk">Learner</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,.8)" fontFamily="IBM Plex Mono" letterSpacing="2">at the centre</text>
      {/* node circles */}
      {nodes.map((n, i) => {
        const a = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
        const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
        return (
          <g key={n.label}>
            <circle cx={x} cy={y} r="54" fill="rgba(0,163,163,.18)" stroke="rgba(0,163,163,.6)" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="54" fill="rgba(7,26,47,.55)" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="Hanken Grotesk">{n.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Gauteng abstract region map ───────────────────────────────────── */
const REGIONS = [
  { name: "Tshwane", heat: "Medium", util: 72, x: 150, y: 30, w: 200, h: 110 },
  { name: "Ekurhuleni", heat: "High", util: 94, x: 330, y: 150, w: 150, h: 120 },
  { name: "JHB East", heat: "High", util: 91, x: 130, y: 155, w: 185, h: 110 },
  { name: "West Rand", heat: "Available", util: 58, x: 20, y: 175, w: 95, h: 95 },
  { name: "Sedibeng", heat: "Available", util: 52, x: 175, y: 285, w: 160, h: 90 },
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
  { region: "Ekurhuleni", demand: 94 },
  { region: "JHB East", demand: 91 },
  { region: "Tshwane", demand: 72 },
  { region: "West Rand", demand: 58 },
  { region: "Sedibeng", demand: 52 },
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
          <div className="brand-mark">BP</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: ".01em" }}>Bridge Platforms</div>
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
            <h1 className="serif hero-title">Building Africa's Most<br /><span style={{ color: C.teal }}>Connected</span> Education Digital Platform</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="hero-sub">Transforming Gauteng education through digital intelligence, real-time data and learner-centred innovation — one integrated platform from the classroom to the Provincial command centre.</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="hero-pills">
              {["SchoolBridge", "ProvinceBridge", "AdmissionBridge", "StudyBridge", "PayBridge", "StudentBridge", "StaffBridge"].map((p, i) => (
                <span key={p} className="hero-pill" style={{ borderColor: [C.teal, C.gold, C.green, "#5aa9e6", "#9b59b6", "#3b82f6", "#f97316"][i] }}>{p}</span>
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
                <span className="mono" style={{ fontSize: 11, letterSpacing: ".15em", color: C.teal }}>GAUTENG EDUCATION · REAL SCALE DATA</span>
                <span className="live-dot" style={{ color: C.gold }}>● VERIFIED</span>
              </div>
              <div className="hero-dash-grid">
                <MetricTile value={GAUTENG_METRICS.learnerScale.totalEnrolled} label="Learners in Gauteng sector" accent={C.teal} sub="GDE NCOP Briefing · 2025" />
                <MetricTile value={GAUTENG_METRICS.admissions2026.totalPlaced} label="Grade 1 & 8 placed for 2026" accent={C.green} sub="SA Government · Mar 2026" />
                <MetricTile value={GAUTENG_METRICS.admissions2026.yearsOnline} label="Years of online admissions" accent={C.gold} sub="GDE Online Admissions · 2015–2025" />
                <MetricTile value={GAUTENG_METRICS.admissions2026.newSchoolsAnnounced} label="New schools announced" accent="#5aa9e6" sub="High-pressure areas · 2026" />
              </div>
              <div style={{ marginTop: 14 }}>
                <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,.38)", letterSpacing: ".07em" }}>
                  Sources: GDE NCOP Briefing (Mar 2025) · SA Government (Mar 2026) · GDE Online Admissions
                </span>
              </div>
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
            <ChallengeCard icon={TrendingUp} title="Rapid learner growth" body="Gauteng public school enrolment grew 70.4% from 1995 to 2025, reaching 2.36M learners — with ~2% annual growth continuing. Demand planning must keep pace." delay={0} />
            <ChallengeCard icon={Building2} title="Capacity constraints" body="Not all applicants can be placed in preferred schools. Satellite schools provided 4,417 additional spaces in 2025 while longer-term builds are completed." delay={60} />
            <ChallengeCard icon={Bell} title="Late applications" body="33,650 applications — 8.5% of the 2026 total — were submitted after the closing date, compressing school capacity planning and reducing parent choice." delay={120} />
            <ChallengeCard icon={AlertTriangle} title="High-pressure districts" body="At the January 2026 snapshot, Ekurhuleni had 3,169 and Johannesburg East had 1,173 learners still unplaced — concentrated pressure in specific regions." delay={180} />
            <ChallengeCard icon={FileText} title="Placement appeals" body="6,736 appeals were lodged during the 2026 admissions cycle — adding administrative burden and indicating unmet placement preferences at scale." delay={240} />
            <ChallengeCard icon={Eye} title="Preference mismatch" body="When preferred schools are full, learners are placed in the next closest school with available space. Earlier demand intelligence reduces this friction." delay={300} />
          </div>
          <Reveal delay={120}>
            <div className="outcome-strip">
              <AlertTriangle size={22} color={C.gold} />
              <span><strong>392,224 learners placed for 2026</strong> — yet 6,736 appeals and 33,650 late applications show the system still operates under reactive annual pressure rather than proactive year-round intelligence. <span className="mono" style={{ fontSize: 10, opacity: .7 }}>Source: SA Government · Mar 2026</span></span>
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
                    { n: "PayBridge", a: "#9b59b6", d: "School fee collection & payment management" },
                    { n: "StudentBridge", a: "#3b82f6", d: "Learner app — reports, progress & school life" },
                    { n: "StaffBridge", a: "#f97316", d: "Staff app — dashboard, attendance & events" },
                  ].map((p, i) => (
                    <div key={p.n} className="pillar-mini" style={{ borderLeft: `3px solid ${p.a}`, gridColumn: i === 6 ? "span 2" : undefined }}>
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
          <Reveal delay={60}><h2 className="serif sec-title light">Predict. Plan. Place. Perform.</h2></Reveal>
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
              { l: "Learners placed for 2026", v: GAUTENG_METRICS.admissions2026.totalPlaced, a: C.teal, ic: CheckCircle2, src: "SA Gov · Mar 2026" },
              { l: "Late applications (2026)", v: GAUTENG_METRICS.admissions2026.lateApplications, a: C.gold, ic: Bell, src: "SA Gov · Mar 2026" },
              { l: "Placement rate — complete applications", v: GAUTENG_METRICS.admissions2026.placementRatePct, suf: "%", a: C.green, ic: Gauge, src: "GDE · 10-yr avg" },
              { l: "Unplaced at Jan 2026 snapshot", v: GAUTENG_METRICS.januarySnapshot.totalUnplaced, a: "#e07a5f", ic: AlertTriangle, src: "SAnews · Jan 2026" },
              { l: "Appeals lodged (2026 cycle)", v: GAUTENG_METRICS.januarySnapshot.appealsLodged, a: "#5aa9e6", ic: FileText, src: "SAnews · Jan 2026" },
              { l: "Years of GDE Online Admissions", v: GAUTENG_METRICS.admissions2026.yearsOnline, a: C.teal, ic: TrendingUp, src: "GDE · 2015–2025" },
            ].map((m, i) => (
              <Reveal key={m.l} delay={i * 60}>
                <div className="dash-card">
                  <div className="dash-card-top"><m.ic size={18} color={m.a} /><SourceBadge source={m.src} dark /></div>
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
                <div style={{ marginTop: 10 }}>
                  <SourceBadge source="Based on SAnews Jan 2026 placement reporting" />
                  <div style={{ marginTop: 8, fontSize: 11.5, color: C.grey, lineHeight: 1.5, fontStyle: "italic" }}>
                    District pressure indicators should be refreshed with live GDE data during implementation.
                  </div>
                </div>
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

      {/* ── NEW: WHY YEAR-ROUND ── */}
      <section id="yearround" className="sec dark">
        <div className="container">
          <Reveal><Kicker dark>Admissions Intelligence</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title light">Why admissions must<br />become year-round.</h2></Reveal>
          <Reveal delay={100}><p className="sec-lead light">Annual application windows concentrate placement pressure into weeks. AdmissionBridge is designed to build continuous admissions intelligence — making next year's demand visible months ahead, not days before it peaks.</p></Reveal>

          <div className="grid-3" style={{ marginTop: 44 }}>
            {[
              {
                icon: Bell, color: C.gold,
                title: "Compressed annual windows create peaks",
                body: `The 2026 GDE application window ran 24 July – 29 August 2025 — five weeks. 33,650 applications arrived after it closed, reducing family choice and making late-stage capacity adjustments harder.`,
                source: "SA Government · Mar 2026",
              },
              {
                icon: Users, color: C.teal,
                title: "Late applications reduce school choice",
                body: "Parents who apply late face reduced options because schools fill progressively. Earlier demand visibility lets GDE manage expectations and guide families before preferred schools reach capacity.",
                source: "GDE Online Admissions · 2026",
              },
              {
                icon: Building2, color: C.blue,
                title: "Capacity constraints force compromise",
                body: "When preferred schools are full, learners are placed in the next closest school with available space. 4,417 satellite school spaces were added in 2025 to relieve high-pressure areas.",
                source: "GDE · February 2025",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="card-dark" style={{ borderTop: `3px solid ${c.color}` }}>
                  <div className="icon-chip"><c.icon size={20} color={c.color} /></div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "14px 0 8px" }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.6 }}>{c.body}</p>
                  <SourceBadge source={c.source} dark />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <EvidencePanel title="AdmissionBridge — intelligence signals">
              <div className="yr-signals">
                {[
                  "Grade R progression → Grade 1 demand forecast",
                  "Grade 7 transition → Grade 8 demand forecast",
                  "Catchment area demand modelling by district",
                  "School capacity tracking and utilisation rates",
                  "Late application trend analysis and early warning",
                  "Appeals and objection pattern detection",
                  "Infrastructure pipeline data integration",
                ].map((s, i) => (
                  <div key={i} className="yr-signal">
                    <CheckCircle2 size={15} color={C.teal} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 14, color: C.navy }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(245,166,35,.07)", borderRadius: 10, border: "1px solid rgba(245,166,35,.18)" }}>
                <p style={{ fontSize: 12.5, color: C.grey, lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
                  AdmissionBridge is designed to complement — not replace — existing GDE admissions systems. District pressure indicators shown in this presentation are based on public January 2026 placement reporting and would be refreshed with live GDE data during implementation.
                </p>
              </div>
            </EvidencePanel>
          </Reveal>
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
                  { n: "Report Card", ic: BarChart3 }, { n: "Parent App", ic: Smartphone },
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

      {/* ── STUDENTBRIDGE & STAFFBRIDGE ── */}
      <section id="apps" className="sec light">
        <div className="container">
          <Reveal><Kicker>Mobile Apps</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title">In every parent's pocket.<br />In every teacher's hand.</h2></Reveal>
          <Reveal delay={100}><p className="sec-lead">StudentBridge and StaffBridge put the school in the palm of your hand — personalised for each role, connected to the same live data that principals and the Province see.</p></Reveal>

          <div className="apps-grid" style={{ marginTop: 56 }}>

            {/* StudentBridge */}
            <Reveal delay={120}>
              <div className="app-panel" style={{ borderTop: `4px solid #3b82f6` }}>
                <div className="app-panel-header">
                  <div>
                    <div className="mono" style={{ fontSize: 11, letterSpacing: ".15em", color: "#3b82f6", textTransform: "uppercase" }}>StudentBridge</div>
                    <h3 className="serif" style={{ fontSize: 28, fontWeight: 600, color: C.navy, margin: "8px 0 10px" }}>Everything about<br />your school life.</h3>
                    <p style={{ fontSize: 14, color: C.grey, lineHeight: 1.65 }}>Access reports, track progress, connect with school activities — all in one place, built for learners.</p>
                  </div>
                </div>
                <div className="app-features">
                  {[
                    { label: "Term report cards", detail: "Download instantly — Term 1, 2, 3 & 4", color: "#3b82f6" },
                    { label: "Report Card Analysis", detail: "Multi-subject progress charts across terms", color: "#3b82f6" },
                    { label: "Learner profile", detail: "Learner, parents, siblings in one view", color: "#3b82f6" },
                    { label: "Fees statements", detail: "Full fee history and account balance", color: "#3b82f6" },
                    { label: "School info", detail: "SGB, management, background & contacts", color: "#3b82f6" },
                    { label: "School resources", detail: "Documents, past papers & study materials", color: "#3b82f6" },
                  ].map((f) => (
                    <div key={f.label} className="app-feature-row">
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color, flexShrink: 0, marginTop: 5 }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: C.navy }}>{f.label}</div>
                        <div style={{ fontSize: 12.5, color: C.grey, marginTop: 2 }}>{f.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Phone mockup */}
                <div className="sb-phone-wrap">
                  <div className="sb-phone">
                    <div className="sb-phone-island" />
                    <div className="sb-phone-screen" style={{ background: "#f8faff" }}>
                      <div style={{ background: "#1e40af", padding: "12px 14px 10px", color: "#fff" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 11, fontWeight: 700 }}>Learner Profile</span>
                          <span style={{ fontSize: 9, opacity: .75 }}>17:40</span>
                        </div>
                      </div>
                      <div style={{ padding: "10px 12px", display: "flex", gap: 6, overflowX: "auto", borderBottom: "1px solid #e5e7eb" }}>
                        {["Learner", "Parent 1", "Report", "Analysis"].map((t, i) => (
                          <span key={t} style={{ fontSize: 9.5, padding: "4px 8px", borderRadius: 99, whiteSpace: "nowrap", background: i === 2 ? "#1e40af" : "#f1f5f9", color: i === 2 ? "#fff" : "#64748b", fontWeight: i === 2 ? 700 : 400 }}>{t}</span>
                        ))}
                      </div>
                      <div style={{ padding: "10px 12px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>2025 Report</div>
                        {[["Term 1", "Results published: 22/04/2025"], ["Term 2", "Results published: 24/07/2025"], ["Term 4", "Results published: 19/12/2025"]].map(([term, date]) => (
                          <div key={term} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", borderRadius: 8, padding: "8px 10px", marginBottom: 5, boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
                            <div>
                              <div style={{ fontSize: 11, fontWeight: 600, color: "#1e293b" }}>{term}</div>
                              <div style={{ fontSize: 9.5, color: "#3b82f6", marginTop: 1 }}>{date}</div>
                            </div>
                            <div style={{ width: 24, height: 24, borderRadius: 6, background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ color: "#fff", fontSize: 11 }}>↓</span>
                            </div>
                          </div>
                        ))}
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", margin: "10px 0 6px" }}>2024 Report</div>
                        {[["Term 2", "Results published: 02/08/2024"], ["Term 3", "Results published: 02/10/2024"]].map(([term, date]) => (
                          <div key={term} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", borderRadius: 8, padding: "8px 10px", marginBottom: 5, boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
                            <div>
                              <div style={{ fontSize: 11, fontWeight: 600, color: "#1e293b" }}>{term}</div>
                              <div style={{ fontSize: 9.5, color: "#3b82f6", marginTop: 1 }}>{date}</div>
                            </div>
                            <div style={{ width: 24, height: 24, borderRadius: 6, background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ color: "#fff", fontSize: 11 }}>↓</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* StaffBridge */}
            <Reveal delay={200}>
              <div className="app-panel" style={{ borderTop: `4px solid #f97316` }}>
                <div className="app-panel-header">
                  <div>
                    <div className="mono" style={{ fontSize: 11, letterSpacing: ".15em", color: "#f97316", textTransform: "uppercase" }}>StaffBridge</div>
                    <h3 className="serif" style={{ fontSize: 28, fontWeight: 600, color: C.navy, margin: "8px 0 10px" }}>Everything in<br />one app.</h3>
                    <p style={{ fontSize: 14, color: C.grey, lineHeight: 1.65 }}>A complete school management companion for teachers and staff — from attendance to events to province connectivity.</p>
                  </div>
                </div>
                <div className="app-features">
                  {[
                    { label: "School dashboard", detail: "Live attendance, logins and school stats", color: "#f97316" },
                    { label: "School directory", detail: "Full staff, learner and parent directory", color: "#f97316" },
                    { label: "Attendance tracking", detail: "Mark and view attendance in real time", color: "#f97316" },
                    { label: "Communication", detail: "Send and receive school-wide messages", color: "#f97316" },
                    { label: "Events calendar", detail: "School events + district events in one view", color: "#f97316" },
                    { label: "Province connectivity", detail: "Linked to ProvinceBridge for district visibility", color: "#f97316" },
                  ].map((f) => (
                    <div key={f.label} className="app-feature-row">
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color, flexShrink: 0, marginTop: 5 }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: C.navy }}>{f.label}</div>
                        <div style={{ fontSize: 12.5, color: C.grey, marginTop: 2 }}>{f.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Phone mockup */}
                <div className="sb-phone-wrap">
                  <div className="sb-phone">
                    <div className="sb-phone-island" />
                    <div className="sb-phone-screen" style={{ background: "#fff" }}>
                      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "10px 12px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: "#1e293b", letterSpacing: ".02em" }}>BENDOR HIGH</div>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: "#fff", fontSize: 8, fontWeight: 700 }}>3</span>
                        </div>
                      </div>
                      <div style={{ padding: "8px 12px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 10 }}>
                          <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 10px", color: "#fff" }}>
                            <div style={{ fontSize: 9, opacity: .7 }}>Hello, System</div>
                            <div style={{ fontSize: 10, fontWeight: 700, marginTop: 2 }}>March 14</div>
                          </div>
                          <div style={{ background: "#eff6ff", borderRadius: 8, padding: "8px 10px" }}>
                            <div style={{ fontSize: 9, color: "#3b82f6" }}>Sandton</div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#1e293b" }}>12.3°C</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>Quick Access</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5 }}>
                          {["Directory", "Attendance", "Comms", "Our Staff", "Documents", "Events"].map((item) => (
                            <div key={item} style={{ background: "#f8fafc", borderRadius: 7, padding: "7px 4px", textAlign: "center", border: "1px solid #e2e8f0" }}>
                              <div style={{ fontSize: 8.5, color: "#475569", fontWeight: 500, lineHeight: 1.3 }}>{item}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: 10, background: "#fff7ed", borderRadius: 8, padding: "8px 10px", border: "1px solid #fed7aa" }}>
                          <div style={{ fontSize: 9.5, fontWeight: 700, color: "#92400e", marginBottom: 5 }}>Upcoming Events</div>
                          <div style={{ fontSize: 9, color: "#78350f" }}>21 Mar — Human Rights Day</div>
                          <div style={{ fontSize: 9, color: "#78350f", marginTop: 3 }}>27 Mar — Term 1 Ends</div>
                        </div>
                      </div>
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-around", padding: "6px 0" }}>
                        {["School", "Staff", "Events", "Community"].map((t, i) => (
                          <div key={t} style={{ textAlign: "center" }}>
                            <div style={{ width: 16, height: 16, borderRadius: 4, background: i === 2 ? "#f97316" : "#e2e8f0", margin: "0 auto 2px" }} />
                            <div style={{ fontSize: 7.5, color: i === 2 ? "#f97316" : "#94a3b8", fontWeight: i === 2 ? 700 : 400 }}>{t}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
                <span className="mono" style={{ letterSpacing: ".15em", color: C.teal, fontSize: 12 }}>PROVINCEBRIDGE · GAUTENG EDUCATION COMMAND</span>
                <span className="live-dot" style={{ color: C.gold }}>● REAL DATA</span>
              </div>
              <div className="command-grid">
                {[
                  { l: "Learners in Gauteng sector", v: GAUTENG_METRICS.learnerScale.totalEnrolled, a: C.teal },
                  { l: "Grade 1 & 8 placed (2026)", v: GAUTENG_METRICS.admissions2026.totalPlaced, a: C.green },
                  { l: "Online placement rate", v: GAUTENG_METRICS.admissions2026.placementRatePct, suf: "%", a: C.gold },
                  { l: "Late applications (2026 cycle)", v: GAUTENG_METRICS.admissions2026.lateApplications, a: "#5aa9e6" },
                  { l: "Unplaced at Jan 2026 snapshot", v: GAUTENG_METRICS.januarySnapshot.totalUnplaced, a: "#e07a5f" },
                  { l: "Appeals lodged", v: GAUTENG_METRICS.januarySnapshot.appealsLodged, a: C.teal },
                  { l: "New schools announced", v: GAUTENG_METRICS.admissions2026.newSchoolsAnnounced, a: C.green },
                  { l: "Satellite school spaces added", v: GAUTENG_METRICS.capacity.satelliteSpaces, a: "#5aa9e6" },
                ].map((m) => (
                  <div key={m.l} className="cmd-tile">
                    <Stat value={m.v} suffix={m.suf || ""} decimals={m.dec || 0} label={m.l} accent={m.a} dark />
                  </div>
                ))}
              </div>
              <div className="command-foot">
                <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: ".07em" }}>
                  Sources: GDE NCOP Briefing (Mar 2025) · SA Government (Mar 2026) · SAnews (Jan 2026) · GDE (Feb 2025)
                </span>
              </div>
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

      {/* ── SOURCES ── */}
      <section id="sources" className="sec dark">
        <div className="container">
          <Reveal><Kicker dark>Public Data Sources</Kicker></Reveal>
          <Reveal delay={60}><h2 className="serif sec-title light">Evidence Base</h2></Reveal>
          <Reveal delay={100}><p className="sec-lead light">All key metrics in this presentation are drawn from publicly available South African government and education authority data. No figures are fabricated or extrapolated without citation.</p></Reveal>
          <Reveal delay={160}>
            <div style={{ marginTop: 44 }}>
              <SourceList sources={SOURCES} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 15. CLOSING ── */}
      <section id="closing" className="sec closing">
        <div className="closing-bg" />
        <div className="container closing-inner">
          <Reveal><Kicker dark>Gauteng Education 2030</Kicker></Reveal>
          <Reveal delay={80}>
            <blockquote className="serif closing-quote">
              "Every learner connected. Every parent engaged.<br />Every staff empowered. Every school visible.<br /><span style={{ color: C.teal }}>Every decision informed by data.</span>"
            </blockquote>
          </Reveal>
          <Reveal delay={200}>
            <button className="btn-primary lg" onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}>
              Let's build Africa's most connected education digital platform <ArrowRight size={18} />
            </button>
          </Reveal>
        </div>
        <footer className="footer">
          <div className="container footer-inner">
            <div className="footer-brand">Bridge Platforms</div>
            <div className="footer-links">
              {["SchoolBridge", "ProvinceBridge", "AdmissionBridge", "StudyBridge", "PayBridge", "StudentBridge", "StaffBridge"].map((p) => <span key={p}>{p}</span>)}
            </div>
            <div className="mono" style={{ fontSize: 11, opacity: .5, maxWidth: "72ch", textAlign: "center", lineHeight: 1.6 }}>This presentation uses publicly available data from Gauteng Department of Education, South African Government, SAnews, and parliamentary briefing materials. Operational deployment would require official GDE data integration and validation. AdmissionBridge is designed to complement — not replace — existing GDE admissions systems.</div>
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

/* apps section */
.apps-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:start;}
.app-panel{background:#fff;border-radius:20px;padding:32px;box-shadow:0 12px 40px rgba(7,26,47,.07);display:flex;flex-direction:column;gap:24px;}
.app-panel-header{}
.app-features{display:flex;flex-direction:column;gap:10px;}
.app-feature-row{display:flex;align-items:flex-start;gap:12px;padding:10px 14px;background:#f8fafc;border-radius:10px;}
.sb-phone-wrap{display:flex;justify-content:center;margin-top:4px;}
.sb-phone{width:180px;background:#1e293b;border-radius:28px;padding:10px;box-shadow:0 20px 50px rgba(7,26,47,.25);position:relative;}
.sb-phone-island{width:48px;height:11px;background:#0f172a;border-radius:99px;margin:0 auto 8px;}
.sb-phone-screen{border-radius:18px;overflow:hidden;height:340px;position:relative;}
@media(max-width:980px){.apps-grid{grid-template-columns:1fr;}}

/* source cards */
.source-card{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:22px 26px;transition:.3s;}
.source-card:hover{border-color:rgba(0,163,163,.35);transform:translateY(-2px);}

/* year-round signals */
.yr-signals{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.yr-signal{display:flex;align-items:flex-start;gap:10px;padding:11px 14px;background:#fff;border-radius:10px;box-shadow:0 3px 12px rgba(7,26,47,.05);}

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
  .yr-signals{grid-template-columns:1fr;}
}
`;
