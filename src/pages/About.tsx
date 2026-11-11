import { site } from "../data/site";
import { Marquee, Reveal } from "../components/Motion";
import { SkillLogo } from "../components/Visuals";
import { Slider } from "../components/Slider";
import { PageHead } from "./Contact";

export default function About() {
  const { about, pages } = site;
  return (
    <>
      <PageHead title={pages.about.title} sub={pages.about.sub} />

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <section className="tight">
        <div className="wrap about">
          <Reveal>
            {about.intro.map((b) => <p key={b} className="lead left">{b}</p>)}
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

      {/* ── Experience timeline slider ─────────────────────────────────────── */}
      <section className="soft">
        <div className="wrap">
          <Reveal><h2>{about.timelineTitle}</h2></Reveal>
        </div>
        <Slider
          label="Career timeline"
          slidesPerView={{ sm: 1, md: 2, lg: 3 }}
          arrows
          dots
          gap={20}
          loop={false}
          className="timeline-slider"
        >
          {about.timeline.map((t) => (
            <div key={t.role} className="tl-card">
              <span className="when mono">{t.when}</span>
              <h3>{t.role}</h3>
              <p>{t.what}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* ── Education slider ──────────────────────────────────────────────── */}
      <section>
        <div className="wrap">
          <Reveal><h2>{about.educationTitle}</h2></Reveal>
        </div>
        <Slider
          label="Education"
          slidesPerView={{ sm: 1, md: 2, lg: 2 }}
          arrows
          dots
          gap={24}
          loop={false}
          className="edu-slider"
        >
          {about.education.map((e) => (
            <div key={e.degree} className="card edu-card">
              <h3>{e.degree}</h3>
              <p className="tag">{e.place}</p>
              <p className="muted">{e.note}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* ── Skills ticker ──────────────────────────────────────────────────── */}
      <section className="soft tight">
        <div className="wrap"><Reveal><h2>{about.skillsTitle}</h2></Reveal></div>
        <Marquee items={about.skills.map((k) => ({ label: k.name, icon: <SkillLogo logo={k.logo} /> }))} />
      </section>
    </>
  );
}
