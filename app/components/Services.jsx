"use client";

import { useEffect, useRef, useState } from "react";

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
  },
];

const techRow1 = ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Figma", "Tailwind"];
const techRow2 = ["GraphQL", "Prisma", "MongoDB", "Docker", "Vercel", "Redux", "Firebase", "Supabase"];

function SectionHeader({ isVisible, className = "" }) {
  return (
    <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      <div className="mono mb-6">— Services</div>
      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 lg:items-end">
        <h2 className="text-5xl md:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight">
          What we do<span className="text-white/30">.</span>
        </h2>
        <p className="text-lg md:text-xl text-white/45 max-w-md font-light lg:text-right">
          End-to-end digital solutions crafted for ambitious brands.
        </p>
      </div>
    </div>
  );
}

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Desktop only: map scroll position inside the pinned area to the active service.
  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const container = containerRef.current;
      const sticky = stickyRef.current;
      // offsetParent is null when the desktop layout is hidden (mobile)
      if (!container || !sticky || container.offsetParent === null) return;

      const top = container.getBoundingClientRect().top;
      const scrollable = container.offsetHeight - sticky.offsetHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -top / scrollable));
      setActiveService(Math.min(services.length - 1, Math.floor(progress * services.length)));
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  // Clicking a panel scrolls to that panel's slot so scroll and click never disagree.
  const goToService = (i) => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const scrollable = container.offsetHeight - sticky.offsetHeight;
    const target = containerTop + ((i + 0.5) / services.length) * scrollable;

    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative" ref={sectionRef}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* ---------- Mobile / tablet: simple stacked cards ---------- */}
      <div className="lg:hidden py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader isVisible={isVisible} className="mb-12 md:mb-16" />

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, i) => (
              <div
                key={i}
                className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="mono text-sm mb-4 text-white/40">0{i + 1}</div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{service.fullTitle}</h3>
                <p className="text-white/50 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Desktop: scroll-pinned horizontal accordion ---------- */}
      <div ref={containerRef} className="hidden lg:block" style={{ height: "250vh" }}>
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen flex flex-col justify-center py-12 bg-black"
          style={{ height: "100dvh" }}
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <SectionHeader isVisible={isVisible} className="mb-10 xl:mb-12" />

            {/* Progress indicator */}
            <div className={`flex gap-2 mb-8 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              {services.map((service, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show ${service.fullTitle}`}
                  onClick={() => goToService(i)}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: activeService === i ? "48px" : "12px",
                    backgroundColor: activeService >= i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            {/* Horizontal accordion */}
            <div
              className={`flex gap-3 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ height: "clamp(280px, 42vh, 440px)" }}
            >
              {services.map((service, i) => {
                const active = activeService === i;
                return (
                  <div
                    key={i}
                    onClick={() => goToService(i)}
                    className={`service-panel ${active ? "is-active" : ""} min-w-0 cursor-pointer rounded-2xl border overflow-hidden`}
                    style={{
                      flex: active ? "3 1 0%" : "1 1 0%",
                      backgroundColor: active ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                      borderColor: active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="p-8 h-full flex flex-col">
                      <div
                        className="mono text-sm mb-4"
                        style={{
                          color: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
                          transition: "color 0.5s ease",
                        }}
                      >
                        0{i + 1}
                      </div>

                      <div className="flex-1 flex flex-col justify-center min-h-0">
                        <h3
                          className="font-bold tracking-tight whitespace-nowrap"
                          style={{
                            fontSize: active ? "clamp(1.75rem, 2.6vw, 2.5rem)" : "1.25rem",
                            color: active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.35)",
                            marginBottom: active ? "1rem" : "0",
                            transition: "color 0.5s ease, font-size 0.5s ease, margin 0.5s ease",
                          }}
                        >
                          {active ? service.fullTitle : service.title}
                        </h3>

                        {/* Fixed min-width keeps the text from reflowing while the panel animates */}
                        <p
                          className="text-white/50 leading-relaxed text-lg max-w-xl min-w-[18rem]"
                          style={{
                            display: active ? "block" : "none",
                            animation: active ? "serviceDescIn 0.6s ease 0.25s both" : undefined,
                          }}
                        >
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
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

      {/* Tech marquee */}
      <div className={`py-16 md:py-20 overflow-hidden transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="space-y-4">
          <div className="overflow-hidden">
            <div className="flex whitespace-nowrap" style={{ animation: "marqueeLeft 30s linear infinite" }}>
              {[...techRow1, ...techRow1].map((tech, i) => (
                <span key={i} className="text-4xl md:text-7xl font-bold text-white/[0.08] px-6 md:px-8 flex-shrink-0">{tech}</span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex whitespace-nowrap" style={{ animation: "marqueeRight 30s linear infinite" }}>
              {[...techRow2, ...techRow2].map((tech, i) => (
                <span key={i} className="text-4xl md:text-7xl font-bold text-white/[0.08] px-6 md:px-8 flex-shrink-0">{tech}</span>
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
          @keyframes serviceDescIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .service-panel:not(.is-active) h3 {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            transform: rotate(180deg);
          }
        `
      }} />
    </section>
  );
}
