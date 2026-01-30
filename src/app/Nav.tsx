"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sectionEls = useMemo(() =>
    SECTIONS.map(s => ({ ...s, el: typeof document !== 'undefined' ? document.getElementById(s.id) : null })),
  []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const opts: IntersectionObserverInit = {
      root: null,
      rootMargin: "-120px 0px -60% 0px",
      threshold: [0.25, 0.5, 0.75],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) setActive(id);
        }
      });
    }, opts);

    sectionEls.forEach(({ el }) => el && observerRef.current?.observe(el));

    return () => {
      sectionEls.forEach(({ el }) => el && observerRef.current?.unobserve(el));
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [sectionEls]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
      setActive(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="navbar fixed top-0 left-0 right-0 z-40 px-6 py-4">
      <div className="container max-w-6xl mx-auto">
        <div className="nav-wrap flex items-center justify-between relative overflow-hidden">
          {/* Futuristic glow effect behind navigation */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-transparent to-purple-900/10 blur-sm" />
          
          {/* Logo centered on mobile, left on desktop */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <a href="#top" className="flex items-center gap-2 pl-3 pr-2 relative z-10" onClick={(e)=>onClick(e,'home')}>
              <span style={{
                fontFamily: 'var(--font-dyna-puff)',
                color: '#e34b4b',
                fontSize: '1.55rem',
                lineHeight: 1,
                textShadow: '0 0 10px rgba(227, 75, 75, 0.5)'
              }}>Craig</span>
            </a>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1 relative z-10">
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`nav-link ${active === s.id ? 'active' : ''} relative overflow-hidden`}
                onClick={(e)=>onClick(e, s.id)}
              >
                <span className="relative z-10">{s.label}</span>
                {active === s.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-red-500 to-cyan-500 animate-glow" />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile menu button - right aligned */}
          <div className="flex-1 md:flex-none flex justify-end">
            <button
              className="md:hidden relative z-10 hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>

          {/* Desktop resume button */}
          <div className="hidden md:block pl-2 pr-1 relative z-10">
            <a href="/CRAIG TOGAREPI.pdf" target="_blank" className="btn btn-primary" style={{ boxShadow: '0 0 0 2px #e34b4b' }}>
              Resume
            </a>
          </div>
        </div>

        {/* Mobile menu - centered */}
        {isMobileMenuOpen && (
          <div className="md:hidden mobile-menu glass-strong p-6 rounded-xl relative z-10 mx-auto max-w-xs">
            <nav className="flex flex-col gap-2 items-center">
              {SECTIONS.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`nav-link ${active === s.id ? 'active' : ''} relative overflow-hidden w-full text-center`}
                  onClick={(e)=>onClick(e, s.id)}
                >
                  <span className="relative z-10">{s.label}</span>
                  {active === s.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-red-500 to-cyan-500" />
                  )}
                </a>
              ))}
              <a href="/CRAIG TOGAREPI.pdf" target="_blank" className="btn btn-primary mt-2 w-full text-center" style={{ boxShadow: '0 0 0 2px #e34b4b' }}>
                Resume
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
