import Image from "next/image";
import CarCard from "@/components/CarCard";
import { getCars } from "@/lib/cars-repo";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "VW Transporter a medida | RS-Motor",
};

const pasos = [
  {
    titulo: "Diagnóstico",
    texto: "Revisamos el estado real de la unidad: chapa, mecánica y interior, antes de empezar nada.",
  },
  {
    titulo: "Pintura y chapa",
    texto: "Preparación y pintura completa, al color y acabado que quiera el comprador.",
  },
  {
    titulo: "Mecánica",
    texto: "Puesta a punto mecánica desde cero, para que la furgoneta salga como nueva.",
  },
  {
    titulo: "Personalización",
    texto: "Interior, extras y detalles finales según lo que necesite cada cliente.",
  },
  {
    titulo: "Entrega",
    texto: "Revisión final y entrega de la unidad terminada, con 1 año de garantía.",
  },
];

export default async function TransportersPage() {
  const cars = await getCars();
  const transporters = cars.filter((c) => c.tipo === "transporter");

  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center overflow-hidden border-b border-rs-gray-light">
        <Image
          src="/images/transporters/hero.jpg"
          alt="VW Transporter preparada por RS-Motor"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-sm font-medium uppercase tracking-widest text-white">
            VW Transporter
          </p>
          <h1 className="mt-4 max-w-2xl font-heading text-5xl font-semibold leading-tight text-white sm:text-6xl">
            Tu Transporter, hecha a tu medida.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-rs-muted">
            Reformamos cada unidad por completo: chapa, pintura y mecánica
            desde cero, a gusto del comprador.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-heading text-3xl font-medium text-white">
          Cómo transformamos cada Transporter
        </h2>
        <p className="mt-2 max-w-2xl text-rs-muted">
          Próximamente vídeos y fotos reales del proceso, unidad por unidad.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {pasos.map((paso, i) => (
            <div
              key={paso.titulo}
              className="rounded-lg border border-rs-gray-light bg-rs-gray p-5"
            >
              <span className="font-heading text-2xl font-semibold text-rs-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-heading text-lg font-medium text-white">
                {paso.titulo}
              </h3>
              <p className="mt-2 text-sm text-rs-muted">{paso.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-rs-gray-light bg-rs-gray">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-heading text-3xl font-medium text-white">
            Stock de Transporters personalizadas
          </h2>
          <p className="mt-2 text-rs-muted">
            Unidades ya terminadas y disponibles para comprar.
          </p>
          {transporters.length === 0 ? (
            <p className="mt-8 text-rs-muted">
              Ahora mismo no hay ninguna unidad terminada en stock.
              Escríbenos si quieres encargar la tuya a medida.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {transporters.map((car) => (
                <CarCard key={car.slug} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
