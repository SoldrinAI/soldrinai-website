// ADD A PRODUCT: append one object to this array. The grid renders it automatically.

export interface Product {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  status: "Live" | "Open source" | "Coming soon";
  links: { label: string; href: string }[];
}

export const products: Product[] = [
  {
    name: "Smart Search",
    tagline: "Search your spreadsheet like you'd ask a colleague.",
    description:
      "Upload a CSV or Excel file and find the right rows in plain language. It understands what you mean and still catches exact terms, so nothing slips through.",
    highlights: [
      "Ask in your own words, no filters or formulas",
      "Results in seconds, ranked by relevance",
      "Your uploaded file is never stored",
    ],
    status: "Live",
    links: [
      { label: "Try it", href: "https://soldrin-search.vercel.app/" },
      { label: "Source", href: "https://github.com/SoldrinAI/soldrin-smart-search" },
    ],
  },
  {
    name: "Kaanan",
    tagline: "Security testing that reads your code like an attacker.",
    description:
      "An open-source command-line tool that scans your code and running apps for vulnerabilities, and explains what to fix first.",
    highlights: [
      "One install: pip install kaanan",
      "Works with cloud or fully local models",
      "Built for developers, not just security teams",
    ],
    status: "Open source",
    links: [
      { label: "PyPI", href: "https://pypi.org/project/kaanan/" },
      { label: "Source", href: "https://github.com/SoldrinAI/kaanan" },
    ],
  },
];
