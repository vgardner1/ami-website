import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const sections = [
  { to: "/about", label: "About" },
  { to: "/meetings", label: "Meetings" },
  { to: "/community", label: "Community" },
  { to: "/market", label: "Offers & Needs" },
  { to: "/resources", label: "Resources" },
  { to: "/onboarding", label: "Newcomers" },
  { to: "/leadership", label: "Leadership" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <Link to="/" className="nav__brand" aria-label="AMI home">
        <img src="/ami/logo.png" alt="AMI, an innovation learning community" className="nav__logo" />
      </Link>

      <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
        {sections.map((s) => (
          <NavLink
            key={s.to}
            to={s.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >
            {s.label}
          </NavLink>
        ))}
      </nav>

      <Link className="nav__cta" to="/membership" onClick={() => setOpen(false)}>
        Become a member
      </Link>

      <button
        className="nav__toggle"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}
