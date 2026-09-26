"use client";

import { useState } from "react";
import Reveal from "./Reveal";

interface Account {
  person: "Pablo" | "Paula";
  name: string;
  bank: string;
  cbu: string;
  phoneDisplay: string;
  whatsappUrl: string;
}

const accounts: Account[] = [
  {
    person: "Pablo",
    name: "Pablo Tomás Fabbroni",
    bank: "Banco Ciudad",
    cbu: "0290107310000559149389",
    phoneDisplay: "+54 9 358 484-5466",
    whatsappUrl:
      "https://wa.me/5493584845466?text=%C2%A1Hola%20Pablo!%20Te%20escribo%20por%20el%20casamiento",
  },
  {
    person: "Paula",
    name: "Paula Victoria Quirch",
    bank: "Banco de la Provincia de Córdoba",
    cbu: "0200302111000019304326",
    phoneDisplay: "+54 9 358 548-2439",
    whatsappUrl:
      "https://wa.me/5493585482439?text=%C2%A1Hola%20Paula!%20Te%20escribo%20por%20el%20casamiento",
  },
];

export default function Gifts() {
  const [copiedCbu, setCopiedCbu] = useState<string | null>(null);

  const handleCopy = (cbu: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(cbu);
      setCopiedCbu(cbu);
      setTimeout(() => setCopiedCbu(null), 2500);
    }
  };

  return (
    <section id="regalos" className="scroll-mt-24 bg-cream py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#6b5d3b] font-medium">
          Mesa de regalos
        </p>
        <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-light tracking-wide text-[#3e2f23]">
          El mejor regalo es su presencia
        </h2>
        <div className="mx-auto mt-6 h-px w-24 bg-[#745237]" />
        <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-[#544635]">
          La mejor parte del día es compartirlo con ustedes, así que no hace falta
          regalar nada. Pero si quieren colaborar con nuestra luna de miel, pueden
          hacerlo mediante transferencia a cualquiera de nuestras cuentas:
        </p>

        <div className="mt-12 grid gap-6 text-left md:grid-cols-2">
          {accounts.map((acc, index) => {
            const isCopied = copiedCbu === acc.cbu;
            return (
              <Reveal key={acc.cbu} delay={index * 120}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[#dcd4b8] bg-[#faf7f2] p-7 shadow-sm transition-all hover:shadow-md hover:border-[#745237]/40">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#dcd4b8] pb-3">
                      <span className="text-xs uppercase tracking-[0.25em] text-[#6b5d3b] font-medium">
                        Cuenta de {acc.person}
                      </span>
                      <span className="text-xs text-[#745237] font-medium bg-[#ede8d0] px-2.5 py-1 rounded-full border border-[#dcd4b8]">
                        {acc.bank}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-ink/60">
                        Titular
                      </p>
                      <p className="mt-1 text-base font-medium text-[#3e2f23]">
                        {acc.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-ink/60">
                        CBU
                      </p>
                      <p className="mt-1 font-mono text-sm tracking-wide text-[#3e2f23] break-all bg-[#ede8d0]/40 p-2.5 rounded-xl border border-[#dcd4b8] select-all">
                        {acc.cbu}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(acc.cbu)}
                      className={`w-full flex items-center justify-center gap-2 rounded-full py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                        isCopied
                          ? "bg-[#745237] text-gold-soft border border-[#745237]"
                          : "border border-[#745237] bg-[#745237]/5 text-[#5c4029] hover:bg-[#745237] hover:text-cream shadow-xs"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              d="M20 6L9 17l-5-5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          ¡CBU Copiado!
                        </>
                      ) : (
                        <>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          Copiar CBU
                        </>
                      )}
                    </button>

                    <a
                      href={acc.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800 transition-all hover:bg-emerald-600 hover:text-white"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.52 3.48A11.93 11.93 0 0012.04 0C5.46 0 .1 5.36.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 005.77 1.48h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.47-8.42zM12.05 21.82h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.88 9.88 0 01-1.52-5.26c0-5.46 4.45-9.91 9.91-9.91 2.65 0 5.14 1.03 7.01 2.9 1.87 1.87 2.9 4.36 2.9 7.01 0 5.46-4.45 9.91-9.91 9.91zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
                      </svg>
                      Mensaje a {acc.person}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-ink/60">
          Cualquier duda o confirmación, pueden comunicarse con nosotros directamente por WhatsApp
        </p>
      </div>
    </section>
  );
}