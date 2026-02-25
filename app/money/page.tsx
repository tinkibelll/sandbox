"use client";
import { useState, useRef } from "react";

export default function Money() {
  const [money, setMoney] = useState(0);
  const [floaters, setFloaters] = useState<{ id: number; x: number; y: number }[]>([]);
  const [floatId, setFloatId] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function handleClick(e: React.MouseEvent) {
    setMoney(m => m + 1);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setFloaters(f => [...f, { id: floatId, x, y }]);
    setFloatId(i => i + 1);
    setTimeout(() => setFloaters(f => f.filter(fl => fl.id !== floatId)), 800);
  }

  function formatMoney(n: number) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
    return `$${n.toFixed(2)}`;
  }

  return (
    <main style={{
      backgroundColor: "#212121",
      color: "#ededed",
      padding: "2rem",
      fontFamily: "inherit",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      height: "auto",
      marginTop: "100px",
    }}>
      <audio ref={audioRef} src="/coin.mp3" />

      <h1 style={{ margin: 0, fontSize: "2rem" }}>💰 Make Money</h1>
      <p style={{ maxWidth: "470px", textAlign: "center" }}>
        my mom said to me "find someone who can give you <em>everything</em>" <br />
        and i said "mom i already have <em>everything</em>" <br />
        i am a broke woman. i am a <em>pobrecita</em>.
      </p>
      <p style={{ margin: 0, fontSize: "2.5rem", fontWeight: 800, color: "#f5c842" }}>{formatMoney(money)}</p>

      <div style={{ position: "relative" }} onClick={handleClick}>
        <button style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          backgroundColor: "#f5c842",
          border: "6px solid #e0a800",
          boxShadow: "0 8px #b38600",
          fontSize: "3.5rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.95) translateY(4px)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          💵
        </button>
        {floaters.map(f => (
          <div key={f.id} style={{
            position: "absolute",
            left: f.x,
            top: f.y,
            color: "#ffffff",
            fontWeight: 800,
            fontSize: "1.5rem",
            pointerEvents: "none",
            animation: "floatUp 0.8s ease-out forwards",
            textShadow: "0 0 10px #f5c842",
          }}>
            +$1
          </div>
        ))}
      </div>

      <style>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          50% { opacity: 1; transform: translateY(-40px) scale(1.2); }
          100% { opacity: 0; transform: translateY(-100px) scale(0.8); }
        }
      `}</style>
    </main>
  );
}