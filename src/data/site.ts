// All site-wide copy, links and page content live here. Edit this file, not the components.
// To add a hero slide: append an entry to site.heroSlides.
// To add a testimonial: append an entry to site.testimonials.

const wa = { number: "919833644917", message: "Hi Yaohan, I found you through your website." };
const waLink = `https://wa.me/${wa.number}?text=${encodeURIComponent(wa.message)}`;

export const site = {
  whatsapp: { href: waLink, label: "Chat on WhatsApp" },
  name: "Soldrin",
  nameAccent: "AI",
  tagline: "Production AI, not demos.",
  india: { badge: "Made in India" },
  nav: [
    { label: "Products", to: "/products" },
    { label: "What I build", to: "/work" },
    { label: "About", to: "/about" },
  ],
  hero: {
    pill: "Indian AI company · Made in India",
    lead: "AI that",
    words: ["finds the answer", "speaks your language", "spots the problem", "protects your code", "answers from your documents", "powers your Smart TV"],
    subtitle:
      "I design and ship production AI products, modern websites, and 10-foot Smart TV interfaces: natural search that understands intent, a chatbot that answers from your own documents, code security scanners, analytics you can talk to, and TV launchers built for the remote.",
    primaryCta: { label: "Explore products", to: "/products" },
    secondaryCta: { label: "Work with me", to: "/contact" },
    cards: [
      { icon: "search", label: "Smart search", text: "\"red SUV under 15 lakh\" · 98% match" },
      { icon: "voice", label: "Voice AI", text: "Hinglish, in the customer's own tone" },
      { icon: "vision", label: "Vision", text: "Safety gear detected, shift 2" },
    ],
  },
  stats: [
    { value: 57, prefix: "", suffix: "", label: "systems delivered" },
    { value: 8, prefix: "Rs. ", suffix: " crore+", label: "enterprise value created" },
    { value: 4, prefix: "", suffix: "", label: "industries served" },
  ],
  marquee: ["Hybrid search", "Smart TV UI", "Website design", "Talk-to-your-data", "RAG assistants", "Computer vision", "Voice AI", "Agentic systems", "Edge AI", "AI security", "MCP integrations"],
  industries: ["Automotive", "Consumer electronics", "Industrial", "Finance / NBFC", "Entertainment"],
  home: {
    featured: { eyebrow: "Featured product", cta: "See how it works" },
    rail: { title: "Everything I build", sub: "From search to security. Pick a domain to see what ships.", cta: "See all work" },
    process: {
      title: "How a project runs",
      steps: [
        { title: "Scope", body: "We pin down the real problem and what success looks like, in plain language." },
        { title: "Design", body: "I architect a system that fits your data, your people and your existing tools." },
        { title: "Build", body: "Hands-on engineering with working versions in your hands early and often." },
        { title: "Ship and support", body: "Production rollout, monitoring and fixes after launch, not a hand-off and goodbye." },
      ],
    },
    cta: { title: "Have a problem AI should solve?", body: "Tell me about it. I'll tell you honestly if AI is the right answer.", label: "Start a conversation" },
  },
  pages: {
    products: { title: "Products", sub: "Ready to use, built to last." },
    work: { title: "What I build", sub: "Custom systems for businesses, across industries. Filter by sector." },
    about: { title: "About", sub: "The person behind the products." },
    contact: { title: "Contact", sub: "Open to roles, contracts and consulting." },
  },

  /** Hero slides – one object per slide shown in the full-width home carousel.
   *  visual: a key that maps to a visual component in Visuals.tsx.
   *  cta: primary CTA for this slide.
   *  pill (optional): small eyebrow label above the headline. */
  heroSlides: [
    {
      pill: "Live application",
      headline: "Search that gets what you mean",
      body: "Smart Search understands intent, not just keywords. Drop in a spreadsheet and query natural language to get ranked semantic matches in seconds.",
      cta: { label: "Try Smart Search", to: "/products/smart-search" },
      visual: "search-demo",
      image: "/images/smartsearch-ui.png",
    },
    {
      pill: "Live application",
      headline: "Chat with your own documents, privately",
      body: "Upload a PDF, Word, Excel, CSV or text file and ask questions in plain words. The AI model runs in your browser, so your files are never stored. Choose the model size that suits you.",
      cta: { label: "Explore RAG Chatbot", to: "/products/rag-chatbot" },
      visual: "rag-demo",
      image: "/images/rag-chatbot-chat.png",
    },
    {
      pill: "Open source CLI",
      headline: "Security testing that reads your code like an attacker",
      body: "Kaanan scans code and running apps for vulnerabilities with AI-driven SAST & VAPT, generating instant executive PDF reports.",
      cta: { label: "See Kaanan", to: "/products/kaanan" },
      visual: "kaanan-demo",
      image: "/images/kaanan-terminal.png",
    },
    {
      pill: "Smart TV OS",
      headline: "CINÉ — Luxury Android TV UI & Launcher",
      body: "Remote-first, jewelry-gold interface designed for the 10-foot couch experience on Sony Bravia and Android TV. Live app discovery, custom focus feedback, and zero telemetry.",
      cta: { label: "Explore CINÉ", to: "/products/cine" },
      visual: "cine-demo",
      image: "/images/cine-tv-home.png",
    },
    {
      pill: "Design & Engineering",
      headline: "Websites and interfaces built for performance",
      body: "From production AI web applications and data dashboards to 10-foot Smart TV interfaces — I design and engineer clean, responsive digital products.",
      cta: { label: "Start a conversation", to: "/contact" },
      visual: "cta-art",
      image: "/images/hero-collab.jpg",
    },
  ],

  /** Testimonials – leave empty to hide the section. */
  testimonials: [] as Array<{ quote: string; name: string; role: string }>,
  about: {
    intro: [
      "SoldrinAI is an Indian AI company, founded and run from Mumbai. I'm Yaohan, an AI product manager, data scientist, and interface designer based in Mumbai, India. Over 6 years I've moved from business analysis and data operations into building AI that runs in production — from hybrid search and talk-to-your-data analytics to vision, voice, security tools, modern web design, and Smart TV interfaces.",
      "I own the whole journey: scoping the problem with your team, designing the interface and system architecture, building it, shipping it, and supporting it after launch. I translate business problems into technical systems, and technical limits back into plain language.",
    ],
    facts: [
      { value: "6+ yrs", label: "across analytics, product and AI delivery" },
      { value: "MSc AI", label: "Royal Holloway, University of London" },
      { value: "BE CS", label: "Xavier Institute of Engineering, Mumbai" },
      { value: "7s → 2.6s → 400ms", label: "search latency cut for a vehicle platform" },
    ],
    timelineTitle: "The journey",
    timeline: [
      { when: "2024 – now", role: "AI Product Manager and Data Scientist", what: "Taking AI projects from proof of concept to production across automotive, banking and power. Hybrid search, talk-to-your-data analytics, vision, voice and an open-source security tool." },
      { when: "2022 – 2024", role: "Data and Operations Support, UK", what: "Built analytical tools and kept case data clean so teams could plan services from evidence." },
      { when: "2019", role: "Procurement Analyst", what: "Cleaned and visualised spend data that led to real cost savings for clients." },
      { when: "2017 – 2019", role: "Business Analyst", what: "Tracked weekly profit per product with Excel and SQL, and grew sales through vendor platforms." },
    ],
    educationTitle: "Education",
    education: [
      { degree: "MSc Artificial Intelligence", place: "Royal Holloway, University of London", note: "Machine learning, NLP, deep learning, autonomous systems" },
      { degree: "BE Computer Science", place: "Xavier Institute of Engineering, Mumbai", note: "Distributed databases, big data, security, AI" },
    ],
    skillsTitle: "Toolbox",
    skills: [
      { name: "Python", logo: "python" }, { name: "SQL", logo: "database" }, { name: "JavaScript", logo: "javascript" },
      { name: "FastAPI", logo: "fastapi" }, { name: "Agentic AI", logo: "agent" }, { name: "MCP", logo: "plug" },
      { name: "RAG", logo: "docs" }, { name: "LLMs", logo: "chat" }, { name: "OpenAI", logo: "openai" },
      { name: "Azure OpenAI", logo: "cloud" }, { name: "Qdrant", logo: "database" }, { name: "Redis", logo: "redis" },
      { name: "MongoDB", logo: "mongodb" }, { name: "Docker", logo: "docker" }, { name: "AWS", logo: "aws" },
      { name: "Azure", logo: "cloud" }, { name: "WebSocket", logo: "arrows" }, { name: "Streamlit", logo: "streamlit" },
      { name: "Tableau", logo: "tableau" },
    ],
  },
  contact: {
    body: "Open to full-time roles, contract engagements and consulting in AI engineering, agentic systems and forward-deployment work. Based in Mumbai, India.",
    links: [
      { label: "WhatsApp", note: "Chat with me directly", href: waLink },
      { label: "LinkedIn", note: "Best way to reach me", href: "https://www.linkedin.com/in/yaohan-fernandes/" },
      { label: "GitHub", note: "Code and open source", href: "https://github.com/SoldrinAI" },
    ],
    openTo: ["Full-time roles", "Contract engagements", "Consulting", "Forward-deployment work"],
  },
};

export interface Capability {
  icon: string;
  domain: string;
  ships: string;
  example: string;
  industries: string[];
}

export const capabilities: Capability[] = [
  { icon: "search", domain: "Smart search", ships: "Search that finds the right answer by meaning and by exact term, fast and permission-aware.", example: "A commercial-vehicle search engine that understands what buyers mean.", industries: ["Automotive"] },
  { icon: "layers", domain: "Smart TV & 10-Foot UI design", ships: "Cinematic, remote-first TV interfaces and Android TV launchers built for 4K displays, smooth D-pad navigation and instant focus states.", example: "CINÉ, a luxury Android TV launcher with custom typography and zero permissions.", industries: ["Consumer electronics", "Entertainment"] },
  { icon: "docs", domain: "Website & web application design", ships: "High-performance, typography-led web applications, landing platforms, and data tools designed for speed and clarity.", example: "SoldrinAI platform, Smart Search web app, and client portals.", industries: ["Consumer electronics", "Automotive", "Enterprise"] },
  { icon: "analytics", domain: "Talk-to-your-data analytics", ships: "Ask business questions in plain language and get accurate, role-safe numbers.", example: "A sales analytics assistant where every user only sees the data they're allowed to.", industries: ["Consumer electronics"] },
  { icon: "vision", domain: "Computer vision", ships: "Detection and visual search pipelines that catch what people miss.", example: "Safety-gear detection taken through four generations of models into production.", industries: ["Industrial", "Consumer electronics"] },
  { icon: "voice", domain: "Voice AI", ships: "Natural multilingual voice agents, including Hinglish.", example: "A phone-line voice agent tuned to sound natural, not scripted.", industries: ["Industrial"] },
  { icon: "edge", domain: "Edge AI and hardware", ships: "Sensors, actuators and on-device vision working together.", example: "Published research on microcontroller sensing and movement control.", industries: ["Industrial"] },
  { icon: "security", domain: "AI security", ships: "Automated code and application security testing.", example: "Kaanan, an open-source security scanner on PyPI.", industries: ["Open source"] },
  { icon: "chat", domain: "Enterprise chat and RAG", ships: "Assistants that answer from your own documents, with memory.", example: "An HR assistant that answers staff questions from company policy.", industries: ["Finance / NBFC"] },
  { icon: "cloud", domain: "Enterprise AI architecture", ships: "Cloud and on-prem designs that plug into your existing systems.", example: "Procurement analytics wired into existing enterprise systems.", industries: ["Automotive", "Industrial"] },
];
