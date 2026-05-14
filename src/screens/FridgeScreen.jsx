/** FridgeScreen.jsx — ingredient entry and cooking preferences */
import { P } from "../constants/theme.js";
import { Card, SL, Sel, Nana } from "../components/primitives.jsx";

export function FridgeScreen({ ings, inputVal, setInputVal, addIng, removeIng, prefs, setPrefs, onFind, onBack }) {
  const cuisines = ["Any","Italian","Japanese","Mexican","French","Indian","Chinese","Mediterranean","Thai","Korean","Greek","Spanish","Middle Eastern"];
  const dietary  = ["None","Vegetarian","Vegan","Gluten-free","Dairy-free","Halal","Keto","Paleo"];
  const times    = ["15–20 min","30–45 min","1 hour","1.5 hours","2+ hours"];
  const skills   = ["Beginner","Intermediate","Advanced","Professional"];

  return (
    <div style={{ width: "100%", height: "100%", background: P.parchment, overflowY: "auto" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(160deg,${P.brownDk} 0%,${P.brown} 100%)`, padding: "18px 20px 24px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: P.goldLt, fontFamily: "'Caveat',cursive", fontSize: 16, cursor: "pointer", marginBottom: 10, display: "block" }}>
          ← Back to kitchen
        </button>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: P.parchmentLt, margin: "0 0 6px", lineHeight: 1.1 }}>
          What's in<br />the Fridge?
        </h1>
        <p style={{ color: P.brownLt, fontSize: 13.5, margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
          Tell me what you have and I'll find what fits.
        </p>
      </div>

      <div style={{ padding: 20 }}>
        {/* Ingredient input */}
        <Card>
          <SL>Your ingredients:</SL>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addIng()}
              placeholder="e.g. salmon, garlic, butter…"
              style={{ flex: 1, padding: "10px 14px", border: `1.5px solid ${P.parchmentDk}`, borderRadius: 8, fontFamily: "'Lora',serif", fontSize: 14, background: P.parchmentLt, color: P.brownDk, outline: "none" }}
            />
            <button onClick={addIng} style={{ width: 46, background: P.sage, color: "white", border: "none", borderRadius: 8, fontSize: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, minHeight: 32 }}>
            {ings.length === 0 && <span style={{ color: P.brownLt, fontStyle: "italic", fontSize: 13 }}>No ingredients yet…</span>}
            {ings.map(ing => (
              <div key={ing} style={{ background: P.brownDk, color: P.parchmentLt, padding: "5px 12px", borderRadius: 20, display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                {ing}
                <button onClick={() => removeIng(ing)} style={{ background: "none", border: "none", color: P.goldLt, cursor: "pointer", fontSize: 17, padding: 0, lineHeight: 1 }}>×</button>
              </div>
            ))}
          </div>
        </Card>

        {/* Preferences */}
        <Card style={{ marginTop: 14 }}>
          <SL>Preferences:</SL>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {["classic", "creative"].map(m => (
              <button key={m} onClick={() => setPrefs(p => ({ ...p, mode: m }))}
                style={{ flex: 1, padding: "10px 0", background: prefs.mode === m ? P.brown : "transparent", color: prefs.mode === m ? P.parchmentLt : P.brown, border: `2px solid ${P.brown}`, borderRadius: 8, cursor: "pointer", fontFamily: "'Caveat',cursive", fontSize: 16, fontWeight: 700, transition: "all .2s" }}>
                {m === "classic" ? "📖 Classic" : "✨ Creative"}
              </button>
            ))}
          </div>
          <Sel label="Cuisine:" value={prefs.cuisine || "Any"} opts={cuisines} onChange={v => setPrefs(p => ({ ...p, cuisine: v === "Any" ? "" : v }))} />
          <Sel label="Dietary needs:" value={prefs.dietary || "None"} opts={dietary} onChange={v => setPrefs(p => ({ ...p, dietary: v === "None" ? "" : v }))} />
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><Sel label="Time:" value={prefs.time} opts={times} onChange={v => setPrefs(p => ({ ...p, time: v }))} /></div>
            <div style={{ flex: 1 }}><Sel label="Skill:" value={prefs.skill} opts={skills} onChange={v => setPrefs(p => ({ ...p, skill: v }))} /></div>
          </div>
        </Card>

        <button onClick={onFind} disabled={!ings.length}
          style={{ width: "100%", marginTop: 18, padding: 16, background: !ings.length ? P.brownLt : `linear-gradient(135deg,${P.rust} 0%,#D46040 100%)`, color: "white", border: "none", borderRadius: 12, fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, cursor: !ings.length ? "not-allowed" : "pointer", boxShadow: ings.length ? "0 5px 22px rgba(155,59,34,.5)" : "none", letterSpacing: ".04em", transition: "all .25s" }}>
          Show me what fits  →
        </button>
        {!ings.length && (
          <p style={{ textAlign: "center", marginTop: 8, fontFamily: "'Caveat',cursive", fontSize: 14, color: P.brownLt, fontStyle: "italic" }}>
            Add at least one ingredient to begin
          </p>
        )}
      </div>
    </div>
  );
}
