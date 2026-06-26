"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  category: "web" | "mobile" | "dash";
  href: string;
  desc: string;
  stack: string[];
  metric: string;
  mockup?: string;
};

const ALL_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "MentalMate ZW",
    category: "dash",
    href: "https://mentalmatezw.lovable.app",
    desc: "AI-supported mental-health dashboard with chat, mood tracking, and guided care flows.",
    stack: ["React", "TypeScript", "Next.js"],
    metric: "Care platform",
    mockup: "/mockup-mentalmate.png",
  },
  {
    id: "p2",
    title: "Landific",
    category: "dash",
    href: "https://landific.vercel.app/",
    desc: "Land-management workspace for property insights, reporting, and document workflows.",
    stack: ["React", "CSS3", "Node.js"],
    metric: "Ops dashboard",
    mockup: "/mockup-landific.png",
  },
  {
    id: "p3",
    title: "Uncommon.org",
    category: "web",
    href: "https://uncommon.org",
    desc: "Accessible nonprofit web experience built for storytelling, recruitment, and giving.",
    stack: ["React", "TypeScript", "Firebase"],
    metric: "Mission site",
    mockup: "/mockup-uncommon.png",
  },
  {
    id: "p4",
    title: "Talent Platform",
    category: "web",
    href: "https://talent.uncommon.org/",
    desc: "Talent portal with profiles, workflow automation, and opportunity matching.",
    stack: ["React", "TypeScript", "Chart.js"],
    metric: "Team growth",
  },
  {
    id: "p7",
    title: "Playground",
    category: "web",
    href: "https://playground.uncommon.org",
    desc: "Developer learning environment with challenges, templates, and collaborative sandboxes.",
    stack: ["React", "TypeScript", "Node.js"],
    metric: "Learning lab",
  },
  {
    id: "p5",
    title: "Uber Cargo",
    category: "mobile",
    href: "#",
    desc: "Cargo delivery concept with driver matching, route optimization, and secure payments.",
    stack: ["React Native", "TypeScript", "Firebase"],
    metric: "Logistics app",
  },
  {
    id: "p6",
    title: "Mirae Community",
    category: "mobile",
    href: "#",
    desc: "Cultural community app for events, language exchange, and shared experiences.",
    stack: ["Flutter", "Dart", "Firebase"],
    metric: "Community mobile",
  },
];

const TABS = [
  { key: "web" as const, label: "Web" },
  { key: "dash" as const, label: "Dashboards" },
  { key: "mobile" as const, label: "Mobile" },
];

const ICONS: Record<Project["category"], string> = {
  web: "/project-web.svg",
  mobile: "/project-mobile.svg",
  dash: "/project-dash.svg",
};

const SERVICES = [
  {
    title: "Product interfaces",
    body: "Polished React and Next.js frontends with responsive layouts, clean states, and strong visual hierarchy.",
  },
  {
    title: "Full-stack systems",
    body: "APIs, auth flows, data models, dashboards, and deployment pipelines designed for maintainability.",
  },
  {
    title: "Launch refinement",
    body: "Performance, interaction polish, SEO structure, and the final product details that make work feel premium.",
  },
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("web");
  const list = useMemo(() => ALL_PROJECTS.filter((project) => project.category === active), [active]);

  return (
    <>
      <section id="home" className="hero section-shell">
        <div className="hero-grid" />
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />

        <div className="content hero-content">
          <FadeIn className="hero-copy-block">
            <p className="eyebrow">Craig Togarepi / Full-stack engineer</p>
            <h1>Future-ready products with clean code and cinematic polish.</h1>
            <p className="lead">
              I build fast websites, dashboards, and mobile experiences using React, Next.js, TypeScript, and product-minded engineering.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View work
              </a>
              <a href="/Craig Togarepi- Software Developer.pdf" target="_blank" className="btn btn-ghost">
                Download resume
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="command-panel" aria-label="Portfolio highlights">
            <div className="panel-toolbar">
              <span />
              <span />
              <span />
            </div>
            <div className="signal-card signal-card-main">
              <span className="signal-label">Status</span>
              <strong>Available for product teams</strong>
              <p>Shipping useful, elegant software with a builder&apos;s pace.</p>
            </div>
            <div className="signal-grid">
              <div className="signal-card">
                <span className="signal-label">Launches</span>
                <strong>10+</strong>
              </div>
              <div className="signal-card">
                <span className="signal-label">Core</span>
                <strong>React / Next</strong>
              </div>
            </div>
            <div className="terminal-line">
              <span>deploy</span>
              <b>portfolio: futuristic build online</b>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="about" className="section-shell">
        <FadeIn className="content split-section">
          <div>
            <p className="eyebrow">About</p>
            <h2>Engineering that feels sharp before the first click.</h2>
            <p className="section-copy">
              I connect interface craft with reliable architecture: design systems, APIs, data dashboards, deployment, and the small interaction details that make products feel alive.
            </p>
          </div>

          <div className="profile-panel">
            <Image src="/hero-feature-3.svg" alt="Product systems illustration" width={640} height={460} priority />
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="content service-grid">
          {SERVICES.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </FadeIn>
      </section>

      <section id="skills" className="section-shell">
        <div className="content section-header">
          <div>
            <p className="eyebrow">Tech Stack</p>
            <h2>The tools I use to build scalable products.</h2>
          </div>
        </div>
        <FadeIn delay={0.2} className="content">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '32px' }}>
            {['ReactJS', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Django', 'Tailwind CSS', 'Firebase', 'PostgreSQL', 'SEO', 'Framer Motion'].map(skill => (
              <span key={skill} style={{ display: 'inline-flex', padding: '0.6rem 1rem', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', color: 'var(--text)', background: 'rgba(255, 255, 255, 0.04)', fontSize: '0.9rem', fontWeight: 700 }}>
                {skill}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      <section id="projects" className="section-shell projects-section">
        <div className="content section-header">
          <div>
            <p className="eyebrow">Featured work</p>
            <h2>Selected builds across web, dashboards, and mobile.</h2>
          </div>

          <div className="tabs" aria-label="Project filters">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`tab-button ${active === tab.key ? "active" : ""}`}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <FadeIn delay={0.2} className="content project-grid">
          {list.map((project) => {
            const activeLink = project.href && project.href !== "#";
            return (
              <article key={project.id} className="project-card">
                <div className="project-visual">
                  <div className="project-scanline" />
                  <Image src={ICONS[project.category]} alt="" width={112} height={112} />
                </div>
                <div className="project-body">
                  <div className="project-kicker">{project.metric}</div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="project-stack">
                    {project.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  {activeLink ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="text-link">
                      Open live project
                    </a>
                  ) : (
                    <span className="text-link muted-link">Private prototype</span>
                  )}
                </div>
              </article>
            );
          })}
        </FadeIn>
      </section>

      <section id="contact" className="section-shell contact-section">
        <div className="content contact-panel">
          <p className="eyebrow">Contact</p>
          <h2>Have a product that needs a sharper interface and stronger build?</h2>
          <p className="section-copy">
            I&apos;m open to full-time roles, contract builds, and product launches where design quality and engineering speed both matter.
          </p>
          <div className="hero-actions">
            <a href="mailto:craigtogs@gmail.com" className="btn btn-primary">
              Email me
            </a>
            <a href="https://www.linkedin.com/in/craig-togarepi" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="content footer-inner">
          <span>Craig Togarepi / Full-stack engineer / 2026</span>
          <div>
            <a href="mailto:craigtogs@gmail.com">Email</a>
            <a href="https://github.com/tristenswisss" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/craig-togarepi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
