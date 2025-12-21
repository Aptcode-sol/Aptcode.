"use client";

import { Instagram, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/aptcode.sol", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/aptcode", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/AptcodeSol", label: "GitHub" }
  ];

  const smoothScroll = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) window.scrollTo({ behavior: "smooth", top: element.offsetTop - 80 });
  };

  return (
    <footer className="py-20 relative">
      <div className="divider mb-20"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="#home" onClick={(e) => smoothScroll(e, "#home")} className="text-2xl font-semibold tracking-tight mb-6 inline-block">
              Aptcode
            </Link>
            <p className="text-white/40 leading-relaxed mb-6 max-w-sm">
              Solutions engineered with precision. Transforming ideas into powerful digital experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/25 transition-colors group"
                  aria-label={social.label}>
                  <social.icon className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="mono mb-6">Navigation</div>
            <ul className="space-y-3">
              {["About", "Services", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} onClick={(e) => smoothScroll(e, `#${item.toLowerCase()}`)}
                    className="text-white/50 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="mono mb-6">Contact</div>
            <ul className="space-y-3">
              <li><a href="mailto:contact@aptcode.in" className="text-white/50 hover:text-white transition-colors">contact@aptcode.in</a></li>
              <li><a href="tel:+917032960122" className="text-white/50 hover:text-white transition-colors">+91 7032960122</a></li>
              <li className="text-white/35">Worldwide Remote</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© 2025 Aptcode. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}