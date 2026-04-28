import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import "../extras.css";

export default function Home() {
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

        .article-image {
          width: 100%;
          max-width: 750px;
          height: auto;
          margin: 1.5rem 0;
          display: block;
          border-radius: 4px;
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

        @media (min-width: 640px) {
          .page-main {
            padding: 3rem 2rem;
          }
        }

        @media (min-width: 1024px) {
          .page-main {
            padding: 4rem;
          }
        }
      `}</style>

      <main className="page-main">
        <div className="content-wrapper">
          <h2>Colors Beyond the Looking Glass - An Introduction to Imaginary Colors</h2>

          <h3>Introduction</h3>
          <p>
            A staple for many, one of the first exposures we have to the principles of color 
            composition comes from Crayola crayons. The primary colors, some odd-form 
            variants of red, blue, and yellow: mix them together, use white and black 
            as needed, and you can reproduce any color you want!
          </p>

          <p>
            Naturally, we also come into contact with the colors of light. Drop yellow 
            and replace it with green; this is what powers displays, Newton’s prism, 
            and the way we perceive color visually.
          </p>

          <h3>The Visual Spectrum</h3>
          <p>
            Our eyes have three sets of cones for perceiving different wavelengths of light, 
            following the RGB (Red, Green, Blue) format. It is the combination of how much 
            each of these is stimulated that determines the color your brain perceives. 
            There is overlap in the ranges of these cones, however.
          </p>

          <ul className="cone-list">
            <li>
              <strong>S-Cones (Short):</strong> Sensitive to blue light (peak <InlineMath math="\sim 440" /> nm)
            </li>
            <li>
              <strong>M-Cones (Medium):</strong> Sensitive to green light (peak <InlineMath math="\sim 540" /> nm)
            </li>
            <li>
              <strong>L-Cones (Long):</strong> Sensitive to red light (peak <InlineMath math="\sim 570" /> nm)
            </li>
          </ul>

          <p>
            The M & L cones have major overlap; as such, it is theorized that instead 
            of looking at absolute values, the visual system turns to relative differences.
          </p>

          <img
            src={`${process.env.NODE_ENV === "production" ? "/sandbox" : ""}/cie_1931.png`}
            alt="CIE 1931 chromaticity diagram showing the visible color space"
            className="article-image"
          />
          
          <p>
            <em>This is a sample of the color space that we may be able to see. (CIE 1931, chromaticity diagram).</em>
          </p>

          <h3>Opponent Processes</h3>
          <p>
            The <strong>Color Opponent Process</strong> theory suggests that the human visual system 
            interprets these cone signals in an antagonistic manner. Rather than processing 
            each color independently, the brain records the differences between cone 
            responses through three specific channels:
          </p>

          <ul>
            <li><strong>Red vs. Green:</strong> Compares the L-cone and M-cone signals.</li>
            <li><strong>Blue vs. Yellow:</strong> Compares the S-cone signal against a sum of the L and M signals.</li>
            <li><strong>Black vs. White:</strong> Detects luminance and light-dark variation (achromatic).</li>
          </ul>

          <p>
            Because these channels are antagonistic, the response to one color in a pair 
            inhibits the response to the other. This explains why we can perceive a 
            “blue-green”, but our brains find it physically impossible to perceive a 
            "reddish-green”.
          </p>
        </div>
      </main>
    </>
  );
}