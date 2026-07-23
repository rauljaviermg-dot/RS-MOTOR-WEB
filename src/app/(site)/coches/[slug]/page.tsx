import { notFound } from "next/navigation";
import { getCarBySlug } from "@/lib/cars-repo";
import PhotoGallery from "@/components/PhotoGallery";
import EstadoBadge from "@/components/EstadoBadge";

export const dynamic = "force-dynamic";

export default async function CocheDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-lg">
          <EstadoBadge estado={car.estado} />
          <PhotoGallery fotos={car.fotos} alt={car.titulo} />
        </div>
        <div>
          <h1 className="font-heading text-3xl font-semibold text-white">
            {car.titulo}
          </h1>
          <p className="mt-4 text-3xl font-semibold text-rs-red">
            {car.precio.toLocaleString("es-ES")} €
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-rs-gray-light pt-6 text-sm">
            <div>
              <dt className="text-rs-muted">Año</dt>
              <dd className="mt-1 text-white">{car.anio}</dd>
            </div>
            <div>
              <dt className="text-rs-muted">Kilómetros</dt>
              <dd className="mt-1 text-white">
                {car.km === 0 ? "Kilómetro 0" : car.km.toLocaleString("es-ES")}
              </dd>
            </div>
            <div>
              <dt className="text-rs-muted">Motor</dt>
              <dd className="mt-1 text-white">{car.motor}</dd>
            </div>
            <div>
              <dt className="text-rs-muted">Transmisión</dt>
              <dd className="mt-1 text-white">{car.transmision}</dd>
            </div>
            <div>
              <dt className="text-rs-muted">Garantía</dt>
              <dd className="mt-1 text-white">1 año</dd>
            </div>
          </dl>

          <p className="mt-8 whitespace-pre-line leading-relaxed text-rs-muted">
            {car.descripcion}
          </p>

          <a
            href="/contacto"
            className="mt-8 inline-block rounded-md bg-rs-red px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Consultar disponibilidad
          </a>
        </div>
      </div>
    </div>
  );
}
