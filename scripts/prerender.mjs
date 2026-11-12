// Post-build: write a crawlable HTML file per route (own title, description, canonical,
// Open Graph, JSON-LD and plain-text content) so search engines don't need to run JS.
import { createServer } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = "https://www.soldrinai.com";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const { products } = await vite.ssrLoadModule("/src/data/products.ts");
await vite.close();

const base = readFileSync("dist/index.html", "utf8");
const DEFAULT_DESC = "SoldrinAI is an Indian AI company, based in Mumbai, building production search, analytics, vision, voice and security products for real businesses. By Yaohan Fernandes.";

const org = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${ORIGIN}/#org`, name: "SoldrinAI", alternateName: "Soldrin AI", url: `${ORIGIN}/`,
      logo: `${ORIGIN}/favicon-512.png`, description: DEFAULT_DESC,
      founder: { "@type": "Person", name: "Yaohan Fernandes" },
      address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
      areaServed: "IN",
      sameAs: ["https://github.com/SoldrinAI", "https://www.linkedin.com/in/yaohan-fernandes/"] },
    { "@type": "WebSite", "@id": `${ORIGIN}/#site`, name: "SoldrinAI", url: `${ORIGIN}/`, publisher: { "@id": `${ORIGIN}/#org` } },
  ],
};

const pages = [
  { path: "", title: "SoldrinAI · Production AI, not demos", desc: DEFAULT_DESC, jsonld: org,
    body: `<h1>SoldrinAI: Production AI, not demos</h1><p>${esc(DEFAULT_DESC)}</p><h2>Products</h2><ul>${products.map((p) => `<li><a href="/products/${p.slug}">${esc(p.name)}</a>: ${esc(p.tagline)}</li>`).join("")}</ul>` },
  { path: "products", title: "Products · SoldrinAI", desc: "SoldrinAI products: Smart Search, RAG Chatbot, Kaanan and Cine. Production AI built for real businesses.",
    body: `<h1>SoldrinAI Products</h1><ul>${products.map((p) => `<li><a href="/products/${p.slug}">${esc(p.name)}</a>: ${esc(p.description)}</li>`).join("")}</ul>` },
  ...products.map((p) => ({
    path: `products/${p.slug}`, title: `${p.name} · SoldrinAI`, desc: `${p.name} by SoldrinAI. ${p.description}`,
    body: `<h1>${esc(p.name)} by SoldrinAI</h1><p>${esc(p.tagline)}</p><p>${esc(p.description)}</p><ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>`,
  })),
  { path: "work", title: "What I build · SoldrinAI", desc: "What SoldrinAI builds: hybrid search, RAG assistants, computer vision, voice AI, Smart TV interfaces and AI security, shipped to production.",
    body: "<h1>What SoldrinAI builds</h1><p>SoldrinAI ships hybrid search, RAG assistants, computer vision, voice AI, Smart TV interfaces and AI security, shipped to production.</p>" },
  { path: "about", title: "About · SoldrinAI", desc: "About SoldrinAI: the Indian AI company of Yaohan Fernandes in Mumbai, building production AI products and systems for real businesses.",
    body: "<h1>About SoldrinAI</h1><p>SoldrinAI is the studio of Yaohan Fernandes, building production AI products and systems for real businesses.</p>" },
  { path: "contact", title: "Contact · SoldrinAI", desc: "Contact SoldrinAI to build production AI for your business. Reach Yaohan Fernandes on LinkedIn, GitHub or WhatsApp.",
    body: "<h1>Contact SoldrinAI</h1><p>Reach Yaohan Fernandes on LinkedIn or GitHub.</p>" },
];

for (const p of pages) {
  const url = `${ORIGIN}/${p.path}`;
  const head = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.desc)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="SoldrinAI" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.desc)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ORIGIN}/images/hero-systems.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    p.jsonld ? `<script type="application/ld+json">${JSON.stringify(p.jsonld)}</script>` : "",
  ].filter(Boolean).join("\n    ");
  let html = base
    .replace(/<title>.*?<\/title>\s*/s, "")
    .replace(/<meta name="description"[^>]*>\s*/, "")
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${p.body}</div>`);
  const out = p.path ? `dist/${p.path}/index.html` : "dist/index.html";
  if (p.path) mkdirSync(`dist/${p.path}`, { recursive: true });
  writeFileSync(out, html);
}
console.log(`prerendered ${pages.length} pages`);
