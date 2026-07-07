"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAdminAuth, getAdminBucket, getAdminDb } from "@/lib/firebase/admin";

const SESSION_COOKIE = "rs_motor_session";
const DIACRITICS_REGEX = new RegExp("[̀-ͯ]", "g");

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createSession(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 7 * 1000;
  const sessionCookie = await getAdminAuth().createSessionCookie(idToken, { expiresIn });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionCookie, {
    maxAge: expiresIn / 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function requireSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    redirect("/admin/login");
  }

  try {
    await getAdminAuth().verifySessionCookie(sessionCookie, true);
  } catch {
    redirect("/admin/login");
  }
}

export async function hasActiveSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) return false;

  try {
    await getAdminAuth().verifySessionCookie(sessionCookie, true);
    return true;
  } catch {
    return false;
  }
}

async function uploadCarPhotos(formData: FormData): Promise<string[]> {
  const bucket = getAdminBucket();
  const files = formData.getAll("fotos") as File[];
  const urls: string[] = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;
    const path = `cars/${Date.now()}-${slugify(file.name)}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const blob = bucket.file(path);
    await blob.save(buffer, { contentType: file.type });
    await blob.makePublic();
    urls.push(`https://storage.googleapis.com/${bucket.name}/${path}`);
  }

  return urls;
}

export async function createCar(formData: FormData) {
  const db = getAdminDb();

  const titulo = String(formData.get("titulo") ?? "");
  const nuevasFotos = await uploadCarPhotos(formData);
  const slug = slugify(titulo) + "-" + Date.now().toString(36);

  await db.collection("cars").add({
    slug,
    marca: String(formData.get("marca") ?? ""),
    modelo: String(formData.get("modelo") ?? ""),
    titulo,
    precio: Number(formData.get("precio") ?? 0),
    km: Number(formData.get("km") ?? 0),
    motor: String(formData.get("motor") ?? ""),
    transmision: String(formData.get("transmision") ?? ""),
    descripcion: String(formData.get("descripcion") ?? ""),
    fotos: nuevasFotos,
    destacado: formData.get("destacado") === "on",
    tipo: String(formData.get("tipo") ?? "stock"),
    esReplica: formData.get("es_replica") === "on",
    createdAt: Date.now(),
  });

  revalidatePath("/");
  revalidatePath("/coches");
  redirect("/admin");
}

export async function updateCar(slug: string, formData: FormData) {
  const db = getAdminDb();

  const snapshot = await db.collection("cars").where("slug", "==", slug).limit(1).get();
  if (snapshot.empty) {
    throw new Error("Coche no encontrado");
  }

  const docRef = snapshot.docs[0].ref;
  const existente = snapshot.docs[0].data();
  const nuevasFotos = await uploadCarPhotos(formData);
  const fotosFinales = [...(existente.fotos ?? []), ...nuevasFotos];

  await docRef.update({
    marca: String(formData.get("marca") ?? ""),
    modelo: String(formData.get("modelo") ?? ""),
    titulo: String(formData.get("titulo") ?? ""),
    precio: Number(formData.get("precio") ?? 0),
    km: Number(formData.get("km") ?? 0),
    motor: String(formData.get("motor") ?? ""),
    transmision: String(formData.get("transmision") ?? ""),
    descripcion: String(formData.get("descripcion") ?? ""),
    fotos: fotosFinales,
    destacado: formData.get("destacado") === "on",
    tipo: String(formData.get("tipo") ?? "stock"),
    esReplica: formData.get("es_replica") === "on",
  });

  revalidatePath("/");
  revalidatePath("/coches");
  revalidatePath(`/coches/${slug}`);
  redirect("/admin");
}

export async function deleteCar(slug: string) {
  const db = getAdminDb();
  const snapshot = await db.collection("cars").where("slug", "==", slug).limit(1).get();

  if (!snapshot.empty) {
    await snapshot.docs[0].ref.delete();
  }

  revalidatePath("/");
  revalidatePath("/coches");
}
