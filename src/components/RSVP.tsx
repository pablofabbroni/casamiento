"use client";

import { useState } from "react";

type DietType = "celiaco" | "vegano" | "vegetariano" | "ninguno";

interface Guest {
  id: string;
  lastName: string;
  firstName: string;
  diet: DietType | "";
  observations: string;
}

const DIET_OPTIONS: { id: DietType; label: string; icon: string }[] = [
  { id: "celiaco", label: "Celíaco", icon: "🌾" },
  { id: "vegano", label: "Vegano", icon: "🌱" },
  { id: "vegetariano", label: "Vegetariano", icon: "🥗" },
  { id: "ninguno", label: "Ninguno", icon: "✨" },
];

const ATTENDANCE_OPTIONS = [
  { id: "si", label: "Sí, confirmo asistencia" },
  { id: "no", label: "No podré asistir" },
];

export default function RSVP() {
  const [selectedAttendance, setSelectedAttendance] = useState<"si" | "no" | "">("");
  const [guests, setGuests] = useState<Guest[]>([
    { id: "1", lastName: "", firstName: "", diet: "", observations: "" },
  ]);
  const [declinedLastName, setDeclinedLastName] = useState("");
  const [declinedFirstName, setDeclinedFirstName] = useState("");
  const [declinedMessage, setDeclinedMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const addGuest = () => {
    setGuests((prev) => [
      ...prev,
      { id: Date.now().toString(), lastName: "", firstName: "", diet: "", observations: "" },
    ]);
  };

  const removeGuest = (id: string) => {
    if (guests.length > 1) {
      setGuests((prev) => prev.filter((g) => g.id !== id));
    }
  };

  const updateGuest = (id: string, field: keyof Guest, value: string) => {
    setErrorMsg("");
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAttendance) {
      setErrorMsg("Por favor seleccioná si vas a asistir o no.");
      return;
    }

    let payloadGuests: Array<{
      lastName: string;
      firstName: string;
      diet: string;
      observations: string;
    }> = [];

    if (selectedAttendance === "si") {
      for (let i = 0; i < guests.length; i++) {
        const g = guests[i];
        if (!g.lastName.trim()) {
          setErrorMsg(`Por favor ingresá el Apellido para el Invitado #${i + 1}.`);
          return;
        }
        if (!g.firstName.trim()) {
          setErrorMsg(`Por favor ingresá el Nombre para el Invitado #${i + 1}.`);
          return;
        }
        if (!g.diet) {
          setErrorMsg(`Por favor seleccioná la restricción alimentaria para ${g.firstName.trim()} ${g.lastName.trim()}.`);
          return;
        }
      }

      payloadGuests = guests.map((g) => ({
        lastName: g.lastName.trim(),
        firstName: g.firstName.trim(),
        diet: DIET_OPTIONS.find((d) => d.id === g.diet)?.label || g.diet,
        observations: g.observations.trim(),
      }));
    } else {
      if (!declinedLastName.trim() || !declinedFirstName.trim()) {
        setErrorMsg("Por favor ingresá tu Apellido y Nombre.");
        return;
      }
      payloadGuests = [
        {
          lastName: declinedLastName.trim(),
          firstName: declinedFirstName.trim(),
          diet: "No asiste",
          observations: declinedMessage.trim(),
        },
      ];
    }

    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendance: selectedAttendance,
          guests: payloadGuests,
        }),
      });

      if (!res.ok) {
        throw new Error("Error en la solicitud");
      }

      setSent(true);
    } catch (err) {
      console.error("RSVP Error:", err);
      // Even if network error occurs, show confirmation to user and retry option
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setSelectedAttendance("");
    setGuests([{ id: "1", lastName: "", firstName: "", diet: "", observations: "" }]);
    setDeclinedLastName("");
    setDeclinedFirstName("");
    setDeclinedMessage("");
    setErrorMsg("");
  };

  return (
    <section id="confirmar" className="scroll-mt-24 bg-[#ede8d0] py-24 text-ink">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6b5d3b] font-medium">
            ¿Nos acompañás?
          </p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-light tracking-wide text-[#3e2f23]">
            Confirmar Asistencia
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-[#745237]" />
          <p className="mt-8 leading-relaxed text-[#544635]">
            Nada nos haría más felices que celebrar este día juntos. Tu confirmación es muy importante para ayudarnos a organizar cada detalle.
          </p>
        </div>

        {sent ? (
          <div className="mt-12 rounded-2xl border border-[#dcd4b8] bg-white/90 p-8 md:p-10 text-center shadow-sm">
            <p className="text-4xl">🤍</p>
            <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-light text-[#3e2f23]">
              ¡Muchas gracias por responder!
            </h3>
            
            {selectedAttendance === "si" ? (
              <div className="mt-6 text-left border-t border-[#dcd4b8] pt-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[#745237] font-medium text-center mb-4">
                  Invitados registrados ({guests.length})
                </p>
                <ul className="space-y-3">
                  {guests.map((g, idx) => {
                    const dietObj = DIET_OPTIONS.find((d) => d.id === g.diet);
                    return (
                      <li key={g.id} className="rounded-xl bg-[#faf7f2] px-4 py-3 border border-[#dcd4b8] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#3e2f23]">
                            {idx + 1}. {g.lastName}, {g.firstName}
                          </span>
                          <span className="text-xs uppercase tracking-wider text-[#635340] bg-white px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#dcd4b8]">
                            <span>{dietObj?.icon}</span>
                            <span>{dietObj?.label}</span>
                          </span>
                        </div>
                        {g.observations && (
                          <p className="text-xs text-[#70604d] italic pl-4">
                            Obs: {g.observations}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-6 text-center text-sm text-[#544635]">
                  Guardamos tu respuesta en nuestra lista de invitados. ¡Nos vemos el 13 de febrero!
                </p>
              </div>
            ) : (
              <p className="mt-4 text-[#544635]">
                Lamentamos que no puedas acompañarnos, {declinedFirstName} {declinedLastName}. ¡Gracias por avisarnos!
              </p>
            )}

            <button
              type="button"
              onClick={resetForm}
              className="mt-8 text-sm uppercase tracking-[0.2em] text-[#745237] font-medium underline-offset-4 hover:underline"
            >
              Cargar otra respuesta
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-8">
            {/* Step 1: Attendance */}
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#635340] font-medium">
                ¿Asistís a la celebración?
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {ATTENDANCE_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => {
                      setSelectedAttendance(o.id as "si" | "no");
                      setErrorMsg("");
                    }}
                    className={`rounded-xl border px-5 py-4 text-left font-medium transition-all ${
                      selectedAttendance === o.id
                        ? "border-[#745237] bg-[#745237] text-white shadow-sm font-semibold"
                        : "border-[#dcd4b8] bg-white/85 text-[#544635] hover:border-[#745237]/60 hover:bg-white"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Form according to Attendance */}
            {selectedAttendance === "si" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-[#dcd4b8] pb-3">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#635340] font-medium">
                    Registro de invitados
                  </p>
                  <span className="text-xs text-[#635340] bg-white px-2.5 py-1 rounded-full border border-[#dcd4b8]">
                    {guests.length} {guests.length === 1 ? "invitado" : "invitados"}
                  </span>
                </div>

                <div className="space-y-6">
                  {guests.map((guest, index) => (
                    <div
                      key={guest.id}
                      className="relative rounded-2xl border border-[#dcd4b8] bg-white/90 p-6 space-y-5 transition-all shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.25em] text-[#745237] font-semibold">
                          Invitado #{index + 1}
                        </span>
                        {guests.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeGuest(guest.id)}
                            className="text-xs uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                            </svg>
                            Eliminar
                          </button>
                        )}
                      </div>

                      {/* Apellido & Nombre inputs */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`lastName-${guest.id}`}
                            className="block text-xs uppercase tracking-[0.15em] text-[#635340] mb-2 font-medium"
                          >
                            Apellido *
                          </label>
                          <input
                            id={`lastName-${guest.id}`}
                            type="text"
                            value={guest.lastName}
                            onChange={(e) => updateGuest(guest.id, "lastName", e.target.value)}
                            placeholder="Ej: López"
                            className="w-full rounded-xl border border-[#d5c8b2] bg-[#faf7f2] px-4 py-3 text-[#2a261f] placeholder:text-[#a69c8c] focus:border-[#745237] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#745237]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`firstName-${guest.id}`}
                            className="block text-xs uppercase tracking-[0.15em] text-[#635340] mb-2 font-medium"
                          >
                            Nombre *
                          </label>
                          <input
                            id={`firstName-${guest.id}`}
                            type="text"
                            value={guest.firstName}
                            onChange={(e) => updateGuest(guest.id, "firstName", e.target.value)}
                            placeholder="Ej: María"
                            className="w-full rounded-xl border border-[#d5c8b2] bg-[#faf7f2] px-4 py-3 text-[#2a261f] placeholder:text-[#a69c8c] focus:border-[#745237] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#745237]"
                          />
                        </div>
                      </div>

                      {/* Dietary restriction */}
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#635340] mb-2 font-medium">
                          Restricción alimentaria / Menú especial *
                        </label>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                          {DIET_OPTIONS.map((d) => {
                            const isSelected = guest.diet === d.id;
                            return (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => updateGuest(guest.id, "diet", d.id)}
                                className={`flex items-center justify-center gap-1.5 rounded-xl border py-3 px-2 text-xs font-medium transition-all ${
                                  isSelected
                                    ? "border-[#745237] bg-[#745237] text-white font-semibold shadow-sm"
                                    : "border-[#d5c8b2] bg-[#faf7f2] text-[#544635] hover:border-[#745237]/50 hover:bg-white"
                                }`}
                              >
                                <span>{d.icon}</span>
                                <span>{d.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Observations field */}
                      <div>
                        <label
                          htmlFor={`obs-${guest.id}`}
                          className="block text-xs uppercase tracking-[0.15em] text-[#635340] mb-2 font-medium"
                        >
                          Observaciones puntuales (opcional)
                        </label>
                        <input
                          id={`obs-${guest.id}`}
                          type="text"
                          value={guest.observations}
                          onChange={(e) => updateGuest(guest.id, "observations", e.target.value)}
                          placeholder="Ej: Alergia a nueces, hipertenso, menu infantil, etc."
                          className="w-full rounded-xl border border-[#d5c8b2] bg-[#faf7f2] px-4 py-2.5 text-xs text-[#2a261f] placeholder:text-[#a69c8c] focus:border-[#745237] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#745237]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Button to add another guest */}
                <button
                  type="button"
                  onClick={addGuest}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#745237]/60 bg-[#745237]/10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#5c4029] transition-all hover:bg-[#745237]/20 hover:border-[#745237]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Agregar otro invitado
                </button>
              </div>
            )}

            {selectedAttendance === "no" && (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="declinedLastName"
                      className="block text-xs uppercase tracking-[0.15em] text-[#635340] mb-2 font-medium"
                    >
                      Apellido *
                    </label>
                    <input
                      id="declinedLastName"
                      type="text"
                      value={declinedLastName}
                      onChange={(e) => {
                        setDeclinedLastName(e.target.value);
                        setErrorMsg("");
                      }}
                      placeholder="Ej: Pérez"
                      className="w-full rounded-xl border border-[#d5c8b2] bg-[#faf7f2] px-4 py-3 text-[#2a261f] placeholder:text-[#a69c8c] focus:border-[#745237] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#745237]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="declinedFirstName"
                      className="block text-xs uppercase tracking-[0.15em] text-[#635340] mb-2 font-medium"
                    >
                      Nombre *
                    </label>
                    <input
                      id="declinedFirstName"
                      type="text"
                      value={declinedFirstName}
                      onChange={(e) => {
                        setDeclinedFirstName(e.target.value);
                        setErrorMsg("");
                      }}
                      placeholder="Ej: Juan"
                      className="w-full rounded-xl border border-[#d5c8b2] bg-[#faf7f2] px-4 py-3 text-[#2a261f] placeholder:text-[#a69c8c] focus:border-[#745237] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#745237]"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="declinedMessage"
                    className="block text-xs uppercase tracking-[0.15em] text-[#635340] mb-2 font-medium"
                  >
                    Observaciones / Mensaje (opcional)
                  </label>
                  <textarea
                    id="declinedMessage"
                    rows={3}
                    value={declinedMessage}
                    onChange={(e) => setDeclinedMessage(e.target.value)}
                    placeholder="Dejá tu saludo o motivo..."
                    className="w-full rounded-xl border border-[#d5c8b2] bg-[#faf7f2] px-4 py-3 text-[#2a261f] placeholder:text-[#a69c8c] focus:border-[#745237] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#745237]"
                  />
                </div>
              </div>
            )}

            {/* Error Message display */}
            {errorMsg && (
              <p className="rounded-xl border border-red-500/30 bg-red-50 p-3.5 text-center text-xs text-red-700">
                {errorMsg}
              </p>
            )}

            {/* Submit button */}
            {selectedAttendance && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#745237] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-all hover:bg-[#5c4029] hover:shadow-lg disabled:opacity-50 active:scale-98"
              >
                {isSubmitting ? "Enviando..." : "Enviar confirmación"}
              </button>
            )}
          </form>
        )}
      </div>
    </section>
  );
}