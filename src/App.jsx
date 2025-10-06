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
            href="https://www.linkedin.com"
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
  stats = [], // highlights (desktop only)
  bg = "bg-[#f9ccbf]", // peach desktop
  ctaLabel = "Read more",
}) {
  return (
    <Link to={to} className="block group">
      {/* MOBILE/TABLET: clean version */}
      <div className="md:hidden">
        <div className="rounded-3xl bg-white shadow-sm ring-1 ring-neutral-200 p-6 mx-auto">
          {/* Logo */}
          {logoSrc && (
            <img
              src={`${import.meta.env.BASE_URL}${logoSrc}`}
              alt=""
              className="h-6 w-auto mb-3"
            />
          )}

          {/* Title + Description */}
          <div className="text-center">
            <h3 className="text-2xl font-extrabold tracking-tight">
              {title}
            </h3>
            {desc && (
              <p className="mt-3 text-neutral-600 leading-relaxed">
                {desc}
              </p>
            )}
          </div>

          {/* Image */}
          {imageSrc && (
            <div className="mt-6">
              <img
                src={`${import.meta.env.BASE_URL}${imageSrc}`}
                alt=""
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {/* CTA only */}
          <div className="mt-6">
            <div className="w-full rounded-full bg-black text-white text-center py-3 font-medium transition-transform hover:scale-[1.02]">
              {ctaLabel}{" "}
              <span className="inline-block translate-x-0 group-hover:translate-x-0.5 transition">
                →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP: layout with highlights and image */}
      <div
        className={`hidden md:grid grid-cols-[1.15fr,0.85fr] gap-8 p-8 rounded-3xl ${bg}`}
      >
        <div className="flex flex-col">
          {/* Logo */}
          {logoSrc && (
            <img
              src={`${import.meta.env.BASE_URL}${logoSrc}`}
              alt=""
              className="h-7 w-auto mb-4"
            />
          )}

          {/* Heading + Sub */}
          <h3 className="text-4xl font-extrabold leading-tight">
            {title}
          </h3>
          {desc && (
            <p className="mt-4 text-neutral-800/90 leading-relaxed">
              {desc}
            </p>
          )}

          {/* Highlights + CTA (desktop only) */}
          {stats?.length > 0 && (
            <div className="mt-auto">
              <div className="mt-8 rounded-2xl bg-white/80 ring-1 ring-neutral-200 p-4">
                <div className="grid grid-cols-3 gap-4">
                  {stats.slice(0, 3).map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <span className="text-2xl">{s.icon || "•"}</span>
                      <div className="text-sm text-neutral-800">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-white font-medium shadow-sm transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: "#FF723E" }}
                >
                  {ctaLabel} <span>→</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Image (desktop only) */}
        <div className="relative">
          <div className="rounded-2xl bg-white/60 ring-1 ring-neutral-200 h-full w-full grid place-items-center p-4">
            {imageSrc ? (
              <img
                src={`${import.meta.env.BASE_URL}${imageSrc}`}
                alt=""
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="text-neutral-400">image</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}



function CaseIndex() {
  return (
    <Container>
      <div className="py-12 space-y-8">
        <Card
          to="/case/pod-memes"
          logoSrc="logos/heart-logo.svg"
          title="From Viral Memes to POD Sales"
          desc="From relatable memes to brand-based products, we turned viral content into real sales. See the content loop that generated 150+ orders at 10%+ CVR."
          imageSrc="images/pod-memes-phones.png"
          stats={[
            { icon: "🛍️", label: "10.2% C.R. on Shopify" },
            { icon: "👀", label: "20M+ organic views" },
            { icon: "🧾", label: "150+ orders" },
          ]}
          ctaLabel="Read more"
          bg="bg-[#f9ccbf]"
        />

        <Card
          to="/case/among-locals"
          logoSrc="logos/among-locals.svg"
          title="Among Locals — bridge between cultures"
          desc="A lead-gen-first launch for authentic experiences in Sardinia."
          imageSrc="images/among-locals-hero.png"
          stats={[
            { icon: "📞", label: "48 calls" },
            { icon: "💶", label: "CPL €2.10" },
            { icon: "📅", label: "10+ bookings" },
          ]}
          ctaLabel="Read more"
          bg="bg-[#dbeafe]" /* light blue, cambia come vuoi */
        />

        <Card
          to="/case/zampapazza"
          logoSrc="logos/zampapazza.svg"
          title="From pet memes to problem-solving products"
          desc="Positioning + growth engine for DTC brand Zampapazza."
          imageSrc="images/zampapazza-fountain.png"
          stats={[
            { icon: "💧", label: "Flagship: smart fountain" },
            { icon: "📈", label: "AOV €62" },
            { icon: "🎯", label: "CPA €14" },
          ]}
          ctaLabel="Read more"
          bg="bg-[#fde68a]" /* warm yellow */
        />

        <Card
          to="/case/branding-ep"
          logoSrc="logos/ep.svg"
          title="Branding & campaign for EP ‘patto di sangue’"
          desc="Concept, visuals and lightweight paid plan for growth."
          imageSrc="images/ep-covers.png"
          stats={[
            { icon: "🎵", label: "100k+ views" },
            { icon: "🎬", label: "40+ assets" },
            { icon: "💸", label: "Budget €1–1.5k" },
          ]}
          ctaLabel="Read more"
          bg="bg-[#111827]" /* dark card */
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
