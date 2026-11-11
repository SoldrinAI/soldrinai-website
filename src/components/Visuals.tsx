import { useEffect, useState, type PointerEvent } from "react";
import { siPython, siJavascript, siFastapi, siOpenai, siRedis, siMongodb, siDocker, siAmazonwebservices, siStreamlit, siTableau, siWhatsapp } from "simple-icons";
import { site } from "../data/site";
import type { Demo } from "../data/products";
import { products } from "../data/products";
import { reduced } from "./Motion";

const icons: Record<string, JSX.Element> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  analytics: <path d="M5 20v-7M12 20V5M19 20v-10" />,
  vision: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  voice: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></>,
  edge: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  security: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  database: <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  cloud: <path d="M7 18a4 4 0 01-.5-8 5.5 5.5 0 0110.7 1A3.5 3.5 0 0117 18z" />,
  plug: <path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 01-12 0zM12 17v5" />,
  agent: <><circle cx="12" cy="12" r="3" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" /></>,
  docs: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></>,
  arrows: <path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4" />,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
};

export function CapIcon({ name, size = 26 }: { name: string; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

const brands: Record<string, { path: string; hex: string }> = {
  python: siPython, javascript: siJavascript, fastapi: siFastapi, openai: siOpenai, redis: siRedis,
  mongodb: siMongodb, docker: siDocker, aws: siAmazonwebservices, streamlit: siStreamlit, tableau: siTableau,
};

/** Brand logo in its own colour when we have one, otherwise a neutral line icon. */
export function SkillLogo({ logo }: { logo: string }) {
  const b = brands[logo];
  if (!b) return <CapIcon name={logo} size={18} />;
  return (
    <svg className="brand" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d={b.path} fill={`#${b.hex === "000000" ? "0f1722" : b.hex}`} />
    </svg>
  );
}

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d={siWhatsapp.path} fill="currentColor" /></svg>
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
    const t = setTimeout(() => {
      if (done) {
        setIdx((idx + 1) % items.length);
        setN(0);
      } else {
        setN(n + 1);
      }
    }, done ? 3200 : 55);
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
  if (demo.kind === "search") return <SearchDemo items={demo.items} />;
  if (demo.kind === "terminal") return <TerminalDemo lines={demo.lines} />;
  if (demo.kind === "image") {
    return (
      <div className="win img-win">
        <div className="win-bar"><i /><i /><i /><span>{demo.caption || "CINÉ Android TV"}</span></div>
        <div className="win-img-body">
          <img src={demo.src} alt={demo.caption || "Product preview"} className="win-demo-img" />
        </div>
      </div>
    );
  }
  return null;
}

// ─── Hero slide artwork ───────────────────────────────────────────────────────

/** Full-bleed slide art: hero network (existing visual, re-exported for slide use) */
export { HeroVisual as HeroNetworkArt };

/** Slide art: colourful abstract CTA artwork */
export function CtaArt() {
  return (
    <div className="slide-art" aria-hidden="true">
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {/* Background glow */}
        <radialGradient id="cta-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#12b4f3" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0b74c9" stopOpacity="0" />
        </radialGradient>
        <rect width="480" height="320" fill="url(#cta-glow)" rx="16" />

        {/* Chat bubbles */}
        <rect x="40" y="60" width="200" height="52" rx="16" fill="#eef6fc" stroke="#12b4f3" strokeWidth="1.5" />
        <text x="60" y="88" fontSize="13" fill="#0b74c9" fontFamily="Inter, sans-serif" fontWeight="500">Have a problem AI should solve?</text>
        <polygon points="60,112 76,112 68,124" fill="#eef6fc" stroke="#12b4f3" strokeWidth="1.5" strokeLinejoin="round" />

        <rect x="240" y="140" width="200" height="52" rx="16" fill="#0b74c9" />
        <text x="260" y="168" fontSize="13" fill="#fff" fontFamily="Inter, sans-serif" fontWeight="500">Tell me what you need →</text>
        <polygon points="420,192 436,192 428,204" fill="#0b74c9" />

        {/* Floating nodes */}
        <circle cx="400" cy="60" r="28" fill="#eef6fc" stroke="#12b4f3" strokeWidth="2" />
        <text x="400" y="65" textAnchor="middle" fontSize="20" fill="#12b4f3">🤝</text>

        <circle cx="80" cy="240" r="22" fill="#eef6fc" stroke="#0b74c9" strokeWidth="2" />
        <text x="80" y="246" textAnchor="middle" fontSize="16" fill="#0b74c9">💡</text>

        <circle cx="400" cy="240" r="22" fill="#eef6fc" stroke="#12b4f3" strokeWidth="2" />
        <text x="400" y="246" textAnchor="middle" fontSize="16" fill="#12b4f3">🚀</text>

        {/* Connecting lines */}
        <line x1="80" y1="218" x2="240" y2="168" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="400" y1="88" x2="440" y2="140" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />

        {/* Stats chips */}
        <rect x="150" y="240" width="88" height="28" rx="14" fill="#0b74c9" />
        <text x="194" y="258" textAnchor="middle" fontSize="11" fill="#fff" fontFamily="Inter, sans-serif" fontWeight="600">57 projects</text>
        <rect x="252" y="240" width="104" height="28" rx="14" fill="#12b4f3" />
        <text x="304" y="258" textAnchor="middle" fontSize="11" fill="#fff" fontFamily="Inter, sans-serif" fontWeight="600">₹8 cr+ value</text>
      </svg>
    </div>
  );
}

/** Dispatch the right visual for each hero slide. */
export function HeroSlideVisual({ visual, image, alt }: { visual: string; image?: string; alt?: string }) {
  if (image) {
    return (
      <div className="hero-artwork-card">
        <div className="hero-artwork-media">
          <img src={image} alt={alt || "SoldrinAI visual"} className="hero-artwork-img" loading="eager" />
        </div>
        {visual === "search-demo" && (
          <div className="artwork-floating-badge badge-search">
            <CapIcon name="search" size={16} />
            <span>"red SUV under 15 lakh" · <b>98% match</b></span>
          </div>
        )}
        {visual === "rag-demo" && (
          <div className="artwork-floating-badge badge-search">
            <CapIcon name="chat" size={16} />
            <span>Answers from your files · <b>runs in your browser</b></span>
          </div>
        )}
        {visual === "kaanan-demo" && (
          <div className="artwork-floating-badge badge-security">
            <CapIcon name="security" size={16} />
            <span>Security audit · <b>SAST &amp; VAPT</b></span>
          </div>
        )}
        {visual === "cine-demo" && (
          <div className="artwork-floating-badge badge-cine">
            <CapIcon name="layers" size={16} />
            <span>Smart TV OS · <b>10-Foot UI</b></span>
          </div>
        )}
        {visual === "hero-network" && (
          <div className="artwork-floating-badge badge-network">
            <CapIcon name="layers" size={16} />
            <span>57 systems in production</span>
          </div>
        )}
        {visual === "cta-art" && (
          <div className="artwork-floating-badge badge-collab">
            <CapIcon name="chat" size={16} />
            <span>Consulting & Deployment</span>
          </div>
        )}
      </div>
    );
  }
  if (visual === "search-demo") return <ProductDemo demo={products[0].demo} />;
  if (visual === "kaanan-demo") return <ProductDemo demo={products[1].demo} />;
  if (visual === "hero-network") return <HeroVisual />;
  if (visual === "cta-art") return <CtaArt />;
  return <HeroVisual />;
}
