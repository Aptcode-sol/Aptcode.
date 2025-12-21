"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkIfMobile);
    checkIfMobile();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const smoothScroll = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top: element.offsetTop - 80,
      });
    }
    setMenuOpen(false);
  };

  const navItems = ["Home", "About", "Services", "Projects", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled
          ? "bg-black/80 backdrop-blur-xl py-4 border-b border-white/5"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo - Refined */}
          <Link
            href="#home"
            onClick={(e) => smoothScroll(e, "#home")}
            className="text-xl font-light tracking-wider text-white/90 hover:text-white transition-colors duration-300"
          >
            Aptcode<span className="text-white/30">.</span>
          </Link>

          {/* Desktop Navigation - Minimal */}
          {!isMobile && (
            <div className="flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => smoothScroll(e, `#${item.toLowerCase()}`)}
                  className="relative text-sm text-white/60 hover:text-white font-light tracking-wide transition-colors duration-300 hover-underline"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile Menu Button - Minimal */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              className="text-white/70 hover:text-white transition-colors p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
                />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Navigation Menu - Elegant */}
        {isMobile && (
          <div
            className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-[1001] transition-all duration-500 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
          >
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={toggleMenu}
                className="text-white/70 hover:text-white transition-colors p-2"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col items-center justify-center h-[80vh] gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => smoothScroll(e, `#${item.toLowerCase()}`)}
                  className="text-2xl text-white/70 hover:text-white font-light tracking-wider transition-all duration-300"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}