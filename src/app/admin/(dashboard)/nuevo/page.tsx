import CarForm from "@/components/admin/CarForm";
import { createCar } from "@/app/admin/actions";

export default function NuevoCochePage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-medium text-white">
        Añadir coche
      </h1>
      <CarForm action={createCar} />
    </div>
  );
}
