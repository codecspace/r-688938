import { useEffect, useRef, useState } from "react";

interface IntroVideoOverlayProps {
  src: string;
  className?: string;
}

const IntroVideoOverlay = ({ src, className }: IntroVideoOverlayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure autoplay on mobile: muted + playsInline
    video.muted = true;
    // @ts-expect-error - vendor specific property for some browsers
    video.webkitPlaysInline = true;

    const handleEnded = () => {
      setFading(true);
      const timeout = setTimeout(() => {
        setVisible(false); // Unmount after fade
      }, 700);
      return () => clearTimeout(timeout);
    };

    video.addEventListener("ended", handleEnded);

    // Attempt to play immediately
    const playPromise = video.play?.();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        // Autoplay might fail if browser policy changes; we keep overlay but do not block app load
      });
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`fixed inset-0 w-full h-screen object-cover bg-black transition-opacity duration-700 ease-out ${fading ? "opacity-0" : "opacity-100"} ${className ?? ""}`}
      />
    </div>
  );
};

export default IntroVideoOverlay;

