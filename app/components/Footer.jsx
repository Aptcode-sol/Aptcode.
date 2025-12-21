import { Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/aptcode.sol", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/aptcode", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/AptcodeSol", label: "GitHub" }
  ];

  return (
    <footer className="py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            {/* Brand Column */}
            <div>
              <h3 className="text-xl font-light mb-6 text-white/90 tracking-wide">
                Aptcode<span className="text-white/30">.</span>
              </h3>
              <p className="text-white/40 font-light leading-relaxed mb-8 max-w-xs">
                Solutions engineered with precision. Transforming ideas into powerful digital experiences.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/5 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-sm text-white/40 uppercase tracking-[0.15em] mb-6 font-light">
                Contact
              </h4>
              <div className="space-y-4">
                <a
                  href="mailto:contact@aptcode.in"
                  className="block text-white/60 font-light hover:text-white/90 transition-colors"
                >
                  contact@aptcode.in
                </a>
                <p className="text-white/60 font-light">+91 7032960122</p>
                <p className="text-white/40 font-light">Worldwide Remote</p>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-sm text-white/40 uppercase tracking-[0.15em] mb-6 font-light">
                Services
              </h4>
              <div className="space-y-4">
                <p className="text-white/60 font-light">Web Development</p>
                <p className="text-white/60 font-light">Mobile Apps</p>
                <p className="text-white/60 font-light">Custom Software</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-white/30 text-sm font-light">
              © 2025 Aptcode. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}