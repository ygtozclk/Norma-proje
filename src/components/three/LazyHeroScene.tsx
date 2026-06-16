"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export default function LazyHeroScene() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [mountCanvas, setMountCanvas] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setWebglSupported(hasWebGL());
  }, []);

  // Stop rendering when hero scrolls out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Defer Canvas mount until browser is idle (first paint finishes first)
  useEffect(() => {
    if (!webglSupported) return;
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (ric) {
      const id = ric(() => setMountCanvas(true));
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const id = setTimeout(() => setMountCanvas(true), 100);
    return () => clearTimeout(id);
  }, [webglSupported]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Static poster — shown immediately, fades out once Canvas is ready */}
      <div
        className="absolute inset-0 bg-graphite bg-grid bg-hero-fallback transition-opacity duration-700"
        style={{ opacity: canvasVisible ? 0 : 1 }}
        aria-hidden="true"
      />
      {mountCanvas && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: canvasVisible ? 1 : 0 }}
        >
          <HeroScene
            isMobile={isMobile}
            inView={inView}
            onReady={() => setCanvasVisible(true)}
          />
        </div>
      )}
    </div>
  );
}
