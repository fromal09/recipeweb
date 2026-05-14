/** SpiceArchiveScreen.jsx — browse and detail view for the Spice Archive */
import { useState } from "react";
import { P } from "../constants/theme.js";
import { SPICES, SPICE_FLAVOR_CATS, INTENSITY_LABELS } from "../data/spices.js";
import { Card, SL, SH, Nana } from "../components/primitives.jsx";

// ── Shared chip style ──────────────────────────────────────────────────────
const chipBase = {
  flex: "0 0 auto", border: "1.5px solid", borderRadius: 20,
  padding: "6px 13px", cursor: "pointer",
  fontFamily: "'Caveat',cursive", fontSize: 14, fontWeight: 700, transition: "all .15s",
};

// ── Flavor tag pill ────────────────────────────────────────────────────────
function FlavorTag({ label }) {
  const colors = {
    warm:    { bg: "#9B3B2218", border: "#9B3B2244", text: P.rust },
    earthy:  { bg: "#5C3A1E18", border: "#5C3A1E44", text: P.brown },
    bright:  { bg: "#B8822A18", border: "#B8822A44", text: P.gold },
    floral:  { bg: "#6B8F5E18", border: "#6B8F5E44", text: P.sageMid },
    pungent: { bg: "#2D1B0E18", border: "#2D1B0E44", text: P.brownDk },
    smoky:   { bg: "#C4583A18", border: "#C4583A44", text: P.rustLt },
    blend:   { bg: "#D4A84A18", border: "#D4A84A44", text: P.goldLt },
  };
  const c = colors[label] || colors.earthy;
  return (
    <span style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 12, padding: "2px 10px", fontFamily: "'Caveat',cursive", fontSize: 13, fontWeight: 600, textTransform: "capitalize" }}>
      {label}
    </span>
  );
}

// ── Intensity dots ─────────────────────────────────────────────────────────
function IntensityDots({ level }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= level ? P.rust : P.parchmentDk, transition: "background .2s" }} />
      ))}
    </div>
  );
}

// ── Detail view ────────────────────────────────────────────────────────────
function SpiceDetail({ spice, onBack, onSpiceNav, onGrab }) {
  const [icon, label] = INTENSITY_LABELS[spice.intensity] || ["🟡", "Moderate"];

  return (
    <div style={{ width: "100%", height: "100%", background: P.parchment, overflowY: "auto" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(160deg,${P.brownDk} 0%,${P.brown} 100%)`, padding: "18px 20px 22px" }}>
        <button onClick={onBack}
          style={{ background: "none", border: "none", color: P.goldLt, fontFamily: "'Caveat',cursive", fontSize: 16, cursor: "pointer", marginBottom: 10, display: "block" }}>
          ← All Spices
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 52 }}>{spice.icon}</span>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: P.parchmentLt, margin: "0 0 4px", lineHeight: 1.1 }}>{spice.name}</h1>
            <p style={{ fontFamily: "'Caveat',cursive", fontStyle: "italic", fontSize: 14, color: P.goldLt, margin: 0 }}>{spice.summary}</p>
          </div>
        </div>
        {/* Badges */}
        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          <span style={{ background: `${P.parchment}22`, border: `1px solid ${P.goldLt}55`, borderRadius: 20, padding: "4px 12px", fontFamily: "'Caveat',cursive", fontSize: 13, color: P.parchmentLt }}>
            {icon} {label}
          </span>
          <span style={{ background: `${P.parchment}22`, border: `1px solid ${P.goldLt}55`, borderRadius: 20, padding: "4px 12px", fontFamily: "'Caveat',cursive", fontSize: 13, color: P.parchmentLt }}>
            📦 {spice.form}
          </span>
          <span style={{ background: `${P.parchment}22`, border: `1px solid ${P.goldLt}55`, borderRadius: 20, padding: "4px 12px", fontFamily: "'Caveat',cursive", fontSize: 13, color: P.parchmentLt }}>
            📍 {spice.origin.split(" — ")[0]}
          </span>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {/* Origin note */}
        {spice.origin.includes(" — ") && (
          <div style={{ background: `${P.goldBrt}18`, border: `1px solid ${P.goldLt}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 18 }}>
            <p style={{ margin: 0, fontFamily: "'Caveat',cursive", fontSize: 15, color: P.brownMid, lineHeight: 1.5 }}>
              📜 {spice.origin.split(" — ")[1]}
            </p>
          </div>
        )}

        {/* What it is */}
        <Card style={{ marginBottom: 18 }}>
          <SL>What it is:</SL>
          <p style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14.5, color: P.brownDk, lineHeight: 1.78, margin: 0 }}>{spice.what}</p>
        </Card>

        {/* When to use */}
        <div style={{ marginBottom: 18 }}>
          <SH>When to use it</SH>
          <p style={{ fontFamily: "'Lora',serif", fontSize: 14, color: P.brownDk, lineHeight: 1.7, margin: 0 }}>{spice.when}</p>
        </div>

        {/* Pro tip */}
        <div style={{ display: "flex", gap: 10, padding: "12px 14px", background: `${P.goldBrt}1A`, borderLeft: `3px solid ${P.gold}`, borderRadius: "0 10px 10px 0", marginBottom: 18 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>✍</span>
          <p style={{ margin: 0, fontFamily: "'Caveat',cursive", fontSize: 16, color: P.brownMid, lineHeight: 1.5 }}>{spice.tip}</p>
        </div>

        {/* Pairings */}
        {spice.pairings.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <SH>Pairs well with</SH>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {spice.pairings.map(id => {
                const s = SPICES[id];
                if (!s) return null;
                return (
                  <button key={id} onClick={() => onSpiceNav(id)}
                    style={{ display: "flex", alignItems: "center", gap: 6, background: P.cream, border: `1.5px solid ${P.parchmentDk}`, borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontFamily: "'Caveat',cursive", fontSize: 14, color: P.brownDk, transition: "all .15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = P.brownDk; e.currentTarget.style.color = P.parchmentLt; }}
                    onMouseLeave={e => { e.currentTarget.style.background = P.cream; e.currentTarget.style.color = P.brownDk; }}>
                    <span>{s.icon}</span> {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Cuisines */}
        <div style={{ marginBottom: 18 }}>
          <SH>Cuisines that rely on it</SH>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {spice.cuisines.map(c => (
              <span key={c} style={{ background: P.brownDk, color: P.parchmentLt, padding: "5px 13px", borderRadius: 16, fontFamily: "'Caveat',cursive", fontSize: 14, fontWeight: 600 }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Nana note */}
        {spice.nanaNote && (
          <div style={{ background: `${P.sage}15`, border: `1.5px dashed ${P.sageMid}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Nana size={56} />
            <p style={{ margin: 0, fontFamily: "'Caveat',cursive", fontSize: 16.5, color: P.sage, lineHeight: 1.55, fontStyle: "italic" }}>"{spice.nanaNote}"</p>
          </div>
        )}

        {/* Add to fridge button */}
        {onGrab && (
          <button onClick={() => onGrab(spice.name.toLowerCase())}
            style={{ width: "100%", padding: "14px 0", background: `linear-gradient(135deg,${P.sage} 0%,${P.sageMid} 100%)`, color: "white", border: "none", borderRadius: 12, fontFamily: "'Caveat',cursive", fontSize: 18, fontWeight: 700, cursor: "pointer", boxShadow: `0 5px 20px rgba(74,103,65,.4)`, letterSpacing: ".03em" }}>
            🫙 Grab a pinch → add to fridge
          </button>
        )}

        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

// ── Browse view ────────────────────────────────────────────────────────────
export function SpiceArchiveScreen({ onBack, onGrab }) {
  const [cat,       setCat]       = useState("all");
  const [selected,  setSelected]  = useState(null);
  const [sortBy,    setSortBy]    = useState(null);   // null | "az" | "intensity"
  const [intensityFilter, setIntensityFilter] = useState("all");

  const allSpices = Object.values(SPICES);

  // Navigate to a related spice from detail view
  const handleSpiceNav = (id) => setSelected(id);

  if (selected && SPICES[selected]) {
    return (
      <SpiceDetail
        spice={SPICES[selected]}
        onBack={() => setSelected(null)}
        onSpiceNav={handleSpiceNav}
        onGrab={onGrab}
      />
    );
  }

  // Filter
  let display = cat === "all"
    ? allSpices
    : allSpices.filter(s => s.flavor.includes(cat));

  if (intensityFilter !== "all") {
    display = display.filter(s => s.intensity === intensityFilter);
  }

  // Sort
  if (sortBy === "az") {
    display = [...display].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "intensity") {
    display = [...display].sort((a, b) => a.intensity - b.intensity);
  }

  const SORT_OPTS  = [{ id: "az", label: "A–Z" }, { id: "intensity", label: "🌶 Intensity" }];
  const INT_OPTS   = [{ id: "all", label: "All" }, { id: 1, label: "🟢 Mild" }, { id: 2, label: "🟡 Moderate" }, { id: 3, label: "🔴 Bold" }];

  return (
    <div style={{ width: "100%", height: "100%", background: P.parchment, overflowY: "auto" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(160deg,${P.brownDk} 0%,${P.brown} 100%)`, padding: "18px 20px 20px" }}>
        <button onClick={onBack}
          style={{ background: "none", border: "none", color: P.goldLt, fontFamily: "'Caveat',cursive", fontSize: 16, cursor: "pointer", marginBottom: 10, display: "block" }}>
          ← Kitchen
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 40 }}>🫙</span>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: P.parchmentLt, margin: "0 0 4px" }}>Spice Archive</h1>
            <p style={{ color: P.brownLt, fontSize: 13, margin: 0, fontStyle: "italic" }}>{display.length} spice{display.length !== 1 ? "s" : ""} shown</p>
          </div>
        </div>
      </div>

      {/* Flavor category tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${P.parchmentDk}`, background: P.cream, overflowX: "auto" }}>
        {SPICE_FLAVOR_CATS.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            style={{ flex: "0 0 auto", padding: "11px 14px", border: "none", cursor: "pointer", background: cat === c.id ? P.parchment : "transparent", borderBottom: cat === c.id ? `3px solid ${P.rust}` : "3px solid transparent", fontFamily: "'Caveat',cursive", fontSize: 15, fontWeight: 700, color: cat === c.id ? P.rust : P.brownMid, transition: "all .15s", whiteSpace: "nowrap" }}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Sort + Intensity filter */}
      <div style={{ background: P.cream, borderBottom: `1px solid ${P.parchmentDk}`, padding: "10px 16px" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 8, paddingBottom: 2 }}>
          <span style={{ fontFamily: "'Caveat',cursive", fontSize: 13, color: P.brownMid, flexShrink: 0, lineHeight: "30px", paddingRight: 2 }}>Sort:</span>
          {SORT_OPTS.map(o => {
            const active = sortBy === o.id;
            return (
              <button key={o.id} onClick={() => setSortBy(active ? null : o.id)}
                style={{ ...chipBase, borderColor: active ? P.rust : P.parchmentDk, background: active ? P.rust : "transparent", color: active ? "#fff" : P.brownMid }}>
                {o.label}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
          <span style={{ fontFamily: "'Caveat',cursive", fontSize: 13, color: P.brownMid, flexShrink: 0, lineHeight: "30px", paddingRight: 2 }}>Heat:</span>
          {INT_OPTS.map(o => {
            const active = intensityFilter === o.id;
            return (
              <button key={String(o.id)} onClick={() => setIntensityFilter(o.id)}
                style={{ ...chipBase, borderColor: active ? P.rust : P.parchmentDk, background: active ? `${P.rust}18` : "transparent", color: active ? P.rust : P.brownMid }}>
                {o.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Spice cards */}
      <div style={{ padding: "16px 16px 24px" }}>
        {display.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: P.brownMid, fontFamily: "'Caveat',cursive", fontSize: 18 }}>
            No spices match this filter.
          </div>
        )}
        {display.map(s => {
          const [intensityIcon] = INTENSITY_LABELS[s.intensity] || ["🟡"];
          return (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ width: "100%", marginBottom: 12, background: P.cream, border: `1.5px solid ${P.parchmentDk}`, borderRadius: 14, padding: "15px 16px", cursor: "pointer", textAlign: "left", boxShadow: "0 3px 14px rgba(45,27,14,.08)", display: "block", transition: "transform .15s,box-shadow .15s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(45,27,14,.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 3px 14px rgba(45,27,14,.08)"; }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
                <span style={{ fontSize: 32, flexShrink: 0, marginTop: 2 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: P.brownDk, margin: 0 }}>{s.name}</h3>
                    <span style={{ fontFamily: "'Caveat',cursive", fontSize: 12, color: P.brownLt }}>{intensityIcon}</span>
                  </div>
                  <p style={{ fontFamily: "'Caveat',cursive", fontSize: 14, color: P.brownMid, margin: "0 0 9px", fontStyle: "italic" }}>{s.summary}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    {s.flavor.map(f => <FlavorTag key={f} label={f} />)}
                    <IntensityDots level={s.intensity} />
                  </div>
                </div>
                <span style={{ color: P.brownLt, fontSize: 18, flexShrink: 0, marginTop: 4 }}>›</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
