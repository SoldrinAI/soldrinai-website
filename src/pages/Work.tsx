import { useState } from "react";
import { capabilities, site } from "../data/site";
import { Reveal } from "../components/Motion";
import { CapIcon } from "../components/Visuals";
import { PageHead } from "./Contact";

const ALL = "All";
const filters = [ALL, ...Array.from(new Set(capabilities.flatMap((c) => c.industries)))];

export default function Work() {
  const [f, setF] = useState(ALL);
  const shown = capabilities.filter((c) => f === ALL || c.industries.includes(f));
  const p = site.pages.work;
  return (
    <>
      <PageHead title={p.title} sub={p.sub} />
      <section className="tight">
        <div className="wrap">
          <div className="filters">
            {filters.map((x) => (
              <button key={x} className={x === f ? "on" : ""} onClick={() => setF(x)}>{x}</button>
            ))}
          </div>
          <div className="grid two" key={f}>
            {shown.map((c, i) => (
              <article className="wcard" key={c.domain} style={{ animationDelay: `${i * 70}ms` }}>
                <span className="ic"><CapIcon name={c.icon} size={30} /></span>
                <div>
                  <h3>{c.domain}</h3>
                  <p>{c.ships}</p>
                  <p className="ex"><b>Example:</b> {c.example}</p>
                  <div className="chips left">{c.industries.map((x) => <span key={x} className="chip">{x}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
          <Reveal><p className="muted center note">{site.stats[0].value} systems delivered across {site.industries.join(", ").toLowerCase()}.</p></Reveal>
        </div>
      </section>
    </>
  );
}
