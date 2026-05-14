/** ComingSoon.jsx — placeholder screen for unbuilt sections */
import { P } from "../constants/theme.js";
import { CS_INFO } from "../data/worldCuisines.js";
import { Nana } from "../components/primitives.jsx";

export function ComingSoon({ name, onBack }) {
  const info = CS_INFO[name] || { icon: "🍴", title: name, desc: "Coming soon." };

  return (
    <div style={{ width: "100%", height: "100%", background: P.parchment, display: "flex", flexDirection: "column" }}>
      <div style={{ background: `linear-gradient(160deg,${P.brownDk} 0%,${P.brown} 100%)`, padding: "18px 20px 22px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: P.goldLt, fontFamily: "'Caveat',cursive", fontSize: 16, cursor: "pointer", marginBottom: 10, display: "block" }}>
          ← Back to kitchen
        </button>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: P.parchmentLt, margin: 0 }}>{info.title}</h1>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "44px 28px", textAlign: "center" }}>
        <Nana size={110} style={{ marginBottom: 16 }} />
        <div style={{ fontSize: 52, marginBottom: 16 }}>{info.icon}</div>
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 16, color: P.brownMid, marginBottom: 24, lineHeight: 1.7, maxWidth: 300 }}>{info.desc}</p>
        <div style={{ background: `${P.sage}15`, border: `1.5px dashed ${P.sageMid}`, borderRadius: 14, padding: "14px 18px", maxWidth: 310 }}>
          <p style={{ margin: 0, fontFamily: "'Caveat',cursive", fontSize: 17, color: P.sage, fontStyle: "italic", lineHeight: 1.55 }}>
            This room is still being prepared, dear. Come back soon — it'll be worth the wait.
          </p>
        </div>
      </div>
    </div>
  );
}
