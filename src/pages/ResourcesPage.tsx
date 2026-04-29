import Resources from "../components/Resources";

export default function ResourcesPage() {
  return (
    <>
      <section className="pageBanner">
        <img src="/ami/stock/lecture.jpg" alt="" />
        <div className="pageBanner__scrim" />
        <div className="pageBanner__inner">
          <span className="kicker pageBanner__kicker">Resources</span>
          <h1 className="pageBanner__title">The community library.</h1>
          <p className="pageBanner__lead">
            Slide decks, one-pagers, articles, recordings — everything members
            have shared with the community, indexed and easy to find. Add your
            own to send it to the group.
          </p>
        </div>
      </section>
      <Resources />
    </>
  );
}
