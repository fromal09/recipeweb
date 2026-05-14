/** SavedScreen.jsx — saved recipe book */
import { P } from "../constants/theme.js";
import { Nana } from "../components/primitives.jsx";

export function SavedScreen({ recipes, onSelect, onBack }) {
  return (
    <div style={{ width: "100%", height: "100%", background: P.parchment, overflowY: "auto" }}>
      <div style={{ background: `linear-gradient(160deg,${P.brownDk} 0%,${P.brown} 100%)`, padding: "18px 20px 22px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: P.goldLt, fontFamily: "'Caveat',cursive", fontSize: 16, cursor: "pointer", marginBottom: 10, display: "block" }}>
          ← Back to kitchen
        </button>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: P.parchmentLt, margin: 0 }}>My Recipe Book</h1>
      </div>

      <div style={{ padding: 20 }}>
        {recipes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <Nana size={100} style={{ margin: "0 auto 20px" }} />
            <p style={{ fontFamily: "'Caveat',cursive", fontSize: 24, color: P.brownMid, fontStyle: "italic", marginBottom: 10 }}>Your book is still empty, dear.</p>
            <p style={{ fontSize: 14, color: P.brownLt, lineHeight: 1.7 }}>Cook something wonderful, then save it here.</p>
          </div>
        ) : recipes.map(r => (
          <button key={r.id} onClick={() => onSelect(r)}
            style={{ width: "100%", marginBottom: 13, background: P.cream, border: `1.5px solid ${P.parchmentDk}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", textAlign: "left", boxShadow: "0 3px 14px rgba(45,27,14,.09)", display: "block" }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: P.brownDk, margin: "0 0 5px" }}>{r.name}</h3>
            <p style={{ fontSize: 13, color: P.brownMid, margin: "0 0 10px", fontStyle: "italic", lineHeight: 1.5 }}>{r.description}</p>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 6 }}>
              {[r.cuisine, r.totalTime, r.difficulty].filter(Boolean).map(t => (
                <span key={t} style={{ background: P.parchmentDk, color: P.brown, padding: "2px 9px", borderRadius: 10, fontFamily: "'Caveat',cursive", fontSize: 12, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
            <div style={{ fontSize: 11, color: P.brownLt, fontFamily: "'Caveat',cursive" }}>Saved {r.date}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
