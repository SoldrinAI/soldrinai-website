import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { site } from "../data/site";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./Visuals";

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

function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div><Logo /><p>{site.tagline}</p></div>
        <nav>
          {site.nav.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          <Link to="/contact">Contact</Link>
        </nav>
        <span>© {new Date().getFullYear()} {site.name}{site.nameAccent} · Mumbai, India</span>
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
