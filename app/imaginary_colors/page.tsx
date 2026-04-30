import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import "../extras.css";

export default function Home() {
  const imgPrefix = process.env.NODE_ENV === "production" ? "/sandbox" : "";

  return (
    <>
      <style>{`
        .page-main {
          box-sizing: border-box;
          background-color: #212121;
          min-height: 100vh;
          color: #ededed;
          padding: 2rem 1.25rem;
        }

        .content-wrapper {
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
        }

        .image-row {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin: 2rem 0 0.5rem 0;
          width: 100%;
          justify-content: center;
          align-items: center;
        }

        .img-container {
          display: block;
          max-width: 100%; 
        }

        .img-container img {
          display: block;
          height: auto;
          width: 100%;
          max-width: 400px;
          border-radius: 4px;
        }

        .image-caption {
          font-style: italic;
          font-size: 0.9rem;
          color: #b0b0b0;
          margin-bottom: 2rem;
          text-align: center;
        }

        .cone-list {
          list-style-type: none;
          padding-left: 0;
          margin: 1.5rem 0;
        }

        .cone-list li {
          margin-bottom: 0.75rem;
          padding-left: 1rem;
          border-left: 3px solid #4a4a4a;
        }

        .flex-wrap-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
          align-items: center;
        }

        .gif-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0;
          flex-shrink: 0;
        }

        .wrapped-gif {
          width: 100%;
          max-width: 320px;
          height: auto;
          border-radius: 8px;
        }

        .small-caption {
          font-style: italic;
          font-size: 0.75rem;
          color: #888;
          margin-top: 0.5rem;
          text-align: center;
        }

        .responsive-iframe-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 8px;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          background: #000;
        }

        .responsive-iframe-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .rgb-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background-color: #2a2a2a;
          border-radius: 8px;
          overflow: hidden;
          font-size: 0.95rem;
        }

        .rgb-table th, .rgb-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #3d3d3d;
        }

        .rgb-table th {
          background-color: #333333;
          color: #ffffff;
          font-weight: 600;
        }

        .color-swatch {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 10px;
          border-radius: 2px;
          border: 1px solid #555;
          vertical-align: middle;
        }

        /* --- Chimerical Demo Grid Styles --- */
        .chimerical-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(100px, 150px)) 1.8fr;
          gap: 1.5rem;
          margin: 3rem auto;
          max-width: 800px;
          align-items: center;
          justify-content: center;
        }

        .chimerical-grid .small-caption {
          margin: 0;
          line-height: 1.2;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 40px;
        }

        .demo-box {
          aspect-ratio: 1 / 1;
          background-color: #ccc;
          border: 1px solid #000;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .demo-box span {
          color: #000;
          font-weight: 300;
          font-size: 1.2rem;
        }

        .circle {
          width: 55%;
          height: 55%;
          border-radius: 50%;
        }

        .f-yellow { background-color: #ffff00; }
        .f-green  { background-color: #00ff00; }
        .f-cyan   { background-color: #00ffff; }
        .t-black  { background-color: #000; }
        .t-black span { color: #fff; }
        .t-white  { background-color: #fff; }
        .t-orange { background-color: #ffa500; }
        .r-stygian { background-color: #333; }
        .c-stygian { background-color: #000044; }
        .r-luminous { background-color: #ccc; }
        .c-luminous { background-color: #ffcccc; box-shadow: 0 0 8px #fff; }
        .r-hyper { background-color: #ffb347; }
        .c-hyper { background-color: #ff8c00; }

        .demo-label {
          font-size: 0.85rem;
          line-height: 1.3;
          color: #ededed;
          text-align: left;
        }

        .demo-label strong {
          display: block;
          text-transform: uppercase;
          font-size: 0.9rem;
          color: #fff;
          margin-bottom: 2px;
        }

        /* --- Tablet/Desktop Media Queries --- */
        @media (min-width: 768px) {
          .flex-wrap-container {
            flex-direction: row;
            align-items: center; 
            gap: 2rem;
          }

          .gif-column {
            width: 260px;
          }

          .wrapped-gif {
            width: 100%;
            max-height: none;
          }
          
          .page-main {
            padding: 3rem 2rem;
          }

          .image-row {
            flex-direction: row;
            align-items: flex-start;
            gap: 2rem;
          }

          .img-container img {
            width: auto;
            height: 300px;
            max-width: 100%;
          }
        }

        @media (min-width: 1024px) {
          .page-main {
            padding: 4rem;
          }
          .img-container img {
            height: 350px;
          }
        }

       @media (max-width: 600px) {
  .chimerical-grid {
    /* Switch to 3 columns to match the 3 boxes */
    grid-template-columns: repeat(3, 1fr); 
    gap: 0.5rem;
    margin: 1rem auto;
  }

  /* Force the label to take up its own full row */
  .demo-label {
    grid-column: 1 / -1; /* This spans all available columns, regardless of count */
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 2rem; 
  }

  .chimerical-grid .small-caption {
    font-size: 0.65rem;
    min-height: 40px; /* Keeps captions aligned even if one wraps to 2 lines */
  }
}
}
      `}</style>

      <main className="page-main">
        <div className="content-wrapper">
          <h2>
            Colors Beyond the Looking Glass - An Introduction to Imaginary
            Colors
          </h2>

          <p>
            A staple for many, one of the first exposures we have to the
            principles of color composition comes from Crayola crayons. The
            primary colors, some odd-form variants of red, blue, and yellow: mix
            them together, use white and black as needed, and you can reproduce
            any color you want!
          </p>

          <p>
            Naturally, we also come into contact with the colors of light. Drop
            yellow and replace it with green; this is what powers displays,
            Newton’s prism, and the way we perceive color visually.
          </p>

          <h3>The Visual Spectrum</h3>
          <p>
            Our eyes have three sets of cones for perceiving different
            wavelengths of light, following the RGB (Red, Green, Blue) format.
            It is the combination of how much each of these is stimulated that
            determines the color your brain perceives. There is overlap in the
            ranges of these cones, however.
          </p>

          <ul className="cone-list">
            <li>
              <strong>S-Cones (Short):</strong> Sensitive to blue light (peak{" "}
              <InlineMath math="\sim 440" /> nm)
            </li>
            <li>
              <strong>M-Cones (Medium):</strong> Sensitive to green light (peak{" "}
              <InlineMath math="\sim 540" /> nm)
            </li>
            <li>
              <strong>L-Cones (Long):</strong> Sensitive to red light (peak{" "}
              <InlineMath math="\sim 570" /> nm)
            </li>
          </ul>

          <p>
            The M & L cones have major overlap; as such, it is theorized that
            instead of looking at absolute values, the visual system turns to
            relative differences.
          </p>

          <div className="image-row">
            <div className="img-container">
              <img
                src={`${imgPrefix}/cones_def.png`}
                alt="Diagram showing cone sensitivity overlap and definition"
              />
            </div>
            <div className="img-container">
              <img
                src={`${imgPrefix}/spectrum.png`}
                alt="Visual representation of the light spectrum"
              />
            </div>
          </div>

          <p className="image-caption">
            This is a sample of the color space that we may be able to see
            (Right: CIE 1931, chromaticity diagram).
          </p>

          <h3>Opponent Processes</h3>
          <p>
            The <strong>Color Opponent Process</strong> theory suggests that the
            human visual system interprets these cone signals in an antagonistic
            manner. Rather than processing each color independently, the brain
            records the differences between cone responses through three
            specific channels:
          </p>

          <ul className="cone-list">
            <li>
              <strong>Red vs. Green:</strong> Compares the L-cone and M-cone
              signals.
            </li>
            <li>
              <strong>Blue vs. Yellow:</strong> Compares the S-cone signal
              against a sum of the L and M signals.
            </li>
            <li>
              <strong>Black vs. White:</strong> Detects luminance and light-dark
              variation (achromatic).
            </li>
          </ul>

          <p>
            Because these channels are antagonistic, the response to one color
            in a pair inhibits the response to the other. This explains why we
            can perceive a “blue-green”, but our brains find it physically
            impossible to perceive a "reddish-green”.
          </p>

          <div className="flex-wrap-container">
            <div>
              <h3>Digital Representation of Color</h3>
              <p>
                This is where the earlier mention of RGB comes into play. Each
                color channel is represented by a value from 0-255, and specific
                colors are then formed by mixing different combinations for
                these values. By using something like an RGB LED, we can see a
                base-level example of what this looks like in the physical
                world. You can think of this LED as representing a single pixel
                on a phone screen.
              </p>
            </div>
            <figure className="gif-column">
              <img
                src={`${imgPrefix}/rgb_led.gif`}
                alt="RGB LED"
                className="wrapped-gif"
              />
              <figcaption className="small-caption">
                looking to replace with my own footage soon :)
              </figcaption>
            </figure>
          </div>

          <table className="rgb-table">
            <thead>
              <tr>
                <th>Color Name</th>
                <th>RGB Triple</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Red</td>
                <td>(255, 0, 0)</td>
                <td>
                  <span
                    className="color-swatch"
                    style={{ backgroundColor: "#f00" }}
                  ></span>
                  Red
                </td>
              </tr>
              <tr>
                <td>Green</td>
                <td>(0, 255, 0)</td>
                <td>
                  <span
                    className="color-swatch"
                    style={{ backgroundColor: "#0f0" }}
                  ></span>
                  Green
                </td>
              </tr>
              <tr>
                <td>Blue</td>
                <td>(0, 0, 255)</td>
                <td>
                  <span
                    className="color-swatch"
                    style={{ backgroundColor: "#00f" }}
                  ></span>
                  Blue
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Imaginary Colors</h3>
          <p>
            <strong>Chimerical colors</strong> are a class of imaginary colors
            that make use of the opponent process theory. They are not colors we
            can see in nature or artificially generate to see in any one
            sitting. They are temporarily perceived by looking steadily at a
            strong color to tire out certain cone cells and then looking at
            another color (namely a white or black background to neutralize).
          </p>

          <p style={{ marginBottom: "0px" }}>
            What we then start to see is a “seemingly new” saturated area, which
            is an afterimage of the complementary color, and thus is what forms
            the imaginary color!
          </p>

          <div className="chimerical-grid">
            <div className="small-caption">Fatigue Template</div>
            <div className="small-caption">Target Field</div>
            <div className="small-caption">Approx. Rendering</div>
            <div></div>

            {/* Stygian Blue */}
            <div className="demo-box">
              <div className="circle f-yellow"></div>
              <span style={{ position: "absolute" }}>×</span>
            </div>
            <div className="demo-box t-black">
              <span>×</span>
            </div>
            <div className="demo-box r-stygian">
              <div className="circle c-stygian"></div>
            </div>
            <div className="demo-label">
              <strong>Stygian Blue</strong>Deep blue and black simultaneously.
            </div>

            {/* Self-Luminous Red */}
            <div className="demo-box">
              <div className="circle f-green"></div>
              <span style={{ position: "absolute" }}>×</span>
            </div>
            <div className="demo-box t-white">
              <span>×</span>
            </div>
            <div className="demo-box r-luminous">
              <div className="circle c-luminous"></div>
            </div>
            <div className="demo-label">
              <strong>Self-Luminous Red</strong>Redder and brighter than white.
            </div>

            {/* Hyperbolic Orange */}
            <div className="demo-box">
              <div className="circle f-cyan"></div>
              <span style={{ position: "absolute" }}>×</span>
            </div>
            <div className="demo-box t-orange">
              <span>×</span>
            </div>
            <div className="demo-box r-hyper">
              <div className="circle c-hyper"></div>
            </div>
            <div className="demo-label">
              <strong>Hyperbolic Orange</strong>More than 100% color saturation.
            </div>
          </div>

          <p>
            Let me redirect you to the video that inspired this! Try it for
            yourself and see which ones you can see; for me,{" "}
            <strong>Stygian Blue</strong> was the easiest, while{" "}
            <strong>Hyperbolic Orange</strong> and{" "}
            <strong>Self-Luminous Red</strong> took a bit more effort. You might
            also notice that you start to see the color at the edges of the
            square before the timer even runs out - that’s your eyes moving! But
            yes, you are seeing the imaginary color.
          </p>

          <div className="responsive-iframe-wrapper">
            <iframe
              src="https://www.youtube.com/embed/370vSCFiyU0?start=73"
              title="YouTube video player"
              allowFullScreen
            />
          </div>
        </div>
      </main>
    </>
  );
}
