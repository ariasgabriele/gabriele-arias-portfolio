// ===== IMPORTS (una sola volta, in cima) =====
import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ===== Scroll to top on route change =====
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

/* ---- Utility: Container ---- */
function Container({ children }) {
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}

/* ---- Nav ---- */
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
            <Link to="/" className="hover:opacity-70">
              Gabriele Arias
            </Link>
            <Link to="/cases" className="hover:opacity-70">
              Case Studies
            </Link>
          </nav>

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

/* ---- Hero ---- */
function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] },
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

/* ---- What I do ---- */
function WhatIDo() {
  return (
    <section className="relative bg-black text-white rounded-t-3xl -mt-4">
      <Container>
        <div className="pt-10 md:pt-14 pb-14">
          <div className="text-xs uppercase tracking-wider text-white/60">Overview</div>
          <h2 className="text-2xl md:text-3xl font-bold mt-1 text-white">What I do</h2>
          <p className="mt-4 text-white/80 leading-relaxed max-w-3xl">
            I combine social-first content with an analysis-driven strategy. From memes and reels to audience research and testing, I connect content, creators, and communities to deliver measurable results — community growth, qualified leads, and purchase intent. I’ve managed end-to-end projects in e-commerce, travel, and music, balancing speed with data-driven decisions. I’m constantly experimenting with new AI workflows to boost ideation, editing, and distribution.
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

/* ---- Case Index ---- */
function CaseIndex() {
  return (
    <Container>
      <div className="py-12 space-y-8">
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

/* ---- Case Layout ---- */
function CaseLayout({ title, eyebrow, children }) {
  const navigate = useNavigate();
  return (
    <main>
      <section className="bg-black text-white">
        <Container>
          <div className="py-12">
            <div className="text-xs uppercase tracking-wider text-white/60">{eyebrow}</div>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">{title}</h1>
            <button onClick={() => navigate(-1)} className="mt-6 text-sm underline">
              ← Back
            </button>
          </div>
        </Container>
      </section>
      <Container>
        <div className="py-12 prose prose-neutral max-w-none">{children}</div>
      </Container>
    </main>
  );
}

/* ---- Case pages ---- */
function CasePOD() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return (
    <CaseLayout
      eyebrow="POD / UGC"
      title="Shop di Coppia — Turning Meme Culture into Commerce"
    >
      

      {/* Intro meta */}
      <div className="not-prose grid gap-3 sm:grid-cols-3 mb-12">
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Role</div>
          <div className="font-medium mt-1">
            Creative Director · Digital Marketer · Content Strategist
          </div>
        </div>
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Timeline</div>
          <div className="font-medium mt-1">2023 – 2025</div>
        </div>
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Stacks</div>
          <div className="font-medium mt-1">TikTok · Instagram · Shopify · Manychat · Adobe AI · Canva · Capcut </div>
        </div>
      </div>
      
{/* Visual #1 */}
      <div className="not-prose mb-10">
        <img
          src={`${baseUrl}pod-memes-phones.png`}
          alt="Mobile mockups — Shop di Coppia"
          className="w-full h-auto rounded-3xl"
        />
      </div>
      
      {/* 1. Overview */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          1. Overview
        </h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900">
          From Meme Page to Emotion Driven Brand
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            Shop di Coppia started as a experiment: a meme page about relationships that
            unexpectedly grew into a 30,000 follower community across TikTok and Instagram.
          </p>
          <p>
            What began as Meme di Coppia, a Gen Z humor page testing TikTok, evolved into
            Shop di Coppia, an emotional shop for couples. The goal was simple but ambitious:
            to prove that cultural relevance and humor could convert into sales without relying
            on paid ads.
          </p>
          <p><em>What if a meme page could become a love brand?</em></p>
        </div>
      </section>

      {/* 2. Objective & Role */}
      <section className="mt-24">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          2. Objective &amp; Role
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-neutral-900">
          Building Proof of Concept
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr,0.9fr] items-start">
          <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
            <p>
              The project began as a creative proof of concept, testing if a highly engaged meme
              audience could be monetized through an authentic product line.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Creative Direction</strong> – defining tone, colors, and emotional identity</li>
              <li><strong>Content Strategy</strong> – transforming viral humor into product storytelling</li>
              <li><strong>E-commerce Setup</strong> – launching a Shopify store and basic automation</li>
              <li><strong>Community Management</strong> – maintaining engagement and interaction</li>
              <li><strong>Performance Tracking</strong> – testing what formats led to sales</li>
            </ul>
            <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
              <div className="text-xs uppercase tracking-wider text-neutral-500">Goal</div>
              <p className="mt-1">
                Validate whether organic social storytelling could drive measurable e-commerce revenue with zero ad spend.
              </p>
            </div>
          </div>
          <figure className="not-prose">
            <img
              src={`${baseUrl}social-memedicoppia.png`}
              alt="Social growth — Meme di Coppia"
              className="w-full h-auto rounded-2xl"
            />
            <figcaption className="mt-2 text-sm text-neutral-500">
              “From test account to 30K followers in under a year.”
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 3. Strategy */}
      <section className="mt-24">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          3. Strategy
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-neutral-900">
          From Virality to Emotional Commerce
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Audience</h4>
            <p className="text-neutral-700">
              Couples aged 25–40, Italian, emotionally expressive. They enjoyed relatable humor
              but responded most to authentic, sentimental storytelling.
            </p>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Tone of Voice</h4>
            <p className="text-neutral-700">
              Warm, ironic, and honest. Content shifted from random couple memes to emotionally
              driven humor, building empathy while maintaining shareability.
            </p>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Content Funnel</h4>
            <ul className="text-neutral-700 space-y-2">
              <li><strong>Top</strong> — Reels/TikToks with meme-style humor</li>
              <li>
                <strong>Mid/Bottom</strong> — emotionally charged couple reels with the most liked
                characters → endings around mugs and gifts tied to those characters
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Creative Execution */}
      <section className="mt-24">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          4. Creative Execution
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-neutral-900">
          Giving the Brand a Heart
        </h2>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-neutral-700">
          <p>
            To unify the content and products, I used a set of mascots. Their dynamic became the visual and emotional core of the brand, featured
            across Reels and physical products like mugs and books.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
              <h4 className="font-semibold text-neutral-900 mb-2">Visual Direction</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Palette: pinks, creams, and pastels</li>
                <li>Typography: rounded, minimal, modern</li>
                <li>Aesthetic: clean meme format, white space, warm filters</li>
              </ul>
            </div>
            <figure className="not-prose">
              <img
                src={`${baseUrl}artwork-bubududu.svg`}
                alt="Bubu & Dudu artwork"
                className="w-full h-auto rounded-2xl"
              />
            </figure>
          </div>

          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Content System</h4>
            <p>
              All content was video based (Reels/TikToks). Each video told a mini story using humor and relatable
              couple scenarios, often ending with the characters or products as emotional anchors. The goal: make
              people see themselves in the mascots, and then buy a piece of that feeling.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Performance */}
      <section className="mt-24">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          5. Performance
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-neutral-900">
          What Virality Converted Into
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Follower growth:</strong> 0 → 30K</li>
              <li><strong>Top video:</strong> 6M views</li>
              <li><strong>Avg Reel views:</strong> 50–500k</li>
            </ul>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Conversion rate (sale):</strong> ~10%</li>
              <li><strong>Main product:</strong> mugs </li>
              <li><strong>Revenue source:</strong> ~95% organic via IG</li>
            </ul>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <p className="text-neutral-700">
              Most customers were first time buyers, but the campaign validated the potential of emotional
              storytelling commerce, showing that relatability could directly drive conversions.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Impact & Learnings */}
      <section className="mt-24">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          6. Impact &amp; Learnings
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-neutral-900">
          Beyond the Experiment
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li><strong>Emotion scales better than jokes.</strong> Humor drives virality; emotion drives trust and purchase intent.</li>
              <li><strong>Characters humanize the brand.</strong> Mascots created identification and recall.</li>
              <li><strong>Organic communities can sell.</strong> A meme page can generate meaningful revenue with zero ads.</li>
              <li><strong>Creative testing matters.</strong> Each post acted as a live A/B test on sentiment and conversion.</li>
            </ul>
          </div>
          <figure className="not-prose">
            <img
              src={`${baseUrl}proof-memedicoppia.png`}
              alt="Proof of performance — Meme di Coppia"
              className="w-full h-auto rounded-2xl"
            />
          </figure>
        </div>

        <p className="mt-6 text-lg leading-relaxed text-neutral-700">
          It wasn’t a marketing campaign — it was a cultural experiment that turned feelings into sales.
        </p>
      </section>

      {/* 7. Next Steps */}
      <section className="mt-24">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          7. Next Steps
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-neutral-900">
          A Creative Lab, Not an Endpoint
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            Shop di Coppia fulfilled its purpose as a creative lab. It proved the viability of meme-driven
            commerce and taught me how emotional design, storytelling, and organic content could move
            audiences to action.
          </p>
          <p>
            While the brand may pause here, the insights it generated about relatability, tone, and
            conversion through narrative - now influence every e-commerce and creative project I work on.
          </p>
          <p className="mt-2">
            🧠 <strong>Final Insight:</strong> Community is the best marketing channel. The stronger the bond,
            the lower the cost of conversion.
          </p>
        </div>
      </section>
    </CaseLayout>
  );
}

function CaseAmongLocals() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return (
    <CaseLayout
      eyebrow="Travel · Community"
      title="Among Locals — Building Trust for Experiential Travel"
    >
      {/* Meta */}
      <div className="not-prose grid gap-3 sm:grid-cols-4 mb-10">
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Role</div>
          <div className="font-medium mt-1">Freelance Digital Marketer</div>
        </div>
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Timeline</div>
          <div className="font-medium mt-1">may 2024 – May 2025</div>
        </div>
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Market</div>
          <div className="font-medium mt-1">UK</div>
        </div>
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Stack</div>
          <div className="font-medium mt-1">Meta Ads · Wix · Canva · Figma · Adobe PS/AI</div>
        </div>
      </div>

      {/* Visual #1 */}
      <div className="not-prose mb-12">
        <img
          src={`${baseUrl}hero-group-amonglocals.png`}
          alt="Among Locals — small-group cultural travel"
          className="w-full h-auto rounded-3xl"
        />
      </div>

      {/* 1. Overview */}
      <section className="mt-16">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">1. Overview</h3>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-neutral-900">
          A Brand for Authentic Connections
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            Among Locals is a boutique travel agency curating small group cultural trips led by locals.
            Each journey focuses on human connection, not tourism, a way to meet real people and traditions
            rather than tick destinations off a list.
          </p>
          <p>
            In 2025, the brand aimed to validate demand from UK travellers for Sardinia’s hidden festivals
            and launch its first two offers — <em>Sea Festival</em> and <em>Regnos Altos</em>. With a two-person
            team, a lean budget, and limited operational readiness, the challenge was to make the first campaigns count.
          </p>
          <p className="italic">“Travel like a local, not a tourist.” became the guiding principle across copy, design, and tone.</p>
        </div>
      </section>

      {/* 2. Objective & Role */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">2. Objective &amp; Role</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          From Zero Brand to Qualified Leads
        </h2>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
            <p>
              My mission was to build the brand and generate the first qualified leads for experiential group trips, from
              identity to funnel execution.
            </p>
            <div className="rounded-2xl ring-1 ring-neutral-200 p-5">
              <h4 className="font-semibold text-neutral-900 mb-2">Core Responsibilities</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Designed full brand identity (palette, logo, tone of voice, visual system).</li>
                <li>Built the website on Wix; optimised basic SEO for branded searches.</li>
                <li>Managed and optimised Meta Ads for lead generation.</li>
                <li>Designed the funnel: Meta lead form → auto-message → WhatsApp follow-up → sales call.</li>
                <li>Wrote all copy (ads, site, emails).</li>
              </ul>
            </div>
          </div>

          {/* Visual #2 */}
          <figure className="not-prose">
            <img
              src={`${baseUrl}branding-amonglocals.png`}
              alt="Among Locals — branding system"
              className="w-full h-auto rounded-3xl"
            />
          </figure>
        </div>
      </section>

      {/* 3. Market Challenge */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">3. Market Challenge</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          High Consideration, Low Trust
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            Launching a new travel brand with limited social proof meant starting from a trust deficit. Unlike low ticket
            products, travel bookings require strong reassurance like: credibility, clear pricing, and visible proof of safety.
          </p>
          <p>
           Additional operational hurdles included delayed insurance approval and late confirmation of the festival dates caused by administrative delays from the local town hall in Sardinia.
          </p>
          <p className="font-medium"> <strong>🧠Insight</strong>: When a product demands trust, communication must deliver it before conversion even begins.</p>
        </div>
      </section>

      {/* 4. Strategy */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">4. Strategy</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          Educate First, Convert Later
        </h2>

        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {/* Tone & Positioning */}
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Tone &amp; Positioning</h4>
            <p className="text-neutral-700">
              Emotional and educational — blending curiosity and reliability. Visuals used neutral earthy tones, authentic
              human photos, and typography evoking calm exploration.
            </p>
          </div>

          {/* Targeting */}
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Targeting Approach</h4>
            <ul className="list-disc pl-6 space-y-1 text-neutral-700">
              <li>Started narrow (1–2M) → expanded to ~10M after learning phase.</li>
              <li>Avoided broad to retain relevance for a cold account.</li>
            </ul>
          </div>

          {/* Creative testing */}
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-3">Creative Testing</h4>
            <div className="text-sm">
              <div className="grid grid-cols-3 gap-2 font-medium text-neutral-600">
                <div>Variant</div><div>Change</div><div>Observed Impact</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="font-medium">V1</div>
                <div>Info-dense carousel + form too specific</div>
                <div>High education · CPL £18.67</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="font-medium">V2</div>
                <div>Simplified CTA · vibrant colors · clear price</div>
                <div>CPL ↓ to £13.50 · ≥1 lead/day</div>
              </div>
            </div>
            <p className="mt-3 text-neutral-700">
              Best performers mirrored top UK travel ads: bright imagery, concise benefits, curiosity CTAs
              (“Discover authentic Sardinia beyond the resorts”).
            </p>
          </div>
        </div>
      </section>

      {/* 6. Performance */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">6. Performance</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          Data That Validated the Concept
        </h2>

        <div className="mt-6 not-prose grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Period</div>
            <div className="text-xl font-bold mt-1">1 Apr – 1 May 2025</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Qualified Leads</div>
            <div className="text-xl font-bold mt-1">40</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Avg. CPL</div>
            <div className="text-xl font-bold mt-1">£14.76</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">CTR</div>
            <div className="text-xl font-bold mt-1">1.35%</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Click → Lead</div>
            <div className="text-xl font-bold mt-1">17.6%</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Sales Calls</div>
            <div className="text-xl font-bold mt-1"> 5</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Bookings</div>
            <div className="text-xl font-bold mt-1">0</div>
            <div className="text-xs text-neutral-500 mt-1">insurance delays · pricing freeze</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Prospect Feedback</div>
            <div className="text-sm font-medium mt-1 text-neutral-800">
              3 requested future dates → brand resonance
            </div>
          </div>
        </div>

        <p className="mt-6 text-neutral-800">
          Insight: Authentic messaging can attract high-intent audiences even without trust assets or heavy budgets.
        </p>
      </section>

      {/* 7. Diagnosis */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">7. Diagnosis</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          Why Conversion Stalled
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Insurance liability delayed official pricing → trust drop post-lead.</li>
            <li>Low brand footprint (no UGC, press, reviews).</li>
          </ul>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Double travel date limited flexibility for interested leads.</li>
            <li>Infrequent trip schedule blocked retargeting & nurturing continuity.</li>
          </ul>
        </div>
      </section>

      {/* 8. Learnings & Next Steps */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">8. Learnings &amp; Strategic Next Steps</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          Trust and Consistency Before Sales
        </h2>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Key Learnings</h4>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li>Emotional storytelling builds interest; trust closes sales.</li>
              <li>Clear pricing and dates reduce friction.</li>
            </ul>
          </div>

          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Recommended Next Steps</h4>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li><strong>Trust Engine:</strong> build a social community based on travelling among locals.</li>
              <li><strong>Always-On Funnel:</strong> run awareness & engagement ads year-round.</li>
              <li><strong>Search Intent:</strong> expand into Google Ads + SEO with a travel blog.</li>
              <li><strong>Community Validation:</strong> poll users on dates/activities to guide roadmap.</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 font-medium text-neutral-800">
          🧠 Final Insight: For experiential brands, it’s essential to build a community before aiming for sales.
        </p>
      </section>
    </CaseLayout>
  );
}

function CaseZampapazza() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return (
    <CaseLayout
      eyebrow="Pet brand · DTC"
      title="🐾 Zampapazza — Turning Pet Love into Emotion-Driven Commerce"
    >
      {/* Intro meta */}
      <div className="not-prose grid gap-3 sm:grid-cols-3 mb-10">
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Role</div>
          <div className="font-medium mt-1">Founder · Digital Marketing Executive</div>
        </div>
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Timeline</div>
          <div className="font-medium mt-1">2025</div>
        </div>
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Stacks</div>
          <div className="font-medium mt-1">Meta ads · Instagram · Shopify · Canva · Sora · Meta ads library · Adobe PS</div>
        </div>
      </div>

      {/* Visual #1 */}
      <div className="not-prose mb-12">
        <img
          src={`${baseUrl}zampapazza-fountain.png`}
          alt="Zampapazza — product visual"
          className="w-full h-auto rounded-3xl"
        />
      </div>

      {/* 1. Overview */}
      <section className="mt-16">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          1. Overview
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-neutral-900">
          From Idea to Emotion-Driven Brand
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            Zampapazza was born as an experiment: I wanted to reproduce what I did for
            Memedicoppia, testing how fast I could grow following the same type of content and
            then convert via print on demand.
          </p>
          <p>
            What started as an experiment quickly evolved beyond novelty. It became a laboratory for emotional
            marketing, where empathy, copywriting, and community-building met measurable performance.
          </p>
          <p>
            The goal wasn’t just to sell pet products; it was to test how storytelling could
            create trust and conversions in a competitive market.
          </p>
        </div>
      </section>

      {/* 2. Objective & Role */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          2. Objective &amp; Role
        </h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          Building a Proof of Empathy
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
            <p>
              The project’s goal was to validate the case study of Memedicoppia and to see
              whether emotional storytelling and relatable humour could outperform functional
              messaging in the pet e-commerce niche.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Brand Strategy</strong> — defining tone, archetype, and emotional positioning</li>
              <li><strong>Creative Direction</strong> — art direction and content guidelines</li>
              <li><strong>Copywriting</strong> — long form storytelling ads written in the first person</li>
              <li><strong>Performance Marketing</strong> — building, testing, and optimising Meta campaigns</li>
            </ul>
            <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
              <div className="text-xs uppercase tracking-wider text-neutral-500">Objectives</div>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Grow an Instagram page to 10k followers.</li>
                <li>
                  Transform a fun, relatable pet brand into a high-conversion DTC model using deeper
                  persona analysis and leveraging their desires via ads.
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
            <p className="italic">
              “Validate emotion over specs. Prove that the right story moves people to action.”
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Challenge */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          3. The Challenge
        </h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          Standing Out in a Saturated Pet Market
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            The pet niche is one of the most competitive in e-commerce. Between online shops, Amazon
            listings, and viral gadgets, brands fight for attention, often using the same recycled
            product videos and salesy language.
          </p>
          <p>
            Zampapazza needed to prove that a validated product could be sold using different angles,
            based on the desires of the personas. Rather than emphasising “filters”, “materials”, ecc..., the focus was on the human fear of doing too little for their pet, the
            emotional pain point behind every purchase.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl ring-1 ring-neutral-200 p-5">
              <div className="text-sm font-semibold text-neutral-900 mb-1">🧩 Key Challenge</div>
              <p>Competing with bigger dropshippers by making customers feel, instead of just showing off the product.</p>
            </div>
            <div className="rounded-2xl ring-1 ring-neutral-200 p-5">
              <div className="text-sm font-semibold text-neutral-900 mb-1">🧠 Insight</div>
              <p>When everyone shouts features, whispering emotion cuts deeper.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategy */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          4. Strategy
        </h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          From Empathy to Conversion
        </h2>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-neutral-700">
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">1) Micro Competitor Audience Research</h4>
            <p>
              Find 20 public discussion forum posts (e.g. Reddit) from people in the competitor’s
              dominant customer demographic, where they talk in detail about the emotional pain,
              frustration, fear, or anxiety caused by the underlying problem that our product solves.
              Identify keywords, patterns, and emotional states.
            </p>
          </div>

          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">2) Emotional Positioning</h4>
            <p>
              Identify distinct desires this product fulfils and create a customer avatar for each.
              Decide on a coherent tone of voice “the pet lover who understands you perfectly.”
            </p>
          </div>

          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">3) Copywriting Framework</h4>
            <p>
              Each ad used the <strong>PAIN–DESIRE–RELIEF</strong> model, written in language that felt authentic to the target audience.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Pain: “I never realised how little Felix drank…”</li>
              <li>Desire: “…I just wanted to make sure he was okay.”</li>
              <li>Relief: “That’s when I found this fountain…”</li>
            </ul>
          </div>

          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <p className="font-medium">
              People don’t buy pet products, they buy reassurance that they’re doing right by those they love.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Creative Execution */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          5. Creative Execution
        </h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          Native Ads, Real Emotion
        </h2>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-neutral-700">
          <p>
            Unlike the usual edited videos common in pet marketing, Zampapazza’s best-performing
            creatives were static images paired with long copy, formatted to feel like authentic
            Facebook posts.
          </p>

          {/* Visual #4 */}
          <figure className="not-prose">
            <img
              src={`${baseUrl}advertise-zampapazza.png`}
              alt="Zampapazza — native ad example"
              className="w-full h-auto rounded-3xl"
            />
          </figure>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
              <h4 className="font-semibold text-neutral-900 mb-2">Creative System</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Format: static images that looked native inside feeds</li>
                <li>Ad Style: mass desire narrative posts, written naturally like the audience would</li>
                <li>Design: warm, natural photos (cats, bowls, water), simple layouts</li>
              </ul>
            </div>
            <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
              <p>
                These ads were supported by community oriented Reels to grow followers organically, each
                Reel sharing small, funny stories about pets.
              </p>
            
            </div>
          </div>
        </div>
      </section>

      {/* 6. Performance */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          6. Performance
        </h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          Turning Emotion into Sales
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Daily budget:</strong> ~€40</li>
              <li><strong>Audience:</strong> cold</li>
              <li><strong>Creative type:</strong> static long-copy ads</li>
            </ul>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <ul className="space-y-2 text-neutral-700">
              <li><strong>Sales:</strong> 3 in 4 days</li>
              <li><strong>ROAS:</strong> 1.5x</li>
              <li><strong>Retargeting:</strong> none</li>
            </ul>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
            <p className="text-neutral-700">
              Even with a modest €160 test budget, the campaign generated three direct sales in four days, all from cold audiences. Although small in volume, the test validated the
              goal: Emotional storytelling drives cold sales.
            </p>
          </div>
        </div>

        
      </section>

      {/* 7. Impact & Learnings */}
      <section className="mt-20">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">
          7. Impact &amp; Learnings
        </h3>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-900">
          Beyond the Fountain
        </h2>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-neutral-700">
          <p>
            Zampapazza became more than a brand, it became a template for emotional DTC storytelling.
            It proved that audiences in saturated niches still respond to humanity, and that the smallest
            budgets can yield meaningful learnings when structure and insight are strong. With a bigger
            budget, I would have tested other angles and images for that specific proven mass desire.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl ring-1 ring-neutral-200 p-6">
              <h4 className="font-semibold text-neutral-900 mb-2">Key Learnings</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Emotion builds trust faster than discounts.</strong></li>
                <li><strong>Long-copy storytelling isn’t dead</strong>, it needs authenticity.</li>
                <li><strong>Native design &gt; perfect design.</strong> People stop for stories, not polish.</li>
                <li><strong>Algorithms reward relatability.</strong> The content sounded like real pet owners.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </CaseLayout>
  );
}

function CaseBrandingEP() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return (
    <CaseLayout eyebrow="Music · Branding" title='Branding & Campaign for EP “Patto di Sangue”'>
       {/* Meta */}
      <div className="not-prose grid gap-3 sm:grid-cols-4 mb-10">
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Role</div>
          <div className="font-medium mt-1">Executive Digital Marketer</div>
        </div>
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Timeline</div>
          <div className="font-medium mt-1">2023-2024</div>
        </div>
        <div className="rounded-2xl ring-1 ring-neutral-200 p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">Stack</div>
          <div className="font-medium mt-1">Meta Ads · Github · Canva · Figma · Adobe PS/AI · Instagram · Tiktok · Spotify for Artist </div>
        </div>
      </div>
      {/* === HERO IMAGE === */}
      <div className="not-prose mb-16">
        <img
          src={`${baseUrl}patto-di-sangue-campaign-hero.png`}
          alt="Patto di Sangue — campaign hero"
          className="w-full h-[60vh] object-cover"
        />
      </div>

      {/* === GETTING STARTED === */}
      <section className="mt-24">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Getting Started</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          My first launch as a marketer
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            This project marked my first official music launch as a marketer. Dia8lo reached out to me
            to support the release of his debut EP <em>Patto di Sangue</em>, featuring Arde — a project born
            from ambition, friendship, and the desire to take their art seriously for the first time.
          </p>
          <p>
            With a minimal budget, I assembled a small team of university students in design, photography,
            and videography. I led the creative direction, branding, and marketing strategy, ensuring
            professional consistency with limited resources.
          </p>
          <p>
            The goal wasn’t to chase virality. It was to build a repeatable launch system, a foundation
            for testing, growth, and future retargeting.
          </p>
        </div>
      </section>

      {/* === CONTEXT === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Context</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          The first chapter of a journey upward
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            <em>Patto di Sangue</em> told the story of two artists walking together from darkness toward light,
            exploring identity, brotherhood, and rebirth through sound and symbolism.
          </p>
          <p>
            The EP blended melodic trap and introspective moods, intentionally chaotic in sound by choice.
          </p>
          <p>
            The main music video, filmed in an abandoned villa, embodied that metaphor: artists climbing upward
            through ruin, a visual representation of transformation.
          </p>
        </div>
      </section>

      {/* === THE CHALLENGE === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">The challenge</h3>
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
            <li>Keep multiple collaborators aligned: two artists, a producer, a graphic designer, two videomakers, and a 3D editor.</li>
            <li>Manage constant budget shifts that forced me to rewrite plans weekly.</li>
            <li>Write and co-direct music videos to maintain coherence and quality despite constraints.</li>
          </ul>
          <p>
            The campaign had to look intentional, not improvised, a professional debut that felt alive,
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
              Before production began, I slowed down to study. I needed to understand how to position the project,
              not just how to promote it.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Understand what the artists wanted to communicate.</li>
              <li>Decode how similar artists positioned themselves.</li>
              <li>Identify repeatable short-form content patterns.</li>
              <li>Build a flexible brand system.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Understanding the artists</h4>
            <p>
              Through long creative sessions, I helped the artists articulate their vision.
              <em> Patto di Sangue</em> wasn’t about fame or self-affirmation, it was about two voices united
              by a shared climb toward light. We built a moodboard rooted in symbolism: blood for unity,
              black &amp; white for mystery, and light for rebirth.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Mapping the fanbase</h4>
            <p>
              With only a handful of active fans, data was scarce, so I went qualitative. I reached out directly
              to early listeners, then extended research to similar artists and communities to find emotional patterns.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Benchmarking the scene</h4>
            <p>
              I studied recent releases by Slings, Jake La Furia, and Emis Killa. Their visibility often came
              from ad spend and influencer marketing rather than organic storytelling.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Trend logging &amp; patterns</h4>
            <p>
              I built a Google Sheet trend library, cataloguing 40+ TikTok and Instagram formats by pacing, rhythm,
              and structure. Instead of reinventing the wheel, I adapted proven content logics to fit the artists’
              sound and personality.
            </p>
          </div>
        </div>
      </section>

      {/* === BRANDING === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Branding</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Walking together towards the light
        </h2>

        {/* IMG sotto il titolo Branding */}
        <div className="not-prose mb-8">
          <img
            src={`${baseUrl}branding-music.png`}
            alt="Branding — visual system for the EP"
            className="hidden md:block w-full h-[60vh] object-cover"
          />
        </div>

        <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
          <p>
            The branding translated the EP’s story into a cohesive visual language. Every element expressed the
            same upward motion, a climb from chaos to clarity.
          </p>
          <p>
            <span className="block">• Symbols: blood as bond, masks as self-evolution, light as destination</span>
            <span className="block">• Palette: deep reds fading into pale light</span>
            <span className="block">• Typography: minimal, sharp, cinematic</span>
            <span className="block">• Motion: continuous ascent</span>
          </p>
          <p>
            Working with a graphic design student, I directed every asset, ensuring that the cover, lyric videos,
            and ads all felt like parts of the same cinematic world.
          </p>
        </div>
      </section>

      {/* === STRATEGY === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Strategy</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Designing a symbolic launch under real constraints
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-neutral-700">
          <p>
            The strategy mirrored the EP’s emotional arc: from mystery, to revelation, to light.
          </p>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Platform logic</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>TikTok as core testing ground for authentic performance &amp; lyric hooks.</li>
              <li>Instagram as curated identity.</li>
              <li>YouTube Shorts tested briefly; low efficiency at this scale.</li>
            </ul>
          </div>

          {/* DUE GIF affiancate subito sopra "Creative choices" */}
          <div className="hidden md:grid grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" ring-1 ring-neutral-200 bg-white">
              <img
                src={`${baseUrl}video-variation-a.gif`}
                alt="Video variation A"
                className="w-full h-[60vh] object-cover"
              />
            </div>
            <div className="ring-1 ring-neutral-200 bg-white">
              <img
                src={`${baseUrl}video-variation-b.gif`}
                alt="Video variation B"
                className="w-full h-[60vh] object-cover"
              />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Creative choices</h4>
            <p>
              For “Stasera”, we tested two main creatives, both built on the same logic of the 3-second rhythm, the storytelling rule that shaped the whole campaign.

Both videos opened with nearly identical setups: a raw, cinematic first second that established atmosphere and authenticity. The difference emerged at the third second, the key emotional trigger point:

In the first version, the singing began immediately, pulling the viewer into the sound and creating instant musical immersion.

In the second version, the story continued visually for a few more seconds, enhanced by 3D overlay messages that sustained attention and guided emotion through text.

Despite their different executions, both followed the same structural spine: clarity, rhythm, and emotional pacing.
They were also the only ads in the campaign with a full storytelling arc, and unsurprisingly, they were the top performers in terms of engagement, saves, and cost efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* === OPPORTUNITY MAP / EXECUTION === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Opportunity Map</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Testing, learning, and building upward
        </h2>

        <div className="space-y-8 text-lg leading-relaxed text-neutral-700">
          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Launch — building rhythm</h4>
            <p>
              One reel per day for three days across the artists’ accounts, each revealing a fragment of NXV.
              This gave the release a pulse: short, controlled, rhythmic.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Lyric hook testing</h4>
            <p>
              The “native content” takes consistently outperformed pure lyric edits.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Trend-fit micro ads</h4>
            <p>
              Adapting native TikTok pacing to “Stasera” produced a CPC of €0.42, outperforming both the artist’s
              past campaigns and common industry benchmarks.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Retargeting waves</h4>
            <p>
              Follow up ads reused the same lyrics but reframed the visuals, lowering CPM and improving engagement.
            </p>
          </div>
        </div>
      </section>

      {/* === RESULTS & IMPACT === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Results &amp; Impact</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-8">
          Proof Through Pattern
        </h2>

        <p className="text-lg leading-relaxed text-neutral-700 mb-8">
          Even with a lean spend, <em>Patto di Sangue</em> proved that story and structure can outperform scale.
        </p>

        <h4 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4">
          Spotify Push — “Stasera” (Lead Single)
        </h4>

        {/* KPI grid */}
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl ring-1 ring-neutral-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Budget</div>
            <div className="text-xl font-bold text-neutral-900 mt-1">€169.51</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Reach</div>
            <div className="text-xl font-bold text-neutral-900 mt-1">30,837</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Impressions</div>
            <div className="text-xl font-bold text-neutral-900 mt-1">108,051</div>
            <div className="text-xs text-neutral-500 mt-1">Frequency ~ 3.5</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Clicks</div>
            <div className="text-xl font-bold text-neutral-900 mt-1">403</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">CPC (avg)</div>
            <div className="text-xl font-bold text-neutral-900 mt-1">€0.42</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">CTR (est.)</div>
            <div className="text-xl font-bold text-neutral-900 mt-1">0.37%</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Engagements (Meta)</div>
            <div className="text-xl font-bold text-neutral-900 mt-1">10,074</div>
          </div>
          <div className="rounded-2xl ring-1 ring-neutral-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">EP Streams (Month 1)</div>
            <div className="text-xl font-bold text-neutral-900 mt-1">~10,000</div>
          </div>
        </div>

        {/* DUE GIF affiancate subito sopra "Top Ad Sets" */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className=" ring-1 ring-neutral-200 bg-white">
            <img
              src={`${baseUrl}adv-dia8lo.gif`}
              alt="Ad preview — Dia8lo"
              className="w-full h-[60vh] object-cover"
            />
          </div>
          <div className=" ring-1 ring-neutral-200 bg-white">
            <img
              src={`${baseUrl}adv-arde.gif`}
              alt="Ad preview — Arde"
              className="w-full h-[60vh] object-cover"
            />
          </div>
  </div>

        {/* Top Ad Sets */}
        <div className="mb-8">
          <h4 className="text-lg md:text-xl font-semibold text-neutral-900 mb-3">Top Ad Sets</h4>
</div>
        {/* Notes */}
        <div className="space-y-3 text-neutral-700">
          <p>Patto di Sangue” didn’t trigger a viral explosion, and that was never the goal. The campaign acted as a controlled test, measuring how far emotional storytelling could push a debut project with limited budget and no pre-existing fanbase.</p>
          <p>Post-release data confirmed what mattered most: people didn’t just listen once, they remembered. Save rates, repeat streams, and qualitative messages showed that the content reached the right people, even if not the masses.</p>
          <p>Rather than scaling prematurely, the artist used this phase to build narrative literacy, learning what structures, visuals, and emotions generated resonance. Those insights became the foundation for future rollouts: shorter forms, stronger hooks, and a clearer identity.
The campaign’s true growth wasn’t numerical, but strategic: it turned abstract ideas about “story-driven marketing” into a repeatable framework, a proof of concept to grow smarter, not louder.</p>
        </div>

        
      </section>

      {/* === LEARNINGS === */}
      <section className="mt-28">
        <h3 className="uppercase tracking-wider text-sm text-neutral-500 mb-3">Learnings</h3>
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
          Growth beyond the release
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-neutral-700">
          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Learning Through Pattern</h4>
            <p>Post release data confirmed what mattered most: people didn’t just listen once, they remembered.
Save rates, repeat streams, and qualitative messages showed that the content reached the right people, even if not the masses.

Rather than scaling prematurely, the artist used this phase to build narrative literacy, learning what structures, visuals, and emotions generated resonance. Those insights became the foundation for future rollouts: shorter forms, stronger hooks, and a clearer identity.

The campaign’s true growth wasn’t numerical, but strategic:
it turned abstract ideas about “story-driven marketing” into a repeatable framework, a proof of concept to grow smarter, not louder.*</p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">What I’d Do Differently</h4>
            <p>If I were to relaunch the campaign today, I’d simplify the battlefield.
I’d focus exclusively on Instagram, treating it as the narrative core, not just a posting channel but a storytelling environment. All paid media would be dedicated to Instagram engagement, optimizing for interaction, retention, and save-to-follow conversion instead of reach.

On the release side, I’d drop one song at a time, turning each track into a self-contained moment, a chapter rather than a compilation.
That cadence would give each story room to breathe, while keeping the audience in a constant state of anticipation rather than saturation.</p>
          </div>
        </div>
      </section>
    </CaseLayout>
  );
}



/* ---- Home ---- */
function Home() {
 const [sent, setSent] = useState(false);
const [sending, setSending] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setSending(true);
  setSent(false);

  const form = e.target;
  const data = new FormData(form);

  try {
    const res = await fetch("https://formsubmit.co/ajax/a1be43700285a11e1583375857eee9f8", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    if (res.ok) {
      form.reset();
      setSent(true);
    } else {
      alert("There was a problem sending your message. Please try again.");
    }
  } catch {
    alert("Network error. Please try again.");
  } finally {
    setSending(false);
  }
};


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
          {/* banner conferma */}
{sent && (
  <div className="mx-auto max-w-xl mt-6 rounded-xl bg-green-50 text-green-800 ring-1 ring-green-200 p-4 text-sm text-center">
    Thank you for getting in touch — I’ll reply as soon as I see the message.
  </div>
)}

<form onSubmit={handleSubmit} className="mx-auto max-w-xl mt-8 grid gap-3">
  {/* honeypot anti-spam */}
  <input type="text" name="_honey" className="hidden" tabIndex="-1" autoComplete="off" />
  {/* opzioni FormSubmit */}
  <input type="hidden" name="_captcha" value="false" />
  <input type="hidden" name="_subject" value="New message from gabriele-arias-portfolio" />
  <input type="hidden" name="_template" value="table" />
  <input
    type="hidden"
    name="_autoresponse"
    value="Thanks for your message! I’ll get back to you as soon as I can."
  />

  <input
    className="w-full rounded-xl ring-1 ring-neutral-300 p-3"
    name="name"
    placeholder="Name"
    required
  />
  <input
    className="w-full rounded-xl ring-1 ring-neutral-300 p-3"
    name="email"
    placeholder="Email address"
    type="email"
    required
  />
  <textarea
    className="w-full rounded-xl ring-1 ring-neutral-300 p-3"
    name="message"
    rows={4}
    placeholder="Your message"
    required
  />
  <button
    type="submit"
    disabled={sending}
    className="rounded-xl px-4 py-2 bg-black text-white disabled:opacity-60"
  >
    {sending ? "Sending..." : "Send"}
  </button>
</form>

        </Container>
      </section>
    </main>
  );
}

/* ---- App Root (una sola export default) ---- */
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-neutral-900">
        <Nav />
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
