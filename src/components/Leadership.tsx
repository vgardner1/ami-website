import { people } from "../people";

const board = people.filter((p) => p.category === "board");
const team = people.filter((p) => p.category === "team");

export default function Leadership() {
  return (
    <section id="leadership" className="section leadership">
      <div className="leadership__head">
        <span className="kicker">Leadership</span>
        <h2>The people who steward AMI.</h2>
        <p className="lead">
          AMI is a 501(c)(3) nonprofit, founded in 1982 by Stan Gryskiewicz.
          The board sets direction; a small full-time team carries the
          community between gatherings.
        </p>
      </div>

      <h3 className="leadership__sub">Board of directors</h3>
      <ul className="leadership__grid">
        {board.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong>
            {p.role && <span>{p.role}</span>}
            {p.org && <em>{p.org}</em>}
          </li>
        ))}
      </ul>

      <h3 className="leadership__sub">AMI team</h3>
      <ul className="leadership__grid">
        {team.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong>
            {p.role && <span>{p.role}</span>}
            {p.city && <em>{p.city}</em>}
          </li>
        ))}
      </ul>
    </section>
  );
}
