import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
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

const scrapeCode = `url = f'https://www.pinterest.com/search/pins/?q={search_query}'`;

const ytdlpCode = `ydl_opts = {
        'format': 'bestaudio/best',
        'noplaylist': True,
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': f'{name}.%(ext)s'
    }

def do_download():
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])`;

export default function Pingu() {
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
          <h2>Building Pingu</h2>

          <p>
            I'm at one of those weird stages of life… a kind of liminal space,
            of sorts? I don't want time to rid me of the random things I
            remember, so this page has been a way for me to "knowledge dump"
            while practicing translating ideas into words concisely and
            comprehensively - something I think I'm going to need to have down
            solid very soon.
          </p>

          <p>
            So, let's quickly walk through a little trinket I made for my
            friends and I: Pingu! 🐧
          </p>

          <p>
            I used to be a coverist, and so I wanted to spin up something small
            that could serve as a tool for all things musical and k-pop. For
            this project, I heavily prioritized tasks that weren’t just wrappers
            for an LLM, and I honestly really don’t like using generative
            techniques unless painfully necessary. This did mean that run-times
            wouldn’t be the fastest, but we were fine with that!
          </p>

          <p>
            <em>
              Disclaimer: None of the artifacts from the following methods were
              used for commercial purposes; this was solely for personal use!
              Additionally, I won't really discuss code specifics, but rather
              important design choices.
            </em>
          </p>

          <h3>Base Setup</h3>

          <p>
            From what I've seen, JavaScript and Python are the most common
            languages for setting up Discord bots. I used the{" "}
            <code>discord.py</code> library here; in general, Python is my
            choice for smaller, experimental projects. I also wanted to utilize
            Discord's established slash command structure, as many of the bot's
            functions require parameters, and it should be clear to the user
            what those parameters are.
          </p>

          <h4>A Note on Environment Variables</h4>

          <p>
            Traditionally, if I'm working on a project that will only be stored
            locally (not pushed to a cloud environment like GitHub), I don't
            always bother concealing them - though this isn't a good habit!
            Environment variables are things like user IDs, bot tokens, or API
            keys obtained through paid subscriptions. In general, they are
            supposed to be private and just for you. However, if you are looking
            to host your bot on a platform like Heroku, you should definitely
            have a <code>.env</code> system set up to load variables from.
          </p>

          <h4>Roles</h4>

          <p>
            In the Discord Developer settings, there is a bot access role for
            applications. If you must select permissions manually, I generally
            recommend:
          </p>

          <ul>
            <li>Channel read/write access</li>
            <li>Access to see user IDs (to identify who sent a message)</li>
            <li>Permission for embeds, pings, and reaction roles</li>
          </ul>

          <p>
            You can also limit the bot's activity later through a custom role
            within your server, allowing it to only access specific channels.
          </p>

          <h3>Pinterest Scraper</h3>

          <p>
            This feature, while not strictly necessary, takes inspiration from
            anime bots like Mudae and K-pop photocard collection bots like
            Gyuvin. I wanted an easy way to search for photos right in the chat,
            just as you can with GIFs.
          </p>

          <p>
            I used Selenium and Beautiful Soup to act as a client that executes
            the search and returns the most relevant results. Web scraping is an
            automated process that crawls through a website to read its content
            using the native HTML structure - a process often used in screen
            readers and other accessibility tools.
          </p>

          <p>The search query is executed based on this URL structure:</p>

          <CodeBlock code={scrapeCode} />

          <p>
            The client looks for web components with an <code>&lt;img&gt;</code>{" "}
            tag, performs a quick size check (
            <InlineMath math="150 \times 150" />
            ), and we're on our way! The client pulls the first 100 results and
            picks a random one to send back to the chat; that way, there's some
            variety even if the same search query (or idol) is entered multiple
            times. I also ensured that multi-word keywords are automatically
            parsed to format the query effectively.
          </p>

          <h3>YouTube to MP3</h3>

          <p>
            This is one of the most annoying hurdles for coverists: the first
            step in making a backing track or instrumental is getting access to
            the audio file. Since we aren't doing this commercially, this
            usually involves hunting for a website that can extract the audio.
            However, YouTube has increased its security measures over the years,
            taking many sites down, while others are simply plagued with ads.
          </p>

          <p>
            The most reliable way to maintain a long-lasting video-to-audio tool
            is to use command-line tools. I used the <code>yt_dlp</code>{" "}
            library. It works similarly to the Pinterest scraper: the user
            provides the link (<code>url</code>) and the desired filename (
            <code>name</code>). These are formatted into a JSON-like
            configuration to run a download query.
          </p>

          <CodeBlock code={ytdlpCode} />

          <h3>Vocal Remover</h3>

          <p>
            Finally, I used the Spleeter library released by Deezer (pre-trained
            in TensorFlow). The user provides an audio file (or can continue
            with the one generated in the previous step) to receive vocal and
            instrumental stems. This reduces dependency on third-party tools
            like BandLab's splitter and keeps the workflow right inside Discord.
          </p>

          <p>And that's it! 🐧</p>

          <img
            src={`${process.env.NODE_ENV === "production" ? "/sandbox" : ""}/spleeter.png`}
            alt="pingu when it's done splitting an audio into vocal and instrumental stems"
            className="fractal-image"
          />
        </div>
      </main>
    </>
  );
}
