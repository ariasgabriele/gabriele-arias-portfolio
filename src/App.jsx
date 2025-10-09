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
          src={`${baseUrl}ep-hero-patto.png`}
          alt="Patto di Sangue — campaign hero"
          className="w-full h-auto rounded-3xl shadow-lg"
        />
      </div>

      {/* === GETTING STARTED === */}
      <section className="mt-24">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Getting Started
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          My first launch as a marketer
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            This was my first official music launch as a marketer. Dia8lo reached out to me to support
            the release of his debut EP <em>Patto di Sangue</em>, featuring Ardè — a project that aimed
            to stand out in the trap scene while symbolizing a new beginning for both artists.
          </p>
          <p>
            With a small budget, I assembled a lean team of university students in graphic design,
            photography, and videography. My role was to lead them under one coherent vision — ensuring
            professional execution with limited resources while keeping the story authentic and grounded
            in who the artists really were.
          </p>
          <p>
            From the start, the goal was clear: not to chase virality, but to build something meaningful
            enough to grow from — a foundation for future releases, retargeting, and community.
          </p>
        </div>
      </section>

      {/* === CONTEXT === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Context
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          The first chapter of a journey upward
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            <em>Patto di Sangue</em> wasn’t just another trap release. It told the story of two young artists
            walking together through darkness toward light, using sound and symbolism to represent growth,
            loyalty, and transformation.
          </p>
          <p>
            The EP blended melodic trap with different beats and atmospheres — intentionally chaotic at first
            listen, but united by a single emotional thread. My challenge was to make that duality work:
            turning musical diversity into a visually coherent narrative that felt like one story told in
            multiple voices.
          </p>
          <p>
            The main video embodied that message — filmed in an abandoned villa, following the artists as they
            climbed upward through decay. It became the project’s visual metaphor: you rise by walking through
            your own ruins.
          </p>
        </div>
      </section>

      {/* === THE CHALLENGE === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          The challenge
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Coherence in chaos
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            Balancing artistic experimentation with structured storytelling was the core challenge.
            There was no established fanbase to guide decisions, no large team, and no room for wasted effort.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create a system that could turn a chaotic mix of songs into one cohesive narrative.</li>
            <li>
              Keep multiple collaborators aligned: two artists, a producer, a graphic designer, two videomakers,
              and a 3D editor.
            </li>
            <li>Manage constant budget shifts that forced me to rewrite plans weekly.</li>
            <li>
              Write and co-direct music videos myself to maintain coherence and quality despite constraints.
            </li>
          </ul>
          <p>
            The campaign had to look intentional, not improvised — a professional debut that felt alive,
            personal, and symbolic.
          </p>
        </div>
      </section>

      {/* === COMPETITOR & BRAND ANALYSIS === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Competitor &amp; Brand Analysis
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Finding direction before execution
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-neutral-700">
          <div>
            <p className="mb-3">
              Before producing anything, I slowed down to analyze. I needed clarity before movement. The logic:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Understand what the artists wanted to communicate.</li>
              <li>Decode how similar acts positioned themselves.</li>
              <li>Identify repeatable short-form patterns.</li>
              <li>Build a flexible, testable brand system.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Understanding the artists</h4>
            <p>
              Through long conversations, I unpacked the core message: this wasn’t an EP about fame or affirmation —
              it was about the act of walking upward together. To express that symbolically, I built a moodboard
              rooted in dark, cinematic visuals: blood for the pact, masks for identity, and light as the goal.
            </p>
            <p className="mt-2 italic">
              Insight: Even when sound changes track to track, symbolic coherence gives audiences a sense of unity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Mapping the fanbase</h4>
            <p>
              The fanbase was small but vocal. I reached out directly to their most active listeners and then expanded
              the sample by studying similar trap acts and communities.
            </p>
            <p className="mt-2 italic">
              Insight: Tiny fanbases don’t define demographics — they reveal the emotional language to build from.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Benchmarking the scene</h4>
            <p>
              I analyzed relevant releases to understand what actually drove visibility. A surprising finding:
              organic content from big names often underperformed — their power came from budget, not storytelling.
            </p>
            <p className="mt-2 italic">
              Insight: Small acts can stand out by using strategy where others use scale.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Trend logging &amp; pattern hunting</h4>
            <p>
              I built a Google Sheet trend library, saving TikTok/Instagram formats — lyric cuts, POVs, camera moves,
              hook placements. Rather than reinventing, I repurposed proven structures to fit the artists’ voice.
            </p>
            <p className="mt-2 italic">
              Insight: Innovation is alignment. The smartest move is fitting culture to identity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">From analysis to brand direction</h4>
            <p>
              The research led to one conclusion: the EP should look like a cinematic pact — dark but hopeful, chaotic
              but rising. Blood and light became symbols; lyrics and visual rhythm became tools. From there, every
              content piece — from the cover to the ad creatives — spoke the same language.
            </p>
            <p className="mt-2 italic">
              Insight: Analysis has value only when it transforms into story — not reports, but rhythm.
            </p>
          </div>
        </div>
      </section>

      {/* === BRANDING === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Branding
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Walking together towards the light
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            The branding turned the EP’s metaphor into a visible system. Symbols: blood as union, masks as identity
            in motion, light as the destination. Palette: deep reds fading into pale light. Typography: minimal and
            sharp. Visual rhythm: tension and direction — the sensation of climbing.
          </p>
          <p>
            Working with a graphic design student, I directed execution to maintain cohesion across outputs. Even with
            limited means, the brand looked deliberate — professional yet emotional, ambitious but grounded.
          </p>
          <p className="italic">
            Insight: Consistency doesn’t come from budget; it comes from belief.
          </p>
        </div>
      </section>

      {/* === STRATEGY === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Strategy
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Designing a symbolic launch under real constraints
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-neutral-700">
          <p>
            The strategy’s purpose wasn’t to make noise — it was to build momentum that could grow over time. Awareness
            first, but pointed toward follower conversion, future retargeting, and recognition. The EP was sonically
            diverse but thematically coherent; the campaign mirrored that duality: start in mystery, rise through
            repetition, end in light.
          </p>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Platform logic</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>TikTok as the core testing ground for authentic performance and lyric hooks.</li>
              <li>Instagram as curated identity; in hindsight, a unified approach would have been stronger.</li>
              <li>YouTube Shorts briefly tested; low efficiency at this scale.</li>
            </ul>
            <p className="mt-2 italic">
              Insight: With limited resources, focus with depth beats spread with hope.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Funnel architecture</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pre-launch: two short teasers → 3-day build-up (EP announcement → single → snippets).</li>
              <li>Launch: one reel/day for three days across three accounts, revealing fragments of the lead track.</li>
              <li>Engagement: carousels & reminders for recognition.</li>
              <li>Conversion: Meta Ads with in-reel CTAs (“save”, “listen”).</li>
              <li>Post-launch: planned piano version for emotional retargeting (later delayed).</li>
            </ul>
            <p className="mt-2 italic">
              Insight: Frequency builds memory, but rhythm builds connection.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Creative choices</h4>
            <p>
              I isolated resonant lyric lines and cut multiple 10–15s variations, changing pacing and framing only.
              The natural take — casual intro with singing around second three — consistently drove the highest replays
              and saves. Every ad shipped in three variants per track to test structure and timing.
            </p>
            <p className="mt-2 italic">
              Insight: Real optimization happens in the edit, not the ad manager.
            </p>
          </div>
        </div>
      </section>

      {/* === OPPORTUNITY / TACTICS === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Opportunity Map
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Testing, learning, and building upward
        </h2>

        <div className="space-y-8 text-lg leading-relaxed text-neutral-700">
          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Launch — building rhythm through fragments</h4>
            <p>
              One reel per day for three days across the artists’ accounts, each revealing a fragment of the lead
              track. This taught the algorithm the project’s visual and sonic identity.
            </p>
            <p className="mt-2 italic">
              Insight: Repetition with slight variation feels like progress, not fatigue.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Lyric hook testing — finding the trigger</h4>
            <p>
              Multiple 10–15s cuts with different pacing/framing. The natural take (voice in at ~3s) delivered the
              best replays and saves.
            </p>
            <p className="mt-2 italic">
              Insight: The strongest hook feels spontaneous.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Trend-fit micro ads — borrowing rhythm</h4>
            <p>
              Native-looking TikTok-style ads outperformed previous efforts and industry averages, reaching ~€0.42 CPC
              with high save ratio by matching platform rhythm.
            </p>
            <p className="mt-2 italic">
              Insight: The best ads don’t look like ads.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Retargeting waves — from glance to gravity</h4>
            <p>
              Follow-up posts targeted engagers; same lyric/message, new framing. Even with limited budget, this loop
              improved engagement and lowered CPMs.
            </p>
            <p className="mt-2 italic">
              Insight: Retargeting is reinforcement, not novelty.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Visual watermark — making faces memorable</h4>
            <p>
              Regardless of color or mood shifts, the artists’ faces stayed visible in every edit to grow recognition
              beyond symbols.
            </p>
            <p className="mt-2 italic">
              Insight: Identity is built through repetition of presence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">The missed pivot — when opportunity meets limitation</h4>
            <p>
              The planned piano-version retargeting was delayed by a month due to budget cuts; by then, organic energy
              had cooled.
            </p>
            <p className="mt-2 italic">
              Insight: Momentum is emotional capital — once lost, it’s costly to reignite.
            </p>
          </div>
        </div>
      </section>

      {/* === LEARNINGS === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          Learnings
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Growth beyond the release
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-neutral-700">
          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">1. Structure beats scale</h4>
            <p>
              Clarity replaced quantity: hooks ~2s, reveal ~3s, change every ~4s. Simple, repeatable laws.
            </p>
            <p className="mt-2 italic">
              Insight: Discipline creates emotion — structure gives art direction.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">2. Fit over invention</h4>
            <p>
              Smart innovation is adaptation. By reshaping what already worked culturally, we made it feel new without
              extra budget.
            </p>
            <p className="mt-2 italic">
              Insight: You don’t need new shapes — bend existing ones to fit your story.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">3. Momentum is currency</h4>
            <p>
              Energy fades faster than money. The delay in retargeting proved timing is as strategic as budget.
            </p>
            <p className="mt-2 italic">
              Insight: Momentum is like heat — once lost, it costs double to reignite.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">4. Collaboration through clarity</h4>
            <p>
              Leading students and freelancers taught me to direct by translation, not control. Clear direction enabled
              real creative freedom.
            </p>
            <p className="mt-2 italic">
              Insight: The clearer the vision, the more creative others can be inside it.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">5. Strategy as storytelling</h4>
            <p>
              I now treat strategy as sequenced storytelling — choosing what to reveal, when, and how.
            </p>
            <p className="mt-2 italic">
              Insight: A campaign isn’t launched; it unfolds in public.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">6. Pride in progress</h4>
            <p>
              The project wasn’t viral, but it built a system: a brand, a process, and creative laws I now use for
              every artist launch.
            </p>
            <p className="mt-2 italic">
              Final insight: Growth happens through the campaign — every test, cut, and compromise is part of the walk
              upward.
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
