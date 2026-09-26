"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2027-02-13T18:30:00-03:00");

type Left = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

function diff(): Left {
  const now = new Date();
  const ms = Math.max(0, WEDDING_DATE.getTime() - now.getTime());
  return {
    dias: Math.floor(ms / 86_400_000),
    horas: Math.floor((ms / 3_600_000) % 24),
    minutos: Math.floor((ms / 60_000) % 60),
    segundos: Math.floor((ms / 1000) % 60),
  };
}

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [left, setLeft] = useState<Left>({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    setMounted(true);
    setLeft(diff());
    const id = setInterval(() => setLeft(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "Días", value: left.dias },
    { label: "Horas", value: left.horas },
    { label: "Minutos", value: left.minutos },
    { label: "Segundos", value: left.segundos },
  ];

  return (
    <section className="bg-[#ede8d0] pt-20 pb-8 text-ink">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#6b5d3b] font-medium">
          Faltan
        </p>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {cells.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-[#dcd4b8] bg-white/85 py-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tabular-nums text-[#745237]">
                {String(c.value).padStart(2, "0")}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[#635340] font-medium">
                {c.label}
              </p>
            </div>
          ))}
        </div>

        {/* Línea divisoria decorativa con la siguiente sección */}
        <div className="mt-20 flex items-center justify-center gap-6">
          <span className="h-px max-w-sm flex-1 bg-gradient-to-r from-transparent via-[#745237]/30 to-[#745237]/70" />
          <span className="text-xs tracking-[0.25em] text-[#745237] font-light">✦</span>
          <span className="h-px max-w-sm flex-1 bg-gradient-to-l from-transparent via-[#745237]/30 to-[#745237]/70" />
        </div>
      </div>
    </section>
  );
}