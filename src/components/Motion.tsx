import { useEffect, useRef, useState, type ReactNode } from "react";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/** Fades and slides children up when scrolled into view. `delay` is in ms. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Counts up from 0 to `to` once visible. */
export function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced()) return setN(to);
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1400, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

const nodes: [number, number][] = [
  [80, 90], [220, 40], [360, 120], [520, 60], [680, 130], [820, 50], [960, 110],
  [140, 250], [300, 210], [470, 280], [640, 230], [800, 290], [940, 240],
];
const links: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 7], [1, 8], [2, 8], [3, 9], [4, 10],
  [5, 11], [6, 12], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [2, 9], [4, 11],
];

/** Drifting hexagon-network backdrop for the hero. */
export function NetworkBg() {
  return (
    <svg className="net" viewBox="0 0 1040 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="net-line" style={{ animationDelay: `${(i % 7) * 0.5}s` }} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3 : 2} className="net-node" style={{ animationDelay: `${(i % 5) * 0.6}s` }} />
      ))}
    </svg>
  );
}
