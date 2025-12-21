"use client";

import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = document.getElementById("particles");
      if (!particlesContainer) return;

      // Reduced particle count for cleaner look
      const particleCount = 30;
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
        particle.style.animationDuration = `${Math.random() * 20 + 25}s`;
        particle.style.animationDelay = `${Math.random() * 30}s`;
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return (
    <section
      id="home"
      className="hero min-h-screen flex items-center justify-center text-center relative z-10"
    >
      <div className="hero-content max-w-5xl px-6">
        {/* Refined tagline - appears first with subtle styling */}
        <p className="text-sm md:text-base text-white/50 mb-6 uppercase tracking-[0.3em] font-light animate-fadeIn opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Web & App Development Studio
        </p>
        
        {/* Main headline - elegant, refined typography */}
        <h1 className="text-[clamp(3.5rem,12vw,8rem)] font-extralight mb-8 leading-[0.9] tracking-tight text-gradient animate-fadeIn opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          Aptcode<span className="text-white/30">.</span>
        </h1>
        
        {/* Tagline - refined */}
        <p className="text-lg md:text-xl text-white/60 mb-16 font-light tracking-wide max-w-xl mx-auto animate-fadeIn opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          Solutions engineered with precision
        </p>
        
        {/* Minimal CTA button */}
        <a
          href="#contact"
          className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/90 font-light tracking-wider rounded-full transition-all duration-500 hover:border-white/50 hover:bg-white/5 animate-fadeInUp opacity-0"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <span>Start Your Project</span>
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
      
      {/* Minimal scroll indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 animate-gentle-bounce opacity-0 animate-fadeIn" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
      </div>
    </section>
  );
}
