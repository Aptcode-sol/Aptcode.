"use client";

import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = document.getElementById("particles");
      if (!particlesContainer) return;

      const particleCount = 25;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        const size = Math.random();
        if (size > 0.85) {
          particle.classList.add("large");
        } else if (size < 0.35) {
          particle.classList.add("small");
        }

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 25 + 30}s`;
        particle.style.animationDelay = `${Math.random() * 35}s`;
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center text-center relative z-10 px-6"
    >
      <div className="max-w-5xl">
        {/* Status */}
        <div className="flex justify-center mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"></span>
            <span className="mono">Available for Projects</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-semibold leading-[0.9] tracking-[-0.04em] mb-8 opacity-0 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          Aptcode
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/50 mb-8 font-light tracking-wide max-w-xl mx-auto opacity-0 animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          Web & App Development Studio
        </p>

        {/* Tagline */}
        <p className="text-base md:text-lg text-white/40 mb-16 font-light max-w-lg mx-auto leading-relaxed opacity-0 animate-fadeIn" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          We craft digital experiences with precision engineering
          and thoughtful design.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fadeInUp" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-medium tracking-wide rounded-full transition-all duration-300 hover:bg-white/90"
          >
            Start a Project
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white/80 font-medium tracking-wide rounded-full transition-all duration-300 hover:border-white/40 hover:text-white"
          >
            View Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-fadeIn" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
        <span className="mono text-[10px]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-gentle-bounce"></div>
      </div>
    </section>
  );
}
