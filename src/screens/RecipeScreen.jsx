/** RecipeScreen.jsx — full recipe view with ingredients, steps, nudges */
import { useState } from "react";
import { P } from "../constants/theme.js";
import { NUDGES } from "../constants/config.js";
import { TECHNIQUES, STEP_TECHNIQUES } from "../data/techniques.js";
import { Card, SL, SH, Nana } from "../components/primitives.jsx";

export function RecipeScreen({ recipe, onBack, onSave, isSaved, onNudge, onTechnique }) {
  const [showNudges, setShowNudges] = useState(false);
  const [checked, setChecked] = useState({});

  return (
    <div style={{ width: "100%", height: "100%", background: P.parchment, overflowY: "auto" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(180deg,${P.parchmentDk} 0%,${P.parchment} 100%)`, padding: "18px 20px 16px", borderBottom: `2px solid ${P.parchmentDk}` }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: P.brownMid, fontFamily: "'Caveat',cursive", fontSize: 16, cursor: "pointer", marginBottom: 10, display: "block" }}>
          ← Other recipes
        </button>
        {recipe.refinement && (
          <div style={{ background: `${P.gold}22`, border: `1px solid ${P.goldLt}`, borderRadius: 8, padding: "6px 12px", marginBottom: 10, fontFamily: "'Caveat',cursive", fontSize: 13, color: P.brown }}>
            ✦ Refined: {recipe.refinement}
          </div>
        )}
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: P.brownDk, margin: "0 0 8px", lineHeight: 1.15 }}>{recipe.name}</h1>
        <p style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14, color: P.brownMid, margin: "0 0 14px", lineHeight: 1.6 }}>{recipe.description}</p>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {[recipe.totalTime, "Serves " + recipe.servings, recipe.difficulty, recipe.cuisine].filter(Boolean).map(m => (
            <span key={m} style={{ background: P.brownDk, color: P.goldLt, padding: "3px 11px", borderRadius: 12, fontFamily: "'Caveat',cursive", fontSize: 13, fontWeight: 600 }}>{m}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {/* Ingredients */}
        <SH>Ingredients</SH>
        <Card>
          {recipe.ingredients.map((ing, i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8, padding: "7px 0", borderBottom: i < recipe.ingredients.length - 1 ? `1px dashed ${P.parchmentDk}` : "none" }}>
              <span style={{ fontWeight: 700, color: P.rust, minWidth: 90, fontSize: 13, flexShrink: 0 }}>{ing.amount}</span>
              <span style={{ color: P.brownDk, fontSize: 14 }}>{ing.item}</span>
              {ing.note && <span style={{ fontFamily: "'Caveat',cursive", fontSize: 13.5, color: P.brownLt, fontStyle: "italic" }}>, {ing.note}</span>}
            </div>
          ))}
        </Card>

        {/* Steps */}
        <SH style={{ marginTop: 22 }}>Method</SH>
        {recipe.steps.map((step, i) => {
          const techKey = STEP_TECHNIQUES[recipe.id + ":" + i];
          const tech = techKey ? TECHNIQUES[techKey] : null;
          return (
            <div key={i}
              onClick={() => setChecked(p => ({ ...p, [i]: !p[i] }))}
              style={{ display: "flex", gap: 14, marginBottom: 18, cursor: "pointer", opacity: checked[i] ? 0.5 : 1, transition: "opacity .2s" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: checked[i] ? P.sageMid : P.rust, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, fontFamily: "'Playfair Display',serif", boxShadow: `0 3px 10px ${checked[i] ? "rgba(75,115,65,.4)" : "rgba(155,59,34,.4)"}`, transition: "background .2s", marginTop: 2 }}>
                {checked[i] ? "✓" : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 6px", fontSize: 14, lineHeight: 1.7, color: P.brownDk }}>{step.instruction}</p>
                {step.tip && (
                  <div style={{ display: "flex", gap: 8, padding: "8px 12px", background: `${P.goldBrt}1A`, borderLeft: `3px solid ${P.gold}`, borderRadius: "0 8px 8px 0", marginTop: 4 }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>✍</span>
                    <p style={{ margin: 0, fontFamily: "'Caveat',cursive", fontSize: 15.5, color: P.brownMid, lineHeight: 1.45, flex: 1 }}>{step.tip}</p>
                    {tech && onTechnique && (
                      <button
                        onClick={e => { e.stopPropagation(); onTechnique(techKey); }}
                        style={{ flexShrink: 0, background: P.brownDk, color: P.goldLt, border: "none", borderRadius: 8, padding: "3px 9px", fontFamily: "'Caveat',cursive", fontSize: 13, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start", marginTop: 1, whiteSpace: "nowrap" }}>
                        {tech.icon} Learn
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Nana note */}
        {recipe.nanaNote && (
          <div style={{ background: `${P.sage}15`, border: `1.5px dashed ${P.sageMid}`, borderRadius: 12, padding: "14px 16px", marginTop: 8, marginBottom: 22, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Nana size={56} />
            <p style={{ margin: 0, fontFamily: "'Caveat',cursive", fontSize: 16.5, color: P.sage, lineHeight: 1.55, fontStyle: "italic" }}>"{recipe.nanaNote}"</p>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <button onClick={onSave} style={{ flex: 1, padding: "13px 0", background: isSaved ? P.sage : "transparent", color: isSaved ? "white" : P.sage, border: `2px solid ${P.sage}`, borderRadius: 10, cursor: "pointer", fontFamily: "'Caveat',cursive", fontSize: 17, fontWeight: 700, transition: "all .2s" }}>
            {isSaved ? "✓ Saved!" : "♡  Save Recipe"}
          </button>
          <button onClick={() => setShowNudges(!showNudges)} style={{ flex: 1, padding: "13px 0", background: showNudges ? P.brownDk : "transparent", color: showNudges ? P.parchmentLt : P.brownDk, border: `2px solid ${P.brownDk}`, borderRadius: 10, cursor: "pointer", fontFamily: "'Caveat',cursive", fontSize: 17, fontWeight: 700, transition: "all .2s" }}>
            ✦  Refine It
          </button>
        </div>

        {/* Nudge panel */}
        {showNudges && (
          <Card>
            <p style={{ fontFamily: "'Caveat',cursive", fontSize: 16, color: P.brownMid, marginBottom: 12 }}>Tweak this recipe:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {NUDGES.map(n => (
                <button key={n} onClick={() => { onNudge(n); setShowNudges(false); }}
                  style={{ padding: "6px 14px", background: "white", border: `1.5px solid ${P.parchmentDk}`, borderRadius: 20, cursor: "pointer", fontFamily: "'Lora',serif", fontSize: 13, color: P.brownDk }}>
                  {n}
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
