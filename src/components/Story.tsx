import Reveal from "./Reveal";

const milestones = [
  {
    year: "2021",
    title: "El primer día",
    text: "Un encuentro que no sabíamos que cambiaría todo. De ahí en más, ningún plan fue el mismo.",
  },
  {
    year: "2024",
    title: "La vida juntos",
    text: "Viajes, mudanzas, rutinas compartidas y una familia que creció con un amor inesperado.",
  },
  {
    year: "2027",
    title: "El gran día",
    text: "Después de seis años de construir una historia, nos casamos y festejamos con ustedes.",
  },
];

export default function Story() {
  return (
    <section id="historia" className="scroll-mt-24 bg-cream py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6b5d3b] font-medium">
            Nuestra historia
          </p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-light tracking-wide text-[#3e2f23]">
            Seis años de nosotros
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-[#745237]" />
        </div>

        <div className="relative mt-20">
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#745237]/20 md:block" />
          <div className="space-y-16">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 120}>
                <div
                  className={`relative flex flex-col items-center gap-4 md:flex-row ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <span className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-cream md:block" />
                  <div className="w-full md:w-1/2">
                    <p className="font-serif text-4xl sm:text-5xl font-light text-gold">{m.year}</p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="font-serif text-2xl font-normal text-[#3e2f23]">
                      {m.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[#544635]">{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}