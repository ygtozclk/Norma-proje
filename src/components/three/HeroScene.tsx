"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { KernelSize } from "postprocessing";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import WaveField from "./WaveField";
import Sparks from "./Sparks";

function Rig() {
  const { camera } = useThree();

  useFrame((state) => {
    const targetX = state.pointer.x * 0.6;
    const targetY = 1.2 + state.pointer.y * 0.3;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, -10);
  });

  return null;
}

type HeroSceneProps = {
  isMobile: boolean;
  inView: boolean;
  onReady?: () => void;
};

export default function HeroScene({ isMobile, inView, onReady }: HeroSceneProps) {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const segments = isMobile ? 70 : 96;
  const sparkCount = isMobile ? 90 : 220;

  const frameloop = prefersReducedMotion ? "demand" : inView ? "always" : "never";

  return (
    <Canvas
      camera={{ position: [0, 1.2, 6], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop={frameloop}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
      onCreated={() => {
        requestAnimationFrame(() => onReady?.());
      }}
    >
      <AdaptiveDpr pixelated={false} />
      <PerformanceMonitor />
      <color attach="background" args={["#0A0B0D"]} />
      <fog attach="fog" args={["#0A0B0D", 12, 45]} />
      {!prefersReducedMotion && <Rig />}
      <WaveField segments={segments} frozen={prefersReducedMotion} />
      <Sparks count={sparkCount} frozen={prefersReducedMotion} />
      {!isMobile && !prefersReducedMotion && (
        <EffectComposer>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.3}
            kernelSize={KernelSize.SMALL}
            resolutionScale={0.5}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
