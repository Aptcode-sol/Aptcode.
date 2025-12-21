"use client";

import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import Projects from "./components/Projects";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Animated Background */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#000] overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute w-[600px] h-[600px] -top-48 -left-48 bg-white/[0.03] rounded-full blur-[120px] animate-float-slow"></div>
        <div className="absolute w-[500px] h-[500px] top-1/3 -right-32 bg-white/[0.02] rounded-full blur-[100px] animate-float-slower"></div>
        <div className="absolute w-[400px] h-[400px] bottom-0 left-1/3 bg-white/[0.02] rounded-full blur-[80px] animate-float-medium"></div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="noise-overlay"></div>

      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.03); }
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 18s ease-in-out infinite;
        }
      `}</style>
    </SmoothScroll>
  );
}
