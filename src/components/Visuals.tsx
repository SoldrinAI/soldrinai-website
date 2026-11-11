import { useEffect, useState, type PointerEvent } from "react";
import { site } from "../data/site";
import type { Demo } from "../data/products";
import { reduced } from "./Motion";

const icons: Record<string, JSX.Element> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  analytics: <path d="M5 20v-7M12 20V5M19 20v-10" />,
  vision: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  voice: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></>,
  edge: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  security: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
};

export function CapIcon({ name, size = 26 }: { name: string; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

/** Hexagon network with floating cards that follow the pointer. */
export function HeroVisual() {
  const pts = Array.from({ length: 6 }, (_, k) => {
    const a = ((-90 + 60 * k) * Math.PI) / 180;
    return [260 + 170 * Math.cos(a), 260 + 170 * Math.sin(a)];
  });
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    e.currentTarget.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  return (
    <div className="hv" onPointerMove={move}>
      <svg className="hv-svg" viewBox="0 0 520 520" aria-hidden="true">
        <circle cx="260" cy="260" r="235" className="ring r1" />
        <circle cx="260" cy="260" r="205" className="ring r2" />
        <path d={`M${pts.map((p) => p.join(",")).join("L")}Z`} className="hex" />
        {pts.map(([x, y], i) => (
          <g key={i}>
            <line x1="260" y1="260" x2={x} y2={y} className="spoke" style={{ animationDelay: `${i * 0.4}s` }} />
            <circle cx={x} cy={y} r="9" className="onode" style={{ animationDelay: `${i * 0.35}s` }} />
          </g>
        ))}
        <circle cx="260" cy="260" r="26" className="pulse" />
        <circle cx="260" cy="260" r="16" className="core" />
      </svg>
      {site.hero.cards.map((c, i) => (
        <div key={c.label} className={`fcard fc${i + 1}`}>
          <span className="fc-i"><CapIcon name={c.icon} size={18} /></span>
          <div><b>{c.label}</b><small>{c.text}</small></div>
        </div>
      ))}
    </div>
  );
}

function SearchDemo({ items }: { items: Extract<Demo, { kind: "search" }>["items"] }) {
  const [idx, setIdx] = useState(0);
  const [n, setN] = useState(reduced() ? items[0].q.length : 0);
  const cur = items[idx];
  const done = n >= cur.q.length;
  useEffect(() => {
    if (reduced()) return;
    const t = setTimeout(
      () => (done ? (setIdx((idx + 1) % items.length), setN(0)) : setN(n + 1)),
      done ? 3200 : 55,
    );
    return () => clearTimeout(t);
  }, [n, done, idx, items.length]);
  return (
    <div className="win">
      <div className="win-bar"><i /><i /><i /><span>Smart Search</span></div>
      <div className="win-body">
        <div className="sbar"><CapIcon name="search" size={18} /><span>{cur.q.slice(0, n)}<em className="caret" /></span></div>
        <div className="rows" key={`${idx}-${done}`}>
          {done && cur.rows.map((r, i) => (
            <div className="res" key={r.t} style={{ animationDelay: `${i * 140}ms` }}>
              <span>{r.t}</span>
              <span className="bar"><u style={{ width: `${r.s}%`, animationDelay: `${i * 140 + 150}ms` }} /></span>
              <b className="mono">{r.s}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TerminalDemo({ lines }: { lines: Extract<Demo, { kind: "terminal" }>["lines"] }) {
  const [n, setN] = useState(reduced() ? lines.length : 0);
  useEffect(() => {
    if (reduced()) return;
    const t = setTimeout(() => setN(n >= lines.length ? 0 : n + 1), n >= lines.length ? 3200 : 650);
    return () => clearTimeout(t);
  }, [n, lines.length]);
  return (
    <div className="win term">
      <div className="win-bar"><i /><i /><i /><span>terminal</span></div>
      <div className="win-body">
        {lines.slice(0, n).map((l, i) => (
          <p key={i} className={`ln ${l.c}`}>{l.c === "cmd" ? "$ " : ""}{l.t}</p>
        ))}
        <span className="caret" />
      </div>
    </div>
  );
}

export function ProductDemo({ demo }: { demo: Demo }) {
  return demo.kind === "search" ? <SearchDemo items={demo.items} /> : <TerminalDemo lines={demo.lines} />;
}
