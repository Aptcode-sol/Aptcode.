"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Check, Mail, Phone, MapPin } from "lucide-react";

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
      if (!accessKey) throw new Error('Configuration error');

      const formDataToSend = new FormData();
      formDataToSend.append('access_key', accessKey);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company || '');
      formDataToSend.append('message', formData.message);
      formDataToSend.append('subject', `New inquiry from ${formData.name}`);
      formDataToSend.append('from_name', 'Aptcode Contact Form');

      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formDataToSend });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      const emailSubject = `Inquiry from ${formData.name}`;
      const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`;
      window.location.href = `mailto:contact@aptcode.in?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "contact@aptcode.in", href: "mailto:contact@aptcode.in" },
    { icon: Phone, label: "Phone", value: "+91 7032960122", href: "tel:+917032960122" },
    { icon: MapPin, label: "Location", value: "Worldwide Remote" }
  ];

  return (
    <section id="contact" className="py-32 relative" ref={sectionRef}>
      <div className="divider mb-32"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className={`mono mb-8 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          Contact
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left */}
          <div className={`${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-[1.1] tracking-tight">
              Let's Build
              <br />Something Great.
            </h2>
            <p className="text-lg text-white/45 font-light mb-12 max-w-md">
              Ready to transform your ideas? Let's discuss your project.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a key={item.label} href={item.href} className={`flex items-center gap-4 p-4 card group ${!item.href ? 'pointer-events-none' : ''}`}>
                  <item.icon className="w-5 h-5 text-white/35 group-hover:text-white/55 transition-colors" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs text-white/35 mb-0.5">{item.label}</div>
                    <div className="text-white/80">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className={`${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
            {isSubmitted && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
                <div className="card p-10 text-center">
                  <Check className="w-8 h-8 text-white/60 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-white text-lg">Message Sent</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="card p-8">
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/25"
                    placeholder="Name *" />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/25"
                    placeholder="Email *" />
                </div>
                <input type="text" name="company" value={formData.company} onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/25"
                  placeholder="Company" />
                <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4}
                  className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/25 resize-none"
                  placeholder="Message *" />
                <button type="submit" disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${isSubmitting ? "bg-white/10 text-white/50" : "bg-white text-black hover:bg-white/90"
                    }`}>
                  {isSubmitting ? "Sending..." : <><span>Send Message</span><Send className="w-4 h-4" /></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}