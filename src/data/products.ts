// ADD A PRODUCT: append one object to this array. The list, detail page and home page pick it up.

export type Demo =
  | { kind: "search"; items: { q: string; rows: { t: string; s: number }[] }[] }
  | { kind: "terminal"; lines: { c: "cmd" | "out" | "warn" | "ok"; t: string }[] }
  | { kind: "image"; src: string; caption?: string };

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
    image: "/images/smartsearch-ui.png",
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
    slug: "rag-chatbot",
    name: "RAG Chatbot",
    tagline: "Chat with your own documents, privately.",
    image: "/images/rag-chatbot-chat.png",
    description:
      "Upload a PDF, Word, Excel, CSV or text file and ask questions in plain words. SoldrinAI finds the right passages, and a small AI model runs right in your browser to answer, so your documents are never stored.",
    highlights: [
      "PDF, Word, Excel, CSV, TXT and Markdown, up to 4 MB",
      "Finds passages by meaning and by exact term, then cites its sources",
      "The AI model runs on your device: nothing to install, delete it any time",
      "Pick from five models, from a 230 MB quick start to a 1.8 GB high-accuracy option",
    ],
    steps: [
      { title: "Upload", body: "Drop in a document. Spreadsheets are read one row at a time; long documents are split by topic." },
      { title: "Choose a model", body: "Pick a model size. Smaller loads faster, larger answers more accurately. The download happens once." },
      { title: "Ask", body: "Ask in your own words and get a short answer with the source passages underneath." },
    ],
    status: "Live",
    links: [
      { label: "Try it live", href: "https://soldrinai-rag-chatbot.vercel.app/" },
      { label: "Source code", href: "https://github.com/SoldrinAI/SoldrinAI-rag-chatbot" },
    ],
    demo: {
      kind: "image",
      src: "/images/rag-chatbot-setup.png",
      caption: "Upload a file, choose a model, then ask questions. Answer quality depends on the model you pick.",
    },
  },
  {
    slug: "kaanan",
    name: "Kaanan",
    tagline: "Security testing that reads your code like an attacker.",
    image: "/images/kaanan-terminal.png",
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
        { c: "cmd", t: "kaanan scan --dir ./my-app" },
        { c: "out", t: "Reading 142 files..." },
        { c: "out", t: "Tracing user input to dangerous calls..." },
        { c: "warn", t: "HIGH  SQL built from user input  api/orders.py:58" },
        { c: "warn", t: "MED   Secret left in config      settings.py:12" },
        { c: "ok", t: "2 findings. Fix suggestions ready." },
      ],
    },
  },
  {
    slug: "cine",
    name: "CINÉ",
    tagline: "A cinematic, luxury Android TV launcher for Sony Bravia and Android TV.",
    image: "/images/cine-tv-home.png",
    description:
      "A remote-first, jewelry-gold smart TV interface designed for the 10-foot couch experience. Features live PackageManager app discovery, custom focus feedback, cinematic previews, and zero permissions or telemetry.",
    highlights: [
      "Built for the 10-foot experience on 1920×1080 canvas",
      "Full remote D-pad navigation with gold focus treatment",
      "Live discovery of installed apps (Netflix, Prime, YouTube)",
      "Zero permissions, zero network, zero telemetry",
    ],
    steps: [
      { title: "Install", body: "Sideload the APK onto your Android TV or Sony Bravia." },
      { title: "Browse", body: "Use your TV remote D-pad to navigate apps, continue watching, and shelves." },
      { title: "Customize", body: "Tailor wallpapers, UI scale, accent colors, and favorites in local settings." },
    ],
    status: "Open source",
    links: [
      { label: "Source code", href: "https://github.com/SoldrinAI/cine-android-tv-launcher" },
    ],
    demo: {
      kind: "image",
      src: "/images/cine-tv-home.png",
      caption: "CINÉ Android TV Home Screen (1920×1080 canvas)",
    },
  },
];
