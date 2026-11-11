import { useEffect, useRef, useState, type ReactNode } from "react";

export const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useInView<T extends HTMLElement>() {
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

/** Cycles through words with a slide animation. */
export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.length]);
  return <span key={i} className="rot">{words[i]}</span>;
}

/** Endless horizontal ticker. */
export function Marquee({ items }: { items: string[] }) {
  const row = (k: string) => (
    <div className="mq-row" aria-hidden={k === "b"} key={k}>
      {items.map((t) => <span key={t}>{t}</span>)}
    </div>
  );
  return <div className="marquee">{row("a")}{row("b")}</div>;
}
