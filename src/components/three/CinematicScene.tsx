import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, MeshReflectorMaterial, Preload } from "@react-three/drei";
import { ACESFilmicToneMapping, MathUtils, Vector3, FogExp2, Color } from "three";
import ArchitecturalForm from "./ArchitecturalForm";
import CinematicLighting from "./CinematicLighting";
import PostFX from "./PostFX";
import { cinematicScroll, sampleKeyframes, prefersReducedMotion } from "@/lib/cinematicScroll";

/* -------------------------------------------------------------------------- */
/* Camera timeline                                                             */
/* -------------------------------------------------------------------------- */

interface CamKey {
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
  fog: number;
}

/** Five beats: hero → properties → about → services → contact. */
const CAM_KEYS: CamKey[] = [
  { p: 0.0, pos: [0, 1.3, 9.6], look: [0, 1.1, 0], fog: 0.048 },
  { p: 0.25, pos: [4.4, 0.6, 6.4], look: [0, 1.5, 0], fog: 0.038 },
  { p: 0.5, pos: [-4.8, 0.1, 6.2], look: [0, 0.9, 0], fog: 0.075 },
  { p: 0.75, pos: [0.6, 6.4, 8.2], look: [0, 0.4, 0], fog: 0.03 },
  { p: 1.0, pos: [0, 1.9, 11.2], look: [0, 1.4, 0], fog: 0.055 },
];

const CameraRig = ({ mobile }: { mobile: boolean }) => {
  const { camera, scene } = useThree();
  const lookAt = useRef(new Vector3(0, 1.1, 0));
  const pointer = useRef({ x: 0, y: 0 });
  const fog = useMemo(() => new FogExp2(new Color("#07080a").getHex(), 0.048), []);

  // Attach exponential fog once — density is scrubbed below.
  if (scene.fog !== fog) scene.fog = fog;

  useFrame(({ pointer: p2 }, delta) => {
    // Damp the raw scroll target so the whole film glides instead of snapping.
    cinematicScroll.progress = MathUtils.damp(
      cinematicScroll.progress,
      cinematicScroll.target,
      3.2,
      delta
    );
    const p = cinematicScroll.progress;

    const v = sampleKeyframes(CAM_KEYS, p, (a, b, t) => ({
      pos: [
        MathUtils.lerp(a.pos[0], b.pos[0], t),
        MathUtils.lerp(a.pos[1], b.pos[1], t),
        MathUtils.lerp(a.pos[2], b.pos[2], t),
      ] as [number, number, number],
      look: [
        MathUtils.lerp(a.look[0], b.look[0], t),
        MathUtils.lerp(a.look[1], b.look[1], t),
        MathUtils.lerp(a.look[2], b.look[2], t),
      ] as [number, number, number],
      fog: MathUtils.lerp(a.fog, b.fog, t),
    }));

    // Mouse parallax, tiny — it should register subconsciously, not as a gimmick.
    if (!mobile) {
      pointer.current.x = MathUtils.damp(pointer.current.x, p2.x * 0.55, 2, delta);
      pointer.current.y = MathUtils.damp(pointer.current.y, p2.y * 0.3, 2, delta);
    }

    // Wider framing on narrow screens so the tower always fits.
    const pull = mobile ? 1.35 : 1;

    camera.position.x = MathUtils.damp(camera.position.x, v.pos[0] * pull + pointer.current.x, 4, delta);
    camera.position.y = MathUtils.damp(camera.position.y, v.pos[1] + pointer.current.y, 4, delta);
    camera.position.z = MathUtils.damp(camera.position.z, v.pos[2] * pull, 4, delta);

    lookAt.current.x = MathUtils.damp(lookAt.current.x, v.look[0], 4, delta);
    lookAt.current.y = MathUtils.damp(lookAt.current.y, v.look[1], 4, delta);
    lookAt.current.z = MathUtils.damp(lookAt.current.z, v.look[2], 4, delta);
    camera.lookAt(lookAt.current);

    fog.density = MathUtils.damp(fog.density, v.fog, 2, delta);
  });

  return null;
};

/* -------------------------------------------------------------------------- */
/* Reflective ground                                                           */
/* -------------------------------------------------------------------------- */

const Ground = ({ quality }: { quality: "high" | "low" }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.95, 0]} receiveShadow>
    <planeGeometry args={[70, 70]} />
    {quality === "high" ? (
      <MeshReflectorMaterial
        blur={[420, 110]}
        resolution={512}
        mixBlur={1}
        mixStrength={38}
        roughness={0.85}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.35}
        color="#080809"
        metalness={0.7}
        mirror={0}
      />
    ) : (
      <meshStandardMaterial color="#0a0a0c" roughness={0.55} metalness={0.7} />
    )}
  </mesh>
);

/* -------------------------------------------------------------------------- */
/* Canvas                                                                      */
/* -------------------------------------------------------------------------- */

const CinematicScene = ({ mobile = false }: { mobile?: boolean }) => {
  const quality: "high" | "low" = mobile ? "low" : "high";
  const reduced = prefersReducedMotion();

  return (
    <Canvas
      dpr={[1, mobile ? 1.35 : 1.75]}
      shadows={quality === "high"}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      camera={{ fov: 38, near: 0.1, far: 90, position: [0, 1.3, 9.6] }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
      frameloop={reduced ? "demand" : "always"}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <CameraRig mobile={mobile} />
        <CinematicLighting quality={quality} />
        <ArchitecturalForm quality={quality} />
        <Ground quality={quality} />
        <PostFX quality={quality} />
        <AdaptiveDpr pixelated={false} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default CinematicScene;
