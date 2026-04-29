import { people, photoFor } from "../people";

const board = people.filter((p) => p.category === "board");
const team = people.filter((p) => p.category === "team");

export default function LeadershipPage() {
  return (
    <>
      <section className="pageBanner">
        <img src="/ami/stock/discussion.jpg" alt="" />
        <div className="pageBanner__scrim" />
        <div className="pageBanner__inner">
          <span className="kicker pageBanner__kicker">Leadership</span>
          <h1 className="pageBanner__title">The people who steward AMI.</h1>
          <p className="pageBanner__lead">
            AMI is a 501(c)(3) nonprofit, founded in 1982 by Stan Gryskiewicz.
            The board sets direction; a small full-time team carries the
            community between gatherings.
          </p>
        </div>
      </section>

      <section className="section leadership">
        <h2 className="leadership__sub">Board of directors</h2>
        <ul className="leadership__cards">
          {board.map((p) => (
            <PersonRow key={p.id} person={p} />
          ))}
        </ul>

        <h2 className="leadership__sub">AMI team</h2>
        <ul className="leadership__cards">
          {team.map((p) => (
            <PersonRow key={p.id} person={p} />
          ))}
        </ul>
      </section>
    </>
  );
}

function PersonRow({ person }: { person: (typeof people)[number] }) {
  return (
    <li className="leaderCard">
      <img
        src={photoFor(person.id)}
        alt={person.name}
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <div className="leaderCard__body">
        <h3>{person.name}</h3>
        {person.role && <p className="leaderCard__role">{person.role}</p>}
        {person.org && <p className="leaderCard__org">{person.org}</p>}
        <div className="leaderCard__meta">
          {person.city && <span>{person.city}</span>}
          {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}
        </div>
      </div>
    </li>
  );
}
