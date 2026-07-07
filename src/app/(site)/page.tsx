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
            ¿Por qué RS-Motor?
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
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
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="m20 20-4.8-4.8" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-5 font-heading text-xl font-medium text-white">
                Selección del vehículo
              </h3>
              <p className="mt-2 text-sm text-rs-muted">
                Buscamos cada coche en origen, en distintos países de
                Europa, y lo revisamos antes de traerlo a Málaga listo
                para conducir.
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
                  <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                  <path d="M9 12h6M9 16h6M9 8h2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-5 font-heading text-xl font-medium text-white">
                Certificado de estado
              </h3>
              <p className="mt-2 text-sm text-rs-muted">
                Te damos toda la información del vehículo, con kilometraje
                certificado y 1 año de garantía mecánica incluida en el
                precio.
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
                  <path d="M9 10h.01M15 10h.01M8.5 15c1 1 2.2 1.5 3.5 1.5s2.5-.5 3.5-1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-5 font-heading text-xl font-medium text-white">
                Satisfacción del cliente
              </h3>
              <p className="mt-2 text-sm text-rs-muted">
                Llevamos años trayendo e importando coches de toda Europa.
                Esa experiencia es la que nos permite ofrecerte siempre la
                mejor opción.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
