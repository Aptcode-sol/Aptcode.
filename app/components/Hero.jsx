"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    const [loaded, setLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden">

            {/* Animated Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 70%)'
                    }}
                />
            </div>

            {/* Center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[150px] animate-pulse-slow"></div>

            {/* Rotating rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[500px] h-[500px] rounded-full border border-white/[0.05] animate-spin-slow"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[700px] h-[700px] rounded-full border border-white/[0.03] animate-spin-slower"></div>
            </div>

            {/* Mouse glow */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.05), transparent 40%)`,
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,black_75%)]"></div>

            {/* Content */}
            <div className="relative z-20 text-center max-w-5xl">
                {/* Status pill */}
                <div className={`mb-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '100ms' }}>
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/80"></span>
                        </span>
                        <span className="text-xs text-white/50 tracking-widest uppercase">Available for Projects</span>
                    </div>
                </div>

                {/* Brand name */}
                <div
                    className={`mono text-white/30 text-sm mb-4 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    style={{ transitionDelay: '150ms' }}
                >
                    — Aptcode
                </div>

                {/* Headline */}
                <h1
                    className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: '200ms' }}
                >
                    We build digital<br />
                    <span className="text-white/40">products that matter.</span>
                </h1>

                {/* Subheading */}
                <p
                    className={`text-lg md:text-xl text-white/45 max-w-2xl mx-auto mb-12 font-light leading-relaxed transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: '400ms' }}
                >
                    A design & development studio crafting high-performance websites,
                    apps, and digital experiences for ambitious brands.
                </p>

                {/* CTAs */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
                    <a
                        href="#book-call-section"
                        className="group px-8 py-4 bg-white text-black font-medium rounded-full flex items-center justify-center gap-2 hover:bg-white/90 transition-all hover:scale-105"
                    >
                        <span>Start a Project</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#projects"
                        className="px-8 py-4 border border-white/15 text-white/70 font-medium rounded-full hover:border-white/30 hover:text-white transition-all flex items-center justify-center"
                    >
                        View Our Work
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
                        <div className="w-0.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>

            {/* Side decorations */}
            <div className={`absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/15 to-transparent"></div>
            </div>
            <div className={`absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/15 to-transparent"></div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.03; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.05; transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 90s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
}
