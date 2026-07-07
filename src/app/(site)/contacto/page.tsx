import { sendContactMessage } from "./actions";

export const metadata = {
  title: "Contacto | RS-Motor",
};

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ enviado?: string; error?: string }>;
}) {
  const { enviado, error } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-heading text-4xl font-semibold text-white">
        Contacto
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="leading-relaxed text-rs-muted">
            Bienvenido a RS-Motor, tu concesionario en Málaga. Contamos con
            vehículos de todas las gamas y nuestro equipo te acompaña para
            encontrar el coche que necesitas, con toda la garantía y sin
            sorpresas.
          </p>

          <div className="mt-8 space-y-1">
            <p className="font-heading text-xl font-semibold text-white">
              951 234 567
            </p>
            <p className="font-heading text-xl font-semibold text-white">
              612 345 678
            </p>
            <p className="font-heading text-xl font-semibold text-white">
              699 876 543
            </p>
          </div>

          <div className="mt-6 text-rs-muted">
            <p>info@rsmotormalaga.com</p>
            <p className="mt-2">
              C. Capitán Marcos García, 6, Bailén-Miraflores
              <br />
              29007 Málaga
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-rs-muted">Síguenos</span>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-rs-gray-light text-white transition-colors hover:border-rs-red"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-rs-gray-light text-white transition-colors hover:border-rs-red"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M16.5 3c.4 2 1.8 3.5 3.8 3.8v2.9c-1.4 0-2.7-.4-3.8-1.2v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.9a2.8 2.8 0 1 0 1.9 2.7V3h2.9Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          {enviado && (
            <p className="mb-6 rounded-md border border-rs-gray-light bg-rs-gray px-4 py-3 text-sm text-white">
              Mensaje enviado. Te responderemos lo antes posible.
            </p>
          )}
          {error && (
            <p className="mb-6 rounded-md border border-rs-red bg-rs-gray px-4 py-3 text-sm text-white">
              Faltan datos: nombre y teléfono son obligatorios.
            </p>
          )}

          <form action={sendContactMessage} className="flex flex-col gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              required
              className="rounded-md border border-rs-gray-light bg-rs-gray px-4 py-3 text-white placeholder:text-rs-muted focus:border-rs-red focus:outline-none"
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              required
              className="rounded-md border border-rs-gray-light bg-rs-gray px-4 py-3 text-white placeholder:text-rs-muted focus:border-rs-red focus:outline-none"
            />
            <textarea
              name="mensaje"
              placeholder="Mensaje"
              rows={4}
              className="rounded-md border border-rs-gray-light bg-rs-gray px-4 py-3 text-white placeholder:text-rs-muted focus:border-rs-red focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-rs-red px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
