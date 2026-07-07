import { getCars } from "@/lib/cars-repo";
import CarCard from "@/components/CarCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Stock | RS-Motor",
};

export default async function CochesPage() {
  const cars = await getCars();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-heading text-4xl font-semibold text-white">
        Stock
      </h1>
      <p className="mt-3 text-rs-muted">
        Todos nuestros vehículos incluyen 1 año de garantía.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.slug} car={car} />
        ))}
      </div>
    </div>
  );
}
