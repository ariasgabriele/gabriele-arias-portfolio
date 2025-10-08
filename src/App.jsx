import { HashRouter as BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

/* ---- Utility: container ---- */
function Container({ children }) {
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}

/* ---- Nav semplice (niente file esterni) ---- */
function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const goContact = () => {
    const scrollToContact = () => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname === "/") {
      scrollToContact();
    } else {
      navigate("/");
      setTimeout(scrollToContact, 60);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-neutral-200">
      <Container>
        <div className="flex items-center justify-between py-3">
          <a
            href="https://www.linkedin.com/in/gabrielearias/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full ring-1 ring-neutral-300 text-xs font-semibold"
          >
            in
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="hover:opacity-70">Gabriele Arias</Link>
            <Link to="/cases" className="hover:opacity-70">Case Studies</Link>
          </nav>

          {/* CTA arancione + click handler che scrolla sempre al contact */}
          <button
            onClick={goContact}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-white text-sm shadow-sm"
            style={{ backgroundColor: "#FF723E" }}
          >
            Contact
          </button>
        </div>
      </Container>
    </header>
  );
}

/* ---- Hero: bianca, testi neutral, immagine proporzionata ---- */
function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.25, 0.1, 0.25, 1], // easing "ease-in-out" smooth
      },
    },
  };

  return (
    <section className="bg-white text-neutral-900 pt-12 md:pt-20 pb-0">
      <Container>
        <div className="text-center">
          {/* Tutti insieme, stessa animazione */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <h1 className="font-extrabold leading-[1.05] text-4xl sm:text-6xl md:text-7xl mt-0 md:mt-2">
              Gabriele Arias
              <br />
              Digital Marketing Specialist
            </h1>

            <p className="hidden md:block mt-3 text-xl text-neutral-700">
              Analysis · Creativity · Strategy &amp; Growth · Repeat
            </p>

            <div className="mt-6 md:mt-10 flex justify-center">
              <img
                src={`${import.meta.env.BASE_URL}hero-photo.png`}
                alt="Gabriele Arias"
                className="w-full max-w-3xl h-auto object-contain select-none"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}



/* ---- Sezione nera subito sotto, senza gap ---- */
function WhatIDo() {
  return (
    <section className="relative bg-black text-white rounded-t-3xl -mt-4">
      <Container>
        <div className="pt-10 md:pt-14 pb-14">
          <div className="text-xs uppercase tracking-wider text-white/60">Overview</div>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-white">What I do</h2>
          <p className="mt-4 text-white/80 leading-relaxed max-w-3xl">
            I mix social-first content with analysis-first strategy. From memes and reels to audience
            research and testing, I connect content, creators, and communities to deliver results:
            community growth, qualified leads, and purchase intent. I’ve shipped end-to-end projects
            in e-commerce, travel, and music, balancing speed with data-driven decisions. I’m
            constantly trying new AI workflows to boost ideation, editing, and distribution.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ---- Cards indice (resta semplice) ---- */
function Card({
  to = "/",
  logoSrc,
  title,
  desc,
  imageSrc,
  stats = [],
  ctaLabel = "Read more",
  bgColor = "#ffffff",
  textOnDark = false,
  ctaColor,
  bgImage,
}) {
  const baseUrl = import.meta.env.BASE_URL || "/";

  const textMain = textOnDark ? "text-white" : "text-neutral-900";
  const textSub = textOnDark ? "text-white/80" : "text-neutral-700";
  const borderCol = textOnDark ? "border-white/10" : "border-neutral-200";
  const highlightText = textOnDark ? "text-white" : "text-neutral-800";
  const isAmongLocalsLogo =
  typeof logoSrc === "string" &&
  logoSrc.toLowerCase().includes("amonglocals-logo");


  return (
    <Link to={to} className="block group">
      <div
        className="rounded-3xl overflow-hidden bg-white transition-all duration-500 ease-out
                   group-hover:scale-[1.02] group-hover:-translate-y-1
                   group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)]"
      >
        {/* MOBILE */}
        <div className="md:hidden">
          <div className="relative p-6 mx-auto" style={{ backgroundColor: bgColor }}>
            {bgImage && (
              <img
                src={`${baseUrl}${bgImage}`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover -z-10"
              />
            )}

          {logoSrc && (
  <div className="flex justify-center mb-3">
    <img
      src={`${baseUrl}${logoSrc}`}
      alt=""
      className={`w-auto object-contain ${
        isAmongLocalsLogo ? "max-h-4" : "max-h-8"
      }`}
    />
  </div>
)}



            <div className={`text-center ${textMain}`}>
              <h3 className="text-2xl font-extrabold tracking-tight">{title}</h3>
              {desc && <p className={`mt-3 ${textSub} leading-relaxed`}>{desc}</p>}
            </div>

            {imageSrc && (
              <div className="mt-6">
                <img
                  src={`${baseUrl}${imageSrc}`}
                  alt=""
                  className="w-full h-auto object-contain"
                />
              </div>
            )}

            {/* CTA mobile */}
            <div className="mt-6">
              <div
                className="w-full rounded-full text-white text-center py-3 font-medium transition-transform hover:scale-[1.02]"
                style={{
                  backgroundColor: ctaColor || (textOnDark ? "#C60A09" : "#000000"),
                }}
              >
                {ctaLabel} <span className="inline-block">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div
          className="hidden md:flex flex-col relative"
          style={{ backgroundColor: bgColor }}
        >
          {bgImage && (
            <img
              src={`${baseUrl}${bgImage}`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover -z-10"
            />
          )}

          <div className="grid grid-cols-[1.15fr,0.85fr] gap-8 p-10 lg:p-14 relative z-10">
            <div className="flex flex-col justify-center">
           {logoSrc && (
  <div className="flex items-center mb-5">
    <img
      src={`${baseUrl}${logoSrc}`}
      alt=""
      className={`w-auto object-contain ${
        isAmongLocalsLogo ? "max-h-5" : "max-h-10"
      }`}
    />
  </div>
)}


              <h3 className={`text-4xl font-extrabold leading-tight ${textMain}`}>
                {title}
              </h3>
              {desc && <p className={`mt-4 ${textSub} leading-relaxed`}>{desc}</p>}
            </div>

            {imageSrc && (
              <div className="flex items-center justify-center">
                <img
                  src={`${baseUrl}${imageSrc}`}
                  alt=""
                  className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            )}
          </div>

          {stats?.length > 0 && (
            <div
              className={`flex items-center justify-between p-6 border-t ${borderCol} relative z-10`}
            >
              <div className="grid grid-cols-3 gap-8 flex-1">
                {stats.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-3xl ${textMain}`}>{s.icon || "•"}</span>
                    <div className={`text-sm font-medium ${highlightText}`}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="ml-8">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-white font-medium transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: ctaColor || "#FF723E" }}
                >
                  {ctaLabel} <span>→</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}













function CaseIndex() {
  return (
    <Container>
      <div className="py-12 space-y-8">
        {/* 1) POD sales – light */}
        <Card
          to="/case/pod-memes"
          logoSrc="heart-logo.png"
          title="From Viral Memes to POD Sales"
          desc="From relatable memes to brand-based products, we turned viral content into real sales. See the content loop that generated 150+ orders at 10%+ CVR."
          imageSrc="pod-memes-phones.png"
          stats={[
            { icon: "🛍️", label: "10.2% C.R. on Shopify" },
            { icon: "👀", label: "20M+ organic views" },
            { icon: "🧾", label: "150+ orders" },
          ]}
          // sfondo bianco, CTA arancione di default
        />

        {/* 2) Among Locals – background image su tutta la card */}
     <Card
  to="/case/among-locals"
  logoSrc="amonglocals-logo.svg"
  title="A bridge between cultures, people, and hidden traditions"
  desc="Built an experiential travel brand from the start to te launch. Check out how a fresh identity, a lean funnel and authentic storytelling generated over 40 qualified leads at £14.76 CPL."
  imageSrc="amonglocals-web-ad.png"  // immagine a destra su desktop
  stats={[
    { icon: "📈", label: "17.6% C.R. to the call" },
    { icon: "🌍", label: "40+ leads in 1 month" },
    { icon: "📞", label: "5 calls booked" },
  ]}
  ctaLabel="Read more"
  ctaColor="#FF723E"
/>







        {/* 3) Zampapazza – light */}
        <Card
          to="/case/zampapazza"
          logoSrc="zampapazza-logo.png"
          title="From pet memes to problem-solving products"
          desc="Starting with viral reels and memes, Zampapazza grew to 10k followers in just 30 days. By applying the “Pain Framework” and community insights, the project validated a premium pet product that converted from day one."
          imageSrc="zampapazza-fountain.png"
          stats={[
            { icon: "📲", label: "+10k follower In 30 days" },
            { icon: "📈", label: "AOV ~€62" },
            { icon: "🎯", label: "CPA ~€14" },
          ]}
        />

        {/* 4) EP – dark card, testi bianchi, CTA rossa */}
        <Card
          to="/case/branding-ep"
          title="Branding & campaign for EP ‘patto di sangue’"
          desc="From concept to release, I led the full creative and marketing process for Dia8lo’s EP Patto di Sangue."
          imageSrc="ep-covers.png"
          stats={[
            { icon: "👀", label: "100k+ views" },
            { icon: "🎬", label: "40+ assets" },
            { icon: "🎵", label: "10k+ streams" },
          ]}
          bgColor="#000000"     // ← card nera
          textOnDark            // ← testi chiari
          ctaColor="#C60A09"    // ← CTA rossa
        />
      </div>
    </Container>
  );
}




/* ---- Case layout minimo ---- */
function CaseLayout({ title, eyebrow, children }) {
  const navigate = useNavigate();
  return (
    <main>
      <section className="bg-black text-white">
        <Container>
          <div className="py-12">
            <div className="text-xs uppercase tracking-wider text-white/60">{eyebrow}</div>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">{title}</h1>
            <button onClick={() => navigate(-1)} className="mt-6 text-sm underline">← Back</button>
          </div>
        </Container>
      </section>
      <Container>
        <div className="py-12 prose prose-neutral max-w-none">{children}</div>
      </Container>
    </main>
  );
}

function CasePOD() { return <CaseLayout eyebrow="POD / UGC" title="From viral memes to POD sales">
  <p>Short description of the project.</p>
</CaseLayout>; }
function CaseAmongLocals() { return <CaseLayout eyebrow="Travel · Community" title="Among Locals">
  <p>Short description of the project.</p>
</CaseLayout>; }
function CaseZampapazza() { return <CaseLayout eyebrow="Pet brand · DTC" title="Zampapazza">
  <p>Short description of the project.</p>
</CaseLayout>; }
function CaseBrandingEP() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return (
    <CaseLayout eyebrow="Music · Branding" title='Branding & Campaign for EP “Patto di Sangue”'>
      {/* HERO IMAGE */}
      <div className="not-prose mb-10">
        <img
          src={`${baseUrl}ep-covers.png`}
          alt="EP artwork and branding — Patto di Sangue"
          className="w-full h-auto rounded-2xl shadow-md"
        />
      </div>

      {/* === SECTION 1: GETTING STARTED === */}
      <h3 className="uppercase tracking-wide text-sm text-neutral-500">Getting started</h3>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mt-3">
        My first launch as a marketer
      </h2>

      <p>
        This was my very first official launch project as a marketer.
        Diablo contacted me to support the release of his debut EP <em>Patto di Sangue</em>,
        featuring Ardè. Both artists were at the start of their careers and wanted to approach
        this release in a professional way, creating something that could stand out and act as
        a benchmark for future growth.
      </p>
      <p>
        Given the limited budget, I strategically assembled a team of university students
        (in graphic design, photography, videography) to contribute skills while keeping costs
        efficient. My role was to direct them, align their work under a consistent brand vision,
        and ensure professional-level execution despite limited resources.
      </p>
      <p>Together, we set the goal of:</p>
      <ul>
        <li>Getting noticed</li>
        <li>Converting early interest into fans</li>
        <li>Learning what works best to scale later</li>
      </ul>

      {/* === SECTION 2: CONTEXT === */}
      <h3 className="uppercase tracking-wide text-sm text-neutral-500 mt-16">Context</h3>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mt-3">
        A growing market, a small team, a big ambition
      </h2>

      <p>
        The music industry is expanding and becoming increasingly social. In 2023, the global
        recorded music market kept growing; streaming represented the majority of revenues, and
        short-form video platforms turned into discovery engines for music and artists.
      </p>
      <p>
        Audience behavior is shifting. Gen Z streams songs and 30+ podcasts a month; on TikTok,
        over 60% of time is spent on music-centered content. Live-streaming rose, and virtual concerts
        became normal. For an independent debut, this meant:
      </p>
      <ol>
        <li>We needed a clear brand identity and native short-form content to compete.</li>
        <li>With a small budget, every move had to maximize reach and engagement.</li>
      </ol>
      <p>
        Diablo and Ardè wanted to treat this project as the launch of their careers, and as a
        benchmark to test strategies before scaling.
      </p>

      {/* === SECTION 3: THE CHALLENGE === */}
      <h3 className="uppercase tracking-wide text-sm text-neutral-500 mt-16">The challenge</h3>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mt-3">
        Budget, alignment, and execution
      </h2>

      <p>
        Launching <em>Patto di Sangue</em> was far from straightforward. As the first professional
        release for both artists, the project came with creative ambition but limited resources.
        Unlike established acts, there was basically no pre-existing fanbase, no label infrastructure,
        and only a small budget. The main challenges I had to overcome included:
      </p>

      <div className="grid md:grid-cols-2 gap-8 not-prose">
        {/* 1 */}
        <div className="prose prose-neutral">
          <h3 className="text-neutral-900 font-extrabold text-2xl mb-2">1. Multi-stakeholder alignment</h3>
          <p>
            Coordinating across a fragmented team with different workflows—a graphic designer,
            producer and video makers—required extra effort. Each had unique creative expectations,
            and my role was to align them under a coherent brand vision without losing authenticity.
          </p>
        </div>

        {/* 2 */}
        <div className="prose prose-neutral">
          <h3 className="text-neutral-900 font-extrabold text-2xl mb-2">2. Budget instability</h3>
          <p>
            The campaign was planned with a modest but workable budget. However, sudden cuts forced
            us to reprioritize assets and channels on the fly. This meant constantly asking:
            what content delivers the most value for the least spend?
          </p>
        </div>

        {/* 3 */}
        <div className="prose prose-neutral md:col-span-2">
          <h3 className="text-neutral-900 font-extrabold text-2xl mb-2">3. First-time unknowns</h3>
          <p>
            This was my first 360° campaign as a marketer, and Diablo &amp; Ardè’s first professional
            project. Without prior data, every decision—from ad targeting to content pacing—was
            experimental but benchmarked on researched best practices. The only path forward was to
            test, learn, and adapt in real time.
          </p>
        </div>
      </div>

      {/* === SECTION 4: MY ROLE === */}
      <h3 className="uppercase tracking-wide text-sm text-neutral-500 mt-16">My Role</h3>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mt-3">
        From research to execution
      </h2>
      <p>
        As marketing and creative lead, I was responsible for the full strategy and execution.
        While I collaborated with students and external creatives, all analysis, direction, and
        advertising were on me.
      </p>

      <div className="not-prose grid gap-8 md:gap-10 md:grid-cols-2 mt-8">
        {/* 1 */}
        <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden">
          <img
            src={`${baseUrl}ep-role-1-competitor-trend.png`}
            alt="Competitor & Trend Analysis"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 prose prose-neutral">
            <h3 className="m-0 font-extrabold text-neutral-900 text-xl">1. Competitor & Trend Analysis</h3>
            <ul>
              <li>Benchmarked the Italian trap/urban scene to map positioning of emerging artists.</li>
              <li>Analyzed TikTok and Instagram trends (lyric reels, POV cuts, lo-fi snippets).</li>
              <li>Set the UVP: brand identity + native content + micro-ads instead of “just promo.”</li>
            </ul>
          </div>
        </section>

        {/* 2 */}
        <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden">
          <img
            src={`${baseUrl}ep-role-2-strategy.png`}
            alt="Marketing Strategy"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 prose prose-neutral">
            <h3 className="m-0 font-extrabold text-neutral-900 text-xl">2. Marketing Strategy</h3>
            <ul>
              <li>Focused on awareness & consideration through organic content boosted with Meta Ads.</li>
              <li>Used micro native ads to drive listening and gather insights.</li>
              <li>Built a repeatable playbook for future releases.</li>
            </ul>
          </div>
        </section>

        {/* 3 */}
        <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden">
          <img
            src={`${baseUrl}ep-role-3-branding.png`}
            alt="Art Direction & Branding"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 prose prose-neutral">
            <h3 className="m-0 font-extrabold text-neutral-900 text-xl">3. Art Direction & Branding</h3>
            <ul>
              <li>Created a dark, symbolic identity reflecting the EP’s themes (blood pact, street credibility).</li>
              <li>Developed the palette, cover concept, and visual tone.</li>
              <li>Collaborated with a design student to produce all assets.</li>
            </ul>
          </div>
        </section>

        {/* 4 */}
        <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden">
          <img
            src={`${baseUrl}ep-role-4-content.png`}
            alt="Content Strategy & Production"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 prose prose-neutral">
            <h3 className="m-0 font-extrabold text-neutral-900 text-xl">4. Content Strategy & Production</h3>
            <ul>
              <li>Planned a content calendar: lyric reels, lo-fi snippets, and narrative carousels.</li>
              <li>Defined roles for awareness, engagement, and conversion.</li>
              <li>Balanced organic posting with paid amplification.</li>
            </ul>
          </div>
        </section>

        {/* 5 */}
        <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden">
          <img
            src={`${baseUrl}ep-role-5-video.png`}
            alt="Video Concepting & Direction"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 prose prose-neutral">
            <h3 className="m-0 font-extrabold text-neutral-900 text-xl">5. Video Concepting & Direction</h3>
            <ul>
              <li>Oversaw ideation, scriptwriting, and direction for multiple video formats.</li>
              <li>Collaborated with editors, 3D artists, and photographers for TikTok and ad content.</li>
            </ul>
          </div>
        </section>

        {/* 7 */}
        <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden">
          <img
            src={`${baseUrl}ep-role-7-ads.png`}
            alt="Advertising Strategy & Execution"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 prose prose-neutral">
            <h3 className="m-0 font-extrabold text-neutral-900 text-xl">7. Advertising Strategy & Execution</h3>
            <ul>
              <li>Managed Meta Ads with native video push and iteration on audiences.</li>
              <li>Achieved ~€0.42 CPC and 400+ qualified clicks.</li>
              <li>Used a custom GitHub redirect to track Spotify conversions with Meta Pixel.</li>
            </ul>
          </div>
        </section>

        {/* 8 */}
        <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden">
          <img
            src={`${baseUrl}ep-role-8-coordination.png`}
            alt="Cross-team Coordination"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 prose prose-neutral">
            <h3 className="m-0 font-extrabold text-neutral-900 text-xl">8. Cross-team Coordination</h3>
            <ul>
              <li>Connected Dia8lo, Ardè, producers, designers, and videomakers.</li>
              <li>Directed mixed-skill collaborators, mediating creative differences.</li>
              <li>Maintained consistency and respected timelines.</li>
            </ul>
          </div>
        </section>
      </div>
    </CaseLayout>
  );
}



/* ---- Home ---- */
function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <section className="bg-neutral-50 border-y"><CaseIndex /></section>
      <section id="contact" className="py-16 scroll-mt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Want to get in touch?</h2>
            <p className="mt-2 text-neutral-600">Drop me a message — I usually reply quickly.</p>
          </div>
          <form className="mx-auto max-w-xl mt-8 grid gap-3" action="https://formsubmit.co/" method="POST">
            <input type="hidden" name="_captcha" value="false" />
            <input className="w-full rounded-xl ring-1 ring-neutral-300 p-3" name="name" placeholder="Name" />
            <input className="w-full rounded-xl ring-1 ring-neutral-300 p-3" name="email" placeholder="Email address" type="email" />
            <textarea className="w-full rounded-xl ring-1 ring-neutral-300 p-3" name="message" rows={4} placeholder="Your message" />
            <button type="submit" className="rounded-xl px-4 py-2 bg-black text-white">Send</button>
          </form>
        </Container>
      </section>
    </main>
  );
}

/* ---- APP ROOT (una sola export default!) ---- */
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-neutral-900">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cases" element={<CaseIndex />} />
          <Route path="/case/pod-memes" element={<CasePOD />} />
          <Route path="/case/among-locals" element={<CaseAmongLocals />} />
          <Route path="/case/zampapazza" element={<CaseZampapazza />} />
          <Route path="/case/branding-ep" element={<CaseBrandingEP />} />
        </Routes>
        <footer className="border-t py-8">
          <Container>
            <div className="text-sm text-neutral-500">
              © {new Date().getFullYear()} Gabriele Arias — Details make the difference.
            </div>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
