// All site-wide copy and links live here. Edit this file, not the components.

export const site = {
  name: "Soldrin",
  nameAccent: "AI",
  tagline: "Production AI, not demos.",
  hero: {
    title: "AI that works in the real world",
    subtitle:
      "I design and ship AI products for businesses: search that understands intent, analytics you can talk to, vision that spots problems, and voice that speaks your customers' language.",
    primaryCta: { label: "See the products", href: "#products" },
    secondaryCta: { label: "Work with me", href: "#contact" },
  },
  stats: [
    { value: 57, prefix: "", suffix: "", label: "systems delivered" },
    { value: 8, prefix: "Rs. ", suffix: " crore+", label: "enterprise value created" },
    { value: 4, prefix: "", suffix: "", label: "industries served" },
  ],
  industries: ["Automotive", "Consumer electronics", "Industrial", "Finance / NBFC"],
  about: {
    title: "One engineer, the full cycle",
    body: [
      "I'm Yaohan, an AI product manager and data scientist based in Mumbai. Over 6 years I've moved from business analysis and data operations into building AI that runs in production, from hybrid search and talk-to-your-data analytics to vision, voice and security tools.",
      "I own the whole journey: scoping the problem with your team, designing the architecture, building it, shipping it, and supporting it after launch. I translate business problems into technical systems, and technical limits back into plain language.",
    ],
    facts: [
      { value: "6+ yrs", label: "across analytics, product and AI delivery" },
      { value: "MSc AI", label: "Royal Holloway, University of London" },
      { value: "BE CS", label: "Xavier Institute of Engineering, Mumbai" },
      { value: "7s → 2.6s → 400ms", label: "search latency cut for a vehicle platform" },
    ],
  },
  contact: {
    title: "Let's build something that ships",
    body: "Open to full-time roles, contract engagements and consulting in AI engineering, agentic systems and forward-deployment work.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/yaohan-fernandes/" },
      { label: "GitHub", href: "https://github.com/SoldrinAI" },
    ],
  },
};

export const capabilities = [
  { domain: "Smart search", ships: "Search that finds the right answer by meaning and by exact term, fast and permission-aware.", industry: "Automotive" },
  { domain: "Talk-to-your-data analytics", ships: "Ask business questions in plain language and get accurate, role-safe numbers.", industry: "Consumer electronics" },
  { domain: "Computer vision", ships: "Detection and visual search pipelines that catch what people miss.", industry: "Industrial, consumer electronics" },
  { domain: "Voice AI", ships: "Natural multilingual voice agents, including Hinglish.", industry: "Industrial" },
  { domain: "Edge AI and hardware", ships: "Sensors, actuators and on-device vision working together.", industry: "IoT, industrial" },
  { domain: "AI security", ships: "Automated code and application security testing.", industry: "Open source, cross-industry" },
  { domain: "Enterprise chat and RAG", ships: "Assistants that answer from your own documents, with memory.", industry: "Finance / NBFC, internal tools" },
  { domain: "Enterprise AI architecture", ships: "Cloud and on-prem designs that plug into your existing systems.", industry: "Automotive, industrial" },
];
