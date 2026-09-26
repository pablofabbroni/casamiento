"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest-dark">
      {/* Background Photo from Campo with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fotos/hero-campo.jpg"
          alt="Paula y Pablo"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 62%" }}
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
      </div>

      <div className="relative z-10 px-6 text-center text-cream">
        <p className="text-xs uppercase tracking-[0.5em] text-sage-light md:text-sm">
          Nuestra boda
        </p>
        <h1 className="mt-6 font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-normal text-cream drop-shadow-md flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-4">
          <span>Paula</span>
          <span className="font-sans font-light text-2xl sm:text-3xl md:text-4xl text-gold-soft">
            &amp;
          </span>
          <span>Pablo</span>
        </h1>
        <div className="mx-auto mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-cream/40" />
          <span className="text-sm uppercase tracking-[0.35em] text-cream/90 font-light drop-shadow-sm">
            13 · 02 · 2027
          </span>
          <span className="h-px w-16 bg-cream/40" />
        </div>
        <p className="mx-auto mt-8 max-w-xl font-sans text-base sm:text-lg font-light leading-relaxed text-cream/90 drop-shadow-sm">
          La vida está hecha de momentos, y algunos merecen ser celebrados de forma especial.
          <br />
          <span className="mt-3 inline-block font-normal text-cream">
            Será una alegría inmensa compartir este gran día con ustedes.
          </span>
        </p>
        <a
          href="#ceremonia"
          className="mt-20 sm:mt-24 inline-flex items-center rounded-full border border-cream/50 bg-black/20 backdrop-blur-sm px-10 py-4 text-sm uppercase tracking-[0.3em] text-cream transition-all hover:border-gold-soft hover:bg-black/30 hover:text-gold-soft shadow-lg"
        >
          Ver la invitación
        </a>
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce text-cream/70 z-10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}