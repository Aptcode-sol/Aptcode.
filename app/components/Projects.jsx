"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
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
    // Check if we're on mobile (no hover capability)
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;

    if (isMobile) {
      e.preventDefault();
      // Toggle expanded state
      setExpandedProject(expandedProject === project.id ? null : project.id);

      if (project.status === "In Progress") {
        setClickedInProgress(project.id);
        setTimeout(() => setClickedInProgress(null), 2000);
      }
    } else {
      // Desktop behavior - open link if live
      if (project.status === "In Progress") {
        e.preventDefault();
        setClickedInProgress(project.id);
        setTimeout(() => setClickedInProgress(null), 2000);
      }
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
                    <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-500 ${hoveredProject === project.id ? 'lg:translate-x-4' : ''}`}>
                      {project.title}
                      {project.status === "Live" ? (
                        <ArrowUpRight className={`inline-block ml-2 md:ml-4 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 transition-all duration-500 opacity-100 lg:opacity-0 ${hoveredProject === project.id ? 'lg:opacity-100 lg:translate-x-2 lg:-translate-y-2' : ''}`} />
                      ) : (
                        <span className={`inline-block ml-3 md:ml-6 text-base md:text-lg lg:text-xl font-medium transition-all duration-500 opacity-100 lg:opacity-0 ${hoveredProject === project.id || clickedInProgress === project.id
                          ? 'lg:opacity-100'
                          : ''
                          } ${clickedInProgress === project.id ? 'text-white animate-pulse' : 'text-white/50'}`}>
                          In Progress
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                {/* Right - Meta */}
                <div className="flex items-center gap-8 lg:gap-12 ml-14 lg:ml-0">
                  <div className="transition-all duration-500 opacity-100">
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Category</div>
                    <div className="text-white/70 text-sm md:text-base">{project.category}</div>
                  </div>
                  <div className="transition-all duration-500 opacity-100">
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-1">Year</div>
                    <div className="text-white/70 text-sm md:text-base">{project.year}</div>
                  </div>
                  <div className="transition-all duration-500 opacity-100">
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

              {/* Description - expandable on tap (mobile) or hover (desktop) */}
              <div className={`overflow-hidden transition-all duration-500 ease-out ${expandedProject === project.id || hoveredProject === project.id
                  ? 'max-h-48 opacity-100 mt-6'
                  : 'max-h-0 opacity-0 mt-0'
                }`}>
                <div className="ml-14 lg:ml-20 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                  <p className="text-sm md:text-base lg:text-lg text-white/50 max-w-xl">{project.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 md:px-3 py-1 md:py-1.5 text-xs text-white/40 border border-white/10 rounded-full">
                        {tag}
                      </span>
                    ))}
                    {/* View Project button for mobile on Live projects */}
                    {project.status === "Live" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="lg:hidden ml-2 px-4 py-2 bg-white text-black text-xs font-medium rounded-full flex items-center gap-1 hover:bg-white/90 transition-all"
                      >
                        View Project
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
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