export default function Join() {
  return (
    <section id="membership" className="section join">
      <div className="join__card">
        <span className="kicker">Get involved</span>
        <h2>Three ways in.</h2>
        <div className="join__grid">
          <article>
            <h3>Become a member</h3>
            <p>
              Rolling membership. Access to all three annual gatherings, the
              mentor network, the Offers &amp; Needs Market, and the
              year-round community library.
            </p>
            <a className="btn btn--primary" href="mailto:hello@aminnovation.org?subject=Membership%20interest">
              Apply →
            </a>
          </article>
          <article>
            <h3>Mentor a newcomer</h3>
            <p>
              Take 1–2 newcomers through the onboarding journey. A 30-minute
              pre-call, a check-in at the gathering, and an open door after.
            </p>
            <a className="btn btn--ghost" href="mailto:hello@aminnovation.org?subject=Mentor%20signup">
              Sign up →
            </a>
          </article>
          <article id="donate">
            <h3>Donate</h3>
            <p>
              We're a 501(c)(3). Donations underwrite the Babson framing day
              for newcomers and our student programs in Raleigh.
            </p>
            <a className="btn btn--ghost" href="mailto:hello@aminnovation.org?subject=Donate">
              Give →
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
