"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

// Las fotos optimizadas de la carpeta mejoradas (excluyendo la 159.jpg de la portada)
const fotos = [
  { src: "/fotos/mejoradas/IMG_3010.jpg", alt: "Paula y Pablo en el campo 1" },
  { src: "/fotos/mejoradas/147.jpg", alt: "Paula y Pablo en el campo 2" },
  { src: "/fotos/mejoradas/DSC_0344.jpg", alt: "Paula y Pablo en el campo 3" },
  { src: "/fotos/mejoradas/IMG_3198.jpg", alt: "Paula y Pablo en el campo 4" },
  { src: "/fotos/mejoradas/170.opcion2.JPG", alt: "Paula y Pablo en el campo 5" },
  { src: "/fotos/mejoradas/206.jpg", alt: "Paula y Pablo en el campo 6" },
  { src: "/fotos/mejoradas/DSC_0278.jpg", alt: "Paula y Pablo en el campo 7" },
  { src: "/fotos/mejoradas/IMG_3219.JPG", alt: "Paula y Pablo en el campo 8" },
  { src: "/fotos/mejoradas/DSC_0347.jpg", alt: "Paula y Pablo en el campo 9" },
  { src: "/fotos/mejoradas/281.jpg", alt: "Paula y Pablo en el campo 10" },
  { src: "/fotos/mejoradas/DSC_0349.jpg", alt: "Paula y Pablo en el campo 11" },
  { src: "/fotos/mejoradas/DSC_0160.jpg", alt: "Paula y Pablo en el campo 12" },
  { src: "/fotos/mejoradas/DSC_0351.jpg", alt: "Paula y Pablo en el campo 13" },
  { src: "/fotos/mejoradas/IMG_3221.JPG", alt: "Paula y Pablo en el campo 14" },
  { src: "/fotos/mejoradas/DSC_0353.jpg", alt: "Paula y Pablo en el campo 15" },
  { src: "/fotos/mejoradas/DSC_0287.jpg", alt: "Paula y Pablo en el campo 16" },
];

// Duplicamos las fotos para lograr el bucle infinito continuo
const infiniteFotos = [...fotos, ...fotos];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    // Tomamos el índice real dentro del array original de fotos
    const realIndex = index % fotos.length;
    setLightboxIndex(realIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % fotos.length));
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + fotos.length) % fotos.length
    );
  }, []);

  // Control con teclado (Escape, Flecha Izq, Flecha Der) y bloqueo de scroll
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, showNext, showPrev]);

  return (
    <section id="galeria" className="scroll-mt-24 bg-[#ede8d0] py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#6b5d3b] font-medium">
          Algo de nosotros
        </p>
        <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-light tracking-wide text-[#3e2f23]">
          Galería
        </h2>
        <div className="mx-auto mt-6 h-px w-24 bg-[#745237]" />
      </div>

      {/* Dynamic Infinite Slow-Moving Carousel */}
      <div className="relative mt-14 w-full overflow-hidden group">
        {/* Soft edge fade overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-28 bg-gradient-to-r from-[#ede8d0] to-transparent opacity-95" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-28 bg-gradient-to-l from-[#ede8d0] to-transparent opacity-95" />

        {/* Carousel Track */}
        <div className="animate-marquee-slow flex gap-6 px-4">
          {infiniteFotos.map((f, i) => (
            <button
              key={`${f.src}-${i}`}
              type="button"
              onClick={() => openLightbox(i)}
              aria-label={`Ver foto ${f.alt} en tamaño grande`}
              className="group/card relative h-[360px] w-[260px] sm:h-[430px] sm:w-[310px] md:h-[480px] md:w-[350px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-[#dcd4b8] bg-cream shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:border-[#745237]/60 text-left focus:outline-none focus:ring-2 focus:ring-[#745237]"
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(max-width: 768px) 300px, 400px"
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
              />
              {/* Subtle hover overlay with expand icon */}
              <div className="absolute inset-0 bg-black/25 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover/card:opacity-100 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#3e2f23] shadow-lg transition-transform duration-300 group-hover/card:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de fotos en tamaño completo"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md transition-opacity duration-300"
          onClick={closeLightbox}
        >
          {/* Top Bar: Counter & Close */}
          <div
            className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-8 flex items-center justify-between text-white z-20 pointer-events-none"
          >
            <span className="rounded-full bg-black/50 border border-white/20 px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-medium backdrop-blur-sm">
              {lightboxIndex + 1} / {fotos.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Cerrar imagen"
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/15 border border-white/30 text-white transition-colors hover:bg-white/30 hover:scale-105 active:scale-95"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Foto anterior"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/40 border border-white/25 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110 active:scale-95 shadow-xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Foto siguiente"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/40 border border-white/25 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110 active:scale-95 shadow-xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Main Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[82vh] max-w-[90vw] md:max-w-4xl lg:max-w-5xl overflow-hidden rounded-2xl shadow-2xl border border-white/15"
          >
            <img
              src={fotos[lightboxIndex].src}
              alt={fotos[lightboxIndex].alt}
              className="max-h-[82vh] max-w-[90vw] md:max-w-4xl lg:max-w-5xl object-contain select-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}