"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { name: "GitHub", icon: "/github.svg", href: "https://github.com/tristenswisss" },
  { name: "LinkedIn", icon: "/linkedin.svg", href: "https://www.linkedin.com/in/craig-togarepi" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = SECTIONS.map((section) => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: 0.25 },
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-wrap">
        <a href="#home" className="nav-logo-wrapper" onClick={(event) => onClick(event, "home")}>
          <span className="nav-logo">CT</span>
          <span className="status-badge">Available</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`nav-link ${active === section.id ? "active" : ""}`}
              onClick={(event) => onClick(event, section.id)}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="nav-socials">
            {SOCIALS.map((social) => (
              <a key={social.name} href={social.href} target={social.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className="nav-social-link" title={social.name}>
                <Image src={social.icon} alt="" width={18} height={18} />
              </a>
            ))}
          </div>
          <a href="/Craig Togarepi- Software Developer.pdf" target="_blank" className="nav-cta-btn">
            Resume
          </a>
          <button
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
            type="button"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`nav-link ${active === section.id ? "active" : ""}`}
              onClick={(event) => onClick(event, section.id)}
            >
              {section.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
