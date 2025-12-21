"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Aaranal",
      description: "Full-stack eCommerce platform for a tote bag business with secure payments and admin dashboard.",
      image: "/assets/aaranal.png",
      tags: ["Next.js", "Razorpay", "AWS"],
      link: "https://aaranaltales.shop",
    },
    {
      id: 2,
      title: "ChipSphere",
      description: "Educational platform with curated resources and interactive tools for ECE students.",
      image: "/assets/chipsphere.png",
      tags: ["Next.js", "Node.js", "Tailwind"],
      link: "https://www.chipsphere.in",
    }
  ];

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-6 font-light">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-6">
              Selected Work<span className="text-white/30">.</span>
            </h2>
            <p className="text-lg text-white/50 font-light max-w-xl mx-auto">
              Innovative solutions tailored to meet diverse business needs.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl mb-8 border border-white/5">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-left transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-white/90 mb-3 tracking-wide group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 font-light leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 text-xs text-white/50 border border-white/10 rounded-full font-light tracking-wide"
                        >
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
      </div>
    </section>
  );
}