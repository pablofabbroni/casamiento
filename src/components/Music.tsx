"use client";

import { useEffect, useRef, useState } from "react";

export default function Music() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = document.createElement("audio");
    el.src = "/musica/cancion.mp3";
    el.loop = true;
    el.preload = "none";
    el.addEventListener("canplaythrough", () => setLoaded(true));
    el.addEventListener("loadeddata", () => setLoaded(true));
    el.addEventListener("error", () => {
      setLoaded(false);
    });
    audioRef.current = el;
    return () => {
      el.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  if (!loaded) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pausar música" : "Reproducir música"}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-[#3e2f23] shadow-lg shadow-[#3e2f23]/30 transition-transform hover:scale-105"
    >
      {playing ? (
        <span className="flex h-4 items-end gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[3px] animate-pulse rounded-full bg-[#3e2f23]"
              style={{ height: `${6 + i * 3}px`, animationDelay: `${i * 120}ms` }}
            />
          ))}
        </span>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18V6l11-3v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="17.5" cy="15" r="2.5" />
        </svg>
      )}
    </button>
  );
}