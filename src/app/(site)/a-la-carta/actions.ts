"use server";

import { redirect } from "next/navigation";
import { firebaseAdminConfigured, getAdminDb } from "@/lib/firebase/admin";

function campo(formData: FormData, name: string, etiqueta: string) {
  const valor = String(formData.get(name) ?? "").trim();
  return valor ? `${etiqueta}: ${valor}` : null;
}

export async function sendALaCartaRequest(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!nombre || !telefono) {
    redirect("/a-la-carta?error=1");
  }

  const detalles = [
    campo(formData, "presupuesto", "Presupuesto"),
    campo(formData, "tipoVehiculo", "Tipo de vehículo"),
    campo(formData, "combustible", "Combustible"),
    campo(formData, "motorizacion", "Motorización"),
    campo(formData, "marca", "Marca preferida"),
    campo(formData, "modelo", "Modelo"),
    campo(formData, "color", "Color preferido"),
    campo(formData, "extras", "Extras deseados"),
    campo(formData, "anio", "Año"),
    campo(formData, "kilometros", "Kilómetros"),
    campo(formData, "partePago", "Entrega su coche como parte de pago"),
    campo(formData, "horario", "Horario preferido de contacto"),
  ].filter(Boolean);

  const mensaje = `📋 Solicitud de coche a la carta\n\n${detalles.join("\n")}`;

  if (firebaseAdminConfigured) {
    const db = getAdminDb();
    await db.collection("mensajes").add({
      nombre,
      telefono,
      email: email || null,
      mensaje,
      leido: false,
      createdAt: Date.now(),
    });
  }

  redirect("/a-la-carta?enviado=1");
}
