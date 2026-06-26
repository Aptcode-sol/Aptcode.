"use client";

import Navbar from "@/app/components/Navbar";
import StoryExperience from "@/app/components/StoryExperience";
import Projects from "./components/Projects";
import ContactStation from "./components/ContactStation";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Noise texture overlay */}
      <div className="noise-overlay"></div>

      <Navbar />
      <StoryExperience />
      <Projects />
      <ContactStation />
    </SmoothScroll>
  );
}
