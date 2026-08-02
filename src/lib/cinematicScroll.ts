/**
 * Single source of truth for the cinematic scroll timeline.
 *
 * A plain mutable object (not React state) so the WebGL render loop can read
 * the current scroll progress every frame without triggering re-renders.
 * `target` is written by the scroll driver, `progress` is the damped value the
 * scene actually animates toward.
 */
export const cinematicScroll = {
  /** Raw 0..1 progress through the scrollable document. */
  target: 0,
  /** Damped 0..1 progress — what the camera rig reads. */
  progress: 0,
  /** Normalised scroll velocity, used for subtle motion accents. */
  velocity: 0,
};

export const isTouchDevice = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Clamped linear interpolation between two numbers. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));

/** Maps `value` from [inMin,inMax] to [outMin,outMax], clamped. */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  const t = (value - inMin) / (inMax - inMin || 1);
  return lerp(outMin, outMax, t);
};

/**
 * Smoothstep-eased interpolation across a keyframe list.
 * Keyframes must be sorted by `p` (0..1).
 */
export const sampleKeyframes = <T extends { p: number }>(
  keys: T[],
  progress: number,
  blend: (a: T, b: T, t: number) => Omit<T, "p">
) => {
  if (progress <= keys[0].p) return blend(keys[0], keys[0], 0);
  const last = keys[keys.length - 1];
  if (progress >= last.p) return blend(last, last, 1);

  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (progress >= a.p && progress <= b.p) {
      const raw = (progress - a.p) / (b.p - a.p || 1);
      // smootherstep — no visible acceleration seams between beats
      const t = raw * raw * raw * (raw * (raw * 6 - 15) + 10);
      return blend(a, b, t);
    }
  }
  return blend(last, last, 1);
};
