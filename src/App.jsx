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

  return (
    <Link to={to} className="block group">
      {/* MOBILE */}
      <div className="md:hidden">
        <div
          className={`relative rounded-3xl overflow-hidden p-6 mx-auto`}
          style={{ backgroundColor: bgColor }}
        >
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
                className="max-h-8 w-auto object-contain"
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
        className={`hidden md:flex flex-col rounded-3xl overflow-hidden relative`}
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
                  className="max-h-10 w-auto object-contain"
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
                className="w-full h-auto object-contain"
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
          logoSrc="amonglocals-logo.png"
          title="Among Locals — bridging cultures"
          desc="Built an experiential travel brand from the start to te launch. Check out how a fresh identity, a lean funnel and authentic storytelling generated over 40 qualified leads at £14.76 CPL."
          bgImage="among-locals-hero.png"  // ← immagine di sfondo su tutta la card (mobile + desktop)
          stats={[
            { icon: "📞", label: "40 qualified calls" },
            { icon: "📈", label: "CR Call 17.6%" },
            { icon: "☑️", label: "5 booked call" },
          ]}
          // mantiene testi scuri su foto; se la foto risultasse troppo chiara, ti aggiungo una scrim
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
function CaseBrandingEP() { return <CaseLayout eyebrow="Music · Branding" title="Branding EP">
  <p>Short description of the project.</p>
</CaseLayout>; }

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
