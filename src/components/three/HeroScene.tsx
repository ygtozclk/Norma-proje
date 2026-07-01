"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { AdaptiveDpr } from "@react-three/drei";
import { KernelSize } from "postprocessing";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import WaveField from "./WaveField";
import Sparks from "./Sparks";

type HeroSceneProps = {
  isMobile: boolean;
  inView: boolean;
  onReady?: () => void;
};

export default function HeroScene({ isMobile, inView, onReady }: HeroSceneProps) {
  const segments = isMobile ? 70 : 96;
  const sparkCount = isMobile ? 90 : 220;

  return (
    <Canvas
      camera={{ position: [0, 1.2, 6], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ antialias: false, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
      onCreated={() => {
        requestAnimationFrame(() => onReady?.());
      }}
    >
      <AdaptiveDpr pixelated={false} />
      <color attach="background" args={["#0A0B0D"]} />
      <fog attach="fog" args={["#0A0B0D", 12, 45]} />
      <WaveField segments={segments} inView={inView} />
      <Sparks count={sparkCount} frozen={!inView} />
      {!isMobile && (
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
