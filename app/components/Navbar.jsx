"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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

  const smoothScroll = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      window.scrollTo({ behavior: "smooth", top: element.offsetTop - 80 });
    }
    setMenuOpen(false);
  };

  const navItems = ["About", "Services", "Projects", "Contact"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-xl py-4" : "bg-transparent py-6"
      }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => smoothScroll(e, "#home")}
            className="text-xl font-semibold tracking-tight text-white"
          >
            Aptcode
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => smoothScroll(e, `#${item.toLowerCase()}`)}
                  className="text-sm text-white/50 hover:text-white font-normal tracking-wide transition-colors hover-line"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white/70 p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && menuOpen && (
          <div className="fixed inset-0 bg-black z-[1001] flex flex-col items-center justify-center gap-8">
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white/70 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => smoothScroll(e, `#${item.toLowerCase()}`)}
                className="text-3xl text-white/80 hover:text-white font-medium"
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}