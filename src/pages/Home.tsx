import { Link } from "react-router-dom";
import { site, capabilities } from "../data/site";
import { products } from "../data/products";
import { CountUp, Marquee, Reveal } from "../components/Motion";
import { CapIcon, HeroSlideVisual } from "../components/Visuals";
import { Slider } from "../components/Slider";

export default function Home() {
  const { stats, industries, home, heroSlides } = site;

  return (
    <>
      {/* ── Hero Slider ───────────────────────────────────────────────────── */}
      <Slider
        label="Hero highlights"
        autoplay={5000}
        loop
        progress
        arrows
        dots
        className="hero-slider"
      >
        {heroSlides.map((slide) => (
          <div key={slide.visual} className="hero-slide dots">
            <div className="wrap hero-grid">
              <div className="hero-copy">
                <p className="eyebrow">{slide.pill ? `${slide.pill} · ` : ""}<span className="in-flag">{site.india.badge}</span></p>
                <h1>{slide.headline}</h1>
                <p className="lead">{slide.body}</p>
                <div className="cta">
                  <Link className="btn" to={slide.cta.to}>{slide.cta.label}</Link>
                  <Link className="btn ghost" to="/contact">Work with me</Link>
                </div>
                <div className="stats">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <strong className="mono">
                        <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                      </strong>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-visual-wrap">
                <HeroSlideVisual visual={slide.visual} image={slide.image} alt={slide.headline} />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <Marquee items={site.marquee.map((label) => ({ label }))} />

      {/* ── Capabilities Carousel ─────────────────────────────────────────── */}
      <section className="soft">
        <div className="wrap">
          <Reveal>
            <div className="head-row">
              <div>
                <h2>{home.rail.title}</h2>
                <p className="muted">{home.rail.sub}</p>
              </div>
              <Link className="btn ghost" to="/work">{home.rail.cta}</Link>
            </div>
          </Reveal>
        </div>
        <Slider
          label="Capabilities"
          slidesPerView={{ sm: 1, md: 2, lg: 3 }}
          arrows
          dots
          gap={20}
          loop={false}
          className="caps-slider"
        >
          {capabilities.map((c) => (
            <Link to="/work" className="rcard" key={c.domain}>
              <span className="ic"><CapIcon name={c.icon} /></span>
              <h3>{c.domain}</h3>
              <p>{c.ships}</p>
            </Link>
          ))}
        </Slider>
        <div className="wrap chips">
          {industries.map((i) => <span key={i} className="chip">{i}</span>)}
        </div>
      </section>

      {/* ── Products Slider ───────────────────────────────────────────────── */}
      <section>
        <div className="wrap">
          <Reveal>
            <div className="head-row">
              <div>
                <p className="eyebrow">{home.featured.eyebrow}</p>
                <h2>Products</h2>
              </div>
              <Link className="btn ghost" to="/products">All products</Link>
            </div>
          </Reveal>
        </div>
        <Slider
          label="Featured products"
          slidesPerView={{ sm: 1, md: 2, lg: 3 }}
          arrows
          dots
          gap={24}
          loop={false}
          className="products-slider"
        >
          {products.map((x) => (
            <div key={x.slug} className="product-slide-card">
              {x.image && (
                <div className="psc-thumb">
                  <img src={x.image} alt={x.name} loading="lazy" />
                </div>
              )}
              <div className="psc-copy">
                <span className={`pill ${x.status === "Coming soon" ? "warn" : "ok"}`}>{x.status}</span>
                <h3>{x.name}</h3>
                <p className="tag">{x.tagline}</p>
                <p className="muted">{x.description}</p>
                <div className="cta left">
                  <Link className="btn" to={`/products/${x.slug}`}>{home.featured.cta}</Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="soft">
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

      {/* ── CTA Band ─────────────────────────────────────────────────────── */}
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
