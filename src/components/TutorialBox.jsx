/** TutorialBox.jsx — Nana's tutorial overlay shown on first visit */
import { P } from "../constants/theme.js";
import { Nana } from "./primitives.jsx";

export function TutorialBox({ step, stepNum, total, onNext }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50,
      background: "rgba(25,12,5,.55)",
      display: "flex", alignItems: "flex-end", padding: "0 16px 20px",
    }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, width: "100%" }}>
        <Nana size={96} style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,.5))" }} />
        <div style={{
          flex: 1, background: P.parchmentLt, borderRadius: 16,
          padding: "16px 18px", position: "relative",
          boxShadow: "0 8px 32px rgba(0,0,0,.45)",
          border: `2px solid ${P.brownLt}`,
        }}>
          {/* Speech-bubble tail */}
          <div style={{ position: "absolute", left: -14, bottom: 28, width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderRight: `14px solid ${P.brownLt}` }} />
          <div style={{ position: "absolute", left: -9, bottom: 29, width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderRight: `12px solid ${P.parchmentLt}` }} />

          <p style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14.5, lineHeight: 1.6, color: P.brownDk, margin: "0 0 14px" }}>
            "{step.text}"
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Progress dots */}
            <div style={{ display: "flex", gap: 5 }}>
              {Array.from({ length: total }).map((_, i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i < stepNum ? P.rust : P.brownLt, transition: "background .3s" }} />
              ))}
            </div>
            <button
              onClick={onNext}
              style={{
                background: `linear-gradient(135deg,${P.rust} 0%,${P.rustLt} 100%)`,
                color: "white", border: "none", borderRadius: 10,
                padding: "8px 18px", fontFamily: "'Caveat',cursive",
                fontSize: 16, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 14px rgba(155,59,34,.45)",
              }}
            >
              {stepNum >= total ? "Let's cook! 🍳" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
