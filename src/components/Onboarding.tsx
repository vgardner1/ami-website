const steps = [
  {
    n: "01",
    label: "Two weeks out",
    title: "Meet your mentor",
    body:
      "Every newcomer is paired with a member for a 30-minute pre-event call to frame goals, set expectations, and arrive primed.",
  },
  {
    n: "02",
    label: "One week out",
    title: "Half-day virtual orientation",
    body:
      "A live cohort session on Zoom: a demo BBWI, the AMI culture, and the 'ask' — what you want to give and what you want to get.",
  },
  {
    n: "03",
    label: "Day one",
    title: "Babson framing day",
    body:
      "Strongly recommended: an optional pre-workshop at The Generator at Babson College that sets the stage for the gathering.",
  },
  {
    n: "04",
    label: "Conference",
    title: "Three days, one ohana",
    body:
      "Big Wicked Issues, blue slips, hospitality suites, mentor check-ins, and the Offers & Needs Market — designed for substance and warmth.",
  },
  {
    n: "05",
    label: "Year-round",
    title: "AMI Playground",
    body:
      "Daily prompts, a 'now what?' digest from every BBWI, the Resources library, and a directory so the connections compound.",
  },
];

export default function Onboarding() {
  return (
    <section id="onboarding" className="section onboarding">
      <div className="onboarding__head">
        <span className="kicker">Newcomer journey</span>
        <h2>
          Walk in <em>prepared.</em> Leave with family.
        </h2>
        <p className="lead">
          Feedback from Boston was clear: the magic is real, but the runway
          matters. Here is the new five-step onboarding journey that prepares
          you to give and receive at full strength from the moment you arrive.
        </p>
      </div>

      <ol className="journey">
        {steps.map((s) => (
          <li key={s.n} className="journey__step">
            <div className="journey__head">
              <span className="journey__num">{s.n}</span>
              <span className="journey__when">{s.label}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
