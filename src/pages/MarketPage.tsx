import Market from "../components/Market";

export default function MarketPage() {
  return (
    <>
      <section className="pageBanner">
        <img src="/ami/stock/sticky-notes.jpg" alt="" />
        <div className="pageBanner__scrim" />
        <div className="pageBanner__inner">
          <span className="kicker pageBanner__kicker">Live · interactive</span>
          <h1 className="pageBanner__title">The Offers &amp; Needs Market.</h1>
          <p className="pageBanner__lead">
            A live bulletin board for the AMI community. Pin a sticky as
            something you can <strong>offer</strong> or something you{" "}
            <strong>need</strong>. Click any note to write back — say how you
            can help.
          </p>
        </div>
      </section>
      <Market />
    </>
  );
}
