"use client";

import { useMemo } from "react";
import { Color, DoubleSide } from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uSpeed;

  varying float vFogDepth;
  varying float vElevation;

  void main() {
    vec3 pos = position;
    float t = uTime * uSpeed;

    float elevation =
      sin(pos.x * 0.18 + t) * 1.4 +
      sin(pos.y * 0.22 + t * 0.7) * 1.1 +
      sin((pos.x + pos.y) * 0.10 - t * 0.5) * 0.6;

    elevation *= uAmp;
    pos.z += elevation;
    vElevation = elevation;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vFogDepth = -mvPosition.z;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;

  varying float vFogDepth;
  varying float vElevation;

  void main() {
    vec3 color = uColor + vElevation * 0.06;
    float alpha = (1.0 - smoothstep(8.0, 34.0, vFogDepth)) * 0.6;

    float fogFactor = smoothstep(uFogNear, uFogFar, vFogDepth);
    color = mix(color, uFogColor, fogFactor);

    gl_FragColor = vec4(color, alpha);
  }
`;

type WaveFieldProps = {
  segments: number;
};

export default function WaveField({ segments }: WaveFieldProps) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 1.8 },
      uAmp: { value: 1 },
      uSpeed: { value: 1 },
      uColor: { value: new Color("#4D7CFF") },
      uFogColor: { value: new Color("#0A0B0D") },
      uFogNear: { value: 12 },
      uFogFar: { value: 45 },
    }),
    []
  );

  return (
    <mesh rotation={[-Math.PI / 2.6, 0, 0]} position={[0, -3, -10]}>
      <planeGeometry args={[60, 60, segments, segments]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe
        transparent
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  );
}
