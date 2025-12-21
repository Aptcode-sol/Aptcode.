"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-40 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mono mb-6">— About</div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight max-w-4xl">
            We turn complex ideas into
            <span className="text-white/40"> elegant solutions.</span>
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left - Philosophy */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed mb-12">
              At Aptcode, we believe that great software is invisible. It simply works,
              delighting users while solving real problems. We combine technical excellence
              with thoughtful design to create products that matter.
            </p>

            {/* Stats - Horizontal */}
            <div className="flex gap-16 border-t border-white/10 pt-10">
              <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-5xl font-bold mb-2">5+</div>
                <div className="text-sm text-white/40 tracking-wide">Projects Delivered</div>
              </div>
              <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-5xl font-bold mb-2">100%</div>
                <div className="text-sm text-white/40 tracking-wide">Client Satisfaction</div>
              </div>
              <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-sm text-white/40 tracking-wide">Support</div>
              </div>
            </div>
          </div>

          {/* Right - Values */}
          <div className="space-y-8">
            {[
              { num: "01", title: "Precision", desc: "Every pixel, every line of code is crafted with intention and care." },
              { num: "02", title: "Performance", desc: "Lightning-fast experiences that scale with your growth." },
              { num: "03", title: "Partnership", desc: "We're not vendors. We're an extension of your team." }
            ].map((item, i) => (
              <div
                key={item.num}
                className={`group p-8 card hover-lift cursor-default transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className="flex items-start gap-6">
                  <span className="mono text-white/30 pt-1">{item.num}</span>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-white/90 transition-colors">{item.title}</h3>
                    <p className="text-white/45 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
