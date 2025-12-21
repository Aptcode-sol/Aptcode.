"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);
  const navItemsRef = useRef({});

  const navItems = ["Home", "About", "Services", "Projects", "Contact"];

  useEffect(() => {
    setLoaded(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["home", "about", "services", "projects", "contact"];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update indicator position when active section changes
  useEffect(() => {
    const activeItem = navItemsRef.current[activeSection];
    if (activeItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    }
  }, [activeSection, loaded]);

  const smoothScroll = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) window.scrollTo({ behavior: "smooth", top: element.offsetTop - 80 });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? "py-4" : "py-6"
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => smoothScroll(e, "#home")}
            className="text-xl font-bold tracking-[-0.04em] hover:text-white/80 transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Aptcode
          </Link>

          {/* Desktop Navigation - Pill Container */}
          <div
            ref={navRef}
            className="hidden md:flex items-center gap-1 relative px-2 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            {/* Sliding indicator */}
            <div
              className="absolute top-2 bottom-2 bg-white rounded-full transition-all duration-300 ease-out"
              style={{
                left: indicatorStyle.left || 0,
                width: indicatorStyle.width || 0,
              }}
            />

            {navItems.map((item) => (
              <Link
                key={item}
                ref={(el) => navItemsRef.current[item.toLowerCase()] = el}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => smoothScroll(e, `#${item.toLowerCase()}`)}
                className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${activeSection === item.toLowerCase()
                  ? 'text-black'
                  : 'text-white/60 hover:text-white'
                  }`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-black z-[1001] flex flex-col transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}>
          <div className="flex justify-between items-center p-6">
            <span className="text-xl font-bold tracking-[-0.04em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Aptcode</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-start justify-center gap-6 px-8">
            {navItems.map((item, i) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => smoothScroll(e, `#${item.toLowerCase()}`)}
                className={`text-4xl font-bold tracking-tight transition-all duration-500 ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  } ${activeSection === item.toLowerCase() ? 'text-white' : 'text-white/30 hover:text-white'}`}
                style={{ transitionDelay: `${i * 75}ms` }}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="p-8 border-t border-white/10">
            <a
              href="#book-call-section"
              onClick={(e) => smoothScroll(e, "#book-call-section")}
              className="flex items-center justify-between"
            >
              <span className="text-white/50">Ready to start?</span>
              <span className="text-white font-medium">Let's Talk →</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}