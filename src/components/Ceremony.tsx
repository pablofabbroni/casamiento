import Link from "next/link";

const events = [
  {
    id: "iglesia",
    title: "Ceremonia religiosa",
    icon: "church",
    date: "Sábado 13 de febrero de 2027",
    time: "18:30 hs",
    place: "Parroquia Nuestra Señora de La Merced",
    address: "Vicente López y Planes 501",
    city: "Río Cuarto, Córdoba",
    maps: "https://maps.app.goo.gl/2NMLXctSqEXCQjrA6",
  },
  {
    id: "civil",
    title: "Celebración y civil",
    icon: "rings",
    date: "Sábado 13 de febrero de 2027",
    time: "20:00 hs",
    place: "Espacio Muñiz",
    address: "Francisco Muñiz 2900",
    city: "Río Cuarto, Córdoba",
    maps: "https://maps.app.goo.gl/oKJBH8jU3Hjhuzrr9",
  },
];

export default function Ceremony() {
  return (
    <section id="ceremonia" className="scroll-mt-24 bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6b5d3b] font-medium">Agendá</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-light tracking-wide text-[#3e2f23]">
            ¿Cuándo y dónde?
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-[#745237]" />
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {events.map((e) => (
            <article
              key={e.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#dcd4b8] bg-[#faf7f2] shadow-sm transition-shadow hover:shadow-xl hover:shadow-[#745237]/10"
            >
              <div className="flex items-start justify-between gap-4 p-8 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#6b5d3b] font-medium">
                    {e.title}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-normal text-[#3e2f23]">
                    {e.date}
                  </h3>
                  <p className="mt-2 font-serif text-3xl sm:text-4xl font-light text-gold">
                    {e.time}
                  </p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/60 border border-gold/30 shadow-xs">
                  {e.icon === "church" ? (
                    /* Iglesia / Ceremonia religiosa */
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-gold">
                      {/* Cruz superior */}
                      <path d="M12 2v3m-1.5-1.5h3" strokeLinecap="round" />
                      {/* Torre / Techo */}
                      <path d="M12 5l-4 4.5v11.5h8V9.5L12 5Z" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Puerta en arco */}
                      <path d="M10.5 21v-3.5a1.5 1.5 0 0 1 3 0V21" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Ventana rosetón */}
                      <circle cx="12" cy="12" r="1.3" />
                      {/* Naves laterales */}
                      <path d="M8 13.5H4.5V21H8M16 13.5h3.5V21H16" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    /* Celebración y civil (Anillos de boda entrelazados y destellos) */
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-gold">
                      {/* Anillos entrelazados */}
                      <circle cx="8.5" cy="14" r="4.5" />
                      <circle cx="15.5" cy="14" r="4.5" />
                      {/* Diamante y destello */}
                      <path d="M8.5 9.5L7 6.5h3L8.5 9.5Z" strokeLinejoin="round" />
                      <path d="M15.5 5.5v2.5M14.2 6.7h2.6M19.5 4.5v1.8M18.6 5.4h1.8" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="px-8 pb-6 text-sm leading-relaxed">
                <p className="font-serif text-xl sm:text-2xl font-normal text-[#3e2f23]">
                  {e.place}
                </p>
                <p className="mt-1 text-ink/75">{e.address}</p>
                <p className="text-ink/75">{e.city}</p>
              </div>

              <div className="px-8 pb-8">
                <Link
                  href={e.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#745237] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#faf7f0] shadow-sm transition-all hover:bg-[#5c4029] hover:shadow-md active:scale-95"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>
                  Cómo llegar
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}