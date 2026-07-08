"use client";

import { useState } from "react";
import type { Car } from "@/lib/cars";

const inputClass =
  "rounded-md border border-rs-gray-light bg-rs-gray px-4 py-2.5 text-white placeholder:text-rs-muted focus:border-rs-red focus:outline-none";
const labelClass = "text-sm text-rs-muted";

export default function CarForm({
  action,
  car,
}: {
  action: (formData: FormData) => void;
  car?: Car;
}) {
  const [previews, setPreviews] = useState<string[]>([]);

  function handleFotosChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return Array.from(e.target.files ?? []).map((file) => URL.createObjectURL(file));
    });
  }

  return (
    <form action={action} className="mt-8 flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Marca</span>
          <input name="marca" required defaultValue={car?.marca} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Modelo</span>
          <input name="modelo" required defaultValue={car?.modelo} className={inputClass} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Título del anuncio</span>
        <input name="titulo" required defaultValue={car?.titulo} className={inputClass} />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Precio (€)</span>
          <input
            type="number"
            name="precio"
            required
            defaultValue={car?.precio}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Kilómetros</span>
          <input type="number" name="km" defaultValue={car?.km ?? 0} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Tipo</span>
          <select name="tipo" defaultValue={car?.tipo ?? "stock"} className={inputClass}>
            <option value="stock">Stock general</option>
            <option value="transporter">Transporter</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Motor</span>
          <input name="motor" defaultValue={car?.motor} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Transmisión</span>
          <input name="transmision" defaultValue={car?.transmision} className={inputClass} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Descripción</span>
        <textarea
          name="descripcion"
          rows={5}
          defaultValue={car?.descripcion}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>
          {car ? "Añadir más fotos" : "Fotos"}
        </span>
        <input
          type="file"
          name="fotos"
          accept="image/*"
          multiple
          onChange={handleFotosChange}
          className={inputClass}
        />
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {previews.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={`Foto seleccionada ${i + 1}`}
              className="aspect-square w-full rounded-md border border-rs-gray-light object-cover"
            />
          ))}
        </div>
      )}

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-white">
          <input type="checkbox" name="destacado" defaultChecked={car?.destacado} />
          Destacado en portada
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 w-fit rounded-md bg-rs-red px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
      >
        {car ? "Guardar cambios" : "Crear coche"}
      </button>
    </form>
  );
}
