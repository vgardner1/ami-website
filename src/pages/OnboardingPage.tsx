import { useState } from "react";
import { Link } from "react-router-dom";

const ICON = {
  width: 32, height: 32, viewBox: "0 0 24 24",
  fill: "none", stroke: "currentColor",
  strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

const steps = [
  {
    n: "01",
    label: "Two weeks out",
    title: "Meet your mentor",
    body:
      "Every newcomer is matched with a member for a 30-minute pre-event call. Frame your goals, hear what to expect, and arrive primed.",
    icon: <svg {...ICON}><path d="M3 8l9 6 9-6" /><rect x="3" y="6" width="18" height="13" rx="2" /></svg>,
    accent: "#0e6b6b",
    image: "/ami/stock/mentor.jpg",
  },
  {
    n: "02",
    label: "One week out",
    title: "Virtual cohort orientation",
    body:
      "A live half-day on Zoom: a demo Beg-Brag-What-If, the AMI culture, and the 'ask' — what you want to give and what you want to get.",
    icon: <svg {...ICON}><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M7 21h10" /><path d="M12 17v4" /></svg>,
    accent: "#7b3f9c",
    image: "/ami/stock/lecture.jpg",
  },
  {
    n: "03",
    label: "Day zero",
    title: "Framing workshop",
    body:
      "Strongly recommended: an in-person workshop on the first day where the cohort lands together, sets intentions, and meets in small groups before the gathering opens.",
    icon: <svg {...ICON}><path d="M22 10L12 4 2 10l10 6 10-6z" /><path d="M6 12v5a6 6 0 0012 0v-5" /></svg>,
    accent: "#c45a2a",
    image: "/ami/stock/workshop.jpg",
  },
  {
    n: "04",
    label: "The gathering",
    title: "Three days, one ohana",
    body:
      "Beg-Brag-What-If rounds, hospitality suites, mentor check-ins, the Newcomer Fishbowl, and the Offers & Needs Market — designed for substance and warmth.",
    icon: <svg {...ICON}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" /><path d="M14.5 19c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5" /></svg>,
    accent: "#1f6f8b",
    image: "/ami/DSC_0916-1024x683.jpg",
  },
  {
    n: "05",
    label: "Year-round",
    title: "AMI Playground",
    body:
      "Daily prompts, a 'now what?' digest from every Beg-Brag-What-If, the Resources library, and the year-round directory — so the connections compound.",
    icon: <svg {...ICON}><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M19 5l-2 2M7 17l-2 2M19 19l-2-2M7 7L5 5" /><circle cx="12" cy="12" r="4" /></svg>,
    accent: "#b88a3a",
    image: "/ami/stock/collab.jpg",
  },
];

export default function OnboardingPage() {
  const [active, setActive] = useState(0);
  const a = steps[active];

  return (
    <>
      <section className="pageBanner">
        <img src="/ami/stock/hands-on.jpg" alt="" />
        <div className="pageBanner__scrim" />
        <div className="pageBanner__inner">
          <span className="kicker pageBanner__kicker">Newcomer journey</span>
          <h1 className="pageBanner__title">Walk in prepared. Leave with family.</h1>
          <p className="pageBanner__lead">
            The magic is real. The runway matters. Here is the five-step
            onboarding journey that prepares newcomers to give and receive at
            full strength from the moment they arrive.
          </p>
        </div>
      </section>

      <section className="section onboarding">
        <div className="onboarding__layout">
          <ol className="onboarding__rail">
            {steps.map((s, i) => (
              <li key={s.n}>
                <button
                  className={`onboarding__pill ${active === i ? "is-active" : ""}`}
                  style={{ "--accent": s.accent } as React.CSSProperties}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={active === i}
                >
                  <span className="onboarding__pillIcon">{s.icon}</span>
                  <span className="onboarding__pillText">
                    <span className="onboarding__pillN">{s.n}</span>
                    <span className="onboarding__pillTitle">{s.title}</span>
                    <span className="onboarding__pillWhen">{s.label}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <article className="onboarding__detail" style={{ "--accent": a.accent } as React.CSSProperties}>
            <div className="onboarding__detailImg">
              <img src={a.image} alt="" />
              <div className="onboarding__detailScrim" />
            </div>
            <div className="onboarding__detailBody">
              <span className="onboarding__detailEyebrow">{a.label}</span>
              <span className="onboarding__detailIcon" aria-hidden>{a.icon}</span>
              <span className="onboarding__detailNum">{a.n}</span>
              <h2>{a.title}</h2>
              <p>{a.body}</p>
              <div className="onboarding__progress" aria-hidden>
                {steps.map((_, i) => (
                  <span key={i} className={i <= active ? "is-on" : ""} />
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section onboardingCta">
        <div className="onboardingCta__card">
          <h2>Want to take a newcomer through this?</h2>
          <p>Sign up to mentor — 1 or 2 newcomers, year over year.</p>
          <div className="onboardingCta__buttons">
            <a className="btn btn--primary" href="mailto:hello@aminnovation.org?subject=Mentor%20signup">Mentor a newcomer</a>
            <Link className="btn btn--ghost" to="/membership">Become a member</Link>
          </div>
        </div>
      </section>
    </>
  );
}
