import { site } from "../data/site";
import { Marquee, Reveal } from "../components/Motion";
import { SkillLogo } from "../components/Visuals";
import { PageHead } from "./Contact";

export default function About() {
  const { about, pages } = site;
  return (
    <>
      <PageHead title={pages.about.title} sub={pages.about.sub} />
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

      <section className="soft">
        <div className="wrap narrow">
          <Reveal><h2>{about.timelineTitle}</h2></Reveal>
          <div className="timeline">
            {about.timeline.map((t, i) => (
              <Reveal key={t.role} delay={i * 80} className="tl">
                <span className="when mono">{t.when}</span>
                <h3>{t.role}</h3>
                <p>{t.what}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><h2>{about.educationTitle}</h2></Reveal>
          <div className="grid two">
            {about.education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 100}>
                <div className="card"><h3>{e.degree}</h3><p className="tag">{e.place}</p><p className="muted">{e.note}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="soft tight">
        <div className="wrap"><Reveal><h2>{about.skillsTitle}</h2></Reveal></div>
        <Marquee items={about.skills.map((k) => ({ label: k.name, icon: <SkillLogo logo={k.logo} /> }))} />
      </section>
    </>
  );
}
