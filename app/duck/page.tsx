"use client";
import ".././extras.css";
import { useEffect, useRef, useState } from "react";


const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_SPEED = 1.8;
const DUCK_FOLLOW_DISTANCE = 60;
const DUCK_SPEED = 1.5;
const MAMA_DUCK_SIZE = 30;
const BABY_DUCK_SIZE = 18;
const PLAYER_SIZE = 30;

interface Duck {
  id: number;
  x: number;
  y: number;
  following: boolean;
  delivered: boolean;
  angle: number;
  wobble: number;
}

interface Player {
  x: number;
  y: number;
  angle: number;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export default function duck() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 400, y: 300 });
  const playerRef = useRef<Player>({ x: 400, y: 300, angle: 0 });
  const ducksRef = useRef<Duck[]>([
    { id: 1, x: 150, y: 150, following: false, delivered: false, angle: 0, wobble: 0 },
    { id: 2, x: 650, y: 200, following: false, delivered: false, angle: 0, wobble: 0 },
    { id: 3, x: 200, y: 450, following: false, delivered: false, angle: 0, wobble: 0 },
    { id: 4, x: 600, y: 480, following: false, delivered: false, angle: 0, wobble: 0 },
    { id: 5, x: 400, y: 100, following: false, delivered: false, angle: 0, wobble: 0 },
  ]);
  const mamaRef = useRef({ x: 700, y: 300 });
  const floatingHeartsRef = useRef<FloatingHeart[]>([]);
  const heartIdRef = useRef(0);
  const deliveredCountRef = useRef(0);
  const [won, setWon] = useState(false);
  const [screen, setScreen] = useState<"splash" | "game">("splash");
  const startedRef = useRef(false);
  const animRef = useRef<number>();
  const frameRef = useRef(0);

  function resetGame() {
    playerRef.current = { x: 400, y: 300, angle: 0 };
    ducksRef.current = [
      { id: 1, x: 150, y: 150, following: false, delivered: false, angle: 0, wobble: 0 },
      { id: 2, x: 650, y: 200, following: false, delivered: false, angle: 0, wobble: 0 },
      { id: 3, x: 200, y: 450, following: false, delivered: false, angle: 0, wobble: 0 },
      { id: 4, x: 600, y: 480, following: false, delivered: false, angle: 0, wobble: 0 },
      { id: 5, x: 400, y: 100, following: false, delivered: false, angle: 0, wobble: 0 },
    ];
    floatingHeartsRef.current = [];
    deliveredCountRef.current = 0;
    frameRef.current = 0;
    setWon(false);
    setScreen("game");
    startedRef.current = true;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    function drawWater() {
      if (!ctx) return;
      ctx.fillStyle = "#4a90d9";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 50 + i * 50);
        ctx.bezierCurveTo(200, 40 + i * 50, 600, 60 + i * 50, 800, 50 + i * 50);
        ctx.stroke();
      }
    }

    function drawPlayer(p: Player) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      ctx.fillStyle = "#e07b39";
      ctx.beginPath();
      ctx.ellipse(0, 0, PLAYER_SIZE, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#f5d5a0";
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#8B5e3c";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(20, 0);
      ctx.stroke();

      ctx.fillStyle = "#5b8dd9";
      ctx.fillRect(-24, -4, 8, 8);
      ctx.fillRect(16, -4, 8, 8);

      ctx.restore();
    }

    function drawBabyDuck(duck: Duck) {
      if (!ctx || duck.delivered) return;
      ctx.save();
      ctx.translate(duck.x, duck.y);
      ctx.rotate(duck.angle + Math.sin(duck.wobble) * 0.2);

      ctx.fillStyle = duck.following ? "#ffe066" : "#f5c842";
      ctx.beginPath();
      ctx.ellipse(0, 0, BABY_DUCK_SIZE / 2, BABY_DUCK_SIZE / 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(BABY_DUCK_SIZE / 3, -BABY_DUCK_SIZE / 4, BABY_DUCK_SIZE / 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#f0a500";
      ctx.beginPath();
      ctx.ellipse(BABY_DUCK_SIZE / 1.5, -BABY_DUCK_SIZE / 4, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(BABY_DUCK_SIZE / 2.8, -BABY_DUCK_SIZE / 3, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function drawMamaDuck(frame: number) {
      if (!ctx) return;
      const m = mamaRef.current;
      const bounce = Math.sin(frame * 0.08) * 4;
      const following = ducksRef.current.filter(d => d.following && !d.delivered).length;
      const allDelivered = deliveredCountRef.current === ducksRef.current.length;

      ctx.save();
      ctx.translate(m.x, m.y + bounce);

      // pulsing glow ring
      ctx.strokeStyle = "rgba(255,220,50,0.3)";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(0, 0, MAMA_DUCK_SIZE + 18 + Math.sin(frame * 0.08) * 3, 0, Math.PI * 2);
      ctx.stroke();

      // body
      ctx.fillStyle = "#c8a800";
      ctx.beginPath();
      ctx.ellipse(0, 0, MAMA_DUCK_SIZE, MAMA_DUCK_SIZE / 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // head
      ctx.beginPath();
      ctx.arc(MAMA_DUCK_SIZE / 1.5, -MAMA_DUCK_SIZE / 2, MAMA_DUCK_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();

      // bill
      ctx.fillStyle = "#e08c00";
      ctx.beginPath();
      ctx.ellipse(MAMA_DUCK_SIZE * 1.3, -MAMA_DUCK_SIZE / 2, 7, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // eye with shine
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(MAMA_DUCK_SIZE / 1.2, -MAMA_DUCK_SIZE / 1.6, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(MAMA_DUCK_SIZE / 1.2 + 1, -MAMA_DUCK_SIZE / 1.6 - 1, 1, 0, Math.PI * 2);
      ctx.fill();

      // hearts increase as ducks follow the player
      if (following > 0) {
        const hearts = "♥".repeat(following);
        ctx.font = `${14 + Math.sin(frame * 0.1) * 2}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(255,100,150,${0.6 + Math.sin(frame * 0.1) * 0.4})`;
        ctx.fillText(hearts, 0, -MAMA_DUCK_SIZE - 20);
      }

      // quack when all delivered
      if (allDelivered) {
        ctx.font = "bold 14px sans-serif";
        ctx.fillStyle = `rgba(255,255,255,${0.7 + Math.sin(frame * 0.2) * 0.3})`;
        ctx.textAlign = "center";
        ctx.fillText("QUACK! 🎉", 0, -MAMA_DUCK_SIZE - 40);
      }

      ctx.restore();

      // floating hearts
      floatingHeartsRef.current.forEach(h => {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = h.opacity;
        ctx.font = `${14 * h.scale}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff6496";
        ctx.fillText("♥", h.x, h.y);
        ctx.restore();
      });
    }

    function update() {
      if (!startedRef.current) return;
      frameRef.current += 1;
      const p = playerRef.current;
      const mouse = mouseRef.current;

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 5) {
        p.angle = Math.atan2(dy, dx);
        p.x += (dx / dist) * PLAYER_SPEED;
        p.y += (dy / dist) * PLAYER_SPEED;
      }

      const ducks = ducksRef.current;
      const followers = ducks.filter(d => d.following && !d.delivered);
      followers.forEach((duck, i) => {
        const target = i === 0 ? p : followers[i - 1];
        const tdx = target.x - duck.x;
        const tdy = target.y - duck.y;
        const tdist = Math.sqrt(tdx * tdx + tdy * tdy);
        const gap = i === 0 ? 40 : 30;
        if (tdist > gap) {
          duck.angle = Math.atan2(tdy, tdx);
          duck.x += (tdx / tdist) * DUCK_SPEED;
          duck.y += (tdy / tdist) * DUCK_SPEED;
        }
        duck.wobble += 0.1;
      });

      ducks.forEach(duck => {
        if (duck.delivered) return;
        if (!duck.following) {
          const ddx = p.x - duck.x;
          const ddy = p.y - duck.y;
          const ddist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (ddist < DUCK_FOLLOW_DISTANCE) duck.following = true;
          duck.wobble += 0.05;
        }

        if (duck.following) {
          const m = mamaRef.current;
          const mdx = m.x - duck.x;
          const mdy = m.y - duck.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < MAMA_DUCK_SIZE + 10) {
            duck.delivered = true;
            duck.x = m.x + (Math.random() - 0.5) * 40;
            duck.y = m.y + (Math.random() - 0.5) * 40;
            deliveredCountRef.current += 1;

            // spawn floating hearts on delivery
            for (let i = 0; i < 4; i++) {
              floatingHeartsRef.current.push({
                id: heartIdRef.current++,
                x: m.x + (Math.random() - 0.5) * 60,
                y: m.y - 20,
                opacity: 1,
                scale: 0.8 + Math.random() * 0.8,
              });
            }
          }
        }
      });

      // animate floating hearts
      floatingHeartsRef.current = floatingHeartsRef.current
        .map(h => ({ ...h, y: h.y - 1, opacity: h.opacity - 0.015 }))
        .filter(h => h.opacity > 0);

      const deliveredCount = ducks.filter(d => d.delivered).length;
      if (deliveredCount === ducks.length) setWon(true);
    }

    function render() {
      if (!ctx) return;
      drawWater();
      drawMamaDuck(frameRef.current);
      ducksRef.current.forEach(drawBabyDuck);
      if (startedRef.current) {
        drawPlayer(playerRef.current);
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.roundRect(10, 10, 220, 36, 8);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`🐥 Ducks delivered: ${ducksRef.current.filter(d => d.delivered).length} / ${ducksRef.current.length}`, 20, 33);
      }
    }

    function loop() {
      update();
      render();
      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main style={{
      backgroundColor: "#212121",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      fontFamily: "inherit",
    }}>
      {screen === "splash" && (
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#212121",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          zIndex: 10,
        }}>
          <h1 style={{ color: "white", fontSize: "2.5rem", margin: 0, fontWeight: 800 }}>life of a duck 🦆</h1>
          <p style={{ color: "white", fontSize: "1rem", margin: 0, maxWidth: "400px", textAlign: "center" }}>
            mama duck has lost all her children and needs your help to bring them back
          </p>
          <button className="button" onClick = {resetGame} >that's irresponsible</button>
          <p style={{ fontSize: "0.75rem" }}>*for the best experience, please always use a desktop</p>
        </div>
      )}

      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{ borderRadius: "1rem", display: "block" }}
        />

        {won && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "1rem",
            backgroundColor: "rgba(0,0,0,0.6)", borderRadius: "1rem",
          }}>
            <p style={{ color: "white", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>You did it!</p>
            <button
              onClick={resetGame}
              style={{
                backgroundColor: "#f5c842",
                color: "#1a1a1a",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              help mama again 🐥
            </button>
          </div>
        )}
      </div>
    </main>
  );
}