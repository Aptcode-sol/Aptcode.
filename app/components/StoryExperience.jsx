"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Each scene's image layer config — swap src values once you've generated and added images to /public/assets/story/
const scenes = [
  {
    id: "scene1",
    bg: "/assets/story/scene1-bg.jpg",
    mid: "/assets/story/scene1-mid.jpg",
    fg: "/assets/story/scene1-fg.jpg",
    label: "The Idea",
    headline: ["Every great product", "starts with an", "idea."],
    highlightWord: "idea.",
    midClass: "cube-float",
  },
  {
    id: "scene2",
    bg: "/assets/story/scene2-bg.jpg",
    mid: "/assets/story/scene2-mid.jpg",
    fg: "/assets/story/scene2-fg.jpg",
    label: "Transformation",
    headline: ["We transform", "ideas into", "software."],
    highlightWord: "software.",
  },
  {
    id: "scene3",
    bg: "/assets/story/scene3-bg.jpg",
    mid: null,
    fg: "/assets/story/scene3-fg.jpg",
    label: "Building Solutions",
    headline: ["Precision-built for", "every layer of", "your stack."],
    highlightWord: "every layer",
    cards: [
      { src: "/assets/story/scene3-web.jpg", label: "Web App" },
      { src: "/assets/story/scene3-mobile.jpg", label: "Mobile App" },
      { src: "/assets/story/scene3-dashboard.jpg", label: "Dashboard" },
      { src: "/assets/story/scene3-api.jpg", label: "API & Backend" },
    ],
  },
  {
    id: "scene4",
    bg: "/assets/story/scene4-bg.jpg",
    mid: "/assets/story/scene4-mid.jpg",
    fg: "/assets/story/scene4-fg.jpg",
    label: "The Digital City",
    headline: ["We build.", "We scale.", "We make impact."],
    highlightWord: "impact.",
  },
  {
    id: "scene5",
    bg: "/assets/story/scene5-bg.jpg",
    mid: "/assets/story/scene5-mid.jpg",
    fg: "/assets/story/scene5-fg.jpg",
    label: "Launch",
    headline: ["From concept", "to", "launch."],
    highlightWord: "launch.",
    midClass: "rocket-rise",
  },
];

// Placeholder scene colors used until real images are added
const placeholderColors = [
  "radial-gradient(ellipse at center, #0a0a1a 0%, #000 100%)",
  "radial-gradient(ellipse at center, #080808 0%, #000 100%)",
  "radial-gradient(ellipse at center, #050a12 0%, #000 100%)",
  "radial-gradient(ellipse at center, #040a04 0%, #000 100%)",
  "radial-gradient(ellipse at center, #0a0608 0%, #000 100%)",
];

export default function StoryExperience() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const bgRefs = useRef([]);
  const midRefs = useRef([]);
  const fgRefs = useRef([]);
  const textRefs = useRef([]);
  const cardRefs = useRef([[], [], [], []]);
  const [activeScene, setActiveScene] = useState(0);
  const [imagesExist, setImagesExist] = useState(false);

  // Check if first scene bg image exists (proxy for "images are ready")
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImagesExist(true);
    img.onerror = () => setImagesExist(false);
    img.src = "/assets/story/scene1-bg.jpg";
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const scrub = isMobile ? 0.8 : 1.2;
    const totalScenes = 5;
    const sceneSize = 1 / totalScenes; // 0.2 per scene

    const tl = gsap.timeline();

    // ── Scene 1: The Idea ────────────────────────────────────────
    const s1 = 0;
    const s1end = sceneSize;
    const s1mid = (s1 + s1end) / 2;

    // bg stays visible, slight scale
    tl.fromTo(bgRefs.current[0], { scale: 1 }, { scale: 1.08, ease: "none" }, s1);
    // mid (cube) floats up on enter, explodes on exit
    tl.fromTo(midRefs.current[0], { y: 50, autoAlpha: 0, scale: 0.9 }, { y: 0, autoAlpha: 1, scale: 1, ease: "power2.out", duration: sceneSize * 0.3 }, s1);
    tl.to(midRefs.current[0], { scale: 2.5, autoAlpha: 0, ease: "power2.in", duration: sceneSize * 0.25 }, s1end - sceneSize * 0.25);
    // text
    tl.fromTo(textRefs.current[0], { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power2.out", duration: sceneSize * 0.25 }, s1 + sceneSize * 0.1);
    tl.to(textRefs.current[0], { y: -20, autoAlpha: 0, ease: "power2.in", duration: sceneSize * 0.2 }, s1end - sceneSize * 0.25);
    // fg overlay
    tl.fromTo(fgRefs.current[0], { autoAlpha: 0 }, { autoAlpha: 0.6, ease: "none" }, s1);
    tl.to(fgRefs.current[0], { autoAlpha: 0, ease: "none", duration: sceneSize * 0.2 }, s1end - sceneSize * 0.2);
    // fade out bg at end
    tl.to(bgRefs.current[0], { autoAlpha: 0, ease: "power1.in", duration: sceneSize * 0.2 }, s1end - sceneSize * 0.2);

    // ── Scene 2: Transformation ──────────────────────────────────
    const s2 = sceneSize;
    const s2end = sceneSize * 2;

    tl.fromTo(bgRefs.current[1], { autoAlpha: 0, scale: 1 }, { autoAlpha: 1, scale: 1, ease: "none", duration: sceneSize * 0.2 }, s2);
    tl.to(bgRefs.current[1], { scale: 1.06, ease: "none" }, s2end);
    // burst
    tl.fromTo(midRefs.current[1], { scale: 0.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: "back.out(1.2)", duration: sceneSize * 0.3 }, s2 + sceneSize * 0.05);
    tl.to(midRefs.current[1], { scale: 0.7, autoAlpha: 0, ease: "power2.in", duration: sceneSize * 0.25 }, s2end - sceneSize * 0.3);
    // fg particles drift
    tl.fromTo(fgRefs.current[1], { autoAlpha: 0, y: 20 }, { autoAlpha: 0.85, y: 0, ease: "none", duration: sceneSize * 0.3 }, s2 + sceneSize * 0.1);
    tl.to(fgRefs.current[1], { autoAlpha: 0, y: -20, ease: "none", duration: sceneSize * 0.25 }, s2end - sceneSize * 0.3);
    // text
    tl.fromTo(textRefs.current[1], { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power2.out", duration: sceneSize * 0.25 }, s2 + sceneSize * 0.25);
    tl.to(textRefs.current[1], { y: -20, autoAlpha: 0, ease: "power2.in", duration: sceneSize * 0.2 }, s2end - sceneSize * 0.25);
    tl.to(bgRefs.current[1], { autoAlpha: 0, duration: sceneSize * 0.2 }, s2end - sceneSize * 0.2);

    // ── Scene 3: Building Solutions (cards) ──────────────────────
    const s3 = sceneSize * 2;
    const s3end = sceneSize * 3;

    tl.fromTo(bgRefs.current[2], { autoAlpha: 0, scale: 1 }, { autoAlpha: 1, scale: 1.05, ease: "none" }, s3);
    tl.fromTo(fgRefs.current[2], { autoAlpha: 0 }, { autoAlpha: 0.4, ease: "none" }, s3);

    // stagger 4 cards in
    const cardDelays = [0.0, 0.08, 0.16, 0.24];
    const cardTilts = [-3, 2, -2, 3];
    cardRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      tl.fromTo(ref,
        { y: 80, autoAlpha: 0, rotate: 0 },
        { y: 0, autoAlpha: 1, rotate: cardTilts[idx], ease: "power2.out", duration: sceneSize * 0.25 },
        s3 + sceneSize * 0.1 + cardDelays[idx] * sceneSize
      );
      tl.to(ref, { scale: 1.2, autoAlpha: 0, ease: "power2.in", duration: sceneSize * 0.2 }, s3end - sceneSize * 0.25);
    });
    tl.fromTo(textRefs.current[2], { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power2.out", duration: sceneSize * 0.2 }, s3 + sceneSize * 0.5);
    tl.to(textRefs.current[2], { y: -20, autoAlpha: 0, duration: sceneSize * 0.2 }, s3end - sceneSize * 0.25);
    tl.to(bgRefs.current[2], { autoAlpha: 0, duration: sceneSize * 0.2 }, s3end - sceneSize * 0.2);
    tl.to(fgRefs.current[2], { autoAlpha: 0, duration: sceneSize * 0.2 }, s3end - sceneSize * 0.2);

    // ── Scene 4: The Digital City ─────────────────────────────────
    const s4 = sceneSize * 3;
    const s4end = sceneSize * 4;
    const parallaxY = isMobile ? -60 : -120;
    const parallaxMidY = isMobile ? -100 : -200;

    tl.fromTo(bgRefs.current[3], { autoAlpha: 0, scale: 1, y: 0 }, { autoAlpha: 1, ease: "none", duration: sceneSize * 0.2 }, s4);
    tl.to(bgRefs.current[3], { scale: 1.25, y: parallaxY, ease: "none" }, s4end);
    tl.fromTo(midRefs.current[3], { autoAlpha: 0, y: 0 }, { autoAlpha: 0.7, y: 0, ease: "none", duration: sceneSize * 0.2 }, s4);
    tl.to(midRefs.current[3], { y: parallaxMidY, autoAlpha: 0.7, ease: "none" }, s4end);
    tl.fromTo(fgRefs.current[3], { autoAlpha: 0.3 }, { autoAlpha: 0.7, ease: "none" }, s4);

    // text lines reveal one by one
    tl.fromTo(textRefs.current[3], { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power2.out", duration: sceneSize * 0.2 }, s4 + sceneSize * 0.4);
    tl.to(textRefs.current[3], { y: -20, autoAlpha: 0, duration: sceneSize * 0.2 }, s4end - sceneSize * 0.25);
    tl.to(bgRefs.current[3], { autoAlpha: 0, duration: sceneSize * 0.2 }, s4end - sceneSize * 0.2);
    tl.to(midRefs.current[3], { autoAlpha: 0, duration: sceneSize * 0.2 }, s4end - sceneSize * 0.2);
    tl.to(fgRefs.current[3], { autoAlpha: 0, duration: sceneSize * 0.2 }, s4end - sceneSize * 0.2);

    // ── Scene 5: Launch ───────────────────────────────────────────
    const s5 = sceneSize * 4;
    const s5end = 1;

    tl.fromTo(bgRefs.current[4], { autoAlpha: 0, scale: 1 }, { autoAlpha: 1, ease: "none", duration: sceneSize * 0.2 }, s5);
    tl.to(bgRefs.current[4], { scale: 1.1, ease: "none" }, s5end);
    // rocket climbs
    tl.fromTo(midRefs.current[4], { autoAlpha: 0, y: 80, scale: 0.85 }, { autoAlpha: 1, y: 0, scale: 1, ease: "power2.out", duration: sceneSize * 0.25 }, s5);
    tl.to(midRefs.current[4], { y: isMobile ? -250 : -400, autoAlpha: 1, ease: "power1.in" }, s5end);
    // exhaust
    tl.fromTo(fgRefs.current[4], { autoAlpha: 0, scaleY: 0.5 }, { autoAlpha: 1, scaleY: 1, ease: "power2.out", duration: sceneSize * 0.3 }, s5 + sceneSize * 0.1);
    // camera shake — subtle x oscillation
    tl.to(innerRef.current, { x: 3, duration: sceneSize * 0.05, yoyo: true, repeat: 3, ease: "none" }, s5 + sceneSize * 0.05);
    // text
    tl.fromTo(textRefs.current[4], { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power2.out", duration: sceneSize * 0.2 }, s5 + sceneSize * 0.4);

    // ── ScrollTrigger: pin inner, scrub master timeline ─────────
    ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: innerRef.current,
      scrub,
      animation: tl,
      onUpdate: (self) => {
        setActiveScene(Math.min(4, Math.floor(self.progress * totalScenes)));
      },
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={outerRef}
      id="home"
      style={{ height: "500vh" }}
    >
      {/* Pinned viewport */}
      <div
        ref={innerRef}
        style={{ height: "100vh", position: "relative", overflow: "hidden", background: "#000" }}
      >
        {/* ── Scene layers ── */}
        {scenes.map((scene, i) => (
          <div key={scene.id} className="absolute inset-0" style={{ pointerEvents: "none" }}>
            {/* BG */}
            <div
              ref={(el) => (bgRefs.current[i] = el)}
              className="absolute inset-0"
              style={{
                background: imagesExist ? undefined : placeholderColors[i],
                willChange: "transform, opacity",
              }}
            >
              {imagesExist && (
                <Image
                  src={scene.bg}
                  alt=""
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  priority={i === 0}
                />
              )}
            </div>

            {/* MID — not used in scene 3 (cards replace it) */}
            {scene.mid && (
              <div
                ref={(el) => (midRefs.current[i] = el)}
                className={`absolute inset-0 flex items-center justify-center ${scene.midClass || ""}`}
                style={{ willChange: "transform, opacity" }}
              >
                {imagesExist ? (
                  <Image
                    src={scene.mid}
                    alt=""
                    fill
                    sizes="100vw"
                    style={{ objectFit: "contain", mixBlendMode: "screen" }}
                    priority={i === 0}
                  />
                ) : (
                  <div
                    style={{
                      width: i === 4 ? 80 : 200,
                      height: i === 4 ? 240 : 200,
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: i === 4 ? 8 : "50%",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  />
                )}
              </div>
            )}

            {/* FG overlay */}
            {scene.fg && (
              <div
                ref={(el) => (fgRefs.current[i] = el)}
                className="absolute inset-0"
                style={{ willChange: "opacity", pointerEvents: "none" }}
              >
                {imagesExist && (
                  <Image
                    src={scene.fg}
                    alt=""
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover", mixBlendMode: "screen" }}
                  />
                )}
              </div>
            )}

            {/* Scene 3 product cards */}
            {scene.cards && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:gap-8 px-8 md:px-0 md:flex md:flex-row md:items-end md:gap-6">
                  {scene.cards.map((card, ci) => (
                    <div
                      key={card.label}
                      ref={(el) => (cardRefs.current[ci] = el)}
                      className="flex flex-col items-center gap-3"
                      style={{ willChange: "transform, opacity" }}
                    >
                      <div
                        className="relative rounded-2xl overflow-hidden border border-white/10"
                        style={{
                          width: "clamp(110px, 18vw, 220px)",
                          height: "clamp(140px, 23vw, 280px)",
                          background: imagesExist ? undefined : "rgba(255,255,255,0.04)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {imagesExist && (
                          <Image src={card.src} alt={card.label} fill sizes="220px" style={{ objectFit: "cover" }} />
                        )}
                      </div>
                      <span className="text-xs md:text-sm text-white/50 tracking-widest uppercase">{card.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* ── Text overlays ── */}
        {scenes.map((scene, i) => (
          <div
            key={`text-${scene.id}`}
            ref={(el) => (textRefs.current[i] = el)}
            className="absolute inset-0 flex flex-col items-start justify-end pb-20 md:pb-28 px-6 md:px-16 lg:px-24 pointer-events-none"
            style={{ willChange: "transform, opacity", zIndex: 10 }}
          >
            <div className="mono mb-4 text-white/40" style={{ letterSpacing: "0.15em" }}>
              0{i + 1} — {scene.label}
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight max-w-4xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {scene.headline.map((line, li) => {
                const isLast = li === scene.headline.length - 1;
                return (
                  <span key={li} className="block">
                    {isLast ? (
                      <>
                        {line.replace(scene.highlightWord, "").trimEnd()}{" "}
                        <span style={{ color: "#a78bfa" }}>{scene.highlightWord}</span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                );
              })}
            </h2>
          </div>
        ))}

        {/* ── Progress dots ── */}
        <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {scenes.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeScene === i ? 8 : 4,
                height: activeScene === i ? 8 : 4,
                background: activeScene === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* ── Scroll hint (scene 1 only) ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 transition-all duration-500"
          style={{ opacity: activeScene === 0 ? 1 : 0 }}
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>
    </div>
  );
}
