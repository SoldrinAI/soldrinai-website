import { site, capabilities } from "../data/site";
import { products } from "../data/products";
import { Logo } from "./Logo";
import { Reveal, CountUp, NetworkBg } from "./Motion";

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

export function Header() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Logo />
        <nav>
          <a href="#products">Products</a>
          <a href="#build">What I build</a>
          <a href="#about">About</a>
          <a href="#contact" className="btn sm">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export function Hero() {
  const { hero, stats, industries } = site;
  return (
    <section className="hero" id="top">
      <NetworkBg />
      <div className="wrap center hero-in">
        <p className="eyebrow">{site.tagline}</p>
        <h1>{hero.title}</h1>
        <p className="lead">{hero.subtitle}</p>
        <div className="cta">
          <a className="btn" href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
          <a className="btn ghost" href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
        </div>
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label}>
              <strong className="mono"><CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <div className="chips">
          {industries.map((i) => <span key={i} className="chip">{i}</span>)}
        </div>
      </div>
    </section>
  );
}

export function Products() {
  return (
    <section id="products">
      <div className="wrap">
        <Reveal><h2>Products</h2>
        <p className="sub">Ready to use, built to last.</p></Reveal>
        <div className="grid">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 120} className="grid-item"><article className="card">
              <span className={`pill ${p.status === "Coming soon" ? "warn" : "ok"}`}>{p.status}</span>
              <h3>{p.name}</h3>
              <p className="tag">{p.tagline}</p>
              <p>{p.description}</p>
              <ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              <div className="links">
                {p.links.map((l, i) => (
                  <a key={l.href} className={i === 0 ? "btn sm" : "btn sm ghost"} href={l.href} {...ext(l.href)}>
                    {l.label}
                  </a>
                ))}
              </div>
            </article></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section id="build" className="soft">
      <div className="wrap">
        <Reveal><h2>What I build</h2>
        <p className="sub">Custom systems for businesses, across industries.</p></Reveal>
        <Reveal>
          <div className="table">
            <div className="row head"><span>Domain</span><span>What I ship</span><span>Industry</span></div>
            {capabilities.map((c) => (
              <div className="row" key={c.domain}>
                <strong data-l="Domain">{c.domain}</strong>
                <span data-l="What I ship">{c.ships}</span>
                <span data-l="Industry">{c.industry}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  const { about } = site;
  return (
    <section id="about">
      <div className="wrap about">
        <Reveal>
          <h2>{about.title}</h2>
          {about.body.map((b) => <p key={b} className="lead">{b}</p>)}
        </Reveal>
        <div className="facts">
          {about.facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 100}>
              <div className="fact"><strong className="mono">{f.value}</strong><span>{f.label}</span></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { contact } = site;
  return (
    <section id="contact" className="soft">
      <div className="wrap narrow center">
        <Reveal>
          <h2>{contact.title}</h2>
          <p className="lead">{contact.body}</p>
          <div className="cta">
            {contact.links.map((l, i) => (
              <a key={l.href} className={i === 0 ? "btn" : "btn ghost"} href={l.href} {...ext(l.href)}>{l.label}</a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <Logo />
        <span>© {new Date().getFullYear()} {site.name}{site.nameAccent} · Mumbai, India</span>
      </div>
    </footer>
  );
}
