"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  category: "web" | "mobile" | "dash";
  img: string;
  href: string; // placeholder links for user to replace later
  withPrimaryCta?: boolean;
  desc: string;
  stack: string[]; // Added stack information
};

const ALL_PROJECTS: Project[] = [
  { id: "p1", title: "Mental Health Platform", category: "dash", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=600&fit=crop", href: "https://mentalmatezw.lovable.app", withPrimaryCta: true, desc: "A comprehensive mental health support platform with real-time chat, mood tracking, and AI-powered recommendations. Built with React and Node.js for scalability.", stack: ["React", "TypeScript", "Next.js"] },
  { id: "p2", title: "Landific", category: "dash", img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&h=600&fit=crop", href: "https://landific.vercel.app/", desc: "Streamlined land management system with property tracking, document management, and real-time reporting. Features a modern, intuitive interface for real estate teams.", stack: ["React", "CSS3", "Node.js"] },
  { id: "p3", title: "Uncommon.org", category: "web", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&h=600&fit=crop", href: "https://uncommon.org", desc: "Uncommon.org is a 501(c)(3) nonprofit organization headquartered in New York with program operations in Zimbabwe through the Uncommon.org Trust. Focused on creating positive social impact through innovative programs.", stack: ["React", "TypeScript", "Firebase"] },
  { id: "p4", title: "Talent Platform", category: "web", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop", href: "https://talent.uncommon.org/", desc: "Advanced talent management platform for tracking skills, opportunities, and career development. Features interactive profiles and job matching.", stack: ["React", "TypeScript", "Chart.js"] },
  { id: "p7", title: "Playground", category: "web", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop", href: "https://playground.uncommon.org", desc: "Interactive learning platform for developers and designers. Features coding challenges, design templates, and collaborative tools for skill development.", stack: ["React", "TypeScript", "Node.js"] },
  { id: "p5", title: "Uber Cargo", category: "mobile", img: "https://images.unsplash.com/photo-1529168407385-c8a4d5477397?w=900&h=600&fit=crop", href: "#", desc: "Uber-style cargo transportation app connecting shippers with available drivers. Features real-time tracking, secure payments, and route optimization for efficient delivery services.", stack: ["React Native", "TypeScript", "Firebase"] },
  { id: "p6", title: "Mirae Cultural Community", category: "mobile", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&h=600&fit=crop", href: "#", desc: "Community-based mobile app for people to connect with others of the same cultural background. Features cultural events, language exchange, and community forums for cultural preservation.", stack: ["Flutter", "Dart", "Firebase"] },
];

const TABS = [
  { key: "web" as const, label: "Websites development" },
  { key: "mobile" as const, label: "Mobile applications" },
  { key: "dash" as const, label: "Dashboards" },
];

export default function Home() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("web");
  const [showCount, setShowCount] = useState(3);

  const list = useMemo(() => ALL_PROJECTS.filter(p => p.category === active), [active]);
  const visibleProjects = useMemo(() => list.slice(0, showCount), [list, showCount]);
  const hasMoreProjects = list.length > showCount;

  const handleTabChange = (newActive: (typeof TABS)[number]["key"]) => {
    setActive(newActive);
    setShowCount(3); // Reset to show 3 projects when switching tabs
  };

  return (
    <>
      {/* Hero */}
      <section id="home" className="section relative min-h-screen flex items-center" style={{
        backgroundImage: 'url(/Hero section.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/40" />
        {/* Futuristic grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(58,166,185,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(58,166,185,0.03)_1px,transparent_1px)] bg-size-[80px_80px] animate-pulse" />
        <div className="container relative z-10 max-w-4xl mx-auto px-0 text-center">
          {/* Welcome text - center aligned */}
          <div className="mx-auto">
            <div className="hero-kicker text-sm tracking-[0.4em] mb-3 text-white/80">I AM A</div>
            <h1 className="hero-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] mb-4 mx-auto">
              <span style={{
                background: 'linear-gradient(90deg,#86b7c0 0%, #2e6071 55%, #213b45 100%)',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>DEVELOPER</span>
            </h1>
            <p className="hero-sub text-lg mb-6 text-white/70 mx-auto max-w-3xl">
              Passionate full-stack developer skilled in building modern, high-performing web and mobile applications. I specialize in React, Next.js, Nest.js, and React Native — delivering scalable, SEO-optimized solutions with seamless user experiences. Focused on clean architecture, performance, and innovation, I turn ideas into reliable digital products that help businesses grow.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <a className="btn btn-primary" href="/CRAIG TOGAREPI.pdf" target="_blank" style={{ boxShadow: '0 0 0 2px #e34b4b' }}>Resume</a>
              <button className="btn-circle" aria-label="Call" style={{ borderColor: '#3aa6b9', boxShadow: '0 0 0 2px #e34b4b' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V20a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4 2h3.09a2 2 0 0 1 2 1.72c.12.81.3 1.6.57 2.34a2 2 0 0 1-.45 2.11L8.1 9.91a16 16 0 0 0 6 6l1.74-1.11a2 2 0 0 1 2.11-.45c.74.27 1.53.45 2.34.57A2 2 0 0 1 22 16.92z" stroke="#cbd5e1" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 pt-8">
              {/* GitHub */}
              <a 
                href="https://github.com/tristenswisss" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon btn-circle"
                aria-label="GitHub"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="currentColor"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/craig-togarepi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon btn-circle"
                aria-label="LinkedIn"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor"/>
                </svg>
              </a>
              
              {/* WhatsApp */}
              <a 
                href="https://wa.me/263788922474" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon btn-circle"
                aria-label="WhatsApp"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.09.157 6.014L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.488z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About / Tech */}
      <section id="about" className="section py-8 relative" style={{ background: 'rgba(0,0,0,0.5)' }}>
        {/* Futuristic background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-cyan-500/10 blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-red-500/5 blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="container max-w-6xl mx-auto px-0">
          <div className="card p-6 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="section-title mb-4">About me</h3>
                <p className="section-sub leading-relaxed">
                  With years of experience in full-stack development, I specialize in creating scalable, maintainable applications. I focus on writing clean code, implementing best practices, and delivering exceptional user experiences that drive business growth.
                </p>
              </div>
              <div className="p-6 overflow-hidden">
                <div className="rounded-[14px] overflow-hidden opacity-40 ">
                  <Image 
                    src="/side-shot-code-editor-using-react-js 1.png" 
                    alt="Code editor" 
                    width={800} 
                    height={600} 
                    className="img-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="card p-6 relative overflow-hidden group">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="section-title mb-4">Technologies</h3>
              <p className="section-sub mb-6">These are my main technologies for building robust, scalable applications with modern development practices</p>
              <div className="grid grid-cols-2 gap-3">
                {["React/reactNative","TypeScript/Js","HTML,CSS3","Next.js/NestJs","Node/ExpressJs","Golang"].map((t,i)=> (
                  <div key={i} className="flex items-center gap-2 badge group-hover:scale-105 transition-transform duration-200">
                    <span className="w-2 h-2 rounded-full" style={{background:i%2? '#3aa6b9':'#4cc9f0'}}></span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6 relative overflow-hidden group">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="section-title mb-4">What I do</h3>
              <p className="section-sub mb-6">Focused on building scalable web applications and APIs using modern technologies and best practices</p>
              <div className="grid grid-cols-2 gap-3">
                {["Frontend Dev","Backend API","UI/UX Design","Testing","Deployment","Maintenance/S.E.O"].map((t,i)=> (
                  <div key={i} className="flex items-center gap-2 badge group-hover:scale-105 transition-transform duration-200">
                    <span className="w-2 h-2 rounded-full" style={{background:i%2? '#3aa6b9':'#4cc9f0'}}></span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Projects Tabs */}
      <section className="section-tight py-6" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="container">
          <h3 className="text-center text-white font-semibold mb-6" style={{ fontFamily: 'var(--font-dyna-puff)' }}>Recent Projects</h3>
          <div className="mx-auto w-auto lg:w-max glass p-2 rounded-full flex items-center gap-2 relative">
            {/* Glow effect behind active tab */}
            {TABS.map((t, index) => active === t.key && (
              <div
                key={`glow-${t.key}`}
                className="absolute inset-y-1 w-24 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-md transition-all duration-300"
                style={{ left: `${index * (100 / TABS.length)}%` }}
              />
            ))}
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => handleTabChange(t.key)}
                className={`px-4 py-2 rounded-full transition-all duration-300 relative z-10 ${active === t.key ? 'text-white' : 'text-[var(--muted)] hover:text-white/90'}`}
                style={{
                  backgroundColor: active === t.key ? 'rgba(255,255,255,0.06)' : 'transparent'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section id="projects" className="section pt-2 pb-16 relative">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => {
            const seed = i * 9876;
            const random = (seed: number) => {
              const x = Math.sin(seed++) * 10000;
              return x - Math.floor(x);
            };
            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-purple-400/40 animate-float"
                style={{
                  left: `${random(seed) * 100}%`,
                  top: `${random(seed + 1) * 100}%`,
                  animationDelay: `${random(seed + 2) * 4}s`,
                  animationDuration: `${3 + random(seed + 3) * 2}s`,
                }}
              />
            );
          })}
        </div>
        <div className="container max-w-6xl mx-auto px-0">
          <div className="grid md:grid-cols-2 gap-8">
            {visibleProjects.map((p) => (
              <article key={p.id} className="card overflow-hidden group relative">
                {p.category === 'mobile' ? (
                  <div className="block">
                    <div className="p-5">
                      <h4 className="text-white font-semibold mb-3" style={{ fontFamily: 'var(--font-dyna-puff)' }}>{p.title}</h4>
                      <div className="rounded-xl overflow-hidden mb-4">
                        <img src={p.img} alt={p.title} className="img-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <p className="section-sub mb-4">{p.desc}</p>
                      <div className="flex items-center justify-between">
                        {/* Stack icons - visible when not hovered */}
                        <div className="flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
                          {p.stack.map((tech, i) => (
                            <span key={i} className="btn-circle" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
                              {tech.charAt(0)}
                            </span>
                          ))}
                        </div>
                        {/* Live site button - visible when hovered */}
                        <span className="btn btn-primary absolute bottom-5 left-5 right-5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-center justify-center">
                          Live preview coming soon
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a href={p.href} target="_blank" rel="noopener" className="block">
                    <div className="p-5">
                      <h4 className="text-white font-semibold mb-3" style={{ fontFamily: 'var(--font-dyna-puff)' }}>{p.title}</h4>
                      <div className="rounded-xl overflow-hidden mb-4">
                        <img src={p.img} alt={p.title} className="img-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <p className="section-sub mb-4">{p.desc}</p>
                      <div className="flex items-center justify-between">
                        {/* Stack icons - visible when not hovered */}
                        <div className="flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
                          {p.stack.map((tech, i) => (
                            <span key={i} className="btn-circle" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
                              {tech.charAt(0)}
                            </span>
                          ))}
                        </div>
                        {/* Live site button - visible when hovered */}
                        <span className="btn btn-primary absolute bottom-5 left-5 right-5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-center justify-center">
                          Go to live site
                          <svg className="ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 5l7 7-7 7" stroke="#0d1b21" strokeWidth="2"/></svg>
                        </span>
                      </div>
                    </div>
                  </a>
                )}
              </article>
            ))}
          </div>

          {/* Show More Button */}
          {hasMoreProjects && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowCount(prev => prev + 3)}
                className="btn btn-outline px-8 py-3"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
                Show More Projects
              </button>
            </div>
          )}
        </div>
      </section>



      {/* Get In Touch */}
      <section id="contact" className="section py-16" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="container max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-dyna-puff)' }}>
            Have a Project in Mind?
          </h3>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            I am always excited to work on new challenges and bring creative ideas to life.
            Let&apos;s discuss how we can collaborate on your next project.
          </p>
          <div className="flex items-center justify-center mb-6">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-green-400 font-semibold">Available for new opportunities</span>
          </div>
          <a href="mailto:craigtogs@gmail.com" className="btn btn-primary px-8 py-4 text-lg">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Start a Conversation
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => {
            const seed = i * 4321;
            const random = (seed: number) => {
              const x = Math.sin(seed++) * 10000;
              return x - Math.floor(x);
            };
            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-400/30 animate-float"
                style={{
                  left: `${random(seed) * 100}%`,
                  top: `${random(seed + 1) * 100}%`,
                  animationDelay: `${random(seed + 2) * 3}s`,
                  animationDuration: `${4 + random(seed + 3) * 3}s`,
                }}
              />
            );
          })}
        </div>
        <div className="container grid md:grid-cols-2 gap-6 items-center relative z-10">
          <div className="text-sm">Craig <span className="text-muted">Copyright 2025 | All rights reserved</span></div>
          <div className="text-sm">
            <div className="font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-dyna-puff)' }}>Connect</div>
            <div className="flex flex-wrap gap-4">
               <a href="mailto:craigtogs@gmail.com" className="text-[var(--muted)] hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8L10 13L21 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </a>
                <a href="https://github.com/tristenswisss" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/craig-togarepi" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://wa.me/263788922474" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.09.157 6.014L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.488z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Decorative bottom border */}
        <div className="mt-8 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
      </footer>
    </>
  );
}
