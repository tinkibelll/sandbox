import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
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

        .fractal-image {
          width: 100%;
          max-width: 750px;
          height: auto;
          margin-top: 20px;
          display: block;
        }

        .responsive-iframe-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 8px;
          margin-top: 0.5rem;
          margin-bottom: 1rem;
        }

        .responsive-iframe-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
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
          <h2>Why can't you divide by 0?</h2>

          <p>
            This is sort of inspired by WIRED's series,{" "}
            <em>"Expert Explains One Concept in 5 Levels of Difficulty."</em>
          </p>

          <p>Paradox? Perhaps.</p>

          <p>
            I remember this used to be a joke where you would see what answer
            Siri would give when you asked, "What is 0 ÷ 0?" The output would
            be:{" "}
            <em>
              "Imagine that you have zero cookies and you split them evenly
              among zero friends. How many cookies does each person get? See? It
              doesn't make sense. And Cookie Monster is sad that there are no
              cookies, and you are sad that you have no friends."
            </em>{" "}
            Oh!
          </p>

          <p>
            I mean yeah, I guess 0 divided by something makes sense, because you
            just have nothing to begin with. That rule stays established. But I
            really wanted to dive into the other side of it.
          </p>

          <h3>Multiplication by 0 and Multiplicative Inverses</h3>

          <p>
            In rudimentary algebra, we can define a division problem as{" "}
            <InlineMath math="x = a/b" /> (e.g., <InlineMath math="3 = 6/2" />
            ). Now, in our case, if we take an arbitrary real number (let's say
            6) we can set it up as <InlineMath math="x = 6/0" />. Based on the
            rules of algebra, this technically should also be able to be written
            as:
          </p>

          <BlockMath math="0 \cdot x = 6" />

          <p>
            Is there any value of <InlineMath math="x" /> that satisfies this?
            Not that I know of!
          </p>

          <p>
            A multiplicative inverse of a number is one that you can multiply by
            the original number to get 1. For example, 2's multiplicative
            inverse is <InlineMath math="1/2" />, 4 is <InlineMath math="1/4" />
            , and so on. 0… doesn't really have one.
          </p>

          <h3>Defining the Limit (or lack of one)</h3>

          <p>
            Say we have the function <InlineMath math="f(x) = 1/x" />, and we
            want to find the limit as <InlineMath math="x" /> approaches 0.
            Usually, we do this by approaching the desired value of{" "}
            <InlineMath math="x" /> from both sides individually to see if they
            are equal (i.e., if and only if the left-hand and right-hand limits
            are consistent).
          </p>

          <p>
            If we apply this here, as we approach 0 from the left, we approach
            negative infinity (<InlineMath math="-\infty" />
            ); when we approach 0 from the right, we approach positive infinity
            (
            <InlineMath math="+\infty" />
            ). Because the two sides don't meet, the limit does not exist.
          </p>

          <p>This is what the graph of <InlineMath math="1/x" /> looks like on Desmos:</p>

          <img
            src={`${process.env.NODE_ENV === "production" ? "/sandbox" : ""}/one_over_x.png`}
            alt="graph of f(x) = 1/x showing the limit approaching positive and negative infinity"
            className="fractal-image"
          />
          
          <p>
            Now, there are other number systems and fields of math where
            division by 0 has meaning (such as infinitesimals); however, I'm not
            a math major, and I'm not quite qualified to talk about those!
          </p>

          <h2>More resources to check out!</h2>

          <p>TEDx videos are always nice:</p>
          <div className="responsive-iframe-wrapper">
            <iframe
              src="https://www.youtube.com/embed/NKmGVE85GUU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <p>Eddie Woo my goat:</p>
          <div className="responsive-iframe-wrapper">
            <iframe
              src="https://www.youtube.com/embed/J2z5uzqxJNU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <p>5 levels done much better:</p>
          <div className="responsive-iframe-wrapper">
            <iframe
              src="https://www.youtube.com/embed/dHdg1yn1SgE"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </main>
    </>
  );
}
