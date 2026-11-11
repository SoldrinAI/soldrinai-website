// ADD A PRODUCT: append one object to this array. The list, detail page and home page pick it up.

export type Demo =
  | { kind: "search"; items: { q: string; rows: { t: string; s: number }[] }[] }
  | { kind: "terminal"; lines: { c: "cmd" | "out" | "warn" | "ok"; t: string }[] };

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  steps: { title: string; body: string }[];
  status: "Live" | "Open source" | "Coming soon";
  links: { label: string; href: string }[];
  demo: Demo;
  image?: string;
}

export const products: Product[] = [
  {
    slug: "smart-search",
    name: "Smart Search",
    tagline: "Search your spreadsheet like you'd ask a colleague.",
    image: "/images/hero-search.jpg",
    description:
      "Upload a CSV or Excel file and find the right rows in plain language. It understands what you mean and still catches exact terms, so nothing slips through.",
    highlights: [
      "Ask in your own words, no filters or formulas",
      "Results in seconds, ranked by relevance",
      "Your uploaded file is never stored",
    ],
    steps: [
      { title: "Upload", body: "Drop in a CSV or Excel file. Up to 1,000 rows." },
      { title: "Ask", body: "Type what you're looking for, the way you'd say it out loud." },
      { title: "Get answers", body: "The best matches rise to the top, with a score for each." },
    ],
    status: "Live",
    links: [
      { label: "Try it live", href: "https://soldrin-search.vercel.app/" },
      { label: "Source code", href: "https://github.com/SoldrinAI/soldrin-smart-search" },
    ],
    demo: {
      kind: "search",
      items: [
        { q: "red SUV under 15 lakh", rows: [{ t: "Tata Nexon · Red · 12.4 L", s: 98 }, { t: "Hyundai Venue · Red · 11.9 L", s: 94 }, { t: "Kia Sonet · Maroon · 13.1 L", s: 87 }] },
        { q: "overdue invoices from Pune", rows: [{ t: "INV-2041 · Pune · 38 days late", s: 97 }, { t: "INV-1988 · Pune · 21 days late", s: 93 }, { t: "INV-2107 · Pimpri · 12 days late", s: 78 }] },
        { q: "pump spares for the older model", rows: [{ t: "Seal kit P-220 · Legacy range", s: 96 }, { t: "Impeller IM-18 · Series 1", s: 91 }, { t: "Gasket G-07 · Series 1", s: 84 }] },
      ],
    },
  },
  {
    slug: "kaanan",
    name: "Kaanan",
    tagline: "Security testing that reads your code like an attacker.",
    image: "/images/hero-security.jpg",
    description:
      "An open-source command-line tool that scans your code and running apps for vulnerabilities, and explains what to fix first.",
    highlights: [
      "One install: pip install kaanan",
      "Works with cloud or fully local models",
      "Built for developers, not just security teams",
    ],
    steps: [
      { title: "Install", body: "One command from PyPI. Nothing else to set up." },
      { title: "Scan", body: "Point it at your code or a running app and let it probe." },
      { title: "Fix", body: "Get findings ranked by risk, with plain-language guidance." },
    ],
    status: "Open source",
    links: [
      { label: "View on PyPI", href: "https://pypi.org/project/kaanan/" },
      { label: "Source code", href: "https://github.com/SoldrinAI/kaanan" },
    ],
    demo: {
      kind: "terminal",
      lines: [
        { c: "cmd", t: "pip install kaanan" },
        { c: "cmd", t: "kaanan scan ./my-app" },
        { c: "out", t: "Reading 142 files..." },
        { c: "out", t: "Tracing user input to dangerous calls..." },
        { c: "warn", t: "HIGH  SQL built from user input  api/orders.py:58" },
        { c: "warn", t: "MED   Secret left in config      settings.py:12" },
        { c: "ok", t: "2 findings. Fix suggestions ready." },
      ],
    },
  },
];
