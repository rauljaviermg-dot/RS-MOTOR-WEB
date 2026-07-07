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
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center font-heading text-3xl font-medium text-white sm:text-4xl">
            ¿Por qué comprar en RS-Motor?
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-rs-red leading-none text-white">
                <span className="font-heading text-3xl font-semibold">1</span>
                <span className="text-[10px] font-medium uppercase tracking-widest">
                  año
                </span>
              </div>
              <h3 className="mt-5 font-heading text-xl font-medium text-white">
                Garantía de verdad
              </h3>
              <p className="mt-2 text-sm text-rs-muted">
                Cada coche que sale de RS-Motor lleva 1 año de garantía
                mecánica cubierta por nosotros, sin letra pequeña.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rs-red text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-9 w-9"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
                </svg>
              </div>
              <h3 className="mt-5 font-heading text-xl font-medium text-white">
                Traídos desde Europa
              </h3>
              <p className="mt-2 text-sm text-rs-muted">
                Buscamos y seleccionamos cada unidad en distintos países
                antes de traerla a Málaga, revisada y lista para rodar.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rs-red text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-9 w-9"
                >
                  <path d="m14.5 3.5 6 6L9 21H3v-6L14.5 3.5Z" />
                  <path d="m12.5 5.5 6 6" />
                </svg>
              </div>
              <h3 className="mt-5 font-heading text-xl font-medium text-white">
                Transporter a tu gusto
              </h3>
              <p className="mt-2 text-sm text-rs-muted">
                En nuestros VW Transporter tocamos pintura y mecánica desde
                cero, según cómo lo quiera el comprador.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
