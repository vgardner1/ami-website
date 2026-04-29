import { Link } from "react-router-dom";

const ICON = {
  width: 28, height: 28, viewBox: "0 0 24 24",
  fill: "none", stroke: "currentColor",
  strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

const formats = [
  {
    title: "Positive Turbulence keynotes",
    body: "Voices from the periphery — speakers who jolt us into thinking differently across disciplines, sectors, and generations.",
    icon: <svg {...ICON}><path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" /><path d="M3 18c2-3 4-3 6 0s4 3 6 0 4-3 6 0" /></svg>,
    image: "/ami/stock/speaker.jpg",
  },
  {
    title: "Beg, Brag, What-If",
    body: "Three asks, three offers, in three minutes. Each member shares what they need, what they've shipped, and the question that won't leave them alone — the room responds in real time with intros, ideas, and immediate help.",
    icon: <svg {...ICON}><circle cx="12" cy="12" r="9" /><path d="M9 9h6M8 12h8M9 15h6" /></svg>,
    image: "/ami/stock/sticky-notes.jpg",
  },
  {
    title: "Newcomer's Circle & Fishbowl",
    body: "A dedicated space for first-timers to introduce themselves, ask hard questions, and be heard before stepping into the larger room.",
    icon: <svg {...ICON}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></svg>,
    image: "/ami/stock/roundtable.jpg",
  },
  {
    title: "Hospitality suites",
    body: "Late-evening, off-program rooms where the real conversations happen. Members host topics they care about and the community follows curiosity.",
    icon: <svg {...ICON}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>,
    image: "/ami/stock/evening.jpg",
  },
  {
    title: "Mentor pairings",
    body: "Each newcomer is matched with an experienced member for a pre-event call, an in-person check-in, and an open door for the year that follows.",
    icon: <svg {...ICON}><path d="M16 11a4 4 0 10-4 4" /><path d="M8 19c0-3 2-5 5-5s5 2 5 5" /></svg>,
    image: "/ami/stock/mentor.jpg",
  },
  {
    title: "Outside experiences",
    body: "Each gathering pairs the work with the place — guided walks, host-city tours, and small-group dinners that turn coffee-line acquaintances into year-round collaborators.",
    icon: <svg {...ICON}><path d="M12 2v3M12 19v3M5 12H2M22 12h-3M19 5l-2 2M7 17l-2 2M19 19l-2-2M7 7L5 5" /><circle cx="12" cy="12" r="4" /></svg>,
    image: "/ami/stock/walking.jpg",
  },
];

const past = [
  { city: "Boston, MA",         year: 2026, theme: "Becoming Students Again — AI",        image: "/ami/boston-ai-hero.jpg" },
  { city: "Las Vegas, NV",      year: 2024, theme: "Innovation in the Desert",            image: "/ami/stock/vegas.jpg" },
  { city: "Greensboro, NC",     year: 2023, theme: "Manufacturing's Next Chapter",        image: "/ami/Greensboro.jpg" },
  { city: "Seattle, WA",        year: 2018, theme: "Building Cities of Innovation",       image: "/ami/DebraLucenti-SeattleGroupPhoto.jpg" },
  { city: "Colorado Springs",   year: 2016, theme: "Center for Creative Leadership",      image: "/ami/2016-04-06-18.30.34.jpg" },
];

export default function MeetingsPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="pageBanner">
        <img src="/ami/stock/discussion.jpg" alt="" />
        <div className="pageBanner__scrim" />
        <div className="pageBanner__inner">
          <span className="kicker pageBanner__kicker">Meetings</span>
          <h1 className="pageBanner__title">Once a year. In person.</h1>
          <p className="pageBanner__lead">
            AMI meets once a year, somewhere new, for three days that change the
            calendar. Each gathering is a curated mix of substance and warmth — a
            format refined over four decades.
          </p>
        </div>
      </section>

      <section className="section formats">
        <div className="formats__head">
          <span className="kicker">What happens at a gathering</span>
          <h2>Six formats. One container.</h2>
          <p className="lead">
            The format stays the same so the conversation can go deep. The
            speakers, themes, and host city change every year to keep the
            periphery alive.
          </p>
        </div>
        <ul className="formats__grid">
          {formats.map((f) => (
            <li key={f.title} className="formatCard">
              <div className="formatCard__img">
                <img src={f.image} alt="" loading="lazy" />
                <div className="formatCard__scrim" />
                <span className="formatCard__icon">{f.icon}</span>
              </div>
              <div className="formatCard__body">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section past">
        <div className="past__head">
          <span className="kicker">Past gatherings</span>
          <h2>Where AMI has met.</h2>
          <p className="lead">
            A short tour through the cities and themes that shaped the
            community.
          </p>
        </div>
        <ul className="pastGrid">
          {past.map((p) => (
            <li key={`${p.city}-${p.year}`} className="pastCard">
              <div className="pastCard__img">
                <img src={p.image} alt={p.city} loading="lazy" />
                <div className="pastCard__scrim" />
                <span className="pastCard__year">{p.year}</span>
              </div>
              <div className="pastCard__body">
                <h3>{p.city}</h3>
                <p>{p.theme}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section nextGathering">
        <div className="nextGathering__card">
          <img className="nextGathering__bg" src="/ami/stock/raleigh.jpg" alt="" />
          <div className="nextGathering__inner">
            <span className="kicker">Next gathering</span>
            <h2>Raleigh, NC · 2027</h2>
            <p>
              A smaller-feeling, deeper-going AMI in partnership with NC State,
              Duke, and UNC Chapel Hill. Less presentation, more discussion.
              Same hugs.
            </p>
            <div className="nextGathering__cta">
              <Link className="btn btn--primary" to="/membership">Reserve your spot</Link>
              <Link className="btn btn--ghost" to="/market">Bring a need or an offer</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
