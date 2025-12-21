"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    { number: "01", title: "Precision Engineering", description: "Every line of code crafted to deliver seamless experiences." },
    { number: "02", title: "User-Centric Design", description: "Intuitive interfaces that prioritize usability and engagement." },
    { number: "03", title: "Custom Solutions", description: "Bespoke solutions tailored to your business objectives." }
  ];

  return (
    <section id="about" className="py-32 relative" ref={sectionRef}>
      <div className="divider mb-32"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className={`mono mb-16 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          About
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left */}
          <div className={`${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-semibold mb-10 leading-[1.1] tracking-tight">
              Perfect Code,
              <br />
              Perfect Solution.
            </h2>

            <p className="text-lg text-white/50 font-light leading-relaxed mb-8">
              At Aptcode, we believe exceptional digital solutions begin with understanding your unique challenges. Our name reflects our promise: to write the perfect code for the perfect solution.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10">
              <div>
                <div className="text-3xl font-semibold mb-2">3+</div>
                <div className="text-sm text-white/40">Years</div>
              </div>
              <div>
                <div className="text-3xl font-semibold mb-2">50+</div>
                <div className="text-sm text-white/40">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-semibold mb-2">100%</div>
                <div className="text-sm text-white/40">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div className="space-y-6">
            {features.map((item, index) => (
              <div
                key={item.number}
                className={`card p-8 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start gap-6">
                  <span className="mono text-white/30">{item.number}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-white/45 leading-relaxed">{item.description}</p>
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
