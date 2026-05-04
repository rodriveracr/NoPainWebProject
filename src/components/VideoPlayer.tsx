"use client";

import React, { useRef, useState } from "react";

type Props = {
  sources: string[];
  poster?: string;
  className?: string;
};

export default function VideoPlayer({ sources, poster, className }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = useState(false);

  async function handlePlay(e?: React.MouseEvent) {
    e?.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    // If already has a src, just attempt to play (user may have clicked controls)
    if (v.src) {
      try {
        await v.play();
      } catch {
        /* ignore */
      }
      return;
    }

    setLoading(true);
    // Prefer mp4 in production
    const preferred = sources.find((s) => s.endsWith(".mp4")) || sources[0];
    try {
      const res = await fetch(preferred, { method: "GET" });
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      v.src = url;
      try {
        await v.play();
      } catch {
        // leave src assigned so controls work
      }
    } catch (err) {
      // final fallback: assign first URL so user can click native controls
      v.src = sources[0];
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`relative ${className || ""}`}>
      <video
        ref={videoRef}
        controls
        playsInline
        preload="none"
        poster={poster}
        className="w-full h-full rounded-lg bg-black"
      />

      <button
        onClick={handlePlay}
        className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/70"
        aria-label="Play video"
        title="Play"
      >
        {loading ? "..." : "▶"}
      </button>
    </div>
  );
}
