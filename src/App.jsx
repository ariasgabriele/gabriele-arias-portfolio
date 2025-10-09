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
          src={`${baseUrl}ep-hero-patto.png`}         {/* <-- carica in /public */}
          alt="Patto di Sangue — campaign hero"
          className="w-full h-auto rounded-3xl shadow-lg"
        />
      </div>

      {/* === GETTING STARTED === */}
      <section className="mt-24">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Getting Started — My first launch as a marketer
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          My first official music launch
        </h2>

        <div className="not-prose mb-8">
          <img
            src={`${baseUrl}ep-sec-getting-started.png`}  {/* <-- immagine sezione */}
            alt="Kickoff & team setup"
            className="w-full h-64 md:h-80 object-cover rounded-2xl ring-1 ring-neutral-200"
          />
        </div>

        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            This was my first official music launch as a marketer. Dia8lo reached out to support the release
            of his debut EP <em>Patto di Sangue</em>, featuring Ardè — a project designed to stand out in the trap
            scene while symbolizing a new beginning for both artists.
          </p>
          <p>
            With a small budget, I assembled a lean team of university students in graphic design, photography,
            and videography. My role was to lead them under one coherent vision — ensuring professional execution
            with limited resources while keeping the story authentic and grounded in who the artists really were.
          </p>
          <p>
            From the start, the goal was clear: not to chase virality, but to build something meaningful enough
            to grow from — a foundation for future releases, retargeting, and community.
          </p>
        </div>
      </section>

      {/* === CONTEXT === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Context — The first chapter of a journey upward
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          A cinematic story about growth, loyalty, transformation
        </h2>

        <div className="not-prose mb-8">
          <img
            src={`${baseUrl}ep-sec-context.png`}         {/* <-- immagine sezione */}
            alt="Visual metaphor — upward through decay"
            className="w-full h-64 md:h-80 object-cover rounded-2xl ring-1 ring-neutral-200"
          />
        </div>

        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            <em>Patto di Sangue</em> wasn’t just another trap release. It told the story of two young artists walking
            together through darkness toward light, using sound and symbolism to represent growth, loyalty, and transformation.
          </p>
          <p>
            The EP blended melodic trap with different beats and atmospheres — intentionally chaotic at first listen,
            but united by a single emotional thread. My challenge was to make that duality work: turning musical diversity
            into a visually coherent narrative that felt like one story told in multiple voices.
          </p>
          <p>
            The main video embodied that message — filmed in an abandoned villa, following the artists as they climbed upward
            through decay. It became the project’s visual metaphor: you rise by walking through your own ruins.
          </p>
        </div>
      </section>

      {/* === THE CHALLENGE === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          The Challenge — Coherence in chaos
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Make experimentation feel like one story
        </h2>

        <div className="not-prose mb-8">
          <img
            src={`${baseUrl}ep-sec-challenge.png`}       {/* <-- immagine sezione */}
            alt="Constraints & alignment"
            className="w-full h-64 md:h-80 object-cover rounded-2xl ring-1 ring-neutral-200"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li>Create a system to turn a chaotic mix of songs into one cohesive narrative.</li>
              <li>Keep collaborators aligned (2 artists, producer, designer, 2 videomakers, 3D editor).</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li>Manage constant budget shifts and rewrite plans weekly.</li>
              <li>Write & co-direct videos to maintain coherence and quality despite constraints.</li>
            </ul>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-neutral-700 mt-8">
          The campaign had to look intentional, not improvised — a professional debut that felt alive, personal, and symbolic.
        </p>
      </section>

      {/* === COMPETITOR & BRAND ANALYSIS === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Competitor & Brand Analysis — Finding direction before execution
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Clarity before movement
        </h2>

        <div className="not-prose mb-8">
          <img
            src={`${baseUrl}ep-sec-analysis.png`}        {/* <-- immagine sezione */}
            alt="Research system & pattern library"
            className="w-full h-64 md:h-80 object-cover rounded-2xl ring-1 ring-neutral-200"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Understanding the artists */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Understanding the artists</h3>
            <p className="text-neutral-700">
              Through long conversations, I unpacked the core message: this wasn’t an EP about fame — it was about the act of walking
              upward together. Moodboard: dark, cinematic visuals — blood (pact), masks (identity), light (goal).
            </p>
            <p className="text-neutral-600 mt-3 italic">
              Insight: symbolic coherence creates unity even when sound changes track to track.
            </p>
          </div>

          {/* Mapping the fanbase */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Mapping the fanbase</h3>
            <p className="text-neutral-700">
              Small but vocal. I interviewed early listeners and studied adjacent trap communities to capture the emotional language.
            </p>
            <p className="text-neutral-600 mt-3 italic">
              Insight: tiny fanbases reveal the emotions to build from (even if they can’t define demographics).
            </p>
          </div>

          {/* Benchmarking the scene */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Benchmarking the scene</h3>
            <p className="text-neutral-700">
              Big acts often underperform organically; they win with budget more than storytelling.
            </p>
            <p className="text-neutral-600 mt-3 italic">
              Insight: small acts stand out by using strategy where others use scale.
            </p>
          </div>

          {/* Trend logging & patterns */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Trend logging & pattern hunting</h3>
            <p className="text-neutral-700">
              I built a trend library (TikTok/IG) of lyric cuts, POVs, camera moves, hook placements — repurposing proven structures.
            </p>
            <p className="text-neutral-600 mt-3 italic">
              Insight: innovation is alignment — fit culture to identity.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm mt-10">
          <h3 className="text-xl font-bold mb-2">From analysis to brand direction</h3>
          <p className="text-neutral-700">
            The EP should look like a cinematic pact — dark but hopeful, chaotic but rising. Blood and light became symbols;
            lyrics and visual rhythm, the tools. Every asset — from cover to ads — spoke the same language.
          </p>
          <p className="text-neutral-600 mt-3 italic">
            Insight: analysis has value only when it turns into story — not reports, but rhythm.
          </p>
        </div>
      </section>

      {/* === BRANDING === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Branding — Walking together towards the light
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Symbols, palette, type, rhythm
        </h2>

        <div className="not-prose mb-8">
          <img
            src={`${baseUrl}ep-sec-branding.png`}         {/* <-- immagine sezione */}
            alt="Brand system — blood & light"
            className="w-full h-64 md:h-80 object-cover rounded-2xl ring-1 ring-neutral-200"
          />
        </div>

        <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed text-neutral-700">
          <li><strong>Symbols:</strong> blood = union; masks = identity in motion; light = goal.</li>
          <li><strong>Palette:</strong> deep reds & shadows fading into pale light.</li>
          <li><strong>Typography:</strong> minimal, sharp; determination & movement.</li>
          <li><strong>Visual rhythm:</strong> tension + direction → the sensation of climbing.</li>
        </ul>

        <p className="text-neutral-600 mt-4 italic">
          Insight: consistency doesn’t come from budget; it comes from belief.
        </p>
      </section>

      {/* === STRATEGY === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Strategy — Designing a symbolic launch under real constraints
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Build momentum that compounds
        </h2>

        <div className="not-prose mb-8">
          <img
            src={`${baseUrl}ep-sec-strategy.png`}         {/* <-- immagine sezione */}
            alt="Platform logic & funnel"
            className="w-full h-64 md:h-80 object-cover rounded-2xl ring-1 ring-neutral-200"
          />
        </div>

        {/* Platform logic */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Platform logic</h3>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li><strong>TikTok:</strong> testing ground for authentic performances & lyric hooks.</li>
              <li><strong>Instagram:</strong> visual portfolio; in hindsight, mixing formats in one place would have built stronger traction.</li>
              <li><strong>YouTube Shorts:</strong> tested briefly; low efficiency at this scale.</li>
            </ul>
            <p className="text-neutral-600 mt-3 italic">
              Insight: with limited resources, focus with depth &gt; spread with hope.
            </p>
          </div>

          {/* Funnel architecture */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Funnel architecture</h3>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li><strong>Pre-launch:</strong> 2 teasers → 3-day build (EP annc → single → snippets).</li>
              <li><strong>Launch:</strong> 1 reel/day × 3 days across 3 accounts (fragments of NXV).</li>
              <li><strong>Engagement:</strong> carousels & reminders.</li>
              <li><strong>Conversion:</strong> Meta Ads on Stasera with in-reel CTAs (“save”, “listen”).</li>
              <li><strong>Post-launch:</strong> piano version planned for emotional retargeting (delayed).</li>
            </ul>
            <p className="text-neutral-600 mt-3 italic">
              Insight: frequency builds memory; rhythm builds connection.
            </p>
          </div>
        </div>

        {/* Creative choices */}
        <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm mt-8">
          <h3 className="text-xl font-bold mb-2">Creative choices</h3>
          <p className="text-neutral-700">
            Isolated the strongest lyric lines; cut 10–15s variants changing pacing & framing.
            The natural take — casual intro, vocals at ~second 3 — drove the highest replays & saves.
            Every ad shipped in 3 variants per track to test structure & timing before scaling spend.
          </p>
          <p className="text-neutral-600 mt-3 italic">
            Insight: real optimization happens in the edit, not the ad manager.
          </p>
        </div>
      </section>

      {/* === EXECUTION & ADS (Opportunity Map + Launch + Hooks + Ads + Retargeting + Watermark + Pivot) === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Opportunity Map — Testing, learning, building upward
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Execution highlights
        </h2>

        <div className="not-prose mb-8">
          <img
            src={`${baseUrl}ep-sec-execution.png`}       {/* <-- immagine sezione */}
            alt="Execution map"
            className="w-full h-64 md:h-80 object-cover rounded-2xl ring-1 ring-neutral-200"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Launch */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Launch — Building rhythm through fragments</h3>
            <p className="text-neutral-700">
              1 reel/day for 3 days across 3 accounts, each revealing a fragment of NXV — teaching algorithm & audience the project’s identity.
            </p>
            <p className="text-neutral-600 mt-3 italic">
              Insight: repetition with slight variation feels like progress, not fatigue.
            </p>
          </div>

          {/* Lyric hooks */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Lyric hook testing</h3>
            <p className="text-neutral-700">
              Natural intros with vocals around second 3 performed best for replays & saves.
            </p>
            <p className="text-neutral-600 mt-3 italic">
              Insight: the strongest hook feels spontaneous.
            </p>
          </div>

          {/* Trend-fit micro ads */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Trend-fit micro ads</h3>
            <p className="text-neutral-700">
              Native-looking ads aligned to platform rhythm outperformed prior self-run campaigns; reached ~€0.42 CPC with high saves.
            </p>
            <p className="text-neutral-600 mt-3 italic">
              Insight: the best ads don’t look like ads.
            </p>
          </div>

          {/* Retargeting waves */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Retargeting waves</h3>
            <p className="text-neutral-700">
              Reused the same lyric/message with new framing to reinforce recall and lower CPMs on engaged audiences.
            </p>
            <p className="text-neutral-600 mt-3 italic">
              Insight: reinforcement beats novelty for memory.
            </p>
          </div>

          {/* Visual watermark */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Visual watermark — faces as assets</h3>
            <p className="text-neutral-700">
              Ensured faces remained clear across edits to build recognition beyond symbols.
            </p>
            <p className="text-neutral-600 mt-3 italic">
              Insight: identity is repetition of presence.
            </p>
          </div>

          {/* Missed pivot */}
          <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">The missed pivot — timing vs. budget</h3>
            <p className="text-neutral-700">
              The planned piano version for retargeting slipped by a month due to budget; the organic energy had cooled.
            </p>
            <p className="text-neutral-600 mt-3 italic">
              Insight: momentum is emotional capital — once lost, it costs double to reignite.
            </p>
          </div>
        </div>
      </section>

      {/* === LEARNINGS === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Learnings — Growth beyond the release</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Structure in chaos, story over scale
        </h2>

        <div className="not-prose mb-8">
          <img
            src={`${baseUrl}ep-sec-learnings.png`}       {/* <-- immagine sezione */}
            alt="What I learned"
            className="w-full h-64 md:h-80 object-cover rounded-2xl ring-1 ring-neutral-200"
          />
        </div>

        <ol className="list-decimal pl-6 space-y-4 text-lg leading-relaxed text-neutral-700">
          <li>
            <strong>Structure beats scale.</strong> Hooks at second two, reveals at second three, change every four seconds.
            <span className="block text-neutral-600 italic">Insight: discipline creates emotion.</span>
          </li>
          <li>
            <strong>Fit over invention.</strong> Adapt what works culturally to fit identity and budget.
            <span className="block text-neutral-600 italic">Insight: bend existing shapes until they fit your story.</span>
          </li>
          <li>
            <strong>Momentum is currency.</strong> Timing is as strategic as spend.
            <span className="block text-neutral-600 italic">Insight: once heat fades, you need new fuel.</span>
          </li>
          <li>
            <strong>Collaboration through clarity.</strong> Lead by translating vision, not controlling execution.
            <span className="block text-neutral-600 italic">Insight: the clearer the vision, the freer the team.</span>
          </li>
          <li>
            <strong>Strategy as storytelling.</strong> Treat the plan as a sequence of reveals.
            <span className="block text-neutral-600 italic">Insight: a campaign is a story unfolding in public.</span>
          </li>
          <li>
            <strong>Pride in progress.</strong> Not viral — but a system and a set of creative laws for future launches.
            <span className="block text-neutral-600 italic">Final insight: growth happens through the campaign, not after.</span>
          </li>
        </ol>
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
