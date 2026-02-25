import Link from "next/link";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import "../extras.css";

const CodeBlock = ({ code }: { code: string }) => (
  <pre
    style={{
      backgroundColor: "#1e1e1e",
      border: "1px solid #333",
      borderRadius: "8px",
      padding: "1.25rem 1.5rem",
      overflowX: "auto",
      fontFamily: "'Fira Code', 'Courier New', monospace",
      fontSize: "0.875rem",
      lineHeight: "1.6",
      color: "#cdd6f4",
      margin: "1rem 0",
    }}
  >
    <code>{code}</code>
  </pre>
);

const OutputBlock = ({ output }: { output: string }) => (
  <pre
    style={{
      backgroundColor: "#141414",
      border: "1px solid #333",
      borderLeft: "3px solid #555",
      borderRadius: "0 8px 8px 0",
      padding: "1.25rem 1.5rem",
      overflowX: "auto",
      fontFamily: "'Fira Code', 'Courier New', monospace",
      fontSize: "0.875rem",
      lineHeight: "1.6",
      color: "#a6e3a1",
      margin: "0 0 1.5rem 0",
    }}
  >
    <code>{output}</code>
  </pre>
);

const pascalCode = `def pascal(values, k, max_k):
    if k == max_k:
        return

    print(f"Row {k}: {values}")

    next_row = [1]
    for i in range(len(values) - 1):
        next_row.append(values[i] + values[i + 1])
    next_row.append(1)

    pascal(next_row, k + 1, max_k)

pascal([1], 0, 8)`;

const pascalOutput = `Row 0: [1]
Row 1: [1, 1]
Row 2: [1, 2, 1]
Row 3: [1, 3, 3, 1]
Row 4: [1, 4, 6, 4, 1]
Row 5: [1, 5, 10, 10, 5, 1]
Row 6: [1, 6, 15, 20, 15, 6, 1]
Row 7: [1, 7, 21, 35, 35, 21, 7, 1]`;

export default function Home() {
  return (
    <main
      style={{
        backgroundColor: "#212121",
        minHeight: "100vh",
        color: "#ededed",
        padding: "4rem",
      }}
    >
      <h2>What is a fractal?</h2>

      <p>
        Fractals are structures that appear to be never-ending but are
        intrinsically the same at their core - wait, that's an oxymoron! My
        exploration of these mathematical wonders started in… well, 2012,
        because I was bored and had access to the classroom computer.
      </p>

      <h3>Border Estimation</h3>

      <p>
        An exercise to conceptualize the nature of fractals comes from border
        estimation. When approximating the shape of a territory on a map (or
        some other record), we can only preserve so many details due to the
        physical limitations of space. Maps can be thought of as scaled-down
        versions of their real-world counterparts; as such, we usually have to
        "cut corners" and only note significant features.
      </p>

      <p>
        Because maps are, at most, well-inferred generalizations of a region,
        they provide only rough estimates of a border's length. What we see with
        regions like the British Isles, however, is that this estimate grows
        larger and larger as we zoom in and account for more granularity.
      </p>

      <p>
        This is similar to the concept of a limit in calculus. If there is a
        curve, you can approximate the area beneath it using Riemann sums:
        increasing the number of individual components yields a more accurate
        area. As the number of components <InlineMath math="n" /> approaches
        infinity, the calculated area converges to a fixed value. But in the
        case of border estimation, the result feels counterintuitive.
      </p>

      <h3>Pascal's Triangle</h3>

      <p>
        Named after the French mathematician <strong>Blaise Pascal</strong>,
        this construct coincidentally has many use cases within probability and
        algebraic series. For me, it was first introduced through Olympiad
        maths.
      </p>

      <p>
        To build it, start with a single entry in the first row (
        <InlineMath math="k = 0" />
        ): the number 1. To produce the second row (
        <InlineMath math="k = 1" />
        ), imagine there are zeros on both sides of that 1. Add each pair of
        adjacent numbers together to get the values for the next row, which
        would be 1 1. Repeating this indefinitely forms the triangle.
        Computationally, this is quite simple to replicate using a recursive
        series.
      </p>

      <CodeBlock code={pascalCode} />
      <OutputBlock output={pascalOutput} />

      <h4>Properties of Interest</h4>

      <ul>
        <li>
          <strong>Binomial Expansion:</strong> The triangle conveniently lists
          binomial coefficients. For an <InlineMath math="n \choose k" />{" "}
          scenario, the coefficients map directly to the values found in row{" "}
          <InlineMath math="n" /> of the triangle.
        </li>

        <li>
          <strong>The Sierpiński Connection:</strong> If you take the base form
          of the triangle and apply a modulo 2 operation (considering only the
          odd values), you obtain Pascal's Sierpiński Triangle - another
          interesting fractal!
        </li>

        <img
          src={`${process.env.NODE_ENV === "production" ? "/sandbox" : ""}/sierpinski.png`}
          alt="depiction of the sierpinski triangle with different values of size n"
          style={{ width: "750px", marginTop: "20px" }}
        />

        <p>
          <small>
            Martínez-Cruz, M.-Á., Patiño-Ortiz, J., Patiño-Ortiz, M., &
            Balankin, A. S. (2024). Some Insights into the Sierpiński Triangle
            Paradox. <em>Fractal and Fractional</em>, 8(11), 655.{" "}
            <a
              href="https://doi.org/10.3390/fractalfract8110655"
              target="_blank"
              rel="noreferrer"
              style={{ color: "white" }}
            >
              https://doi.org/10.3390/fractalfract8110655
            </a>
          </small>
        </p>
      </ul>

      <h2>Want to learn more?</h2>
      <p>
        I love 3Blue1Brown's breakdown, it's quite intuitive and very visual:
      </p>
      <iframe
        width="840"
        height="472"
        src="https://www.youtube.com/embed/-RdOwhmqP5s"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </main>
  );
}
