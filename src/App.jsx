import { HashRouter as BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ---------- Shared UI ----------
function Container({ children }) {
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/75 border-b">
      <Container>
        <div className="grid grid-cols-3 items-center py-3">
          <div className="justify-self-start">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"
               className="inline-flex items-center justify-center w-7 h-7 rounded-full ring-1 ring-neutral-300 text-xs font-semibold">in</a>
          </div>
          <nav className="justify-self-center flex items-center gap-6 text-sm">
            <Link to="/" className="hover:opacity-70">Gabriele Arias</Link>
            <Link to="/cases" className="hover:opacity-70">Case Studies</Link>
          </nav>
          <div className="justify-self-end">
            <a href="#contact" className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-500 text-white text-sm shadow-sm hover:opacity-90">Contact</a>
          </div>
        </div>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-white text-neutral-900">
      <Container>
        <div className="py-14 md:py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
           <section className="relative flex flex-col items-center justify-center text-center py-24 md:py-32 bg-black text-white">
  <div className="max-w-3xl px-6">
    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
      Gabriele Arias <br /> Digital Marketing Specialist
    </h1>
    <p className="mt-4 text-lg text-white/70">
      Analysis · Creativity · Strategy & Growth · Repeat
    </p>
  </div>

  {/* immagine hero */}
  <img
    src="/hero-photo.png"
    alt="Gabriele Arias"
    className="mt-12 w-64 sm:w-72 md:w-80 lg:w-96 object-contain select-none"
  />
</section>

  );
}

function SectionTitle({ eyebrow, title, ctaHref, ctaLabel, invert = false }) {
  const eyebrowCls = invert ? "text-xs uppercase tracking-wider text-white/60" 
                            : "text-xs uppercase tracking-wider text-neutral-500";
  const titleCls = invert ? "text-2xl md:text-3xl font-bold mt-1 text-white"
                          : "text-2xl md:text-3xl font-bold mt-1";
  const linkCls = invert ? "text-sm underline underline-offset-4 hover:no-underline text-white"
                         : "text-sm underline underline-offset-4 hover:no-underline";
  return (
    <div className="flex items-end justify-between">
      <div>
        {eyebrow && <div className={eyebrowCls}>{eyebrow}</div>}
        <h2 className={titleCls}>{title}</h2>
      </div>
      {ctaHref && (
        <Link to={ctaHref} className={linkCls}>
          {ctaLabel || "View all"}
        </Link>
      )}
    </div>
  );
}


function Card({ to, eyebrow, title, desc, badge, image }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
      <Link to={to} className="block group">
        <div className="grid md:grid-cols-[1.1fr,1fr] gap-6 p-4 md:p-6 rounded-2xl ring-1 ring-neutral-200 hover:ring-neutral-300 bg-white transition-shadow shadow-sm hover:shadow-md">
          <div className="order-2 md:order-1">
            <div className="text-xs font-medium text-neutral-600">{eyebrow}</div>
            <h3 className="text-xl md:text-2xl font-semibold mt-1">{title}</h3>
            <p className="mt-3 text-neutral-600 leading-relaxed">{desc}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
              {badge && <span className="inline-flex items-center px-2 py-1 rounded-full bg-neutral-100">{badge}</span>}
              <span className="group-hover:translate-x-0.5 transition-transform">Read more →</span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="w-full aspect-[16/10] rounded-xl bg-neutral-100 overflow-hidden">
              {image ? (
                <img alt="case cover" src={image} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-neutral-400">cover</div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CaseIndex() {
  return (
    <Container>
      <div className="py-12 space-y-8">
        <SectionTitle eyebrow="Selected work" title="Case studies" />
        <div className="space-y-6">
          <Card to="/case/pod-memes" eyebrow="POD / UGC" title="From viral memes to POD sales"
            desc="How meme-driven content turned attention into conversions for a print-on-demand shop (Shop di Coppia)." badge="e-commerce" />
          <Card to="/case/among-locals" eyebrow="Travel · Community" title="Among Locals — bridge between cultures, people & hidden traditions"
            desc="Launching a boutique travel brand with authentic experiences in Sardinia and a lead-gen-first strategy." badge="lead gen" />
          <Card to="/case/zampapazza" eyebrow="Pet brand · DTC" title="From pet memes to problem-solving products"
            desc="Positioning, offer and creative engine behind Zampapazza & Zampacqua (smart cat fountain)." badge="DTC" />
          <Card to="/case/branding-ep" eyebrow="Music · Branding" title="Branding & campaign for EP ‘patto di sangue’"
            desc="Concept, visuals and GTM plan for an introspective, theatrical music release." badge="branding" />
        </div>
      </div>
    </Container>
  );
}

function Home() {
  return (
    <main>
      <Hero />
      <section className="bg-black text-white">
  <Container>
    <div className="py-14 md:py-20">
      <SectionTitle eyebrow="Overview" title="What I do" invert />
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
      <section className="bg-neutral-50 border-y">
        <CaseIndex />
      </section>
      <Contact />
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-neutral-500 mt-1">{label}</div>
    </div>
  );
}

function CaseLayout({ title, eyebrow, children, stats }) {
  const navigate = useNavigate();
  return (
    <main>
      <section className="bg-black text-white">
        <Container>
          <div className="py-12">
            <div className="text-xs uppercase tracking-wider text-white/60">{eyebrow}</div>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">{title}</h1>
            <button onClick={() => navigate(-1)} className="mt-6 text-sm underline underline-offset-4">← Back</button>
          </div>
        </Container>
      </section>
      <Container>
        <div className="py-12 grid md:grid-cols-[1.2fr,0.8fr] gap-10">
          <article className="prose prose-neutral max-w-none">{children}</article>
          <aside className="space-y-4">
            <div className="p-5 rounded-xl ring-1 ring-neutral-200 bg-white">
              <h3 className="font-semibold mb-2">At a glance</h3>
              <ul className="text-sm text-neutral-700 list-disc pl-5 space-y-1">
                <li>Role: Strategy, Creative, Ads</li>
                <li>Scope: Research → Content → Growth</li>
                <li>Tools: Meta Ads, GA4, Figma, AI</li>
              </ul>
            </div>
            {stats && (
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s, i) => (
                  <div key={i} className="p-4 rounded-xl ring-1 ring-neutral-200 bg-white">
                    <Stat label={s.label} value={s.value} />
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </Container>
      <section className="bg-neutral-50 border-y">
        <CaseIndex />
      </section>
      <Contact />
    </main>
  );
}

function CasePOD() {
  return (
    <CaseLayout eyebrow="POD / UGC" title="From viral memes to POD sales"
      stats={[{ label: "CTR", value: "3.2%" }, { label: "ROAS", value: "2.8x" }, { label: "Leads", value: "+350" }]}>
      <p>A meme-led growth sprint for a print-on-demand couple brand. We built snackable content,
        tested hooks in organic, then amplified winners with lightweight paid (& creator) distribution.
        Clear offer, simple checkout, and iterative product pages did the heavy lifting.</p>
      <h3>Highlights</h3>
      <ul>
        <li>Idea → creative system → 30-day content calendar</li>
        <li>UGC + meme remix → engagement flywheel</li>
        <li>Conversion lift via bundles & urgency</li>
      </ul>
    </CaseLayout>
  );
}

function CaseAmongLocals() {
  return (
    <CaseLayout eyebrow="Travel · Community"
      title="Among Locals — bridge between cultures, people & hidden traditions"
      stats={[{ label: "CPL", value: "€2.10" }, { label: "Calls", value: "48" }, { label: "Bookings", value: "+10" }]}>
      <p>Launching a boutique travel brand around authentic local experiences in Sardinia (Bosa).
        Focus on lead generation and high-touch sales: form → auto-message → call → conversion. SEO
        articles + social storytelling to warm up demand; paid only where it compounds.</p>
      <h3>What we shipped</h3>
      <ul>
        <li>Positioning, site on Wix, CRM & email automations</li>
        <li>Lead magnets (sample itineraries), organic + paid meta with clear dates & price</li>
        <li>Content engine connecting IG reels ↔ articles ↔ email</li>
      </ul>
    </CaseLayout>
  );
}

function CaseZampapazza() {
  return (
    <CaseLayout eyebrow="Pet brand · DTC" title="From pet memes to problem-solving products"
      stats={[{ label: "AOV", value: "€62" }, { label: "CTR", value: "2.9%" }, { label: "CPA", value: "€14" }]}>
      <p>Zampapazza started as a pet meme page and evolved into a DTC brand with a flagship product
        (smart cat fountain). We positioned the brand on the emotional + scientific axis: stories that
        validate the owner’s worries, backed by clear health benefits.</p>
      <h3>Levers</h3>
      <ul>
        <li>Story-driven advertorials ("L’urlo di Leo")</li>
        <li>Landing optimization and bundle selector</li>
        <li>UGC + reviews → trust & conversion</li>
      </ul>
    </CaseLayout>
  );
}

function CaseBrandingEP() {
  return (
    <CaseLayout eyebrow="Music · Branding" title="Branding & campaign for EP ‘patto di sangue’"
      stats={[{ label: "Assets", value: "+40" }, { label: "Views", value: "100k" }, { label: "Budget", value: "€1–1.5k" }]}>
      <p>A theatrical, introspective concept translated into visuals, reels and a lightweight paid plan.
        The goal: grow the artist’s IG ahead of label outreach. We tested 10–11s music clips across
        three slots daily with CBO and scaled the top performers.</p>
      <h3>System</h3>
      <ul>
        <li>Clean profile + intro carousels → social proof</li>
        <li>Split-test of hooks, captions and cover frames</li>
        <li>Retargeting stack for profile visits & plays</li>
      </ul>
    </CaseLayout>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Want to get in touch?</h2>
          <p className="mt-2 text-neutral-600">Drop me a message — I usually reply quickly.</p>
        </div>
        <form className="mx-auto max-w-xl mt-8 grid gap-3" action="https://formsubmit.co/" method="POST">
          <input type="hidden" name="_captcha" value="false" />
          <input className="w-full rounded-xl ring-1 ring-neutral-300 p-3 focus:outline-none focus:ring-2" name="name" placeholder="Name" />
          <input className="w-full rounded-xl ring-1 ring-neutral-300 p-3 focus:outline-none focus:ring-2" name="email" placeholder="Email address" type="email" />
          <textarea className="w-full rounded-xl ring-1 ring-neutral-300 p-3 focus:outline-none focus:ring-2" name="message" rows={4} placeholder="Your message" />
          <button type="submit" className="rounded-xl px-4 py-2 bg-black text-white hover:opacity-90">Send</button>
        </form>
      </Container>
    </section>
  );
}

export default function App() {
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
            <div className="text-sm text-neutral-500">© {new Date().getFullYear()} Gabriele Arias — Details make the difference.</div>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}
