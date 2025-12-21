"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
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

  const projects = [
    {
      id: 1,
      title: "Aaranal",
      category: "E-Commerce",
      description: "Full-stack eCommerce platform for a tote bag business with secure payments and admin dashboard.",
      image: "/assets/aaranal.png",
      tags: ["Next.js", "Razorpay", "AWS"],
      link: "https://aaranaltales.shop"
    },
    {
      id: 2,
      title: "ChipSphere",
      category: "Education",
      description: "Educational platform with curated resources and interactive tools for ECE students.",
      image: "/assets/chipsphere.png",
      tags: ["Next.js", "Node.js", "Tailwind"],
      link: "https://www.chipsphere.in"
    }
  ];

  return (
    <section id="projects" className="py-32 relative" ref={sectionRef}>
      <div className="divider mb-32"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className={`mono mb-8 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          Projects
        </div>

        {/* Header */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-[1.1] tracking-tight">
              Selected Work
            </h2>
            <p className="text-lg text-white/45 font-light max-w-md">
              Recent projects that showcase our capabilities.
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`block group ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 group-hover:border-white/20 transition-all">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-left transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full">
                        Visit Site <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="mono mb-4">{project.category}</div>
                  <h3 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/45 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 text-sm text-white/40 border border-white/10 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}