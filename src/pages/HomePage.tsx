import { Link } from "react-router-dom";
import { people, photoFor } from "../people";
import { Reveal, CountUp } from "../components/Reveal";

const tiles = [
  {
    to: "/community",
    eyebrow: "Community",
    title: "Eighty-plus people, one community.",
    body: "Explore the network of innovators: board, fellows, members, and our newest cohort.",
    cta: "Meet the community →",
    image: "/ami/DebraLucenti-SeattleGroupPhoto.jpg",
  },
  {
    to: "/market",
    eyebrow: "Offers & Needs",
    title: "Pin a sticky. Find a match.",
    body: "A live bulletin where members trade help: what they can offer and what they need.",
    cta: "Visit the market →",
    image: "/ami/stock/sticky-notes.jpg",
  },
  {
    to: "/resources",
    eyebrow: "Resources",
    title: "The community library.",
    body: "Slide decks, podcast episodes, one-pagers, and articles shared by members.",
    cta: "Browse →",
    image: "/ami/stock/lecture.jpg",
  },
  {
    to: "/onboarding",
    eyebrow: "Newcomers",
    title: "Walk in prepared. Leave with family.",
    body: "A five-step journey that prepares newcomers to give and receive at full strength.",
    cta: "See the journey →",
    image: "/ami/stock/sunset-friends.jpg",
  },
  {
    to: "/gallery",
    eyebrow: "Galleries",
    title: "Moments, by gathering.",
    body: "Photo collections from Boston, Seattle, Greensboro, and the rituals in between.",
    cta: "Open the galleries →",
    image: "/ami/boston-ai-hero.jpg",
  },
];

const moments: { src: string; caption: string; to?: string }[] = [
  { src: "/ami/DSC_0916-1024x683.jpg",            caption: "Beg, Brag, What-If",        to: "/gallery/beg-brag-what-if" },
  { src: "/ami/Joe-Gammal-fullsizeoutput_834b.jpg", caption: "The African proverb wall", to: "/gallery/boston" },
  { src: "/ami/DSC_0894.jpg",                     caption: "Stan Gryskiewicz · founder" },
  { src: "/ami/stock/workshop.jpg",               caption: "Hospitality suites" },
  { src: "/ami/stock/roundtable.jpg",             caption: "Small-group dialogue" },
  { src: "/ami/stock/walking.jpg",                caption: "Outside experiences" },
  { src: "/ami/Greensboro.jpg",                   caption: "Greensboro · 2023",          to: "/gallery/greensboro" },
  { src: "/ami/Joe-Gammal-IMG_1043.jpg",          caption: "The Spheres · Seattle",      to: "/gallery/seattle" },
];

// Pick a curated set of headshots for the home strip
const featuredIds = [
  "p-zuidinga", "p-gryskiewicz", "p-rgardner", "p-skarns", "p-newsom",
  "p-shannon", "p-canca", "p-jacob", "p-noyes", "p-heaton",
  "p-mcbride", "p-coleman", "p-wilson", "p-ingle", "p-isac",
  "p-dkaynor", "p-bernstein", "p-cwilliams",
];
const featured = featuredIds
  .map((id) => people.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <span className="hero__eyebrow">an innovation learning community</span>
            <h1 className="hero__title">
              Big ideas need
              <br />
              warm rooms.
            </h1>
            <p className="hero__lede">
              AMI is the place where serious innovators bring their whole selves
              to the work. Once a year in person, with curiosity, candor, and
              collaboration since 1982.
            </p>
            <div className="hero__ctas">
              <Link className="btn btn--primary" to="/community">Meet the community</Link>
              <Link className="btn btn--ghost" to="/about">What is AMI?</Link>
            </div>
            <dl className="hero__stats">
              <div><dt><CountUp to={43} /></dt><dd>years of positive turbulence</dd></div>
              <div><dt><CountUp to={1} duration={900} /><span>×</span></dt><dd>in-person gathering each year</dd></div>
              <div><dt><CountUp to={80} /><span>+</span></dt><dd>members in the community</dd></div>
            </dl>
          </div>

          <div className="hero__art">
            <figure className="hero__photo hero__photo--main">
              <img
                src="/ami/DSC_0916-1024x683.jpg"
                alt="AMI members in deep conversation"
                loading="eager"
              />
              <figcaption>AMI · in conversation</figcaption>
            </figure>
            <figure className="hero__photo hero__photo--inset">
              <img src="/ami/Joe-Gammal-fullsizeoutput_834b.jpg" alt="An AMI member at the African proverb wall" />
            </figure>
            <span className="hero__quoteCard">
              “If you want to go fast, go alone.<br />
              If you want to go far, go together.”
              <em>— African proverb · the AMI culture in one line</em>
            </span>
          </div>
        </div>
      </section>

      {/* Featured faces strip */}
      <section className="facesStrip">
        <div className="facesStrip__inner">
          <div className="facesStrip__intro">
            <span className="kicker">Faces of AMI</span>
            <p>The community spans four decades, every industry, every coast.</p>
          </div>
          <Link to="/community" className="facesStrip__faces" aria-label="See the full community">
            <span className="facesStrip__viewport">
              <span className="facesStrip__track">
                {[...featured, ...featured].map((p, i) => (
                  <span
                    key={`${p.id}-${i}`}
                    className="facesStrip__face"
                    title={p.name}
                    aria-hidden={i >= featured.length}
                  >
                    <img src={photoFor(p.id)} alt={i < featured.length ? p.name : ""} loading="lazy" />
                  </span>
                ))}
              </span>
            </span>
            <span className="facesStrip__more">+{people.length - featured.length}</span>
          </Link>
        </div>
      </section>

      {/* Five rooms tiles with imagery */}
      <section className="section homeTiles">
        <Reveal>
          <div className="homeTiles__head">
            <span className="kicker">Where to start</span>
            <h2>Five rooms in one community.</h2>
          </div>
        </Reveal>
        <Reveal className="reveal--stagger">
        <div className="homeTiles__grid">
          {tiles.map((t) => (
            <Link key={t.to} to={t.to} className="homeTile">
              <div className="homeTile__img">
                <img src={t.image} alt="" loading="lazy" />
                <div className="homeTile__scrim" />
              </div>
              <div className="homeTile__body">
                <span className="homeTile__eyebrow">{t.eyebrow}</span>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
                <span className="homeTile__cta">{t.cta}</span>
              </div>
            </Link>
          ))}
        </div>
        </Reveal>
      </section>

      {/* Moments gallery */}
      <section className="section moments">
        <Reveal>
          <div className="moments__head">
            <span className="kicker">Moments</span>
            <h2>Forty years, in pictures.</h2>
            <p className="lead">
              What AMI looks like: the speakers, the small groups, the walks
              outside, and the unscripted hours that make the room feel like home.
            </p>
          </div>
        </Reveal>
        <Reveal className="reveal--stagger">
        <div className="moments__grid">
          {moments.map((m, i) =>
            m.to ? (
              <Link key={m.src} to={m.to} className={`momentTile momentTile--${i}`}>
                <img src={m.src} alt={m.caption} loading="lazy" />
                <span className="momentTile__cap">{m.caption}</span>
              </Link>
            ) : (
              <figure key={m.src} className={`momentTile momentTile--${i}`}>
                <img src={m.src} alt={m.caption} loading="lazy" />
                <figcaption>{m.caption}</figcaption>
              </figure>
            ),
          )}
        </div>
        </Reveal>
      </section>

      {/* Quote band */}
      <section className="quoteBand">
        <svg className="quoteBand__wave" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden>
          <path d="M0 40 C 100 10, 200 70, 300 40 S 500 10, 600 40 S 800 70, 900 40 S 1100 10, 1200 40" />
          <path d="M0 40 C 100 70, 200 10, 300 40 S 500 70, 600 40 S 800 10, 900 40 S 1100 70, 1200 40" />
        </svg>
        <Reveal>
          <div className="quoteBand__inner">
            <p>
              “Every conversation has been both intellectual and heart-led.
              That's rare.”
            </p>
            <span>— Kyle Shannon · AMI Boston, 2026</span>
          </div>
        </Reveal>
      </section>
    </>
  );
}
