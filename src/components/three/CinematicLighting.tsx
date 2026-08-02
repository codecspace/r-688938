import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DirectionalLight, SpotLight, PointLight, MathUtils } from "three";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { cinematicScroll, sampleKeyframes } from "@/lib/cinematicScroll";

/**
 * Scroll-scrubbed cinematic lighting rig.
 *
 * Deliberately not the default three-point demo setup: a hard directional key
 * carves the form, two large soft fills lift the shadow side without flattening
 * it, and a cool rim separates the silhouette from the background. Reflections
 * come from a generated studio environment (Lightformers), so metals and glass
 * have something real to reflect without downloading an HDRI.
 */

interface LightKey {
  p: number;
  key: number;
  fill: number;
  rim: number;
  amb: number;
}

const LIGHT_KEYS: LightKey[] = [
  { p: 0.0, key: 3.1, fill: 1.1, rim: 2.6, amb: 0.22 }, // hero — moody, high contrast
  { p: 0.25, key: 4.2, fill: 1.5, rim: 2.2, amb: 0.3 }, // properties — opens up
  { p: 0.5, key: 1.6, fill: 0.75, rim: 3.4, amb: 0.16 }, // about — silhouette, rim heavy
  { p: 0.75, key: 4.8, fill: 1.9, rim: 1.8, amb: 0.36 }, // services — bright, wide
  { p: 1.0, key: 2.4, fill: 1.2, rim: 3.0, amb: 0.24 }, // contact — settles back down
];

const CinematicLighting = ({ quality = "high" }: { quality?: "high" | "low" }) => {
  const key = useRef<DirectionalLight>(null);
  const fillA = useRef<PointLight>(null);
  const fillB = useRef<PointLight>(null);
  const rim = useRef<SpotLight>(null);
  const ambient = useRef<{ intensity: number }>(null);

  useFrame((_, delta) => {
    const p = cinematicScroll.progress;
    const v = sampleKeyframes(LIGHT_KEYS, p, (a, b, t) => ({
      key: MathUtils.lerp(a.key, b.key, t),
      fill: MathUtils.lerp(a.fill, b.fill, t),
      rim: MathUtils.lerp(a.rim, b.rim, t),
      amb: MathUtils.lerp(a.amb, b.amb, t),
    }));

    const d = (cur: number, to: number) => MathUtils.damp(cur, to, 3, delta);

    if (key.current) {
      key.current.intensity = d(key.current.intensity, v.key);
      // Key light arcs overhead across the timeline
      key.current.position.set(
        Math.cos(p * Math.PI * 0.9 + 0.5) * 7,
        6 + p * 3,
        Math.sin(p * Math.PI * 0.9 + 0.5) * 7
      );
    }
    if (fillA.current) fillA.current.intensity = d(fillA.current.intensity, v.fill * 9);
    if (fillB.current) fillB.current.intensity = d(fillB.current.intensity, v.fill * 5);
    if (rim.current) rim.current.intensity = d(rim.current.intensity, v.rim * 14);
    if (ambient.current) ambient.current.intensity = d(ambient.current.intensity, v.amb);
  });

  return (
    <>
      <ambientLight ref={ambient as never} intensity={0.22} color="#8fa4c4" />

      {/* Key */}
      <directionalLight
        ref={key}
        position={[5, 7, 5]}
        intensity={3.1}
        color="#fff3dd"
        castShadow={quality === "high"}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0006}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Large soft fills — stand in for bounced studio panels */}
      <pointLight ref={fillA} position={[-6, 2.5, 4]} intensity={9} distance={26} decay={2} color="#7f9dd6" />
      <pointLight ref={fillB} position={[4, -1.5, 5]} intensity={5} distance={20} decay={2} color="#f0d78c" />

      {/* Rim — separates the form from the charcoal background */}
      <spotLight
        ref={rim}
        position={[-3.5, 5, -7]}
        angle={0.7}
        penumbra={1}
        intensity={36}
        distance={40}
        decay={2}
        color="#cfe2ff"
      />

      {/* Generated studio environment: real reflections, zero network cost */}
      <Environment resolution={quality === "high" ? 256 : 128} frames={1}>
        <group rotation={[0, Math.PI / 3, 0]}>
          <Lightformer form="rect" intensity={3.2} position={[0, 5, -6]} scale={[12, 6, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.4} position={[-7, 2, 3]} scale={[8, 8, 1]} rotation={[0, Math.PI / 2, 0]} color="#9fb8e8" />
          <Lightformer form="rect" intensity={1.1} position={[7, 1, 2]} scale={[8, 8, 1]} rotation={[0, -Math.PI / 2, 0]} color="#f4dfa8" />
          <Lightformer form="ring" intensity={2.4} position={[0, 6, 4]} scale={5} color="#ffffff" />
        </group>
      </Environment>

      {/* Grounding contact shadow — the cheapest way to make CG feel photographed */}
      <ContactShadows
        position={[0, -1.94, 0]}
        opacity={0.85}
        scale={18}
        blur={2.8}
        far={6}
        resolution={quality === "high" ? 512 : 256}
        color="#000000"
        frames={quality === "high" ? Infinity : 1}
      />
    </>
  );
};

export default CinematicLighting;
