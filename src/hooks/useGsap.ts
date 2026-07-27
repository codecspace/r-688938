import { useLayoutEffect, useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";

type Ctx = gsap.Context;

/**
 * Scopes GSAP animations to a container and reverts them on unmount, which is
 * required under React StrictMode and with route changes — otherwise triggers
 * and inline styles leak between mounts.
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: Ctx, scope: T) => void,
  deps: unknown[] = []
): RefObject<T> {
  const scope = useRef<T>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;
    const el = scope.current;
    const ctx = gsap.context((self) => setup(self, el), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
