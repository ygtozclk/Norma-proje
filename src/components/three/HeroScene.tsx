"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
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
};

export default function HeroScene({ isMobile }: HeroSceneProps) {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const segments = isMobile ? 70 : 140;
  const sparkCount = isMobile ? 90 : 220;

  return (
    <Canvas
      camera={{ position: [0, 1.2, 6], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop={prefersReducedMotion ? "demand" : "always"}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0A0B0D"]} />
      <fog attach="fog" args={["#0A0B0D", 12, 45]} />
      {!prefersReducedMotion && <Rig />}
      <WaveField segments={segments} frozen={prefersReducedMotion} />
      <Sparks count={sparkCount} frozen={prefersReducedMotion} />
      {!isMobile && !prefersReducedMotion && (
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.2} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  );
}
