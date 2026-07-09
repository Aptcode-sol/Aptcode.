"use client";

import Navbar from "@/app/components/Navbar";
import StoryExperience from "@/app/components/StoryExperience";
import Projects from "./components/Projects";
import ContactStation from "./components/ContactStation";
import RocketSequence from "./components/RocketSequence";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="noise-overlay"></div>
      <Navbar />
      <StoryExperience />
      <Projects />
      <RocketSequence />
      <ContactStation />
    </SmoothScroll>
  );
}
