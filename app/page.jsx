import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#000]">
        <div id="particles" className="absolute inset-0 overflow-hidden"></div>
      </div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
