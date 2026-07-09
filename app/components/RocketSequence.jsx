"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROCKET_PATH = "/assets/RocketLaunching";
const TOTAL_FRAMES = 240;
const MIN_READY = 20; // fewer frames needed since user scrolls here later

function drawCover(ctx, img, cw, ch) {
  if (!img || !img.naturalWidth) return;
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const sw = img.naturalWidth * scale;
  const sh = img.naturalHeight * scale;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
}

export default function RocketSequence() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const tlRef = useRef(null);
  const stRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const [ready, setReady] = useState(false);

  // ── Phase 1: Preload rocket frames ──────────────────────────────────────
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const step = isMobile ? 2 : 1;
    const count = isMobile ? Math.ceil(TOTAL_FRAMES / 2) : TOTAL_FRAMES;
    let loaded = 0;

    const imgs = Array.from({ length: count }, (_, i) => {
      const num = String(i * step + 1).padStart(3, "0");
      const img = new window.Image();
      img.onload = () => {
        loaded++;
        if (loaded === MIN_READY) setReady(true);
      };
      img.src = `${ROCKET_PATH}/ezgif-frame-${num}.jpg`;
      return img;
    });

    framesRef.current = imgs;
  }, []);

  // ── Phase 2: GSAP scroll-scrub ──────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const frames = framesRef.current;
    const count = frames.length;
    let lastIdx = -1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (lastIdx >= 0 && frames[lastIdx]?.complete) {
        drawCover(ctx, frames[lastIdx], canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    if (frames[0]?.complete) {
      lastIdx = 0;
      drawCover(ctx, frames[0], canvas.width, canvas.height);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("resize", resize);
    }

    const frameObj = { frame: 0 };
    const tl = gsap.timeline();
    tlRef.current = tl;

    // Drive frame index 0 → count-1 across full scroll
    tl.to(
      frameObj,
      {
        frame: count - 1,
        ease: "none",
        onUpdate() {
          const idx = Math.max(0, Math.min(count - 1, Math.round(frameObj.frame)));
          if (idx !== lastIdx) {
            lastIdx = idx;
            if (frames[idx]?.complete) {
              drawCover(ctx, frames[idx], canvas.width, canvas.height);
            }
          }
        },
      },
      0
    );

    // Scene 4: "On The Pad" — in at 2%, out at 18%
    tl.fromTo(text1Ref.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.10 }, 0.02);
    tl.to(text1Ref.current, { autoAlpha: 0, y: -25, ease: "power2.in", duration: 0.06 }, 0.19);

    // Scene 5: "Ignition" — in at 26%, out at 46%
    tl.fromTo(text2Ref.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.10 }, 0.26);
    tl.to(text2Ref.current, { autoAlpha: 0, y: -25, ease: "power2.in", duration: 0.06 }, 0.47);

    stRef.current = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: innerRef.current,
      scrub: true,
      animation: tl,
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", resize);
      stRef.current?.kill();
      tlRef.current?.kill();
    };
  }, [ready]);

  return (
    <div ref={outerRef} style={{ height: "600vh" }}>
      <div
        ref={innerRef}
        style={{ position: "relative", height: "100dvh", overflow: "hidden", background: "#000" }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Text: Scene 4 — On The Pad */}
        <div
          ref={text1Ref}
          className="absolute inset-0 flex flex-col items-start justify-end pb-20 md:pb-28 px-6 md:px-16 lg:px-24 pointer-events-none z-10"
          style={{ opacity: 0 }}
        >
          <div className="mono mb-4 text-white/40" style={{ letterSpacing: "0.15em" }}>
            04 — On The Pad
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight max-w-4xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="block">Built to be</span>
            <span className="block">
              <span style={{ color: "#a78bfa" }}>launched.</span>
            </span>
          </h2>
        </div>

        {/* Text: Scene 5 — Ignition */}
        <div
          ref={text2Ref}
          className="absolute inset-0 flex flex-col items-start justify-end pb-20 md:pb-28 px-6 md:px-16 lg:px-24 pointer-events-none z-10"
          style={{ opacity: 0 }}
        >
          <div className="mono mb-4 text-white/40" style={{ letterSpacing: "0.15em" }}>
            05 — Launch
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] tracking-tight max-w-4xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="block">From concept</span>
            <span className="block">to</span>
            <span className="block">
              <span style={{ color: "#a78bfa" }}>launch.</span>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
