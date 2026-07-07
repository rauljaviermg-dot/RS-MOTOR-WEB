import { cars as seedCars, type Car } from "@/lib/cars";
import { firebaseAdminConfigured, getAdminDb } from "@/lib/firebase/admin";

type CarDoc = {
  slug: string;
  marca: string;
  modelo: string;
  titulo: string;
  precio: number;
  km: number;
  motor: string | null;
  transmision: string | null;
  descripcion: string | null;
  fotos: string[] | null;
  destacado: boolean;
  tipo: "stock" | "transporter";
  esReplica: boolean;
};

function mapDoc(doc: CarDoc): Car {
  return {
    slug: doc.slug,
    marca: doc.marca,
    modelo: doc.modelo,
    titulo: doc.titulo,
    precio: doc.precio,
    km: doc.km,
    motor: doc.motor ?? "",
    transmision: doc.transmision ?? "",
    descripcion: doc.descripcion ?? "",
    fotos: doc.fotos ?? [],
    destacado: doc.destacado,
    tipo: doc.tipo,
    esReplica: doc.esReplica,
  };
}

export async function getCars(): Promise<Car[]> {
  if (!firebaseAdminConfigured) return seedCars;

  try {
    const db = getAdminDb();
    const snapshot = await db.collection("cars").orderBy("createdAt", "desc").get();

    if (snapshot.empty) return seedCars;
    return snapshot.docs.map((doc) => mapDoc(doc.data() as CarDoc));
  } catch (error) {
    console.error("No se pudo leer Firestore, usando datos de ejemplo:", error);
    return seedCars;
  }
}

export async function getCarBySlug(slug: string): Promise<Car | undefined> {
  if (!firebaseAdminConfigured) return seedCars.find((c) => c.slug === slug);

  try {
    const db = getAdminDb();
    const snapshot = await db.collection("cars").where("slug", "==", slug).limit(1).get();

    if (snapshot.empty) return seedCars.find((c) => c.slug === slug);
    return mapDoc(snapshot.docs[0].data() as CarDoc);
  } catch (error) {
    console.error("No se pudo leer Firestore, usando datos de ejemplo:", error);
    return seedCars.find((c) => c.slug === slug);
  }
}
