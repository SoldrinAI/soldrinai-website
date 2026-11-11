import { site } from "../data/site";

export function Mark({ size = 28 }: { size?: number }) {
  const outer = [[32, 10], [51, 21], [51, 43], [32, 54], [13, 43], [13, 21]];
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 10l19 11v22L32 54 13 43V21z" fill="none" stroke="var(--cyan)" strokeWidth="2" />
      {outer.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <line x1="32" y1="32" x2={x} y2={y} stroke="var(--cyan)" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="3" fill="#fff" stroke="var(--cyan)" strokeWidth="1.5" />
        </g>
      ))}
      <circle cx="32" cy="32" r="5" fill="var(--cyan)" />
    </svg>
  );
}

export function Logo() {
  return (
    <a className="logo" href="#top">
      <Mark />
      <span>
        {site.name}
        <b>{site.nameAccent}</b>
      </span>
    </a>
  );
}
