/** PickerScreen.jsx — shows matched recipes for the user to choose from */
import { P } from "../constants/theme.js";
import { Nana, Tag } from "../components/primitives.jsx";

export function PickerScreen({ matches, onSelect, onBack }) {
  const diffColor = { Easy: P.sage, Medium: P.gold, Intermediate: P.gold, Advanced: P.rust };

  return (
    <div style={{ width: "100%", height: "100%", background: P.parchment, overflowY: "auto" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(160deg,${P.brownDk} 0%,${P.brown} 100%)`, padding: "18px 20px 22px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: P.goldLt, fontFamily: "'Caveat',cursive", fontSize: 16, cursor: "pointer", marginBottom: 10, display: "block" }}>
          ← Back to fridge
        </button>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: P.parchmentLt, margin: "0 0 6px", lineHeight: 1.15 }}>
          Nana found<br />these for you
        </h1>
        <p style={{ color: P.brownLt, fontSize: 13.5, margin: 0, fontStyle: "italic" }}>Tap one to see the full recipe.</p>
      </div>

      <div style={{ padding: 16 }}>
        {matches.map((r, i) => (
          <button key={r.id} onClick={() => onSelect(r)}
            style={{ width: "100%", marginBottom: 14, background: "white", border: `1.5px solid ${P.parchmentDk}`, borderRadius: 14, padding: 0, cursor: "pointer", textAlign: "left", boxShadow: "0 3px 16px rgba(45,27,14,.1)", overflow: "hidden", display: "block", transition: "transform .15s,box-shadow .15s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(45,27,14,.16)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 3px 16px rgba(45,27,14,.1)"; }}>
            {/* Accent stripe */}
            <div style={{ height: 5, background: i === 0 ? `linear-gradient(90deg,${P.rust},${P.gold})` : `linear-gradient(90deg,${P.brownLt},${P.parchmentDk})` }} />
            <div style={{ padding: "14px 16px" }}>
              {i === 0 && <div style={{ fontFamily: "'Caveat',cursive", fontSize: 12, fontWeight: 700, color: P.rust, letterSpacing: ".06em", marginBottom: 4 }}>BEST MATCH</div>}
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: P.brownDk, margin: "0 0 6px", lineHeight: 1.2 }}>{r.name}</h3>
              <p style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 13, color: P.brownMid, margin: "0 0 12px", lineHeight: 1.5 }}>{r.description}</p>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                <Tag color={P.brownDk} text={r.cuisine} />
                <Tag color={P.brownDk} text={r.totalTime} />
                <Tag color={diffColor[r.difficulty] || P.gold} text={r.difficulty} />
                <Tag color={P.brownDk} text={`Serves ${r.servings}`} />
              </div>
            </div>
          </button>
        ))}

        <div style={{ textAlign: "center", padding: "8px 0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
            <Nana size={44} />
            <p style={{ fontFamily: "'Caveat',cursive", fontSize: 15.5, color: P.brownMid, fontStyle: "italic", margin: 0, textAlign: "left", maxWidth: 220 }}>
              {matches.length > 0 ? "Each of these would do your ingredients proud." : "Try different ingredients — let's see what else I can find."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
