"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Smartphone, Code2 } from "lucide-react";

export default function Services() {
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

  const services = [
    { icon: Globe, title: "Web Development", description: "Responsive websites built with modern technologies. From corporate sites to complex applications.", tags: ["Next.js", "React", "Node.js"] },
    { icon: Smartphone, title: "Mobile Apps", description: "Native and cross-platform mobile applications with exceptional user experiences.", tags: ["React Native", "Flutter", "iOS"] },
    { icon: Code2, title: "Custom Software", description: "Scalable software solutions designed to streamline operations and drive growth.", tags: ["Python", "TypeScript", "APIs"] }
  ];

  return (
    <section id="services" className="py-32 relative" ref={sectionRef}>
      <div className="divider mb-32"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className={`mono mb-8 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          Services
        </div>

        {/* Header */}
        <div className={`max-w-2xl mb-20 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-[1.1] tracking-tight">
            What We Do
          </h2>
          <p className="text-lg text-white/45 font-light">
            Comprehensive digital solutions to transform your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card p-8 group ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <service.icon className="w-8 h-8 text-white/30 mb-8 group-hover:text-white/50 transition-colors" strokeWidth={1.5} />
              <h3 className="text-xl font-medium mb-4">{service.title}</h3>
              <p className="text-white/45 leading-relaxed mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs text-white/35 border border-white/10 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
