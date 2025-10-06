import { HashRouter as BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ---- Utility: container ---- */
function Container({ children }) {
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}

/* ---- Nav semplice (niente file esterni) ---- */
import { useNavigate, useLocation, Link } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const goContact = () => {
    const scrollToContact = () => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // se siamo già in Home
    if (location.pathname === "/") {
      scrollToContact();
    } else {
      // vai in Home e poi scrolla
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
    <section className="bg-white text-neutral-900 pt-12 md:pt-20 pb-0">  {/* pt ridotta su mobile */}
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

          {/* subheading nascosto su mobile come prima (se lo avevi visibile, lascia pure) */}
          <p className="hidden md:block mt-3 text-xl text-neutral-700">
            Analysis · Creativity · Strategy & Growth · Repeat
          </p>

          <div className="mt-6 md:mt-10 flex justify-center">   {/* immagine leggermente più su su mobile */}
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
function Card({ to, eyebrow, title, desc, badge }) {
  return (
    <Link to={to} className="block">
      <div className="grid md:grid-cols-[1.1fr,1fr] gap-6 p-5 rounded-2xl ring-1 ring-neutral-200 bg-white hover:shadow-md transition">
        <div>
          <div className="text-xs font-medium text-neutral-600">{eyebrow}</div>
          <h3 className="text-xl md:text-2xl font-semibold mt-1">{title}</h3>
          <p className="mt-3 text-neutral-600">{desc}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
            {badge && <span className="px-2 py-1 rounded-full bg-neutral-100">{badge}</span>}
            <span>Read more →</span>
          </div>
        </div>
        <div className="rounded-xl bg-neutral-100 aspect-[16/10]" />
      </div>
    </Link>
  );
}

function CaseIndex() {
  return (
    <Container>
      <div className="py-12 space-y-6">
        <Card to="/case/pod-memes" eyebrow="POD / UGC" title="From viral memes to POD sales"
              desc="How meme-driven content turned attention into conversions." badge="e-commerce" />
        <Card to="/case/among-locals" eyebrow="Travel · Community" title="Among Locals"
              desc="Authentic travel brand with a lead-gen-first strategy." badge="lead gen" />
        <Card to="/case/zampapazza" eyebrow="Pet brand · DTC" title="From pet memes to products"
              desc="Positioning and growth engine for Zampapazza." badge="DTC" />
        <Card to="/case/branding-ep" eyebrow="Music · Branding" title="EP ‘patto di sangue’"
              desc="Concept, visuals and GTM plan for a music release." badge="branding" />
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
