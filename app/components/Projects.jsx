"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [clickedInProgress, setClickedInProgress] = useState(null);
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
      year: "2024",
      status: "Live",
      description: "Premium tote bags brand with seamless checkout & admin dashboard",
      link: "https://aaranaltales.shop",
      tags: ["Next.js", "Razorpay", "AWS"]
    },
    {
      id: 2,
      title: "ChipSphere",
      category: "EdTech",
      year: "2024",
      status: "Live",
      description: "Electronics learning platform with interactive quizzes & resources",
      link: "https://www.chipsphere.in",
      tags: ["Next.js", "PostgreSQL", "Auth"]
    },
    {
      id: 3,
      title: "Fira",
      category: "Event Management",
      year: "2025",
      status: "In Progress",
      description: "Complete event management platform for organizers and attendees",
      link: "#",
      tags: ["Next.js", "Node.js", "MongoDB"]
    },
    {
      id: 4,
      title: "Atmosphere",
      category: "Social Media",
      year: "2025",
      status: "In Progress",
      description: "Next-gen social media app for meaningful connections",
      link: "#",
      tags: ["React Native", "Firebase", "AI"]
    },
    {
      id: 5,
      title: "Mayo Cosmic Care",
      category: "MLM Platform",
      year: "2025",
      status: "In Progress",
      description: "Multi-level marketing website with referral tracking & dashboards",
      link: "#",
      tags: ["Next.js", "PostgreSQL", "Stripe"]
    }
  ];

  const handleProjectClick = (e, project) => {
    if (project.status === "In Progress") {
      e.preventDefault();
      setClickedInProgress(project.id);
      setTimeout(() => setClickedInProgress(null), 2000);
    }
  };

  return (
    <section id="projects" className="py-40 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mono mb-6">— Featured Work</div>
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:items-end">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              Projects<span className="text-white/30">.</span>
            </h2>
            <p className="text-xl text-white/45 max-w-md font-light lg:text-right">
              Selected work for ambitious brands and startups.
            </p>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-0">
          {projects.map((project, i) => (
            <a
              key={project.id}
              href={project.status === "In Progress" ? undefined : project.link}
              target={project.status === "Live" ? '_blank' : undefined}
              rel={project.status === "Live" ? "noopener noreferrer" : undefined}
              onClick={(e) => handleProjectClick(e, project)}
              className={`group block py-12 border-t border-white/10 last:border-b transition-all duration-700 ${project.status === "In Progress" ? 'cursor-default' : 'cursor-pointer'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left - Title & Number */}
                <div className="flex items-baseline gap-8">
                  <span className="mono text-white/20 text-sm">0{i + 1}</span>
                  <div>
                    <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-500 ${hoveredProject === project.id ? 'translate-x-4' : ''}`}>
                      {project.title}
                      {project.status === "Live" ? (
                        <ArrowUpRight className={`inline-block ml-4 w-8 h-8 md:w-10 md:h-10 transition-all duration-500 ${hoveredProject === project.id ? 'opacity-100 translate-x-2 -translate-y-2' : 'opacity-0'}`} />
                      ) : (
                        <span className={`inline-block ml-6 text-lg md:text-xl font-medium transition-all duration-500 ${hoveredProject === project.id || clickedInProgress === project.id
                          ? 'opacity-100'
                          : 'opacity-0'
                          } ${clickedInProgress === project.id ? 'text-white animate-pulse' : 'text-white/50'}`}>
                          In Progress
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                {/* Right - Meta */}
                <div className="flex items-center gap-8 lg:gap-12 ml-14 lg:ml-0">
                  <div className={`transition-all duration-500 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Category</div>
                    <div className="text-white/70">{project.category}</div>
                  </div>
                  <div className={`transition-all duration-500 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Year</div>
                    <div className="text-white/70">{project.year}</div>
                  </div>
                  <div className={`transition-all duration-500 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${project.status === 'Live'
                      ? 'bg-white/10 text-white/70'
                      : clickedInProgress === project.id
                        ? 'bg-white text-black scale-110'
                        : 'border border-white/20 text-white/50'
                      }`}>
                      {project.status === 'In Progress' && <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${clickedInProgress === project.id ? 'bg-black' : 'bg-white/50 animate-pulse'}`}></span>}
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expandable description */}
              <div className={`overflow-hidden transition-all duration-500 ease-out ${hoveredProject === project.id ? 'max-h-32 opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="ml-14 lg:ml-20 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <p className="text-lg text-white/50 max-w-xl">{project.description}</p>
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 text-xs text-white/40 border border-white/10 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}