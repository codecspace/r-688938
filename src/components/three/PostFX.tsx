import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  Noise,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { MathUtils } from "three";
import { cinematicScroll } from "@/lib/cinematicScroll";

/**
 * Post chain tuned for a product-advertisement look rather than a demo scene:
 * gentle bloom on the gold reveals only, a shallow depth of field that breathes
 * with the scroll, a heavy-ish vignette to keep the eye centred, and just enough
 * grain to kill banding in the dark falloff.
 *
 * Mobile gets bloom + vignette only — DOF and SMAA are the expensive passes.
 */
const PostFX = ({ quality = "high" }: { quality?: "high" | "low" }) => {
  const focus = useRef(6.5);
  const { size } = useThree();

  useFrame((_, delta) => {
    focus.current = MathUtils.damp(
      focus.current,
      5.5 + Math.sin(cinematicScroll.progress * Math.PI) * 3.2,
      2,
      delta
    );
  });

  if (quality === "low") {
    return (
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom intensity={0.6} luminanceThreshold={0.62} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette offset={0.28} darkness={0.72} eskil={false} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom intensity={0.85} luminanceThreshold={0.55} luminanceSmoothing={0.35} mipmapBlur radius={0.75} />
      <DepthOfField focusDistance={0.012} focalLength={0.05} bokehScale={size.width > 1024 ? 3.2 : 2} />
      <Vignette offset={0.26} darkness={0.78} eskil={false} blendFunction={BlendFunction.NORMAL} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.35} />
      <SMAA />
    </EffectComposer>
  );
};

export default PostFX;
