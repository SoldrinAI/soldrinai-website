import { Link } from "react-router-dom";
import { site, capabilities } from "../data/site";
import { products } from "../data/products";
import { CountUp, Marquee, Reveal, RotatingWord } from "../components/Motion";
import { CapIcon, HeroVisual, ProductDemo } from "../components/Visuals";

export default function Home() {
  const { hero, stats, industries, home } = site;
  const featured = products[0];
  return (
    <>
      <section className="hero dots">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{site.tagline}</p>
            <h1>{hero.lead}<br /><RotatingWord words={hero.words} /></h1>
            <p className="lead">{hero.subtitle}</p>
            <div className="cta">
              <Link className="btn" to={hero.primaryCta.to}>{hero.primaryCta.label}</Link>
              <Link className="btn ghost" to={hero.secondaryCta.to}>{hero.secondaryCta.label}</Link>
            </div>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <strong className="mono"><CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} /></strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Marquee items={site.marquee.map((label) => ({ label }))} />

      <section>
        <div className="wrap split">
          <Reveal>
            <p className="eyebrow">{home.featured.eyebrow}</p>
            <h2>{featured.name}</h2>
            <p className="tag">{featured.tagline}</p>
            <p className="muted">{featured.description}</p>
            <Link className="btn" to={`/products/${featured.slug}`}>{home.featured.cta}</Link>
          </Reveal>
          <Reveal delay={150}><ProductDemo demo={featured.demo} /></Reveal>
        </div>
      </section>

      <section className="soft">
        <div className="wrap">
          <Reveal>
            <div className="head-row">
              <div><h2>{home.rail.title}</h2><p className="muted">{home.rail.sub}</p></div>
              <Link className="btn ghost" to="/work">{home.rail.cta}</Link>
            </div>
          </Reveal>
        </div>
        <div className="rail">
          {capabilities.map((c) => (
            <Link to="/work" className="rcard" key={c.domain}>
              <span className="ic"><CapIcon name={c.icon} /></span>
              <h3>{c.domain}</h3>
              <p>{c.ships}</p>
            </Link>
          ))}
        </div>
        <div className="wrap chips">
          {industries.map((i) => <span key={i} className="chip">{i}</span>)}
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><h2 className="center">{home.process.title}</h2></Reveal>
          <div className="steps">
            {home.process.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="step">
                <span className="num mono">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap center">
          <Reveal>
            <h2>{home.cta.title}</h2>
            <p className="lead">{home.cta.body}</p>
            <Link className="btn light" to="/contact">{home.cta.label}</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
