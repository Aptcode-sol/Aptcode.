"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Check, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      const accessKey = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;
      if (!accessKey) throw new Error('No key');

      const formDataToSend = new FormData();
      formDataToSend.append('access_key', accessKey);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company || '');
      formDataToSend.append('message', formData.message);
      formDataToSend.append('subject', `New inquiry from ${formData.name}`);
      formDataToSend.append('from_name', 'Aptcode Contact');

      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formDataToSend });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 4000);
      } else throw new Error('Failed');
    } catch {
      const subject = `Inquiry from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`;
      window.location.href = `mailto:contact@aptcode.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-40 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className={`mb-24 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mono mb-6">— Contact</div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
            Let's create<br />
            <span className="text-white/40">something amazing.</span>
          </h2>
          <p className="text-xl text-white/45 max-w-xl mx-auto font-light">
            Have a project in mind? We'd love to hear about it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left - Contact Info */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>

            {/* Large Contact Links */}
            <div className="space-y-12 mb-20">
              <a
                href="mailto:contact@aptcode.in"
                className="group block border-b border-white/10 pb-8"
              >
                <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Email</div>
                <div className="text-2xl md:text-3xl font-medium text-white/70 group-hover:text-white transition-colors flex items-center gap-4">
                  contact@aptcode.in
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </a>

              <a
                href="tel:+917032960122"
                className="group block border-b border-white/10 pb-8"
              >
                <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Phone</div>
                <div className="text-2xl md:text-3xl font-medium text-white/70 group-hover:text-white transition-colors flex items-center gap-4">
                  +91 7032960122
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </a>

              <div className="block border-b border-white/10 pb-8">
                <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Location</div>
                <div className="text-2xl md:text-3xl font-medium text-white/50">
                  Worldwide Remote
                </div>
              </div>
            </div>

            {/* Book a Call CTA */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-medium mb-2">Prefer a quick call?</div>
                <div className="text-white/40 text-sm">Book a free 15-minute consultation</div>
              </div>
              <button
                onClick={() => document.getElementById('book-call-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-all group"
                aria-label="Scroll to book a call"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-black group-hover:translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right - Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
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

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm text-white/40 mb-3">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full py-4 bg-transparent border-b-2 border-white/15 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/40 mb-3">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@company.com"
                    className="w-full py-4 bg-transparent border-b-2 border-white/15 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm text-white/40 mb-3">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your Company"
                  className="w-full py-4 bg-transparent border-b-2 border-white/15 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-white/40 mb-3">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full py-4 bg-transparent border-b-2 border-white/15 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-6 rounded-full font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${isSubmitting
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white text-black hover:bg-white/90 hover:scale-[1.02]"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}