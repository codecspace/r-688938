import { useEffect, useRef, useState } from "react";

interface IntroVideoOverlayProps {
  // Optional direct video source (HTML5 <video>)
  src?: string;
  // Optional Google Drive or any embeddable player URL
  iframeSrc?: string;
  className?: string;
  // Used when iframeSrc is provided since we can't detect "ended" cross-origin
  fallbackDurationMs?: number; // default 15000ms
  // Show only once per browser tab session
  playOncePerSession?: boolean; // default true
}

const IntroVideoOverlay = ({
  src,
  iframeSrc,
  className,
  fallbackDurationMs = 15000,
  playOncePerSession = true,
}: IntroVideoOverlayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const [fading, setFading] = useState(false);

  // Only show once per tab session (survives route changes, resets on tab close)
  const [visible, setVisible] = useState(() => {
    try {
      if (playOncePerSession && typeof window !== "undefined") {
        return !sessionStorage.getItem("introPlayed");
      }
    } catch {}
    return true;
  });

  useEffect(() => {
    if (!visible) return;

    // Mark as played immediately so navigating back to home won't replay
    try {
      if (playOncePerSession) sessionStorage.setItem("introPlayed", "1");
    } catch {}

    // If using an iframe (e.g., Google Drive preview), we cannot access media events safely
    if (iframeSrc) {
      // Start a timed fade-out as a practical workaround
      fadeTimerRef.current = window.setTimeout(() => setFading(true), Math.max(0, fallbackDurationMs - 700));
      hideTimerRef.current = window.setTimeout(() => setVisible(false), fallbackDurationMs);
      return () => {
        if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      };
    }

    // HTML5 <video> flow with proper "ended" handling
    const video = videoRef.current;
    if (!video) return;

    // Ensure autoplay on mobile: muted + playsInline
    video.muted = true;
    // @ts-expect-error - vendor specific property for some browsers
    video.webkitPlaysInline = true;

    const handleEnded = () => {
      setFading(true);
      hideTimerRef.current = window.setTimeout(() => setVisible(false), 700);
    };

    video.addEventListener("ended", handleEnded);

    // Attempt to play immediately
    const playPromise = video.play?.();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        // Autoplay might fail; do not block app load
        // Safety timeout to auto-hide after 12s if ended isn't fired
        fadeTimerRef.current = window.setTimeout(() => setFading(true), 11300);
        hideTimerRef.current = window.setTimeout(() => setVisible(false), 12000);
      });
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [visible, iframeSrc, fallbackDurationMs, playOncePerSession]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-700 ease-out ${
        fading ? "opacity-0" : "opacity-100"
      } ${className ?? ""}`}
    >
      {iframeSrc ? (
        <iframe
          title="Intro Video"
          src={iframeSrc}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          frameBorder={0}
          // prevent clicking player controls while overlay blocks the page
          style={{ pointerEvents: "none" }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          onLoadedData={() => {
            const v = videoRef.current;
            v?.play?.().catch(() => {});
          }}
          onError={() => {
            // If the video fails to load or codec unsupported, remove overlay immediately
            setVisible(false);
          }}
          className="absolute inset-0 h-full w-full object-cover"
        >
          {src ? <source src={src} type="video/mp4" /> : null}
        </video>
      )}
    </div>
  );
};

export default IntroVideoOverlay;
