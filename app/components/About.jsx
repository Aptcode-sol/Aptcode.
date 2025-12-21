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
    <section id="about" className="py-16 sm:py-24 md:py-32 lg:py-40 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className={`mb-12 sm:mb-16 md:mb-20 lg:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mono mb-4 sm:mb-6">— About</div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight max-w-4xl">
            We turn complex ideas into
            <span className="text-white/40"> elegant solutions.</span>
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-32">
          {/* Left - Philosophy */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/60 font-light leading-relaxed mb-8 sm:mb-12">
              At Aptcode, we believe that great software is invisible. It simply works,
              delighting users while solving real problems. We combine technical excellence
              with thoughtful design to create products that matter.
            </p>

            {/* Stats - Grid on mobile, flex on larger screens */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 md:flex md:gap-16 border-t border-white/10 pt-6 sm:pt-10">
              <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">5+</div>
                <div className="text-xs sm:text-sm text-white/40 tracking-wide">Projects Delivered</div>
              </div>
              <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-sm text-white/40 tracking-wide">Client Satisfaction</div>
              </div>
              <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm text-white/40 tracking-wide">Support</div>
              </div>
            </div>
          </div>

          {/* Right - Values */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {[
              { num: "01", title: "Precision", desc: "Every pixel, every line of code is crafted with intention and care." },
              { num: "02", title: "Performance", desc: "Lightning-fast experiences that scale with your growth." },
              { num: "03", title: "Partnership", desc: "We're not vendors. We're an extension of your team." }
            ].map((item, i) => (
              <div
                key={item.num}
                className={`group p-5 sm:p-6 md:p-8 card hover-lift cursor-default transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                  <span className="mono text-white/30 pt-1">{item.num}</span>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 group-hover:text-white/90 transition-colors">{item.title}</h3>
                    <p className="text-sm sm:text-base text-white/45 leading-relaxed">{item.desc}</p>
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
