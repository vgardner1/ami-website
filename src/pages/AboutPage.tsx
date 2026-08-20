import ValuesOrbital from "../components/ValuesOrbital";

const collage = [
  { src: "/ami/DSC_0916-1024x683.jpg",            caption: "Boston · 2026" },
  { src: "/ami/Joe-Gammal-IMG_1043.jpg",          caption: "Seattle · 2018" },
  { src: "/ami/Greensboro.jpg",                   caption: "Greensboro · 2023" },
  { src: "/ami/stock/workshop.jpg",               caption: "Beg, Brag, What-If" },
];

export default function AboutPage() {
  return (
    <>
      <section className="pageBanner pageBanner--moonshot">
        <img src="/ami/Joe-Gammal-fullsizeoutput_834b.jpg" alt="" />
        <div className="pageBanner__scrim" />

        {/* Moonshot scene: stars, moon, and a rising trajectory */}
        <div className="moonshot" aria-hidden>
          <div className="moonshot__stars moonshot__stars--1" />
          <div className="moonshot__stars moonshot__stars--2" />
          <span className="moonshot__moon" />
          <svg className="moonshot__sky" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMax slice">
            <path
              className="moonshot__trail"
              d="M -40 430 C 220 380, 430 300, 620 190 S 880 60, 940 38"
              fill="none"
            />
            <circle className="moonshot__ship" r="5" />
          </svg>
        </div>

        <div className="pageBanner__inner">
          <span className="kicker pageBanner__kicker">About AMI</span>
          <h1 className="pageBanner__title pageBanner__title--moonshot">
            {"A place where moonshots are born.".split(" ").map((w, i) => (
              <span key={i} className="moonshot__word" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                {w}&nbsp;
              </span>
            ))}
          </h1>
          <p className="pageBanner__lead">
            AMI, the Association for Managers of Innovation, is a 501(c)(3)
            nonprofit founded in 1982 by Stan Gryskiewicz. Members tackle the
            world's most complex and ambiguous challenges, from corporate
            growth to economic development and the ethics of AI.
          </p>
        </div>
      </section>

      <section className="section about">
        <div className="about__grid">
          <div className="about__copy">
            <span className="kicker">Our culture</span>
            <h2>People first. Ideas next.</h2>
            <p>
              AMI Innovators are diverse in profession and perspective. We
              relish learning from one another's successes and failures, and
              we challenge ourselves to speak our truths, building creative
              confidence and the courage to lead transformational change.
            </p>
            <p>
              We think big across sectors and disciplines. We think inwardly
              and socially. Innovative change requires human empowerment and
              compassion, and our community is built to make both possible.
            </p>
          </div>
          <div className="about__collage">
            {collage.map((c) => (
              <figure key={c.src} className="about__tile">
                <img src={c.src} alt={c.caption} loading="lazy" />
                <figcaption>{c.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <aside className="about__founder">
          <img src="/ami/danielle-kaynor.jpg" alt="Danielle Kaynor, AMI Executive Leader" loading="lazy" />
          <blockquote>
            <p>
              “In turbulent times, rather than getting stuck in the noise,
              there's something to be found at the periphery: a generative
              path forward that only becomes visible when we look up, look
              around, and look at it together, in community.”
            </p>
            <cite>
              — Danielle Kaynor, Executive Leader & Community Catalyst
              <br />
              <span>Daughter of AMI founder Stan Gryskiewicz</span>
            </cite>
          </blockquote>
        </aside>
      </section>

      <section className="section valuesSection">
        <div className="valuesSection__head">
          <span className="kicker">Words we live by</span>
          <h2>Nine values orbit the AMI core.</h2>
          <p className="lead">
            Our actions are shaped by the values that guide how we engage
            with each other.
          </p>
        </div>
        <ValuesOrbital />
      </section>
    </>
  );
}
