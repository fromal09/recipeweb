/** FridgeDoorOverlay.jsx — animated fridge door that swings open */
export function FridgeDoorOverlay({ open }) {
  return (
    <div style={{
      position: "absolute", left: 3, top: 512, width: 168, height: 278,
      transformOrigin: "3px center",
      transform: open ? "perspective(600px) rotateY(-85deg)" : "perspective(600px) rotateY(0deg)",
      transition: open ? "transform 0.72s cubic-bezier(0.34,1.4,0.64,1)" : "none",
      zIndex: 15, borderRadius: 8, overflow: "hidden", pointerEvents: "none",
    }}>
      <div style={{
        width: "100%", height: "100%", position: "relative",
        background: "linear-gradient(105deg,#ECEAE0 0%,#F5F2E8 50%,#D4D0C4 100%)",
        border: "1.5px solid #B0ACA0", borderRadius: 8,
        boxShadow: "inset -12px 0 28px rgba(0,0,0,0.18),2px 0 8px rgba(0,0,0,0.2)",
      }}>
        {/* Top panel */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 42, background: "linear-gradient(105deg,#E0DDD0,#EDEAD8)", borderBottom: "3px solid #B0ACA0" }} />
        {/* Handles */}
        <div style={{ position: "absolute", right: 10, top: 46, width: 10, height: 26, background: "#A09888", borderRadius: 5 }} />
        <div style={{ position: "absolute", right: 10, top: 80, width: 10, height: 42, background: "#A09888", borderRadius: 5 }} />
        {/* Fridge magnets */}
        <div style={{ position: "absolute", top: 50, left: 18, width: 11, height: 11, borderRadius: "50%", background: "#C43020" }} />
        <div style={{ position: "absolute", top: 54, left: 55, width: 10, height: 10, borderRadius: "50%", background: "#2040A0" }} />
        <div style={{ position: "absolute", top: 52, left: 68, width: 9, height: 9, borderRadius: "50%", background: "#20A040" }} />
        {/* Grocery list */}
        <div style={{ position: "absolute", top: 50, left: 28, width: 26, height: 20, background: "#FFFDE8", border: "1px solid #D4C888", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Caveat',cursive", fontSize: 5.5, color: "#5A3A10" }}>grocery list</span>
        </div>
        {/* Shelves */}
        {[220, 226, 232, 238].map(y => (
          <div key={y} style={{ position: "absolute", top: y, left: 14, right: 14, height: 1.5, background: "#B0ACA0", opacity: 0.5 }} />
        ))}
        {/* Inner shadow */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 75%,rgba(0,0,0,0.18) 100%)", borderRadius: 8 }} />
      </div>
    </div>
  );
}
