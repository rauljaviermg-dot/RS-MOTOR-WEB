import { firebaseAdminConfigured, getAdminDb } from "@/lib/firebase/admin";

export async function hasUnreadMensajes(): Promise<boolean> {
  if (!firebaseAdminConfigured) return false;

  const db = getAdminDb();
  const snapshot = await db
    .collection("mensajes")
    .where("leido", "!=", true)
    .limit(1)
    .get();

  return !snapshot.empty;
}
