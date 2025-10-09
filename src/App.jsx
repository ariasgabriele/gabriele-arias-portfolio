// ===== IMPORTS (UNA SOLA VOLTA, IN CIMA) =====
import { HashRouter as BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

// ===== SCROLL TO TOP ON ROUTE CHANGE =====
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

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
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="bg-white text-neutral-900 pt-12 md:pt-20 pb-0">
      <Container>
        <div className="text-center">
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

/* ---- Card ---- */
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
    typeof logoSrc === "string" && logoSrc.toLowerCase().includes("amonglocals-logo");

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
                  className={`w-auto object-contain ${isAmongLocalsLogo ? "max-h-4" : "max-h-8"}`}
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
                style={{ backgroundColor: ctaColor || (textOnDark ? "#C60A09" : "#000000") }}
              >
                {ctaLabel} <span className="inline-block">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex flex-col relative" style={{ backgroundColor: bgColor }}>
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
                    className={`w-auto object-contain ${isAmongLocalsLogo ? "max-h-5" : "max-h-10"}`}
                  />
                </div>
              )}
              <h3 className={`text-4xl font-extrabold leading-tight ${textMain}`}>{title}</h3>
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
            <div className={`flex items-center justify-between p-6 border-t ${borderCol} relative z-10`}>
              <div className="grid grid-cols-3 gap-8 flex-1">
                {stats.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-3xl ${textMain}`}>{s.icon || "•"}</span>
                    <div className={`text-sm font-medium ${highlightText}`}>{s.label}</div>
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
        />

        {/* 2) Among Locals – standard card */}
        <Card
          to="/case/among-locals"
          logoSrc="amonglocals-logo.svg"
          title="A bridge between cultures, people, and hidden traditions"
          desc="Built an experiential travel brand from the start to the launch. Check how a fresh identity, a lean funnel and authentic storytelling generated 40+ qualified leads at £14.76 CPL."
          imageSrc="amonglocals-web-ad.png"
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
            { icon: "📲", label: "+10k followers in 30 days" },
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
          bgColor="#000000"
          textOnDark
          ctaColor="#C60A09"
        />
      </div>
    </Container>
  );
}

/* ---- Case layout ---- */
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

function CasePOD() {
  return (
    <CaseLayout eyebrow="POD / UGC" title="From viral memes to POD sales">
      <p>Short description of the project.</p>
    </CaseLayout>
  );
}
function CaseAmongLocals() {
  return (
    <CaseLayout eyebrow="Travel · Community" title="Among Locals">
      <p>Short description of the project.</p>
    </CaseLayout>
  );
}
function CaseZampapazza() {
  return (
    <CaseLayout eyebrow="Pet brand · DTC" title="Zampapazza">
      <p>Short description of the project.</p>
    </CaseLayout>
  );
}
function CaseBrandingEP() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return (
    <CaseLayout eyebrow="Music · Branding" title='Branding & Campaign for EP “Patto di Sangue”'>
      {/* === HERO IMAGE === */}
      <div className="not-prose mb-16">
        <img
          src={`${baseUrl}ep-covers.png`}
          alt="EP artwork and branding — Patto di Sangue"
          className="w-full h-auto rounded-3xl shadow-lg"
        />
      </div>

      {/* === SECTION 1: GETTING STARTED === */}
      <section className="mt-24">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Getting started</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          My first launch as a marketer
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
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
          <ul className="list-disc pl-6 space-y-1">
            <li>Getting noticed</li>
            <li>Converting early interest into fans</li>
            <li>Learning what works best to scale later</li>
          </ul>
        </div>
      </section>

      {/* === SECTION 2: CONTEXT === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Context</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          A growing market, a small team, a big ambition
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
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
          <ol className="list-decimal pl-6 space-y-1">
            <li>We needed a clear brand identity and native short-form content to compete.</li>
            <li>With a small budget, every move had to maximize reach and engagement.</li>
          </ol>
          <p>
            Diablo and Ardè wanted to treat this project as the launch of their careers, and as a
            benchmark to test strategies before scaling.
          </p>
        </div>
      </section>

      {/* === SECTION 3: THE CHALLENGE === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">The challenge</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Budget, alignment, and execution
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-neutral-700 mb-10">
          <p>
            Launching <em>Patto di Sangue</em> was far from straightforward. As the first professional
            release for both artists, the project came with creative ambition but limited resources.
            Unlike established acts, there was basically no pre-existing fanbase, no label infrastructure,
            and only a small budget. The main challenges I had to overcome included:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">1. Multi-stakeholder alignment</h3>
            <p className="text-neutral-700 leading-relaxed">
              Coordinating across a fragmented team with different workflows—a graphic designer,
              producer and video makers—required extra effort. Each had unique creative expectations,
              and my role was to align them under a coherent brand vision without losing authenticity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">2. Budget instability</h3>
            <p className="text-neutral-700 leading-relaxed">
              The campaign was planned with a modest but workable budget. However, sudden cuts forced
              us to reprioritize assets and channels on the fly. This meant constantly asking:
              what content delivers the most value for the least spend?
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm md:col-span-2">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">3. First-time unknowns</h3>
            <p className="text-neutral-700 leading-relaxed">
              This was my first 360° campaign as a marketer, and Diablo &amp; Ardè’s first professional
              project. Without prior data, every decision—from ad targeting to content pacing—was
              experimental but benchmarked on researched best practices. The only path forward was to
              test, learn, and adapt in real time.
            </p>
          </div>
        </div>
      </section>

      {/* === SECTION 4: MY ROLE === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">My Role</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          From research to execution
        </h2>
        <p className="text-lg text-neutral-700 leading-relaxed mb-10">
          As marketing and creative lead, I was responsible for the full strategy and execution.
          While I collaborated with students and external creatives, all analysis, direction, and
          advertising were on me.
        </p>

        <div className="not-prose grid gap-10 md:grid-cols-2">
          <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden shadow-sm">
            <img src={`${baseUrl}ep-role-1-competitor-trend.png`} alt="Competitor & Trend Analysis" className="w-full h-56 object-cover" />
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-neutral-900 text-xl">1. Competitor & Trend Analysis</h3>
              <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                <li>Benchmarked the Italian trap/urban scene to map positioning of emerging artists.</li>
                <li>Analyzed TikTok and Instagram trends (lyric reels, POV cuts, lo-fi snippets).</li>
                <li>Set the UVP: brand identity + native content + micro-ads instead of “just promo.”</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden shadow-sm">
            <img src={`${baseUrl}ep-role-2-strategy.png`} alt="Marketing Strategy" className="w-full h-56 object-cover" />
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-neutral-900 text-xl">2. Marketing Strategy</h3>
              <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                <li>Focused on awareness & consideration through organic content boosted with Meta Ads.</li>
                <li>Used micro native ads to drive listening and gather insights.</li>
                <li>Built a repeatable playbook for future releases.</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden shadow-sm">
            <img src={`${baseUrl}ep-role-3-branding.png`} alt="Art Direction & Branding" className="w-full h-56 object-cover" />
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-neutral-900 text-xl">3. Art Direction & Branding</h3>
              <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                <li>Created a dark, symbolic identity reflecting the EP’s themes (blood pact, street credibility).</li>
                <li>Developed the palette, cover concept, and visual tone.</li>
                <li>Collaborated with a design student to produce all assets.</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden shadow-sm">
            <img src={`${baseUrl}ep-role-4-content.png`} alt="Content Strategy & Production" className="w-full h-56 object-cover" />
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-neutral-900 text-xl">4. Content Strategy & Production</h3>
              <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                <li>Planned a content calendar: lyric reels, lo-fi snippets, and narrative carousels.</li>
                <li>Defined roles for awareness, engagement, and conversion.</li>
                <li>Balanced organic posting with paid amplification.</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden shadow-sm">
            <img src={`${baseUrl}ep-role-5-video.png`} alt="Video Concepting & Direction" className="w-full h-56 object-cover" />
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-neutral-900 text-xl">5. Video Concepting & Direction</h3>
              <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                <li>Oversaw ideation, scriptwriting, and direction for multiple video formats.</li>
                <li>Collaborated with editors, 3D artists, and photographers for TikTok and ad content.</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden shadow-sm">
            <img src={`${baseUrl}ep-role-7-ads.png`} alt="Advertising Strategy & Execution" className="w-full h-56 object-cover" />
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-neutral-900 text-xl">7. Advertising Strategy & Execution</h3>
              <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                <li>Managed Meta Ads with native video push and iteration on audiences.</li>
                <li>Achieved ~€0.42 CPC and 400+ qualified clicks.</li>
                <li>Used a custom GitHub redirect to track Spotify conversions with Meta Pixel.</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl ring-1 ring-neutral-200 overflow-hidden shadow-sm">
            <img src={`${baseUrl}ep-role-8-coordination.png`} alt="Cross-team Coordination" className="w-full h-56 object-cover" />
            <div className="p-6 space-y-3">
              <h3 className="font-bold text-neutral-900 text-xl">8. Cross-team Coordination</h3>
              <ul className="list-disc pl-5 text-neutral-700 space-y-1">
                <li>Connected Dia8lo, Ardè, producers, designers, and videomakers.</li>
                <li>Directed mixed-skill collaborators, mediating creative differences.</li>
                <li>Maintained consistency and respected timelines.</li>
              </ul>
            </div>
          </section>
        </div>
      </section>
      {/* === SECTION 5: STRATEGY === */}
<section className="mt-28">
  {/* immagine sezione (opzionale) */}
  <div className="not-prose mb-8">
    <img
      src={`${baseUrl}ep-strategy-hero.png`}
      alt="Strategy — symbolic launch"
      className="w-full h-auto rounded-2xl ring-1 ring-neutral-200"
    />
  </div>

  <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
    Strategy
  </h3>
  <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
    Designing a symbolic launch under real constraints
  </h2>

  <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
    <p>
      From the start, I knew this campaign couldn’t rely on algorithms or virality alone.
      Whether you’re an emerging act or a household name, a release needs direction —
      a structure that connects story, format, and emotion. My goal was to build a symbolic
      but measurable launch system that could start from awareness and naturally evolve into
      conversion and follower growth over time.
    </p>
    <p>
      The idea was to build a path, not a spike: create initial reach, then retarget it through
      future releases and the piano version of the same songs.
    </p>
  </div>

  {/* 1. The logic */}
  <div className="mt-10 grid gap-6">
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">1. The logic — chaos and coherence</h3>
      <p className="text-neutral-700 leading-relaxed">
        The EP itself was chaotic by nature — different beats, different energies — but the story had to be coherent.
        I wanted the marketing to mirror that idea: diverse in tone, unified in message. Visually, everything followed
        the “walk towards light” metaphor. Strategically, I structured a plan that started with emotion and curiosity,
        not overexposure.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Coherence isn’t about uniformity — it’s about repetition of meaning. The sound could shift,
        as long as the story stayed consistent.
      </p>
    </div>

    {/* 2. The platforms */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">2. The platforms — function over fashion</h3>
      <p className="text-neutral-700 leading-relaxed">
        TikTok was the epicenter. I used it as a testing ground for natural, unscripted content, letting the songs
        breathe through real performance. Instagram played a more curated role — a visual archive of identity.
        In hindsight, I’d merge both approaches: fragmentation diluted momentum.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        I briefly tested YouTube Shorts after studying the Raye case at Milano Music Week, but returns were minimal.
        With tight budgets, <em>focus beats diversification</em>.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Different platforms reward different behaviors, but with small budgets,
        depth over spread is the only sustainable strategy.
      </p>
    </div>

    {/* 3. Funnel design */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">3. Funnel design — from curiosity to community</h3>
      <ul className="list-disc pl-6 text-neutral-700 space-y-2">
        <li><strong>Pre-launch:</strong> two core teasers → announce EP → announce lead single within days.</li>
        <li><strong>Launch:</strong> three Reels/day across accounts, each showing a fragment of the track.</li>
        <li><strong>Engagement:</strong> reminders and carousels to reinforce the visual story.</li>
        <li><strong>Conversion:</strong> Meta ads on <em>Stasera</em> to drive streams, saves, followers.</li>
        <li><strong>Post-launch:</strong> piano version to retarget engagers → convert casual listeners into early fans.</li>
      </ul>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Rhythm creates memory. Releasing content in waves kept the EP alive, not a single drop.
      </p>
    </div>

    {/* 4. Creative & message */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">4. Creative and message — mystery, realism, hope</h3>
      <p className="text-neutral-700 leading-relaxed">
        I positioned Dia8lo and Arde as introspective and mysterious, but not distant. The goal wasn’t to explain
        everything — it was to spark curiosity and leave breadcrumbs. Captions, edits, and lyric highlights
        felt direct, emotional, and decisive, with an underlying message of hope.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> In trap culture, confidence is common — vulnerability, framed symbolically, creates stronger connection.
      </p>
    </div>

    {/* 5. Execution */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">5. Execution — iteration as a method</h3>
      <p className="text-neutral-700 leading-relaxed">
        Every ad was shot in three variants per track to test structure, intro length, and pacing. Natural intros
        with beat drop and reveal at ~second 3 consistently outperformed polished edits. This became a rule:
        change something visual or rhythmic every 3–4 seconds to maintain attention.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Optimization doesn’t happen in the media dashboard — it happens in the timeline.
      </p>
    </div>

    {/* 6. Trade-offs */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">6. Trade-offs and takeaways</h3>
      <p className="text-neutral-700 leading-relaxed">
        Budget cuts delayed the post-launch phase; retargeting lost momentum. Despite that, the campaign
        generated buzz in the local scene and strong save-to-listen ratios on Spotify.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        Looking back, I’d concentrate resources on a single platform (likely Instagram) and release one song
        at a time with heavier interaction campaigns.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> The biggest enemy of a small campaign is dispersion. Focused storytelling wins.
      </p>
    </div>
  </div>
</section>

{/* === SECTION 6: OPPORTUNITY MAP === */}
<section className="mt-28">
  <div className="not-prose mb-8">
    <img
      src={`${baseUrl}ep-oppmap-hero.png`}
      alt="Opportunity Map — testing & learning"
      className="w-full h-auto rounded-2xl ring-1 ring-neutral-200"
    />
  </div>

  <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
    Opportunity Map
  </h3>
  <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
    Testing, learning, and building upward
  </h2>

  <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
    <p>
      With limited time and budget, I couldn’t afford randomness. Every move had to be a calculated bet:
      <em>High impact/low effort → first</em>, <em>High effort/high value → after validation</em>, everything else → ignore.
      This turned the campaign into a learning system, not a one-off release.
    </p>
  </div>

  <div className="mt-10 grid gap-6">
    {/* 1. Lyric-hook testing */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">1. Lyric-hook testing — Finding the emotional trigger</h3>
      <p className="text-neutral-700 leading-relaxed">
        Multiple 10–15s cuts per track, changing only first two seconds, reveal timing, and on-beat text style.
        Natural intros + beat drop around second 3 won consistently.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> The strongest hook isn’t the loudest — it’s the one that feels mid-truth.
      </p>
    </div>

    {/* 2. Hero reels */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">2. Hero reels — Owning the visual narrative</h3>
      <p className="text-neutral-700 leading-relaxed">
        Three core scenes carried the message: <em>The Pact</em>, <em>The Climb</em>, <em>The Light</em>. Everything else echoed
        these symbols to build recognition (tones, angles, mask).
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> In a short-form world, continuity is the new familiarity.
      </p>
    </div>

    {/* 3. Trend-fit micro ads */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">3. Trend-fit micro ads — Borrowing rhythm, not identity</h3>
      <p className="text-neutral-700 leading-relaxed">
        Tested native-feed vs cinematic edits for <em>Stasera</em>. Native won: lower CPC (~€0.42), higher watch time, stronger saves.
        The difference wasn’t quality — it was familiarity.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> The best-performing ad doesn’t feel like one.
      </p>
    </div>

    {/* 4. Retargeting waves */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">4. Retargeting waves — From glance to gravity</h3>
      <p className="text-neutral-700 leading-relaxed">
        Retargeting on viewers/engagers using alternative cuts of the same ideas. Short cycle, clear efficiency:
        higher CTRs at lower CPMs.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Retargeting isn’t about newness — it’s about resonance.
      </p>
    </div>

    {/* 5. Visual identity watermark */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">5. Visual identity watermark — Consistency at a glance</h3>
      <p className="text-neutral-700 leading-relaxed">
        Introduced a small blood-red glyph watermark across reels and stills as a subtle signature.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Symbols don’t sell directly — they build memory that compounds.
      </p>
    </div>

    {/* 6. The pivot that never happened */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">6. The pivot that never happened — When opportunity meets limitation</h3>
      <p className="text-neutral-700 leading-relaxed">
        Piano-version retargeting was delayed; momentum cooled down. In music campaigns, momentum is currency.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Lifespan is about energy continuity more than content volume.
      </p>
    </div>

    {/* 7. Consolidation */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">7. Consolidation — From testing to a playbook</h3>
      <ul className="list-disc pl-6 text-neutral-700 space-y-1">
        <li>Hooks front-loaded in the first 2s.</li>
        <li>Beat drops/reveals by second 3.</li>
        <li>Motion/novelty every 3–4s to sustain watch time.</li>
      </ul>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Creative intuition scales when measured — patterns become systems.
      </p>
    </div>
  </div>
</section>

{/* === SECTION 7: LEARNINGS === */}
<section className="mt-28">
  <div className="not-prose mb-8">
    <img
      src={`${baseUrl}ep-learnings-hero.png`}
      alt="Learnings — beyond the release"
      className="w-full h-auto rounded-2xl ring-1 ring-neutral-200"
    />
  </div>

  <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Learnings</h3>
  <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
    Growth beyond the release
  </h2>

  <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
    <p>
      The project was a lab where identity, storytelling, and digital rhythm met under constraints.
      Limited resources pushed me to design systems, not just assets.
    </p>
  </div>

  <div className="mt-10 grid gap-6">
    {/* 1 */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">1. Structure beats scale</h3>
      <p className="text-neutral-700 leading-relaxed">
        With small budgets, clarity replaces volume: hooks in first 2s, reveals at 3s, movement every 4s —
        a “rhythm spine” for emotional storytelling.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Emotion travels faster when form is disciplined.
      </p>
    </div>

    {/* 2 */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">2. Fit is stronger than invention</h3>
      <p className="text-neutral-700 leading-relaxed">
        Trend formats aren’t shortcuts — they’re languages. Speak the dialect, then bend it to your story.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Innovation is often adapting known shapes to a true narrative.
      </p>
    </div>

    {/* 3 */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">3. Momentum is a resource</h3>
      <p className="text-neutral-700 leading-relaxed">
        Timing is emotional, not logistical. Miss the follow-up window and efficiency collapses.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Momentum behaves like heat — if you don’t feed it, it fades.
      </p>
    </div>

    {/* 4 */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">4. Collaboration is a skill</h3>
      <p className="text-neutral-700 leading-relaxed">
        Directing mixed-skill collaborators required turning vision into executable steps.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> Direction isn’t control — clarity creates freedom.
      </p>
    </div>

    {/* 5 */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">5. Strategy is storytelling</h3>
      <p className="text-neutral-700 leading-relaxed">
        Strategy is story sequencing: what to say and when. Even metrics are part of the narrative.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Insight:</strong> A campaign should reveal itself piece by piece.
      </p>
    </div>

    {/* 6 */}
    <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">6. Pride, perspective, and progress</h3>
      <p className="text-neutral-700 leading-relaxed">
        Not a viral spike, but a foundation: visual identity, narrative structure, analytical framework.
      </p>
      <p className="mt-3 text-neutral-700 leading-relaxed">
        <strong>Final insight:</strong> Growth happens inside the campaign — limitation and iteration are the climb.
      </p>
    </div>
  </div>
</section>

    </CaseLayout>
  );
}

/* ---- Home ---- */
function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <section className="bg-neutral-50 border-y">
        <CaseIndex />
      </section>
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

// ===== APP ROOT =====
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-neutral-900">
        <Nav />

        {/* Scroll automatico in cima a ogni route */}
        <ScrollToTop />

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
