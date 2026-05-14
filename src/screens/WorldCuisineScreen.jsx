/** WorldCuisineScreen.jsx — world map and cuisine detail views */
import { useState } from "react";
import { P } from "../constants/theme.js";
import { MAP_IMG } from "../assets.js";
import { Card } from "../components/primitives.jsx";
import { WORLD_CUISINES, CONTINENT_ZONES, CS_INFO } from "../data/worldCuisines.js";

export function WorldCuisineScreen({ onBack, onCook }) {
  const [view, setView] = useState("map"); // "map" | "regions" | "detail"
  const [activeContinent, setActiveContinent] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [hov, setHov] = useState(null);

  const continentData = activeContinent ? WORLD_CUISINES[activeContinent.id] : null;

  if (view === "detail" && activeRegion) {
    return (
      <CuisineDetailView
        region={activeRegion}
        continentName={continentData?.name}
        onBack={() => setView("regions")}
        onCook={onCook}
      />
    );
  }

  if (view === "regions" && activeContinent) {
    return (
      <RegionListView
        continent={activeContinent}
        data={continentData}
        onSelect={(region) => { setActiveRegion(region); setView("detail"); }}
        onBack={() => setView("map")}
      />
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <img
        src={MAP_IMG}
        alt="World cuisine map"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", display: "block" }}
      />
      {/* Subtle overlay for readability */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 38%, transparent 50%, rgba(20,10,3,0.18) 100%)", pointerEvents: "none" }} />

      {/* Back button */}
      <button
        onClick={onBack}
        style={{ position: "absolute", top: 16, left: 16, zIndex: 20, background: "rgba(45,27,14,0.82)", color: P.goldLt, border: `1px solid ${P.goldLt}44`, borderRadius: 20, padding: "6px 14px", fontFamily: "'Caveat',cursive", fontSize: 16, cursor: "pointer", backdropFilter: "blur(4px)" }}
      >
        ← Kitchen
      </button>

      {/* SVG overlay — polygon zones matching actual continent shapes */}
      <svg
        viewBox="0 0 390 844"
        style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:10,overflow:"visible"}}
      >
        {CONTINENT_ZONES.map(zone => {
          const isHov = hov === zone.id;
          // Compute centroid of polygon for tooltip placement
          const pts2 = zone.points.split(" ").map(p => p.split(",").map(Number));
          const cx = Math.round(pts2.reduce((s,[x])=>s+x,0)/pts2.length);
          const cy = Math.round(pts2.reduce((s,[,y])=>s+y,0)/pts2.length);
          return (
            <g key={zone.id}
              onClick={() => { setActiveContinent(zone); setView("regions"); }}
              onMouseEnter={() => setHov(zone.id)}
              onMouseLeave={() => setHov(null)}
              style={{cursor:"pointer"}}
            >
              <polygon
                points={zone.points}
                fill={isHov ? `${zone.color}30` : "transparent"}
                stroke={isHov ? `${zone.color}DD` : "transparent"}
                strokeWidth={isHov ? 2.5 : 0}
                style={{transition:"all .15s"}}
              />
              {isHov && (
                <g>
                  <rect
                    x={cx-72} y={cy-22} width={144} height={28} rx={8}
                    fill="rgba(18,8,3,0.90)" stroke={zone.color} strokeWidth={1}
                  />
                  <text
                    x={cx} y={cy-2} textAnchor="middle"
                    fontFamily="'Caveat',cursive" fontSize={15} fontWeight="700"
                    fill="#FBF6EC"
                  >{zone.emoji} {zone.label}</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tap hint */}
      <div style={{
        position: "absolute", bottom: 85, left: "50%", transform: "translateX(-50%)",
        background: "rgba(25,12,4,0.8)", color: P.parchmentLt,
        fontFamily: "'Caveat',cursive", fontSize: 15, padding: "7px 18px",
        borderRadius: 20, whiteSpace: "nowrap", pointerEvents: "none",
        border: `1px solid ${P.goldLt}44`, backdropFilter: "blur(4px)",
      }}>
        Tap any continent to explore
      </div>
    </div>
  );
}

export function RegionListView({ continent, data, onSelect, onBack }) {
  return (
    <div style={{ width: "100%", height: "100%", background: P.parchment, overflowY: "auto" }}>
      <div style={{ background: `linear-gradient(160deg,${P.brownDk} 0%,${P.brown} 100%)`, padding: "18px 20px 22px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: P.goldLt, fontFamily: "'Caveat',cursive", fontSize: 16, cursor: "pointer", marginBottom: 10, display: "block" }}>
          ← World Map
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 42 }}>{continent.emoji}</span>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: P.parchmentLt, margin: "0 0 5px", lineHeight: 1.15 }}>{data?.name || continent.label}</h1>
            <p style={{ color: P.brownLt, fontSize: 13, margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>{continent.description}</p>
          </div>
        </div>
      </div>
      <div style={{ padding: "18px 16px" }}>
        <div style={{ fontFamily: "'Caveat',cursive", fontSize: 16, color: P.brownMid, marginBottom: 14 }}>Choose a cuisine tradition:</div>
        {data?.regions.map(region => (
          <button
            key={region.id}
            onClick={() => onSelect(region)}
            style={{
              width: "100%", marginBottom: 13, background: P.cream,
              border: `1.5px solid ${P.parchmentDk}`, borderRadius: 14,
              padding: "15px 16px", cursor: "pointer", textAlign: "left",
              boxShadow: "0 3px 14px rgba(45,27,14,.09)", display: "block",
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(45,27,14,.16)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 3px 14px rgba(45,27,14,.09)"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 30 }}>{region.flag}</span>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: P.brownDk, margin: "0 0 2px" }}>{region.name}</h3>
                <p style={{ fontFamily: "'Caveat',cursive", fontStyle: "italic", fontSize: 14, color: P.brownMid, margin: 0 }}>{region.tagline}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {region.signature.slice(0, 4).map(ing => (
                <span key={ing} style={{ background: P.parchmentDk, color: P.brown, padding: "2px 9px", borderRadius: 10, fontFamily: "'Caveat',cursive", fontSize: 11, fontWeight: 600 }}>{ing}</span>
              ))}
              {region.signature.length > 4 && <span style={{ color: P.brownLt, fontFamily: "'Caveat',cursive", fontSize: 11, padding: "2px 4px" }}>+{region.signature.length - 4} more</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function CuisineDetailView({ region, continentName, onBack, onCook }) {
  return (
    <div style={{ width: "100%", height: "100%", background: P.parchment, overflowY: "auto" }}>
      <div style={{ background: `linear-gradient(160deg,${P.brownDk} 0%,${P.brown} 100%)`, padding: "18px 20px 22px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: P.goldLt, fontFamily: "'Caveat',cursive", fontSize: 16, cursor: "pointer", marginBottom: 10, display: "block" }}>
          ← {continentName}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 48 }}>{region.flag}</span>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: P.parchmentLt, margin: "0 0 5px", lineHeight: 1.1 }}>{region.name}</h1>
            <p style={{ fontFamily: "'Caveat',cursive", fontStyle: "italic", fontSize: 15, color: P.goldLt, margin: 0 }}>{region.tagline}</p>
          </div>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        {/* Context */}
        <Card>
          <SL>The tradition:</SL>
          <p style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14.5, color: P.brownDk, lineHeight: 1.75, margin: 0 }}>{region.context}</p>
        </Card>

        {/* Signature ingredients */}
        <div style={{ marginTop: 18 }}>
          <SH>Signature ingredients</SH>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {region.signature.map(ing => (
              <div key={ing} style={{ background: P.brownDk, color: P.parchmentLt, padding: "7px 14px", borderRadius: 20, fontFamily: "'Caveat',cursive", fontSize: 15, fontWeight: 600, boxShadow: "0 2px 8px rgba(45,27,14,.2)" }}>
                {ing}
              </div>
            ))}
          </div>
        </div>

        {/* Nana note */}
        {region.nanaNote && (
          <div style={{ background: `${P.sage}15`, border: `1.5px dashed ${P.sageMid}`, borderRadius: 12, padding: "14px 16px", marginTop: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Nana size={56} />
            <p style={{ margin: 0, fontFamily: "'Caveat',cursive", fontSize: 16.5, color: P.sage, lineHeight: 1.55, fontStyle: "italic" }}>"{region.nanaNote}"</p>
          </div>
        )}

        {/* Cook this cuisine */}
        <button
          onClick={() => onCook(region.searchTags)}
          style={{
            width: "100%", marginTop: 22, padding: 16,
            background: `linear-gradient(135deg,${P.rust} 0%,#D46040 100%)`,
            color: "white", border: "none", borderRadius: 12,
            fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700,
            cursor: "pointer", boxShadow: "0 5px 22px rgba(155,59,34,.5)",
            letterSpacing: ".04em",
          }}
        >
          Cook {region.name} tonight →
        </button>
        <p style={{ textAlign: "center", marginTop: 8, fontFamily: "'Caveat',cursive", fontSize: 13, color: P.brownLt, fontStyle: "italic" }}>
          Opens the fridge with {region.name.toLowerCase()} ingredients pre-loaded
        </p>
      </div>
    </div>
  );
}


