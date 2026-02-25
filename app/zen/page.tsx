"use client";
import { useState, useRef, useEffect } from "react";

const NOISE_TYPES = [
  { id: "brown", label: "Brown", color: "#c4a882" },
  { id: "pink", label: "Pink", color: "#ffb6c1" },
  { id: "blue", label: "Blue", color: "#add8e6" },
  { id: "white", label: "White", color: "#ffffff" },
];

const CHAKRAS = [
  { id: "root", label: "Root", emoji: "🔴", freq: 396 },
  { id: "sacral", label: "Sacral", emoji: "🟠", freq: 417 },
  { id: "solar", label: "Solar Plexus", emoji: "🟡", freq: 528 },
  { id: "heart", label: "Heart", emoji: "💚", freq: 639 },
  { id: "throat", label: "Throat", emoji: "🔵", freq: 741 },
  { id: "third", label: "Third Eye", emoji: "🟣", freq: 852 },
  { id: "crown", label: "Crown", emoji: "⚪", freq: 963 },
];

interface SoundState {
  active: boolean;
  volume: number;
}

function SoundRow({
  label,
  emoji,
  active,
  volume,
  onToggle,
  onVolume,
  color,
}: {
  label: string;
  emoji: string;
  active: boolean;
  volume: number;
  onToggle: () => void;
  onVolume: (v: number) => void;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.6rem 0.75rem",
        borderRadius: "0.75rem",
        backgroundColor: active ? "rgba(255,255,255,0.05)" : "transparent",
        transition: "background 0.2s",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: `2px solid ${active ? color || "#ededed" : "#3a3a3a"}`,
          backgroundColor: active ? (color || "#ededed") + "22" : "transparent",
          color: active ? color || "#ededed" : "#555",
          cursor: "pointer",
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
        }}
      >
        {emoji}
      </button>
      <span
        style={{
          minWidth: "120px",
          fontSize: "0.875rem",
          color: active ? "#ededed" : "#666",
        }}
      >
        {label}
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => onVolume(parseFloat(e.target.value))}
        style={{
          flex: 1,
          accentColor: color || "#ededed",
          opacity: active ? 1 : 0.3,
        }}
      />
    </div>
  );
}

export default function Zen() {
  const [noiseSounds, setNoiseSounds] = useState<Record<string, SoundState>>(
    Object.fromEntries(
      NOISE_TYPES.map((n) => [n.id, { active: false, volume: 0.5 }]),
    ),
  );
  const [chakraSounds, setChakraSounds] = useState<Record<string, SoundState>>(
    Object.fromEntries(
      CHAKRAS.map((c) => [c.id, { active: false, volume: 0.5 }]),
    ),
  );

  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodesRef = useRef<
    Record<string, { source: AudioBufferSourceNode; gain: GainNode } | null>
  >({});
  const chakraNodesRef = useRef<
    Record<string, { oscillator: OscillatorNode; gain: GainNode } | null>
  >({});

  function getAudioCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }

  function createNoiseBuffer(type: string, ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === "white") {
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    } else if (type === "pink") {
      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    } else if (type === "brown") {
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (last + 0.02 * white) / 1.02;
        last = data[i];
        data[i] *= 3.5;
      }
    } else if (type === "blue") {
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = white - last;
        last = white;
      }
    }

    return buffer;
  }

  function toggleNoise(id: string) {
    const ctx = getAudioCtx();
    const current = noiseSounds[id];
    const newActive = !current.active;

    if (newActive) {
      const buffer = createNoiseBuffer(id, ctx);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      const gain = ctx.createGain();
      gain.gain.value = current.volume;
      source.connect(gain).connect(ctx.destination);
      source.start();
      noiseNodesRef.current[id] = { source, gain };
    } else {
      noiseNodesRef.current[id]?.source.stop();
      noiseNodesRef.current[id] = null;
    }

    setNoiseSounds((prev) => ({
      ...prev,
      [id]: { ...prev[id], active: newActive },
    }));
  }

  function setNoiseVolume(id: string, volume: number) {
    if (noiseNodesRef.current[id]) {
      noiseNodesRef.current[id]!.gain.gain.value = volume;
    }
    setNoiseSounds((prev) => ({ ...prev, [id]: { ...prev[id], volume } }));
  }

  function toggleChakra(id: string) {
    const ctx = getAudioCtx();
    const current = chakraSounds[id];
    const newActive = !current.active;
    const freq = CHAKRAS.find((c) => c.id === id)!.freq;

    if (newActive) {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = freq;
      gain.gain.value = current.volume * 0.3;
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start();
      chakraNodesRef.current[id] = { oscillator, gain };
    } else {
      chakraNodesRef.current[id]?.oscillator.stop();
      chakraNodesRef.current[id] = null;
    }

    setChakraSounds((prev) => ({
      ...prev,
      [id]: { ...prev[id], active: newActive },
    }));
  }

  function setChakraVolume(id: string, volume: number) {
    if (chakraNodesRef.current[id]) {
      chakraNodesRef.current[id]!.gain.gain.value = volume * 0.3;
    }
    setChakraSounds((prev) => ({ ...prev, [id]: { ...prev[id], volume } }));
  }

  useEffect(() => {
    return () => {
      Object.values(noiseNodesRef.current).forEach((n) => n?.source.stop());
      Object.values(chakraNodesRef.current).forEach((n) =>
        n?.oscillator.stop(),
      );
    };
  }, []);

  return (
    <main
      style={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        color: "#ededed",
        fontFamily: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1.5rem",
        gap: "1.0rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "1.75rem",
            fontWeight: 400,
            letterSpacing: "0.2em",
          }}
        >
          ZEN
        </h1>
        <p style={{ margin: "0.25rem 0 0", color: "#555", fontSize: "0.8rem" }}>
          layer sounds to find your calm
        </p>
      </div>

      <div style={{ display: "flex", gap: "1.0rem" }}>
        <button
          onClick={() => {
            Object.keys(noiseSounds).forEach((id) => {
              if (noiseSounds[id].active) toggleNoise(id);
            });
            Object.keys(chakraSounds).forEach((id) => {
              if (chakraSounds[id].active) toggleChakra(id);
            });
          }}
          style={{
            margin: 0,
            backgroundColor: "transparent",
            border: "1px solid #3a3a3a",
            borderRadius: "0.5rem",
            color: "#94a3b8",
            padding: "0.4rem 1rem",
            fontSize: "0.8rem",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          ⏹ stop all
        </button>

        <button
          onClick={() => {
            Object.keys(noiseSounds).forEach((id) => {
              if (noiseSounds[id].active) toggleNoise(id);
            });
            Object.keys(chakraSounds).forEach((id) => {
              if (chakraSounds[id].active) toggleChakra(id);
            });
            setNoiseSounds(
              Object.fromEntries(
                NOISE_TYPES.map((n) => [n.id, { active: false, volume: 0.5 }]),
              ),
            );
            setChakraSounds(
              Object.fromEntries(
                CHAKRAS.map((c) => [c.id, { active: false, volume: 0.5 }]),
              ),
            );
          }}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #3a3a3a",
            borderRadius: "0.5rem",
            color: "#94a3b8",
            padding: "0.4rem 1rem",
            fontSize: "0.8rem",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          ↺ reset all
        </button>
      </div>

      {/* White Noise */}
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <p
          style={{
            fontSize: "0.7rem",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
          }}
        >
          White Noise
        </p>
        {NOISE_TYPES.map((n) => (
          <SoundRow
            key={n.id}
            label={n.label}
            emoji="〰️"
            active={noiseSounds[n.id].active}
            volume={noiseSounds[n.id].volume}
            onToggle={() => toggleNoise(n.id)}
            onVolume={(v) => setNoiseVolume(n.id, v)}
            color={n.color}
          />
        ))}
      </div>
      {/* Chakras */}
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <p
          style={{
            fontSize: "0.7rem",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
          }}
        >
          Chakra Frequencies
        </p>
        {CHAKRAS.map((c) => (
          <SoundRow
            key={c.id}
            label={`${c.label} · ${c.freq}Hz`}
            emoji={c.emoji}
            active={chakraSounds[c.id].active}
            volume={chakraSounds[c.id].volume}
            onToggle={() => toggleChakra(c.id)}
            onVolume={(v) => setChakraVolume(c.id, v)}
          />
        ))}
      </div>
    </main>
  );
}
