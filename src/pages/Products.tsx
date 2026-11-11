import { Link, Navigate, useParams } from "react-router-dom";
import { site } from "../data/site";
import { products } from "../data/products";
import { Reveal } from "../components/Motion";
import { ProductDemo } from "../components/Visuals";
import { Slider } from "../components/Slider";
import { PageHead } from "./Contact";

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

export function Products() {
  const p = site.pages.products;
  return (
    <>
      <PageHead title={p.title} sub={p.sub} />

      {/* ── Featured products slider ─────────────────────────────────────── */}
      <section className="soft tight">
        <Slider
          label="Featured products"
          autoplay={6000}
          loop
          progress
          arrows
          dots
          gap={0}
          className="product-hero-slider"
        >
          {products.map((x, i) => (
            <div key={x.slug} className={`product-hero-slide ${i % 2 ? "flip" : ""}`}>
              <div className="wrap split">
                <div className="php-copy">
                  <span className={`pill ${x.status === "Coming soon" ? "warn" : "ok"}`}>{x.status}</span>
                  <h2>{x.name}</h2>
                  <p className="tag">{x.tagline}</p>
                  <p className="muted">{x.description}</p>
                  <ul className="ticks">{x.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                  <div className="cta left">
                    <Link className="btn" to={`/products/${x.slug}`}>Learn more</Link>
                    <a className="btn ghost" href={x.links[0].href} {...ext(x.links[0].href)}>{x.links[0].label}</a>
                  </div>
                </div>
                <div className="php-visual">
                  <ProductDemo demo={x.demo} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ── Individual product sections ──────────────────────────────────── */}
      {products.map((x, i) => (
        <section key={x.slug} className={i % 2 ? "soft" : ""}>
          <div className={`wrap split ${i % 2 ? "flip" : ""}`}>
            <Reveal>
              <span className={`pill ${x.status === "Coming soon" ? "warn" : "ok"}`}>{x.status}</span>
              <h2>{x.name}</h2>
              <p className="tag">{x.tagline}</p>
              <p className="muted">{x.description}</p>
              <ul className="ticks">{x.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              <div className="cta left">
                <Link className="btn" to={`/products/${x.slug}`}>Learn more</Link>
                <a className="btn ghost" href={x.links[0].href} {...ext(x.links[0].href)}>{x.links[0].label}</a>
              </div>
            </Reveal>
            <Reveal delay={150}><ProductDemo demo={x.demo} /></Reveal>
          </div>
        </section>
      ))}
    </>
  );
}

export function ProductDetail() {
  const { slug } = useParams();
  const i = products.findIndex((x) => x.slug === slug);
  if (i < 0) return <Navigate to="/products" replace />;
  const x = products[i];
  const next = products[(i + 1) % products.length];
  return (
    <>
      <section className="hero dots">
        <div className="wrap split">
          <div className="hero-copy">
            <Link to="/products" className="back">← All products</Link>
            <span className={`pill ${x.status === "Coming soon" ? "warn" : "ok"}`}>{x.status}</span>
            <h1>{x.name}</h1>
            <p className="tag">{x.tagline}</p>
            <p className="lead left">{x.description}</p>
            <div className="cta left">
              {x.links.map((l, k) => (
                <a key={l.href} className={k === 0 ? "btn" : "btn ghost"} href={l.href} {...ext(l.href)}>{l.label}</a>
              ))}
            </div>
          </div>
          <ProductDemo demo={x.demo} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><h2 className="center">How it works</h2></Reveal>
          <div className="steps three">
            {x.steps.map((s, k) => (
              <Reveal key={s.title} delay={k * 120} className="step">
                <span className="num mono">0{k + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="soft">
        <div className="wrap">
          <Reveal><h2 className="center">Why you'll like it</h2></Reveal>
          <div className="grid three">
            {x.highlights.map((h, k) => (
              <Reveal key={h} delay={k * 100}><div className="card tick-card">{h}</div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {next.slug !== x.slug && (
        <section className="band">
          <div className="wrap center">
            <Link to={`/products/${next.slug}`} className="next">
              <small>Next product</small>
              <strong>{next.name} →</strong>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
