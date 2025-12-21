"use client";

import { Instagram, Linkedin, ArrowUpRight, Mail, Phone, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize Cal.com
  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "15min", { origin: "https://app.cal.com" });
    window.Cal.ns["15min"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
  }, []);

  const openCalPopup = () => {
    if (window.Cal && window.Cal.ns && window.Cal.ns["15min"]) {
      window.Cal.ns["15min"]("modal", {
        calLink: "aptcode-99s0ql/15min",
        config: { layout: "month_view" }
      });
    }
  };

  const smoothScroll = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) window.scrollTo({ behavior: "smooth", top: element.offsetTop - 80 });
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/aptcode.sol", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/aptcode", label: "LinkedIn" }
  ];

  const contactInfo = [
    { icon: Mail, value: "contact@aptcode.in", href: "mailto:contact@aptcode.in" },
    { icon: Phone, value: "+91 7032960122", href: "tel:+917032960122" },
    { icon: MapPin, value: "Worldwide Remote" }
  ];

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Large CTA Section */}
      <div id="book-call-section" className={`py-40 relative transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className={`mono mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            — Let's Work Together
          </div>

          <h3 className={`text-6xl md:text-8xl lg:text-9xl font-bold mb-10 tracking-tight leading-[0.9] transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Have a project<br />
            <span className="text-white/40">in mind?</span>
          </h3>

          <p className={`text-xl md:text-2xl text-white/45 mb-14 max-w-xl mx-auto font-light transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Let's create something extraordinary together.
          </p>

          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <button
              onClick={openCalPopup}
              className="group inline-flex items-center gap-4 px-14 py-7 bg-white text-black text-xl font-semibold rounded-full hover:bg-white/90 hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-6 h-6" />
              <span>Book a Call</span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Main Footer Content */}
      <div className={`py-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <Link
                href="#home"
                onClick={(e) => smoothScroll(e, "#home")}
                className="text-4xl font-bold tracking-[-0.04em] inline-block mb-8 hover:text-white/80 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Aptcode
              </Link>

              <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-sm">
                We craft digital experiences with precision engineering and thoughtful design.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="mono mb-8">Navigation</h4>
              <ul className="space-y-5">
                {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => smoothScroll(e, `#${item.toLowerCase()}`)}
                      className="text-white/50 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <h4 className="mono mb-8">Services</h4>
              <ul className="space-y-5 text-white/50">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>Custom Software</li>
                <li>UI/UX Design</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3">
              <h4 className="mono mb-8">Get in Touch</h4>
              <ul className="space-y-4">
                {contactInfo.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-3 text-white/50 hover:text-white transition-colors group ${!item.href ? 'pointer-events-none' : ''}`}
                    >
                      <item.icon className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
                      <span>{item.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-24 pt-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-white/25 text-sm">
                © 2025 Aptcode. Crafted with precision.
              </p>
              <div className="flex items-center gap-8 text-sm text-white/25">
                <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}