"use client";

import { useEffect, useRef, useState } from "react";

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = container.offsetHeight;
      const stickyHeight = stickyRef.current.offsetHeight;
      const scrollableDistance = containerHeight - stickyHeight;

      // Calculate progress through the scrollable area
      if (containerTop <= 0 && containerTop > -scrollableDistance) {
        const progress = Math.abs(containerTop) / scrollableDistance;
        const serviceIndex = Math.min(3, Math.floor(progress * 4));
        setActiveService(serviceIndex);
      } else if (containerTop > 0) {
        setActiveService(0);
      } else if (containerTop <= -scrollableDistance) {
        setActiveService(3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Web",
      fullTitle: "Web Development",
      desc: "High-performance websites and web apps built with Next.js, React, and modern frameworks that load fast and scale infinitely.",
    },
    {
      title: "Mobile",
      fullTitle: "Mobile Apps",
      desc: "Native-quality mobile experiences for iOS and Android using React Native with offline-first capabilities.",
    },
    {
      title: "Software",
      fullTitle: "Custom Software",
      desc: "Bespoke solutions with APIs, cloud architecture, automation, and AI/ML integration for your business.",
    },
    {
      title: "Design",
      fullTitle: "UI/UX Design",
      desc: "Beautiful, intuitive interfaces backed by user research, wireframing, prototyping, and design systems.",
    }
  ];

  const techRow1 = ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Figma", "Tailwind"];
  const techRow2 = ["GraphQL", "Prisma", "MongoDB", "Docker", "Vercel", "Redux", "Firebase", "Supabase"];

  return (
    <section id="services" className="relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Outer container with extra height for scroll */}
      <div ref={containerRef} style={{ height: '400vh' }}>
        {/* Sticky content */}
        <div
          ref={stickyRef}
          className="sticky top-0 min-h-screen flex flex-col justify-center py-20 bg-black"
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            {/* Section header */}
            <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mono mb-6">— Services</div>
              <div className="flex flex-col lg:flex-row justify-between gap-8 lg:items-end">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
                  What we do<span className="text-white/30">.</span>
                </h2>
                <p className="text-xl text-white/45 max-w-md font-light lg:text-right">
                  End-to-end digital solutions crafted for ambitious brands.
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className={`flex gap-2 mb-10 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveService(i)}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: activeService === i ? '48px' : '12px',
                    backgroundColor: activeService >= i ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)'
                  }}
                />
              ))}
            </div>

            {/* Horizontal Accordion */}
            <div className={`flex flex-col lg:flex-row gap-3 lg:h-[320px] transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {services.map((service, i) => (
                <div
                  key={i}
                  onClick={() => setActiveService(i)}
                  className="service-panel cursor-pointer rounded-2xl border overflow-hidden"
                  style={{
                    flex: activeService === i ? '3' : '1',
                    backgroundColor: activeService === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                    borderColor: activeService === i ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                    transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div className="p-6 lg:p-8 h-full flex flex-col">
                    <div
                      className="mono text-sm mb-4"
                      style={{
                        color: activeService === i ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                        transition: 'color 0.5s ease'
                      }}
                    >
                      0{i + 1}
                    </div>

                    <div className="title-wrapper flex-1 flex flex-col justify-center">
                      <h3
                        className="font-bold tracking-tight whitespace-nowrap"
                        style={{
                          fontSize: activeService === i ? 'clamp(1.5rem, 4vw, 2.25rem)' : '1.25rem',
                          color: activeService === i ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.35)',
                          marginBottom: activeService === i ? '1rem' : '0',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {activeService === i ? service.fullTitle : service.title}
                      </h3>

                      <p
                        className="text-white/50 leading-relaxed"
                        style={{
                          opacity: activeService === i ? 1 : 0,
                          maxHeight: activeService === i ? '150px' : '0',
                          overflow: 'hidden',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2 text-white/20 text-xs uppercase tracking-widest">
                <span>Keep scrolling</span>
                <svg className="w-3 h-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Marquee - outside sticky area */}
      <div className={`py-20 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="space-y-4">
          <div className="overflow-hidden">
            <div className="flex whitespace-nowrap" style={{ animation: 'marqueeLeft 30s linear infinite' }}>
              {[...techRow1, ...techRow1].map((tech, i) => (
                <span key={i} className="text-5xl md:text-7xl font-bold text-white/[0.08] px-8 flex-shrink-0">{tech}</span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex whitespace-nowrap" style={{ animation: 'marqueeRight 30s linear infinite' }}>
              {[...techRow2, ...techRow2].map((tech, i) => (
                <span key={i} className="text-5xl md:text-7xl font-bold text-white/[0.08] px-8 flex-shrink-0">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          @media (min-width: 1024px) {
            .service-panel .title-wrapper h3 {
              writing-mode: vertical-rl;
              text-orientation: mixed;
              transform: rotate(180deg);
            }
            .service-panel[style*="flex: 3"] .title-wrapper h3 {
              writing-mode: horizontal-tb !important;
              transform: none !important;
            }
          }
        `
      }} />
    </section>
  );
}
