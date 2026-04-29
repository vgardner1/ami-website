interface Value {
  name: string;
  body: string;
  icon: JSX.Element;
}

const ICON_PROPS = {
  width: 28, height: 28, viewBox: "0 0 24 24",
  fill: "none", stroke: "currentColor",
  strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

const values: Value[] = [
  { name: "Authenticity",     body: "We are genuine and show up as our true selves.",
    icon: <svg {...ICON_PROPS}><path d="M12 3l1.9 5.8L20 10l-5.1 3.7L17 20l-5-3.5L7 20l2.1-6.3L4 10l6.1-1.2L12 3z" /></svg> },
  { name: "Curiosity",        body: "We thrive on new ideas, thinking, and ways of being.",
    icon: <svg {...ICON_PROPS}><circle cx="11" cy="11" r="6" /><path d="M21 21l-4.5-4.5" /></svg> },
  { name: "Reciprocity",      body: "We share freely — and never sell when we meet.",
    icon: <svg {...ICON_PROPS}><path d="M3 8h13l-3-3" /><path d="M21 16H8l3 3" /></svg> },
  { name: "Trust",            body: "We uphold integrity, transparency, and confidentiality.",
    icon: <svg {...ICON_PROPS}><path d="M12 21s-7-4.5-7-11a4 4 0 017-2.6A4 4 0 0119 10c0 6.5-7 11-7 11z" /></svg> },
  { name: "Community-Based Learning", body: "We value shared learning and experiential knowledge exchange.",
    icon: <svg {...ICON_PROPS}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" /><path d="M14.5 19c0-2 1.7-3.4 4-3.4s4 1.4 4 3.4" /></svg> },
  { name: "Dialogue of Differences",  body: "We foster cross-generational, cross-discipline dialogue.",
    icon: <svg {...ICON_PROPS}><path d="M3 6h12a3 3 0 013 3v2a3 3 0 01-3 3H8l-4 3V6z" /><path d="M9 10h.01M12 10h.01M15 10h.01" /></svg> },
  { name: "Positive Turbulence",      body: "We seek inspiration from the periphery to provoke novel thinking.",
    icon: <svg {...ICON_PROPS}><path d="M3 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><path d="M3 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /></svg> },
  { name: "Possibility",      body: "We value discovery and the expression of possibility.",
    icon: <svg {...ICON_PROPS}><circle cx="12" cy="12" r="9" /><path d="M16.2 7.8L13.4 13.4 7.8 16.2 10.6 10.6z" /></svg> },
  { name: "Defer Judgment",   body: "We understand an idea fully before we evaluate it.",
    icon: <svg {...ICON_PROPS}><path d="M12 3v18" /><path d="M5 7h14" /><path d="M5 7l-2 5a3 3 0 006 0l-2-5" /><path d="M19 7l-2 5a3 3 0 006 0l-2-5" /></svg> },
];

const N = values.length;
// In viewBox space — single source of truth
const VIEW = 100;
const CENTER = VIEW / 2;       // 50
const RING_R = 38;             // ring radius in viewBox units
const NODE_R = 6;              // node radius in viewBox units

export default function ValuesOrbital() {
  return (
    <div className="values">
      <div className="values__orbital">
        <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="values__svg" aria-hidden>
          {/* Spokes from center to each node */}
          {values.map((_, i) => {
            const a = (i / N) * Math.PI * 2 - Math.PI / 2;
            const x = CENTER + Math.cos(a) * RING_R;
            const y = CENTER + Math.sin(a) * RING_R;
            return (
              <line
                key={`spoke-${i}`}
                x1={CENTER} y1={CENTER}
                x2={x} y2={y}
                className="values__spoke"
              />
            );
          })}

          {/* Dashed ring sits exactly under the nodes */}
          <circle cx={CENTER} cy={CENTER} r={RING_R} className="values__ring" />

          {/* Center disk for AMI logo */}
          <circle cx={CENTER} cy={CENTER} r={14} className="values__coreDisk" />

          {/* Static circular nodes — same radius as the ring */}
          {values.map((_, i) => {
            const a = (i / N) * Math.PI * 2 - Math.PI / 2;
            const x = CENTER + Math.cos(a) * RING_R;
            const y = CENTER + Math.sin(a) * RING_R;
            return (
              <circle
                key={`node-${i}`}
                cx={x} cy={y} r={NODE_R}
                className="values__node"
              />
            );
          })}
        </svg>

        {/* AMI logo overlay (as raster image, not SVG) */}
        <div className="values__core">
          <img src="/ami/logo.png" alt="AMI" />
        </div>

        {/* Icon overlays positioned exactly on each node */}
        {values.map((v, i) => {
          const a = (i / N) * Math.PI * 2 - Math.PI / 2;
          const xPct = ((CENTER + Math.cos(a) * RING_R) / VIEW) * 100;
          const yPct = ((CENTER + Math.sin(a) * RING_R) / VIEW) * 100;
          return (
            <span
              key={v.name}
              className="values__nodeIcon"
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
              aria-hidden
            >
              {v.icon}
            </span>
          );
        })}
      </div>

      <ul className="values__list">
        {values.map((v) => (
          <li key={v.name}>
            <span className="values__listIcon">{v.icon}</span>
            <span className="values__listText">
              <strong>{v.name}</strong>
              <em>{v.body}</em>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
