import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* LEFT: hamburger su mobile */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden flex flex-col justify-between w-6 h-4 focus:outline-none"
              aria-label="Open menu"
            >
              <span className="block w-full h-[2px] bg-neutral-900 rounded"></span>
              <span className="block w-full h-[2px] bg-neutral-900 rounded"></span>
              <span className="block w-full h-[2px] bg-neutral-900 rounded"></span>
            </button>

            {/* CENTER: link desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/" className="hover:opacity-70 font-medium">Gabriele Arias</Link>
              <Link to="/cases" className="hover:opacity-70">Case Studies</Link>
            </nav>

            {/* RIGHT: Contact */}
            <a
              href="#contact"
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-neutral-900 text-white text-sm shadow-sm hover:opacity-90"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Drawer menu mobile */}
      {open && (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-lg">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close" className="text-2xl leading-none">×</button>
              </div>
              <nav className="flex flex-col gap-4 text-lg font-medium text-neutral-900">
                <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                <Link to="/cases" onClick={() => setOpen(false)}>Case Studies</Link>
                <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
              </nav>
            </div>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-neutral-300 text-sm font-semibold"
            >
              in
            </a>
          </div>
        </div>
      )}
    </>
  );
}
