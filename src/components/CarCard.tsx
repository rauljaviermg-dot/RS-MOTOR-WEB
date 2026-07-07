import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/lib/cars";

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/coches/${car.slug}`}
      className="group block overflow-hidden rounded-lg border border-rs-gray-light bg-rs-gray transition-colors hover:border-rs-red"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={car.fotos[0]}
          alt={car.titulo}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {car.esReplica && (
          <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
            Réplica
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-medium text-white">{car.titulo}</h3>
        <p className="mt-1 text-sm text-rs-muted">
          {car.km === 0 ? "Kilómetro 0" : `${car.km.toLocaleString("es-ES")} km`} · {car.motor}
        </p>
        <p className="mt-3 text-xl font-semibold text-rs-red">
          {car.precio.toLocaleString("es-ES")} €
        </p>
      </div>
    </Link>
  );
}
