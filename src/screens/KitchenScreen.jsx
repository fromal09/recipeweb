/** KitchenScreen.jsx — the main kitchen view with clickable zones */
import { useState } from "react";
import { P } from "../constants/theme.js";
import { KITCHEN_IMG } from "../assets.js";
import { ZONES } from "../data/worldCuisines.js";
import { FridgeDoorOverlay } from "../components/FridgeDoorOverlay.jsx";
import { TutorialBox } from "../components/TutorialBox.jsx";

export function KitchenScreen({ step, stepNum, total, onNext, onNav, doorOpen }) {
  const [hov, setHov] = useState(null);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <img
        src={KITCHEN_IMG}
        alt="kitchen"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* Subtle vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%,transparent 55%,rgba(20,10,3,.28) 100%)", pointerEvents: "none" }} />

      {/* Clickable zones */}
      {Object.entries(ZONES).map(([key, z]) => (
        <div
          key={key}
          onClick={() => onNav(z.nav)}
          onMouseEnter={() => setHov(key)}
          onMouseLeave={() => setHov(null)}
          style={{
            position: "absolute", left: z.x, top: z.y, width: z.w, height: z.h,
            cursor: "pointer", zIndex: 10,
            outline: step?.focus === key ? "3px solid rgba(234,201,106,.95)" : hov === key ? "2px solid rgba(234,201,106,.65)" : "none",
            outlineOffset: "2px", borderRadius: 6,
            background: hov === key ? "rgba(255,245,200,.1)" : step?.focus === key ? "rgba(234,201,106,.08)" : "transparent",
            transition: "all .18s",
          }}
        >
          {(hov === key || step?.focus === key) && (
            <div style={{
              position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
              background: P.brownDk, color: P.parchmentLt, fontFamily: "'Caveat',cursive",
              fontSize: 14, fontWeight: 700, padding: "5px 14px", borderRadius: 8,
              whiteSpace: "nowrap", marginBottom: 8, pointerEvents: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,.6)", zIndex: 20,
            }}>
              {z.label}
            </div>
          )}
        </div>
      ))}

      <FridgeDoorOverlay open={doorOpen} />

      {/* Wordmark */}
      <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", zIndex: 15, textAlign: "center", pointerEvents: "none" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "rgba(251,246,236,.95)", textShadow: "0 2px 16px rgba(0,0,0,.8)", letterSpacing: ".1em" }}>RecipeWeb</div>
        <div style={{ fontFamily: "'Caveat',cursive", fontSize: 13, color: "rgba(212,168,74,.9)", marginTop: 2, textShadow: "0 1px 8px rgba(0,0,0,.6)" }}>a culinary companion</div>
      </div>

      {step && <TutorialBox step={step} stepNum={stepNum} total={total} onNext={onNext} />}
    </div>
  );
}
