"use client";
import { useState, useRef, useCallback } from "react";

interface Slide {
  id: string;
  index: number;
  imageDataUrl: string;
  choices: Choice[];
}

interface Choice {
  label: string;
  targetIndex: number;
}

interface StoryState {
  slides: Slide[];
  title: string;
}

export default function Story() {
  const [story, setStory] = useState<StoryState | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.name.endsWith(".pptx")) {
      setError("please upload a .pptx file");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/storyboard/parse", {
        method: "POST",
        body: formData,
      });
      const text = await res.text();
      console.log("res body", text);
      if (!res.ok) throw new Error(text);
      const data: StoryState = JSON.parse(text);
      setStory(data);
      setCurrentIndex(0);
      setHistory([]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  function choose(targetIndex: number) {
    setHistory((h) => [...h, currentIndex]);
    setCurrentIndex(targetIndex);
  }

  function goBack() {
    const prev = history[history.length - 1];
    if (prev === undefined) return;
    setHistory((h) => h.slice(0, -1));
    setCurrentIndex(prev);
  }

  function restart() {
    setCurrentIndex(0);
    setHistory([]);
  }

  function reset() {
    setStory(null);
    setCurrentIndex(0);
    setHistory([]);
    setError(null);
  }

  const current = story?.slides[currentIndex];

  console.log("story", story);
  console.log("current", current);

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
        gap: "1rem",
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
          STORYBOARD
        </h1>
        <p style={{ margin: "0.25rem 0 0", color: "#555", fontSize: "0.8rem" }}>
          import a slides deck and play through it
        </p>
      </div>

      {!story && (
        <>
          <div
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: "100%",
              maxWidth: "600px",
              border: `1px dashed ${dragging ? "#888" : "#3a3a3a"}`,
              borderRadius: "0.75rem",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke={dragging ? "#888" : "#3a3a3a"}
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span style={{ fontSize: "0.875rem", color: "#666" }}>
              {loading ? "parsing…" : "drop a .pptx file here"}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              or click to browse
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pptx"
            style={{ display: "none" }}
            onChange={(e) =>
              e.target.files?.[0] && handleFile(e.target.files[0])
            }
          />
          {error && (
            <p style={{ fontSize: "0.8rem", color: "#e05" }}>{error}</p>
          )}
          <p
            style={{
              fontSize: "0.75rem",
              color: "#3a3a3a",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            hyperlinks between slides become choices. export your google slides
            as .pptx to get started.
          </p>
        </>
      )}

      {story && current && (
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                color: "#555",
                letterSpacing: "0.05em",
              }}
            >
              slide {currentIndex + 1} of {story.slides.length}
            </span>
            <div
              style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}
            >
              {[...Array(Math.min(history.length + 1, 8))].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: i === history.length ? "#94a3b8" : "#3a3a3a",
                  }}
                />
              ))}
            </div>
            <button
              onClick={goBack}
              disabled={history.length === 0}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #3a3a3a",
                borderRadius: "0.5rem",
                color: history.length > 0 ? "#94a3b8" : "#333",
                padding: "0.3rem 0.75rem",
                fontSize: "0.75rem",
                cursor: history.length > 0 ? "pointer" : "default",
                letterSpacing: "0.05em",
                fontFamily: "inherit",
              }}
            >
              ← back
            </button>
          </div>

          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              backgroundColor: "#1e1e1e",
              borderRadius: "0.75rem",
              border: "1px solid #2a2a2a",
              overflow: "hidden",
            }}
          >
            <img
              src={current.imageDataUrl}
              alt={`slide ${currentIndex + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          {current.choices.length > 0 && (
            <>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: "0.25rem",
                }}
              >
                choose your path
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {current.choices.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => choose(choice.targetIndex)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "1px solid #2a2a2a",
                      borderRadius: "0.75rem",
                      color: "#ededed",
                      padding: "0.75rem 1rem",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#555";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.03)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#2a2a2a";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                    }}
                  >
                    <span style={{ fontSize: "0.9rem", color: "#555" }}>→</span>
                    <span style={{ flex: 1 }}>{choice.label}</span>
                    <span style={{ color: "#555", fontSize: "0.75rem" }}>
                      ›
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {current.choices.length === 0 && (
            <p
              style={{
                fontSize: "0.8rem",
                color: "#555",
                textAlign: "center",
                padding: "0.5rem 0",
              }}
            >
              the end.
            </p>
          )}

          <div
            style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}
          >
            <button
              onClick={restart}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #3a3a3a",
                borderRadius: "0.5rem",
                color: "#94a3b8",
                padding: "0.4rem 1rem",
                fontSize: "0.8rem",
                cursor: "pointer",
                letterSpacing: "0.05em",
                fontFamily: "inherit",
              }}
            >
              ↺ restart
            </button>
            <button
              onClick={reset}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #3a3a3a",
                borderRadius: "0.5rem",
                color: "#94a3b8",
                padding: "0.4rem 1rem",
                fontSize: "0.8rem",
                cursor: "pointer",
                letterSpacing: "0.05em",
                fontFamily: "inherit",
                marginLeft: "auto",
              }}
            >
              ⊞ new deck
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
