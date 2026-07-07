"use server";

import { redirect } from "next/navigation";
import { firebaseAdminConfigured, getAdminDb } from "@/lib/firebase/admin";

export async function sendContactMessage(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();

  if (!nombre || !telefono) {
    redirect("/contacto?error=1");
  }

  if (firebaseAdminConfigured) {
    const db = getAdminDb();
    await db.collection("mensajes").add({
      nombre,
      telefono,
      mensaje,
      leido: false,
      createdAt: Date.now(),
    });
  }

  redirect("/contacto?enviado=1");
}
