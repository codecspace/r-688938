import { useEffect, useRef, useState } from "react";

interface IntroVideoOverlayProps {
  src: string;
  className?: string;
}

const IntroVideoOverlay = ({ src, className }: IntroVideoOverlayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log("Video ref not found");
      return;
    }

    console.log("Video element created, attempting to load:", src);

    // Ensure autoplay on mobile: muted + playsInline
    video.muted = true;
    video.playsInline = true;
    // @ts-expect-error - vendor specific property for some browsers
    video.webkitPlaysInline = true;

    const handleLoadStart = () => console.log("Video loading started");
    const handleLoadedMetadata = () => console.log("Video metadata loaded");
    const handleLoadedData = () => {
      console.log("Video data loaded, attempting autoplay");
      video.play().catch(error => {
        console.error("Autoplay failed:", error);
      });
    };
    const handleCanPlay = () => console.log("Video can start playing");
    const handlePlay = () => console.log("Video started playing");
    const handleError = (e: any) => {
      console.error("Video error:", e);
      setVisible(false);
    };

    const handleEnded = () => {
      console.log("Video ended, fading out");
      setFading(true);
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
      }, 700);
    };

    // Add all event listeners
    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("play", handlePlay);
    video.addEventListener("error", handleError);
    video.addEventListener("ended", handleEnded);

    // Force load the video
    video.load();

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("error", handleError);
      video.removeEventListener("ended", handleEnded);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [src]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        className={`fixed inset-0 w-full h-screen object-cover transition-opacity duration-700 ease-out ${fading ? "opacity-0" : "opacity-100"} ${className ?? ""}`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Debug info overlay */}
      <div className="fixed bottom-4 left-4 text-white text-sm bg-black/50 p-2 rounded">
        Video: {visible ? 'Loading' : 'Hidden'} | Fading: {fading ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

export default IntroVideoOverlay;