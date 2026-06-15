"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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

function Fallback() {
  return <div className="absolute inset-0 bg-graphite bg-grid bg-hero-fallback" />;
}

export default function LazyHeroScene() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setWebglSupported(hasWebGL());
  }, []);

  return (
    <>
      <Fallback />
      {webglSupported && <HeroScene isMobile={isMobile} />}
    </>
  );
}
