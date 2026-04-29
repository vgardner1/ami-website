export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">Boston · April 22–24, 2026</span>
          <h1 className="hero__title">
            Becoming students<br />
            <em>again.</em>
          </h1>
          <p className="hero__lede">
            In a world accelerated by machine learning, how can we use human
            learning to intentionally shape the future we co-create? AMI is the
            innovation learning community where curiosity, candor, and
            collaboration meet — once a year in person, one ohana.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#market">
              Visit the Offers &amp; Needs Market
            </a>
            <a className="btn btn--ghost" href="#community">
              Meet the community
            </a>
          </div>
          <dl className="hero__stats">
            <div>
              <dt>43</dt>
              <dd>years of positive turbulence</dd>
            </div>
            <div>
              <dt>3<span>×</span></dt>
              <dd>in-person gathering each year</dd>
            </div>
            <div>
              <dt>80<span>+</span></dt>
              <dd>members & newcomers in Boston</dd>
            </div>
          </dl>
        </div>

        <div className="hero__art">
          <figure className="hero__photo hero__photo--main">
            <img
              src="/ami/boston-ai-hero.jpg"
              alt="A student illuminated by a wall of streaming code — Boston's AI moment"
              loading="eager"
            />
            <figcaption>Boston · April 2026</figcaption>
          </figure>
          <figure className="hero__photo hero__photo--inset">
            <img src="/ami/DSC_0916-1024x683.jpg" alt="AMI members in conversation" />
          </figure>
          <span className="hero__quoteCard">
            “If you want to go fast, go alone.<br />
            If you want to go far, go together.”
            <em>— African proverb · the AMI culture in one line</em>
          </span>
        </div>
      </div>
    </section>
  );
}
