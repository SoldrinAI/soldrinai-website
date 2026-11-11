import { site } from "../data/site";
import { Reveal } from "../components/Motion";

export function PageHead({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="pagehead dots">
      <div className="wrap">
        <h1>{title}<i className="underline" /></h1>
        <p className="lead left">{sub}</p>
      </div>
    </section>
  );
}

export default function Contact() {
  const { contact, pages } = site;
  return (
    <>
      <PageHead title={pages.contact.title} sub={pages.contact.sub} />
      <section className="tight">
        <div className="wrap narrow">
          <Reveal><p className="lead left">{contact.body}</p></Reveal>
          <div className="links-grid">
            {contact.links.map((l, i) => (
              <Reveal key={l.href} delay={i * 100}>
                <a className="big-link" href={l.href} target="_blank" rel="noreferrer">
                  <strong>{l.label}</strong><span>{l.note}</span><em>→</em>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="chips left">{contact.openTo.map((o) => <span key={o} className="chip">{o}</span>)}</div>
        </div>
      </section>
    </>
  );
}
