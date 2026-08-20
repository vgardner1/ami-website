import Community from "../components/Community";

export default function CommunityPage() {
  return (
    <>
      <section className="pageBanner">
        <img src="/ami/DebraLucenti-SeattleGroupPhoto.jpg" alt="" />
        <div className="pageBanner__scrim" />
        <div className="pageBanner__inner">
          <span className="kicker pageBanner__kicker">The community</span>
          <h1 className="pageBanner__title">Eighty-plus people, one community.</h1>
          <p className="pageBanner__lead">
            Drag to rotate the network. Hover any face to inflate it. Click
            to read someone's role, city, and how to reach them. The inner
            ring is the board and AMI team, then fellows and speakers,
            members, and our newest cohort of newcomers.
          </p>
        </div>
      </section>
      <Community />
    </>
  );
}
