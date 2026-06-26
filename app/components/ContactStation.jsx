"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Check, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function ContactStation() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesExist, setImagesExist] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImagesExist(true);
    img.onerror = () => setImagesExist(false);
    img.src = "/assets/story/scene6-bg.jpg";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    try {
      const accessKey = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;
      if (!accessKey) throw new Error("No key");
      const fd = new FormData();
      fd.append("access_key", accessKey);
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("company", formData.company || "");
      fd.append("message", formData.message);
      fd.append("subject", `New inquiry from ${formData.name}`);
      fd.append("from_name", "Aptcode Contact");
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", company: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 4000);
      } else throw new Error("Failed");
    } catch {
      const subject = `Inquiry from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\n\nMessage:\n${formData.message}`;
      window.location.href = `mailto:contact@aptcode.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black"
    >
      {/* Scene 6 background layers */}
      <div className="absolute inset-0 -z-10">
        {imagesExist ? (
          <>
            <Image src="/assets/story/scene6-bg.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} priority={false} />
            <div className="absolute inset-0 bg-black/50" />
            <Image src="/assets/story/scene6-fg.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.4 }} />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 60% 40%, #0a0820 0%, #000 70%)" }}
          />
        )}

        {/* Space station mid layer with CSS rotation */}
        {imagesExist && (
          <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-24 station-spin pointer-events-none opacity-30">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <Image src="/assets/story/scene6-mid.jpg" alt="" fill sizes="400px" style={{ objectFit: "contain" }} />
            </div>
          </div>
        )}

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)" }}
        />
      </div>

      {/* Success overlay */}
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <p className="text-3xl font-bold mb-3">Message Sent</p>
            <p className="text-white/45">We'll get back to you within 24 hours.</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        {/* Header */}
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="mono mb-6 text-white/40" style={{ letterSpacing: "0.15em" }}>06 — Contact Station</div>
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's build the<br />
            <span className="text-white/35">future together.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left — contact links */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="space-y-10 mb-16">
              <a href="mailto:contact@aptcode.in" className="group block border-b border-white/10 pb-8">
                <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Email</div>
                <div className="text-2xl md:text-3xl font-medium text-white/70 group-hover:text-white transition-colors flex items-center gap-4">
                  contact@aptcode.in
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </a>
              <a href="tel:+917032960122" className="group block border-b border-white/10 pb-8">
                <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Phone</div>
                <div className="text-2xl md:text-3xl font-medium text-white/70 group-hover:text-white transition-colors flex items-center gap-4">
                  +91 7032960122
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </a>
              <div className="block border-b border-white/10 pb-8">
                <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Location</div>
                <div className="text-2xl md:text-3xl font-medium text-white/50">Worldwide Remote</div>
              </div>
            </div>

            <p className="text-white/30 text-sm leading-relaxed max-w-sm">
              From idea to launch — we build digital products that scale. Let's start the conversation.
            </p>
          </div>

          {/* Right — form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm text-white/40 mb-3">Name *</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    placeholder="John Doe"
                    className="w-full py-4 bg-transparent border-b-2 border-white/15 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/40 mb-3">Email *</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="john@company.com"
                    className="w-full py-4 bg-transparent border-b-2 border-white/15 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-3">Company</label>
                <input
                  type="text" name="company" value={formData.company} onChange={handleChange}
                  placeholder="Your Company"
                  className="w-full py-4 bg-transparent border-b-2 border-white/15 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-3">Message *</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full py-4 bg-transparent border-b-2 border-white/15 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit" disabled={isSubmitting}
                className={`w-full py-6 rounded-full font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                  isSubmitting ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-white text-black hover:bg-white/90 hover:scale-[1.02]"
                }`}
              >
                {isSubmitting ? (
                  <><span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />Sending...</>
                ) : (
                  <>Send Message <Send className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-8 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/20 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Aptcode — The Digital Factory
          </span>
          <span className="text-white/20 text-sm">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </div>
    </section>
  );
}
