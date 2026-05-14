/** primitives.jsx — shared low-level UI components */
import { P } from "../constants/theme.js";
import { NANA_IMG } from "../assets.js";

export function Nana({ size = 70, style = {} }) {
  return (
    <img
      src={NANA_IMG}
      alt="Nana"
      style={{ width: size, height: size, objectFit: "contain", flexShrink: 0, display: "block", ...style }}
    />
  );
}

export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: P.cream,
      border: `1.5px solid ${P.parchmentDk}`,
      borderRadius: 12,
      padding: 16,
      boxShadow: "0 3px 14px rgba(45,27,14,.09)",
      ...style,
    }}>
      {children}
    </div>
  );
}

/** Section label */
export function SL({ children }) {
  return (
    <div style={{ fontFamily: "'Caveat',cursive", fontSize: 17, color: P.brown, marginBottom: 10, fontWeight: 600 }}>
      {children}
    </div>
  );
}

/** Section heading */
export function SH({ children, style = {} }) {
  return (
    <h2 style={{
      fontFamily: "'Playfair Display',serif",
      fontSize: 19,
      fontWeight: 700,
      color: P.brownDk,
      margin: "0 0 13px",
      borderBottom: `2px solid ${P.parchmentDk}`,
      paddingBottom: 7,
      ...style,
    }}>
      {children}
    </h2>
  );
}

export function Sel({ label, value, opts, onChange }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ fontFamily: "'Caveat',cursive", fontSize: 14, color: P.brownMid, marginBottom: 5 }}>{label}</div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", padding: "9px 12px",
          border: `1.5px solid ${P.parchmentDk}`, borderRadius: 8,
          fontFamily: "'Lora',serif", fontSize: 13,
          background: P.parchmentLt, color: P.brownDk,
          cursor: "pointer", outline: "none",
        }}
      >
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

export function Tag({ color, text }) {
  return (
    <span style={{
      background: color, color: "white",
      padding: "3px 10px", borderRadius: 10,
      fontFamily: "'Caveat',cursive", fontSize: 12, fontWeight: 600,
    }}>
      {text}
    </span>
  );
}
