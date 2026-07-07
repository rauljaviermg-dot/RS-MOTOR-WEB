import Image from "next/image";
import Link from "next/link";
import RacingStripes from "@/components/RacingStripes";
import CarCard from "@/components/CarCard";
import { getCars } from "@/lib/cars-repo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cars = await getCars();
  const destacados = cars.filter((c) => c.destacado);

  return (
    <div>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden border-b border-rs-gray-light">
        <Image
          src="/images/eleanor/eleanor-front.jpg"
          alt="Ford Mustang Shelby GT500 réplica Eleanor en RS-Motor"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <RacingStripes className="opacity-70 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-sm font-medium uppercase tracking-widest text-rs-red">
            Málaga · Importación europea
          </p>
          <h1 className="mt-4 max-w-2xl font-heading text-5xl font-semibold leading-tight text-white sm:text-6xl">
            Coches importados, garantía real, reformas a medida.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-rs-muted">
            Traemos vehículos de toda Europa y los preparamos con 1 año de
            garantía. Especialistas en reformas integrales de VW Transporter,
            pintura y mecánica desde cero.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/coches"
              className="rounded-md bg-rs-red px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Ver catálogo
            </Link>
            <Link
              href="/transporters"
              className="rounded-md border border-rs-gray-light px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Transporters a medida
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-heading text-3xl font-medium text-white">
            Destacados
          </h2>
          <Link href="/coches" className="text-sm text-rs-red hover:underline">
            Ver todo el stock →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      </section>

      <section className="border-t border-rs-gray-light bg-rs-gray">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-3">
          {[
            {
              titulo: "1 año de garantía",
              texto: "Todos nuestros coches incluyen garantía mecánica de 1 año.",
            },
            {
              titulo: "Importación europea",
              texto: "Seleccionamos vehículos en toda Europa antes de traerlos a España.",
            },
            {
              titulo: "Reformas a medida",
              texto: "Pintura y mecánica completa en nuestros VW Transporter, a gusto del comprador.",
            },
          ].map((item) => (
            <div key={item.titulo}>
              <h3 className="font-heading text-xl font-medium text-white">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm text-rs-muted">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
