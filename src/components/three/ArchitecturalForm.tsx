import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, MathUtils, Color } from "three";
import { RoundedBox } from "@react-three/drei";
import { cinematicScroll } from "@/lib/cinematicScroll";

interface Slab {
  y: number;
  w: number;
  d: number;
  h: number;
  rot: number;
  metal: boolean;
}

/**
 * Procedural architectural massing — a stacked tower of smoked-glass and
 * brushed-metal slabs with thin gold reveal lines between floors.
 *
 * Geometry is deliberately simple: the render quality comes from the PBR
 * materials and the lighting rig, not from polygon count. Nothing is
 * downloaded, so the hero scene costs no network at all.
 */
const ArchitecturalForm = ({ quality = "high" }: { quality?: "high" | "low" }) => {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  const slabs = useMemo<Slab[]>(() => {
    const list: Slab[] = [];
    const count = quality === "high" ? 9 : 6;
    let y = -1.6;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const h = MathUtils.lerp(0.62, 0.34, t);
      const w = MathUtils.lerp(2.5, 1.05, t * t);
      const d = MathUtils.lerp(2.1, 0.95, t * t);
      list.push({
        y: y + h / 2,
        w,
        d,
        h,
        rot: t * 0.55 + (i % 2 === 0 ? 0.04 : -0.04),
        metal: i % 3 === 1,
      });
      y += h + 0.055;
    }
    return list;
  }, [quality]);

  const goldEmissive = useMemo(() => new Color("#C9A84C"), []);

  useFrame((_, delta) => {
    const p = cinematicScroll.progress;
    const t = performance.now() / 1000;
    if (group.current) {
      // Idle rotation continues underneath the scroll-driven turn so the form
      // is never completely still.
      const targetY = p * Math.PI * 1.35 + t * 0.045;
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, targetY, 3, delta);
      group.current.position.y = MathUtils.damp(
        group.current.position.y,
        Math.sin(t * 0.5) * 0.07 - p * 0.25,
        2.5,
        delta
      );
      const s = 1 + Math.sin(p * Math.PI) * 0.06;
      group.current.scale.setScalar(MathUtils.damp(group.current.scale.x, s, 3, delta));
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <group>
      {/* Illuminated core — reads as the lit interior of the building */}
      <group ref={group}>
        <mesh ref={core} position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.34, 0.42, 5.4, quality === "high" ? 48 : 20]} />
          <meshStandardMaterial
            color="#171410"
            emissive={goldEmissive}
            emissiveIntensity={0.55}
            roughness={0.35}
            metalness={0.6}
          />
        </mesh>

        {slabs.map((slab, i) => (
          <group key={i} position={[0, slab.y, 0]} rotation={[0, slab.rot, 0]}>
            <RoundedBox
              args={[slab.w, slab.h, slab.d]}
              radius={0.035}
              smoothness={quality === "high" ? 4 : 2}
              castShadow
              receiveShadow
            >
              {slab.metal ? (
                <meshStandardMaterial
                  color="#8d8f94"
                  metalness={1}
                  roughness={0.22}
                  envMapIntensity={1.35}
                />
              ) : (
                <meshPhysicalMaterial
                  color="#0e1418"
                  metalness={0.92}
                  roughness={0.08}
                  clearcoat={1}
                  clearcoatRoughness={0.06}
                  envMapIntensity={1.6}
                />
              )}
            </RoundedBox>

            {/* Thin gold reveal line at the slab base */}
            <mesh position={[0, -slab.h / 2 - 0.022, 0]}>
              <boxGeometry args={[slab.w * 1.02, 0.014, slab.d * 1.02]} />
              <meshStandardMaterial
                color="#C9A84C"
                emissive={goldEmissive}
                emissiveIntensity={1.6}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}

        {/* Podium */}
        <mesh position={[0, -1.78, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[2.6, 2.9, 0.28, quality === "high" ? 64 : 24]} />
          <meshStandardMaterial color="#101012" metalness={0.85} roughness={0.35} envMapIntensity={1.1} />
        </mesh>
      </group>
    </group>
  );
};

export default ArchitecturalForm;
