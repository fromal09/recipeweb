/** WormholeCanvas.jsx — animated wormhole canvas shown during fridge transition */
import { useRef, useEffect } from "react";
import { EMOJIS, WCOLS } from "../constants/config.js";

export function WormholeCanvas({ phase }) {
  const cvs = useRef(null), raf = useRef(null), t = useRef(0), pts = useRef([]);

  useEffect(() => {
    pts.current = Array.from({ length: 24 }, (_, i) => ({
      emoji: EMOJIS[i % EMOJIS.length],
      angle: (i / 24) * Math.PI * 2,
      r: 55 + Math.random() * 95,
      speed: 0.004 + Math.random() * 0.005,
      drift: 0.5 + Math.random() * 0.8,
      size: 15 + Math.random() * 11,
    }));
  }, []);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 390; canvas.height = 844;
    const cx = 195, cy = 422, maxR = Math.sqrt(195 * 195 + 422 * 422) * 1.1;
    t.current = 0;

    const draw = () => {
      t.current += 0.018;
      const T = t.current, burst = phase === "burst";
      const expand = Math.min(T * (burst ? 0.55 : 0.42), burst ? 1 : 0.58);
      ctx.clearRect(0, 0, 390, 844);

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      bg.addColorStop(0, "#080301"); bg.addColorStop(0.5, "#1A0A04"); bg.addColorStop(1, "#2D1508");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, 390, 844);

      for (let i = 13; i >= 0; i--) {
        const prog = i / 13, r = prog * maxR * (0.25 + expand * 0.75) + Math.sin(T * 2.2 + i * 0.8) * 7;
        if (r < 2) continue;
        const col = WCOLS[i % WCOLS.length], alpha = (1 - prog * 0.45) * (0.18 + expand * 0.28);
        ctx.beginPath();
        for (let s = 0; s <= 120; s++) {
          const a = (s / 120) * Math.PI * 2, tw = T * (1.6 - prog * 1.1);
          ctx.lineTo(cx + Math.cos(a + tw) * r, cy + Math.sin(a + tw) * r * 0.44);
        }
        ctx.closePath();
        ctx.strokeStyle = col + Math.round(alpha * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 2.2 - prog * 1.4; ctx.stroke();
        if (i < 5) {
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          g.addColorStop(0, col + "35"); g.addColorStop(1, "transparent");
          ctx.fillStyle = g; ctx.fill();
        }
      }

      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70 + expand * 80);
      cg.addColorStop(0, `rgba(212,168,74,${0.55 + expand * 0.35})`);
      cg.addColorStop(0.5, `rgba(184,130,42,${0.18 + expand * 0.2})`);
      cg.addColorStop(1, "transparent");
      ctx.fillStyle = cg; ctx.fillRect(0, 0, 390, 844);

      ctx.save();
      pts.current.forEach(p => {
        p.angle -= p.speed;
        p.r = Math.max(10, p.r - p.drift * (0.5 + expand * 0.8));
        if (p.r < 12) { p.r = 85 + Math.random() * 95; p.angle = Math.random() * Math.PI * 2; }
        ctx.globalAlpha = Math.min(1, p.r / 55) * 0.85;
        ctx.font = p.size + "px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, cx + Math.cos(p.angle + T * 1.1) * p.r, cy + Math.sin(p.angle + T * 1.1) * p.r * 0.44);
      });
      ctx.restore();

      if (burst && T > 1.4) {
        ctx.fillStyle = `rgba(244,236,216,${Math.min((T - 1.4) * 2.8, 1)})`;
        ctx.fillRect(0, 0, 390, 844);
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf.current);
  }, [phase]);

  return (
    <canvas
      ref={cvs}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
