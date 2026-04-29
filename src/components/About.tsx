const values = [
  { name: "Authenticity", body: "We are genuine and show up as our true selves." },
  { name: "Curiosity", body: "We thrive on new ideas, thinking, and ways of being." },
  { name: "Reciprocity", body: "We share freely — and never sell when we meet." },
  { name: "Trust", body: "We uphold integrity, transparency, and confidentiality." },
  { name: "Community-Based Learning", body: "We value shared learning and experiential knowledge exchange." },
  { name: "Dialogue of Differences", body: "We foster cross-generational, cross-discipline dialogue." },
  { name: "Positive Turbulence", body: "We seek information from the periphery to provoke novel thinking." },
  { name: "Possibility", body: "We value discovery and the expression of possibility." },
  { name: "Defer Judgment", body: "We understand an idea fully before we evaluate it." },
];

export default function About() {
  return (
    <>
      <section id="about" className="section about">
        <div className="about__grid">
          <div className="about__copy">
            <span className="kicker">Who we are</span>
            <h2>
              A place where
              <br />
              moonshots are born.
            </h2>
            <p className="lead">
              Members of the AMI community are tackling the world's most
              complex and ambiguous challenges — from topline growth in a
              corporate setting to food insecurity, economic development, and
              the ethics of AI. We think big across sectors and disciplines,
              and we think inwardly and socially: innovative change requires
              human empowerment and compassion.
            </p>
            <p>
              AMI Innovators are diverse in profession and perspective. We
              relish learning from one another's successes and failures, and
              we challenge ourselves to speak our truths — building creative
              confidence and the courage to lead transformational change.
            </p>
          </div>

          <figure className="about__photo">
            <img
              src="/ami/DSC_0916-1024x683.jpg"
              alt="AMI members gathered in front of an 'impatient optimists' wall, in conversation"
              loading="lazy"
            />
            <figcaption>AMI · in conversation</figcaption>
          </figure>
        </div>

        <aside className="about__founder">
          <img src="/ami/DSC_0894.jpg" alt="Stan Gryskiewicz, AMI founder, speaking" loading="lazy" />
          <blockquote>
            <p>
              “There's something poetic about this community finding its way to
              Boston, where I earned my own degree at Tufts. The spirit of
              beginning feels very alive — and that's exactly the point.”
            </p>
            <cite>
              — Danielle Kaynor, Executive Leader & Community Catalyst
              <br />
              <span>Daughter of AMI founder Stan Gryskiewicz</span>
            </cite>
          </blockquote>
        </aside>
      </section>

      <section id="values" className="section values">
        <div className="values__head">
          <span className="kicker">Words we live by</span>
          <h2>Nine values that shape every gathering.</h2>
        </div>
        <ul className="values__grid">
          {values.map((v, i) => (
            <li key={v.name} className="value">
              <span className="value__index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{v.name}</h3>
              <p>{v.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
