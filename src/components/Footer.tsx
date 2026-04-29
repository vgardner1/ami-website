import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="/ami/logo.png" alt="" className="footer__logo" />
          <p>Association for Managers of Innovation · 501(c)(3) · est. 1982</p>
        </div>
        <div className="footer__cols">
          <div>
            <h4>Explore</h4>
            <Link to="/about">About</Link>
            <Link to="/meetings">Meetings</Link>
            <Link to="/community">Community</Link>
            <Link to="/leadership">Leadership</Link>
          </div>
          <div>
            <h4>Engage</h4>
            <Link to="/market">Offers &amp; Needs</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/onboarding">Newcomer journey</Link>
            <Link to="/membership">Membership</Link>
          </div>
          <div>
            <h4>Listen</h4>
            <a href="https://aminnovation.org/positive-turbulence" target="_blank" rel="noreferrer">
              Positive Turbulence Podcast
            </a>
            <a href="mailto:hello@aminnovation.org">Contact</a>
          </div>
        </div>
      </div>
      <p className="footer__sign">Made with care for the AMI ohana — Aloha.</p>
    </footer>
  );
}
