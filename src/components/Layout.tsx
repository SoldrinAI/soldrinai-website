import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { site } from "../data/site";
import { products } from "../data/products";
import { Logo } from "./Logo";
import { WhatsAppIcon, BrandIcon } from "./Visuals";

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Logo />
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
        <nav className={open ? "open" : ""}>
          {site.nav.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
          <Link to="/contact" className="btn sm">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

const footImgs = [
  "india-kerala",
  "india-rajasthan",
  "india-himachal",
  "india-goa",
  "india-meghalaya",
  "india-kashmir",
  "india-tamilnadu",
  "india-uttarakhand",
  "india-ladakh",
  "india-karnataka",
];

function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div className="foot-brand">
          <Logo />
          <p>{site.tagline}</p>
          <p className="in-badge"><span className="in-dot" />{site.india.badge}</p>
          <p className="foot-h">Find us at</p>
          <div className="socials">
            {site.contact.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" aria-label={l.label}><BrandIcon name={l.label} /></a>
            ))}
          </div>
          <address className="foot-addr">
            © {new Date().getFullYear()} {site.name}{site.nameAccent}. All rights reserved.
            <br /><br />Carter Road, Bandra West,
            <br />Mumbai, 400050
          </address>
        </div>
        <div className="foot-col">
          <h4>Products</h4>
          {products.map((p) => <Link key={p.slug} to={`/products/${p.slug}`}>{p.name}</Link>)}
          <Link to="/products">All products</Link>
        </div>
        <div className="foot-col">
          <h4>Try it live</h4>
          {products.flatMap((p) => p.links.filter((l) => l.label === "Try it live").map((l) => <a key={p.slug} href={l.href} target="_blank" rel="noreferrer">{p.name}</a>))}
          <h4 className="gap">Open source</h4>
          {products.flatMap((p) => p.links.filter((l) => l.label === "Source code").map((l) => <a key={p.slug} href={l.href} target="_blank" rel="noreferrer">{p.name}</a>))}
        </div>
        <div className="foot-col">
          <h4>What I build</h4>
          <Link to="/work">Smart search</Link>
          <Link to="/work">Smart TV &amp; 10-foot UI</Link>
          <Link to="/work">Websites &amp; web apps</Link>
          <Link to="/work">Computer vision &amp; voice AI</Link>
          <Link to="/work">AI security</Link>
          <Link to="/work">Enterprise chat &amp; RAG</Link>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/work">What I build</Link>
          <Link to="/contact">Contact</Link>
          <a href={site.whatsapp.href} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://www.linkedin.com/in/yaohan-fernandes/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/SoldrinAI" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <div className="wrap">
        <div className="foot-mark" aria-hidden="true">
          {footImgs.map((n, i) => (
            <img key={n} src={`/images/${n}.jpg`} alt="" loading="lazy" decoding="async" style={{ animationDelay: `${i * 4}s` }} />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Header />
      <main key={pathname} className="page"><Outlet /></main>
      <Footer />
      <a className="wa-fab" href={site.whatsapp.href} target="_blank" rel="noreferrer" aria-label={site.whatsapp.label}>
        <WhatsAppIcon />
        <span>{site.whatsapp.label}</span>
      </a>
    </>
  );
}
