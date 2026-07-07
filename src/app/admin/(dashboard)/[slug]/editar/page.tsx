import { notFound } from "next/navigation";
import CarForm from "@/components/admin/CarForm";
import { getCarBySlug } from "@/lib/cars-repo";
import { updateCar } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function EditarCochePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const updateCarWithSlug = updateCar.bind(null, slug);

  return (
    <div>
      <h1 className="font-heading text-3xl font-medium text-white">
        Editar coche
      </h1>
      <CarForm action={updateCarWithSlug} car={car} />
    </div>
  );
}
