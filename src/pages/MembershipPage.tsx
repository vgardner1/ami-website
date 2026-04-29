export default function MembershipPage() {
  return (
    <>
      <section className="pageBanner">
        <img src="/ami/stock/collab.jpg" alt="" />
        <div className="pageBanner__scrim" />
        <div className="pageBanner__inner">
          <span className="kicker pageBanner__kicker">Get involved</span>
          <h1 className="pageBanner__title">Three ways in.</h1>
          <p className="pageBanner__lead">
            AMI is a 501(c)(3) learning community. Members come from every
            industry but share a willingness to bring their whole selves to the
            work of innovation.
          </p>
        </div>
      </section>

      <section className="section membership">
        <div className="membership__card">
          <div className="membership__grid">
            <article>
              <span className="membership__num">01</span>
              <h2>Become a member</h2>
              <p>
                Rolling membership. Access to all three annual gatherings, the
                mentor network, the Offers &amp; Needs Market, and the
                year-round community library.
              </p>
              <a className="btn btn--primary" href="mailto:hello@aminnovation.org?subject=Membership%20interest">Apply →</a>
            </article>
            <article>
              <span className="membership__num">02</span>
              <h2>Mentor a newcomer</h2>
              <p>
                Take 1–2 newcomers through the onboarding journey. A 30-minute
                pre-call, a check-in at the gathering, and an open door for
                the year that follows.
              </p>
              <a className="btn btn--ghost" href="mailto:hello@aminnovation.org?subject=Mentor%20signup">Sign up →</a>
            </article>
            <article>
              <span className="membership__num">03</span>
              <h2>Donate</h2>
              <p>
                We're a 501(c)(3). Donations underwrite the framing-day
                workshop for newcomers and our student programs.
              </p>
              <a className="btn btn--ghost" href="mailto:hello@aminnovation.org?subject=Donate">Give →</a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
