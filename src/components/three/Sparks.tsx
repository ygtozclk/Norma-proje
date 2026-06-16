"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, Color, MathUtils, Points } from "three";

const BOUNDS = {
  x: 18,
  yMin: -4,
  yMax: 9,
  zMin: -22,
  zMax: 4,
};

type SparksProps = {
  count: number;
  frozen: boolean;
};

export default function Sparks({ count, frozen }: SparksProps) {
  const pointsRef = useRef<Points>(null);

  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    const azure = new Color("#4D7CFF");
    const white = new Color("#FFFFFF");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS.x * 2;
      positions[i * 3 + 1] = MathUtils.lerp(
        BOUNDS.yMin,
        BOUNDS.yMax,
        Math.random()
      );
      positions[i * 3 + 2] = MathUtils.lerp(
        BOUNDS.zMin,
        BOUNDS.zMax,
        Math.random()
      );

      const mixed = azure.clone().lerp(white, Math.random() * 0.6);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;

      speeds[i] = 0.15 + Math.random() * 0.35;
    }

    return { positions, colors, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (frozen || !pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes
      .position as BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      let y = array[i * 3 + 1] + speeds[i] * delta;
      if (y > BOUNDS.yMax) {
        y = BOUNDS.yMin;
      }
      array[i * 3 + 1] = y;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={AdditiveBlending}
        fog
      />
    </points>
  );
}
