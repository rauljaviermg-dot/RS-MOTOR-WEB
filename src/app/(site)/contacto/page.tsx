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
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-heading text-4xl font-semibold text-white">
        Contacto
      </h1>
      <p className="mt-3 text-rs-muted">
        Escríbenos y te respondemos con la disponibilidad del vehículo.
      </p>

      {enviado && (
        <p className="mt-6 rounded-md border border-rs-gray-light bg-rs-gray px-4 py-3 text-sm text-white">
          Mensaje enviado. Te responderemos lo antes posible.
        </p>
      )}
      {error && (
        <p className="mt-6 rounded-md border border-rs-red bg-rs-gray px-4 py-3 text-sm text-white">
          Faltan datos: nombre y teléfono son obligatorios.
        </p>
      )}

      <form action={sendContactMessage} className="mt-10 flex flex-col gap-4">
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
  );
}
