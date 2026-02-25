import Link from "next/link";
import Card from "./components/card";
import "./extras.css";

export default function Home() {
  return (
    <main
      style={{
        backgroundColor: "#212121",
        minHeight: "100vh",
        color: "#ededed",
        padding: "2rem 1.25rem",
        marginTop: "7vh",
        boxSizing: "border-box",
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <h3 style={{ fontWeight: "normal", margin: 0 }}>
          i kinda compile random things here
        </h3>
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* Self-Actualization */}
        <div>
          <p
            style={{
              fontSize: "0.7rem",
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
              marginTop: 0,
            }}
          >
            For Self-Actualization
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
              rowGap: "1.5rem",
              columnGap: "1rem",
            }}
          >
            <Card
              title="zen"
              subtitle="dsp"
              description="huh what's white noise"
              isLive={true}
              statusLabel="Active"
              href="/zen"
            />
            <Card
              title="fascinating fractals"
              subtitle="blog"
              description="my strange addiction"
              isLive={true}
              statusLabel="Active"
              href="/fractals"
            />
            <Card
              title="why can't you divide by 0?"
              subtitle="blog"
              description="you have no friends"
              isLive={true}
              statusLabel="Active"
              href="/division_zero"
            />
            <Card
              title="building pingu"
              subtitle="blog"
              description="pingu always sleepy"
              isLive={true}
              statusLabel="Active"
              href="/pingu"
            />
            <Card
              title="the digital panopticon"
              subtitle="blog"
              description="someone's watching you"
              isLive={false}
              statusLabel="Coming Soon"
            />
          </div>
        </div>

        {/* Brainrot */}
        <div>
          <p
            style={{
              fontSize: "0.7rem",
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
              marginTop: 0,
            }}
          >
            Brainrot (Desktop Only)
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
              rowGap: "1.5rem",
              columnGap: "1rem",
            }}
          >
            <Card
              title="life of a duck"
              subtitle="vanilla"
              description="mama duck lost her children"
              isLive={true}
              statusLabel="Active"
              href="/duck"
            />
            <Card
              title="make money!"
              subtitle="vanilla"
              description="i am not a rich man"
              isLive={true}
              statusLabel="Active"
              href="/money"
            />
            <Card
              title="some sort of visualizer"
              subtitle="three.js/a-frame"
              description="idrk yet lol"
              isLive={false}
              statusLabel="Coming Soon"
            />
          </div>
        </div>
      </div>

      <p style={{ marginTop: "40px" }}>
        bless{" "}
        <a
          href="https://uiverse.io"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white" }}
        >
          uiverse.io
        </a>
        , inspo{" "}
        <a
          href="https://neal.fun"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white" }}
        >
          neal.fun
        </a>
        ; made with &lt;3
      </p>
    </main>
  );
}
