import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

/**
 * Hand-rolled canvas particle field rather than a heavy particle library —
 * keeps the bundle small and gives full control over performance. Particles
 * drift slowly and gently scatter away from the cursor (or a finger, on
 * touch). Capped particle count + devicePixelRatio, pauses when the tab is
 * hidden, and skips the animation loop entirely for prefers-reduced-motion.
 */
const ParticleField = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let tabVisible = true;
    let inViewport = true;
    const mouse = { x: -9999, y: -9999 };

    const particleCountFor = (w: number, h: number) => Math.min(70, Math.max(26, Math.round((w * h) / 22000)));

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: particleCountFor(width, height) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.3 + 0.5,
        baseAlpha: Math.random() * 0.35 + 0.2,
      }));
    };

    const setMouseFromClient = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    };
    const handleMouseMove = (e: MouseEvent) => setMouseFromClient(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) setMouseFromClient(e.touches[0].clientX, e.touches[0].clientY);
    };
    const clearMouse = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const handleVisibility = () => {
      tabVisible = document.visibilityState === "visible";
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const repelDist = 100;
      const connectDist = 110;

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelDist) {
          const force = ((repelDist - dist) / repelDist) * 0.025;
          p.vx += (dx / (dist || 1)) * force;
          p.vy += (dy / (dist || 1)) * force;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.baseAlpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - dist / connectDist)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      if (tabVisible && inViewport) drawFrame();
      rafId = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    if (prefersReducedMotion) {
      drawFrame(); // one static frame, no loop, no listeners
    } else {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      canvas.addEventListener("mouseleave", clearMouse);
      window.addEventListener("touchend", clearMouse);
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", clearMouse);
      canvas.removeEventListener("mouseleave", clearMouse);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className ?? ""}`} aria-hidden="true" />;
};

export default ParticleField;
