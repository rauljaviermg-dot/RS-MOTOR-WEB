import Link from "next/link";
import Image from "next/image";
import { getCars } from "@/lib/cars-repo";
import { deleteCar } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const cars = await getCars();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-medium text-white">
          Coches en stock
        </h1>
        <Link
          href="/admin/nuevo"
          className="rounded-md bg-rs-red px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          Añadir coche
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {cars.length === 0 && (
          <p className="text-rs-muted">Todavía no hay coches en el panel.</p>
        )}
        {cars.map((car) => (
          <div
            key={car.slug}
            className="flex items-center gap-4 rounded-lg border border-rs-gray-light bg-rs-gray p-3"
          >
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded">
              {car.fotos[0] && (
                <Image
                  src={car.fotos[0]}
                  alt={car.titulo}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{car.titulo}</p>
              <p className="text-sm text-rs-muted">
                {car.precio.toLocaleString("es-ES")} € ·{" "}
                {car.destacado ? "Destacado" : "No destacado"}
              </p>
            </div>
            <Link
              href={`/admin/${car.slug}/editar`}
              className="rounded-md border border-rs-gray-light px-4 py-2 text-sm text-white transition-colors hover:border-white"
            >
              Editar
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteCar(car.slug);
              }}
            >
              <button
                type="submit"
                className="rounded-md border border-rs-gray-light px-4 py-2 text-sm text-rs-muted transition-colors hover:border-rs-red hover:text-rs-red"
              >
                Borrar
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
