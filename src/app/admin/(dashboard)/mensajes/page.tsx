import { firebaseAdminConfigured, getAdminDb } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

type Mensaje = {
  id: string;
  nombre: string;
  telefono: string;
  email?: string | null;
  mensaje: string;
  createdAt: number;
  leido?: boolean;
};

async function getMensajes(): Promise<Mensaje[]> {
  if (!firebaseAdminConfigured) return [];

  const db = getAdminDb();
  const snapshot = await db.collection("mensajes").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Mensaje, "id">) }));
}

async function markAllAsRead(mensajes: Mensaje[]) {
  const sinLeer = mensajes.filter((m) => !m.leido);
  if (sinLeer.length === 0) return;

  const db = getAdminDb();
  const batch = db.batch();
  sinLeer.forEach((m) => batch.update(db.collection("mensajes").doc(m.id), { leido: true }));
  await batch.commit();
}

export default async function MensajesPage() {
  const mensajes = await getMensajes();
  await markAllAsRead(mensajes);

  return (
    <div>
      <h1 className="font-heading text-3xl font-medium text-white">Mensajes</h1>
      <p className="mt-2 text-sm text-rs-muted">
        Mensajes recibidos desde el formulario de contacto.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {mensajes.length === 0 && (
          <p className="text-rs-muted">Todavía no hay mensajes.</p>
        )}
        {mensajes.map((m) => (
          <div
            key={m.id}
            className="rounded-lg border border-rs-gray-light bg-rs-gray p-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-white">{m.nombre}</p>
              <p className="text-xs text-rs-muted">
                {new Date(m.createdAt).toLocaleString("es-ES")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${m.telefono}`} className="text-sm text-rs-red">
                {m.telefono}
              </a>
              {m.email && (
                <a href={`mailto:${m.email}`} className="text-sm text-rs-red">
                  {m.email}
                </a>
              )}
            </div>
            {m.mensaje && (
              <p className="mt-2 whitespace-pre-line text-sm text-rs-muted">{m.mensaje}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
