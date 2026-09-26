export default function Footer() {
  return (
    <footer className="bg-[#ede8d0] border-t border-[#dcd4b8] py-14 text-center text-ink">
      <div className="mx-auto max-w-4xl px-6">
        <p className="font-script text-3xl sm:text-4xl font-normal leading-normal flex items-center justify-center gap-x-2.5 text-[#3e2f23]">
          <span>Paula</span>
          <span className="font-sans font-light text-xl sm:text-2xl text-[#745237]">&amp;</span>
          <span>Pablo</span>
        </p>
        <p className="mt-4 text-sm uppercase tracking-[0.35em] text-[#6b5d3b] font-medium">
          13 de febrero de 2027
        </p>
        <div className="mx-auto mt-6 h-px w-16 bg-[#745237]/60" />
        <p className="mt-6 text-sm text-[#544635]">
          Hecho con amor para nuestros invitados · Los esperamos 🤍
        </p>
      </div>
    </footer>
  );
}