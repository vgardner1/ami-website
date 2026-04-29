const days = [
  {
    when: "Wednesday · April 22",
    headline: "Pre-workshop & welcome",
    body:
      "Optional Pre-Workshop at The Generator at Babson College, Newcomer's Circle at Muse Salon, then a welcome reception at Alexis + Foyer.",
  },
  {
    when: "Thursday · April 23",
    headline: "Positive Turbulence + BBWI",
    body:
      "Morning and afternoon Learning Exchange sessions. Tour of CIC Cambridge & Venture Café in the evening, followed by self-organized small-group dinners.",
  },
  {
    when: "Friday · April 24",
    headline: "Newcomer fishbowl & innovation trail",
    body:
      "Morning reflection, BBWI continues, Newcomer Fishbowl at lunch, then an outdoor afternoon on the Boston Innovation Trail with Dr. Robert Krim.",
  },
];

const tracks = [
  {
    title: "Smart cities, lived experience",
    by: "Nigel Jacob, City of Boston",
    body:
      "When we hear 'smart cities,' we imagine sensors and dashboards. But what if the smartest cities are the ones that know their neighborhoods?",
  },
  {
    title: "Ethics at the speed of AI",
    by: "Cansu Canca, AI Ethics Lab",
    body:
      "A workshop on the ethical forks in the road — where speed creates damage and where it creates possibility.",
  },
  {
    title: "AI as creative collaborator",
    by: "Kyle Shannon, AI Salon",
    body:
      "A hands-on session designed for your first 'aha' moment with the tools — playful, fast, and human.",
  },
];

export default function Conference() {
  return (
    <section id="meetings" className="section meetings">
      <div className="meetings__head">
        <span className="kicker">Boston · April 22–24, 2026</span>
        <h2>
          Becoming students again.
          <br />
          <em>Rethinking and reimagining with AI.</em>
        </h2>
        <p className="lead">
          Hosted by AMI Fellows Spencer Karns and Reece Gardner, the Boston
          gathering invited the community to approach this AI moment not as
          experts, but as students. Three days of conversation, integration,
          and movement at the Kimpton Marlowe in Cambridge.
        </p>
      </div>

      <div className="meetings__schedule">
        {days.map((d) => (
          <article key={d.when} className="dayCard">
            <span className="dayCard__when">{d.when}</span>
            <h3>{d.headline}</h3>
            <p>{d.body}</p>
          </article>
        ))}
      </div>

      <h3 className="meetings__sub">Positive Turbulence speakers</h3>
      <div className="tracks">
        {tracks.map((t) => (
          <article key={t.title} className="track">
            <h4>{t.title}</h4>
            <p className="track__by">{t.by}</p>
            <p>{t.body}</p>
          </article>
        ))}
      </div>

      <aside className="meetings__next">
        <div>
          <span className="kicker">Next gathering</span>
          <h3>Raleigh, NC · 2027</h3>
          <p>
            A smaller-feeling, deeper-going AMI in partnership with NC State,
            Duke, and UNC. Less presentation, more discussion. Same hugs.
          </p>
        </div>
        <div className="meetings__cta">
          <a className="btn btn--primary" href="#membership">Reserve your spot</a>
          <a className="btn btn--ghost" href="#market">Bring a need or an offer</a>
        </div>
      </aside>
    </section>
  );
}
