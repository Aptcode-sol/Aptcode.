"use client";
import { useState } from "react";
import { Send, Check } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);

    try {
      const accessKey = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;

      if (!accessKey) {
        throw new Error('Configuration error');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('access_key', accessKey);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company || '');
      formDataToSend.append('message', formData.message);
      formDataToSend.append('subject', `New inquiry from ${formData.name}`);
      formDataToSend.append('from_name', 'Aptcode Contact Form');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 4000);
      } else {
        throw new Error('Failed to send message');
      }

    } catch (error) {
      // Fallback to mailto
      const emailSubject = `Inquiry from ${formData.name}`;
      const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'Not specified'}\n\nMessage:\n${formData.message}`;

      window.location.href = `mailto:contact@aptcode.in?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 4000);
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-6 font-light">
              Get in Touch
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-6">
              Start a Project<span className="text-white/30">.</span>
            </h2>
            <p className="text-lg text-white/50 font-light">
              Let's discuss how we can bring your ideas to life.
            </p>
          </div>

          {/* Success Modal */}
          {isSubmitted && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm">
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center max-w-sm mx-6">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                </div>
                <p className="text-white/90 text-lg font-light">Message sent successfully</p>
              </div>
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name and Email */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors font-light text-lg"
                  placeholder="Name"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors font-light text-lg"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors font-light text-lg"
                placeholder="Company (Optional)"
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors font-light text-lg resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-white/90 font-light tracking-wider rounded-full transition-all duration-500 ${isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-white/50 hover:bg-white/5"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Sending</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}