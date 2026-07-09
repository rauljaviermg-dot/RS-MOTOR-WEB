import ALaCartaForm from "@/components/ALaCartaForm";

export const metadata = {
  title: "Coche a la carta | RS-Motor",
};

export default async function ALaCartaPage({
  searchParams,
}: {
  searchParams: Promise<{ enviado?: string; error?: string }>;
}) {
  const { enviado, error } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-widest text-rs-red">
        Coche a la carta
      </p>
      <h1 className="mt-3 font-heading text-4xl font-semibold text-white">
        Tu coche perfecto, a tu medida.
      </h1>
      <p className="mt-4 leading-relaxed text-rs-muted">
        Cuéntanos qué coche tienes en mente y nuestro equipo se encargará de
        buscarlo y presentarte las opciones que mejor encajen con lo que
        necesitas. Rellena el formulario en unos minutos, ¡es fácil!
      </p>

      {enviado && (
        <p className="mt-8 rounded-md border border-rs-gray-light bg-rs-gray px-4 py-3 text-sm text-white">
          Solicitud enviada. Te contactaremos lo antes posible.
        </p>
      )}
      {error && (
        <p className="mt-8 rounded-md border border-rs-red bg-rs-gray px-4 py-3 text-sm text-white">
          Faltan datos: nombre y teléfono son obligatorios.
        </p>
      )}

      {!enviado && (
        <div className="mt-10">
          <ALaCartaForm />
        </div>
      )}
    </div>
  );
}
