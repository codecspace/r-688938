import { Component, ReactNode, Suspense, lazy, useEffect, useState } from "react";
import { isTouchDevice } from "@/lib/cinematicScroll";

const CinematicScene = lazy(() => import("./CinematicScene"));

/** If WebGL is unavailable or the scene throws, we quietly fall back to the
 *  static charcoal backdrop — the site must never go blank because of 3D. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
};

/**
 * Fixed, full-viewport WebGL backdrop that the whole page scrolls over.
 *
 * Mounted only after first paint (and only when the tab is visible) so the
 * hero copy and the LCP never wait on the 3D bundle. Until then — and forever
 * on devices without WebGL — the CSS gradient below stands in.
 */
const SceneCanvas = () => {
  const [mount, setMount] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) return;
    setMobile(isTouchDevice() || window.innerWidth < 768);

    // Wait for the browser to go idle so the scene never competes with LCP.
    const idle = (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(() => setMount(true), { timeout: 1800 })
      : window.setTimeout(() => setMount(true), 700);

    return () => {
      if ((window as any).cancelIdleCallback) (window as any).cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Static composed backdrop — also the reduced-motion / no-WebGL state */}
      <div className="absolute inset-0 scene-backdrop" />

      {mount && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <div className="absolute inset-0 animate-fadeIn" style={{ animationDuration: "1.6s" }}>
              <CinematicScene mobile={mobile} />
            </div>
          </Suspense>
        </SceneBoundary>
      )}

      {/* Cinematic grade over the render */}
      <div className="absolute inset-0 scene-grade" />
      <div className="grain absolute inset-0 opacity-30" />
    </div>
  );
};

export default SceneCanvas;
