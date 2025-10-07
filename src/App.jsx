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
  return (
    <section className="bg-white text-neutral-900 pt-12 md:pt-20 pb-0">
      <Container>
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-extrabold leading-[1.05] text-4xl sm:text-6xl md:text-7xl mt-0 md:mt-2"
          >
            Gabriele Arias
            <br />
            Digital Marketing Specialist
          </motion.h1>

          {/* subheading nascosto su mobile */}
          <p className="hidden md:block mt-3 text-xl text-neutral-700">
            Analysis · Creativity · Strategy & Growth · Repeat
          </p>

          <div className="mt-6 md:mt-10 flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}hero-photo.png`}
              alt="Gabriele Arias"
              className="w-full max-w-3xl h-auto object-contain select-none"
            />
          </div>
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
}) {
  return (
    <Link to={to} className="block group">
      {/* MOBILE / TABLET (no hover animations) */}
      <div className="md:hidden">
        <div className="rounded-3xl bg-white shadow-sm ring-1 ring-neutral-200 p-6 mx-auto">
          {logoSrc && (
            <div className="flex items-center mb-3">
              <img
                src={`${import.meta.env.BASE_URL}${logoSrc}`}
                alt=""
                className="max-h-8 h-auto w-auto object-contain"
                style={{ maxWidth: "unset" }}
              />
            </div>
          )}
          <div className="text-center">
            <h3 className="text-2xl font-extrabold tracking-tight">{title}</h3>
            {desc && <p className="mt-3 text-neutral-600 leading-relaxed">{desc}</p>}
          </div>
          {imageSrc && (
            <div className="mt-6">
              <img
                src={`${import.meta.env.BASE_URL}${imageSrc}`}
                alt=""
                className="w-full h-auto object-contain"
              />
            </div>
          )}
          <div className="mt-6">
            <div className="w-full rounded-full bg-black text-white text-center py-3 font-medium">
              {ctaLabel} <span className="inline-block">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP with motion */}
      <motion.div
        className="hidden md:flex flex-col rounded-3xl overflow-hidden bg-white ring-1 ring-neutral-200 shadow-sm"
        initial={false}
        whileHover={{
          y: -6,
          boxShadow:
            "0 12px 30px -12px rgba(0,0,0,0.18), 0 6px 14px -8px rgba(0,0,0,0.10)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.6 }}
      >
        {/* Top: text + image */}
        <div className="grid grid-cols-[1.15fr,0.85fr] gap-8 p-10 lg:p-14">
          {/* Left: text */}
          <div className="flex flex-col justify-center">
            {logoSrc && (
              <div className="flex items-center mb-5">
                <img
                  src={`${import.meta.env.BASE_URL}${logoSrc}`}
                  alt=""
                  className="max-h-10 h-auto w-auto object-contain"
                  style={{ maxWidth: "unset" }}
                />
              </div>
            )}
            <h3 className="text-4xl font-extrabold leading-tight text-neutral-900">
              {title}
            </h3>
            {desc && (
              <p className="mt-4 text-neutral-700 leading-relaxed">{desc}</p>
            )}
          </div>

          {/* Right: image (float + subtle tilt on hover) */}
          {imageSrc && (
            <motion.div
              className="flex items-center justify-center"
              whileHover={{ y: -8, rotate: -0.7 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <img
                src={`${import.meta.env.BASE_URL}${imageSrc}`}
                alt=""
                className="w-full h-auto object-contain"
              />
            </motion.div>
          )}
        </div>

        {/* Bottom: highlights + CTA full width */}
        {stats?.length > 0 && (
          <div className="flex items-center justify-between bg-white border-t border-neutral-200 p-6 rounded-b-3xl">
            <div className="grid grid-cols-3 gap-8 flex-1">
              {stats.slice(0, 3).map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-3xl">{s.icon || "•"}</span>
                  <div className="text-sm font-medium text-neutral-800">{s.label}</div>
                </div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="ml-8"
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-white font-medium shadow-sm"
                style={{ backgroundColor: "#FF723E" }}
              >
                {ctaLabel} <span>→</span>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </Link>
  );
}






function CaseIndex() {
  return (
    <Container>
      <div className="py-12 space-y-6">
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
          bg="bg-[#f9ccbf]" // peach background
          ctaLabel="Read more"
        />

        {/* le altre cards sotto rimangono come prima */}
        <Card
          to="/case/among-locals"
          eyebrow="Travel · Community"
          title="Among Locals"
          desc="Authentic travel brand with a lead-gen-first strategy."
          badge="lead gen"
        />
        <Card
          to="/case/zampapazza"
          eyebrow="Pet brand · DTC"
          title="From pet memes to products"
          desc="Positioning and growth engine for Zampapazza."
          badge="DTC"
        />
        <Card
          to="/case/branding-ep"
          eyebrow="Music · Branding"
          title="EP ‘patto di sangue’"
          desc="Concept, visuals and GTM plan for a music release."
          badge="branding"
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
