"use client";

import { useRef, useState } from "react";
import { sendALaCartaRequest } from "@/app/(site)/a-la-carta/actions";

const TOTAL_PASOS = 5;

const inputClass =
  "rounded-md border border-rs-gray-light bg-rs-gray px-4 py-3 text-white placeholder:text-rs-muted focus:border-rs-red focus:outline-none";
const labelClass = "text-sm font-medium text-white";

function stepClass(active: boolean) {
  return active ? "flex flex-col gap-5" : "hidden";
}

export default function ALaCartaForm() {
  const [paso, setPaso] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);

  function siguiente() {
    if (formRef.current?.reportValidity()) {
      setPaso((p) => Math.min(p + 1, TOTAL_PASOS));
    }
  }

  function anterior() {
    setPaso((p) => Math.max(p - 1, 1));
  }

  const porcentaje = Math.round((paso / TOTAL_PASOS) * 100);

  return (
    <form ref={formRef} action={sendALaCartaRequest} className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-rs-muted">
          Paso {paso} de {TOTAL_PASOS}
        </p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-rs-gray">
          <div
            className="h-full rounded-full bg-rs-red transition-all"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      </div>

      <div className={stepClass(paso === 1)}>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Presupuesto *</span>
          <select name="presupuesto" required={paso === 1} className={inputClass}>
            <option value="">Selecciona un rango</option>
            <option>Menos de 10.000 €</option>
            <option>10.000 - 15.000 €</option>
            <option>15.000 - 25.000 €</option>
            <option>25.000 - 35.000 €</option>
            <option>Más de 35.000 €</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Tipo de vehículo *</span>
          <select name="tipoVehiculo" required={paso === 1} className={inputClass}>
            <option value="">Selecciona un tipo</option>
            <option>Berlina</option>
            <option>Compacto</option>
            <option>SUV</option>
            <option>Monovolumen</option>
            <option>Furgoneta / Transporter</option>
            <option>Descapotable / Coupé</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Tipo de combustible *</span>
          <select name="combustible" required={paso === 1} className={inputClass}>
            <option value="">Selecciona un combustible</option>
            <option>Gasolina</option>
            <option>Diésel</option>
            <option>Híbrido</option>
            <option>Eléctrico</option>
            <option>Sin preferencia</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Motorización (CV)</span>
          <select name="motorizacion" className={inputClass}>
            <option value="">Sin preferencia</option>
            <option>Hasta 100 CV</option>
            <option>100 - 150 CV</option>
            <option>150 - 200 CV</option>
            <option>Más de 200 CV</option>
          </select>
        </label>
      </div>

      <div className={stepClass(paso === 2)}>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Marca preferida</span>
          <input
            name="marca"
            placeholder="Ej: Audi, BMW, Volkswagen…"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Modelo en el que estás interesado</span>
          <input name="modelo" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Color preferido</span>
          <input name="color" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Extras deseados</span>
          <input
            name="extras"
            placeholder="Ej: techo panorámico, cuero, navegador…"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Año</span>
          <select name="anio" className={inputClass}>
            <option value="">Sin preferencia</option>
            <option>2010 - 2015</option>
            <option>2016 - 2019</option>
            <option>2020 - 2023</option>
            <option>2024 en adelante</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Kilómetros</span>
          <select name="kilometros" className={inputClass}>
            <option value="">Sin preferencia</option>
            <option>0 - 25.000 km</option>
            <option>25.000 - 60.000 km</option>
            <option>60.000 - 100.000 km</option>
            <option>Más de 100.000 km</option>
          </select>
        </label>
      </div>

      <div className={stepClass(paso === 3)}>
        <div className="flex flex-col gap-1.5">
          <span className={labelClass}>¿Entregas tu coche actual como parte de pago? *</span>
          <div className="flex gap-6 text-sm text-rs-muted">
            <label className="flex items-center gap-2">
              <input type="radio" name="partePago" value="Sí" required={paso === 3} />
              Sí
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="partePago" value="No" />
              No
            </label>
          </div>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Horario preferido de contacto</span>
          <input
            name="horario"
            placeholder="Ej: mañanas, tardes a partir de las 17h…"
            className={inputClass}
          />
        </label>
      </div>

      <div className={stepClass(paso === 4)}>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Nombre *</span>
          <input name="nombre" required={paso === 4} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Teléfono *</span>
          <input type="tel" name="telefono" required={paso === 4} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Email</span>
          <input type="email" name="email" className={inputClass} />
        </label>
      </div>

      <div className={stepClass(paso === 5)}>
        <p className="text-sm leading-relaxed text-rs-muted">
          Revisa que tus datos de contacto sean correctos. En cuanto enviemos tu
          solicitud, nuestro equipo empezará a buscar el coche que nos describes
          y te contactará en el horario que nos has indicado.
        </p>
        <label className="flex items-start gap-2 text-sm text-rs-muted">
          <input type="checkbox" required={paso === 5} className="mt-1" />
          He leído y acepto la política de privacidad. *
        </label>
      </div>

      <div className="flex gap-4">
        {paso > 1 && (
          <button
            type="button"
            onClick={anterior}
            className="rounded-md border border-rs-gray-light px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Anterior
          </button>
        )}
        {paso < TOTAL_PASOS ? (
          <button
            type="button"
            onClick={siguiente}
            className="rounded-md bg-rs-red px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Siguiente
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-md bg-rs-red px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Enviar solicitud
          </button>
        )}
      </div>
    </form>
  );
}
