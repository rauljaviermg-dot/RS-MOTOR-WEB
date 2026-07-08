export type Car = {
  slug: string;
  marca: string;
  modelo: string;
  titulo: string;
  precio: number;
  anio: number;
  km: number;
  motor: string;
  transmision: string;
  descripcion: string;
  fotos: string[];
  destacado: boolean;
  tipo: "stock" | "transporter";
};

export const cars: Car[] = [
  {
    slug: "mustang-shelby-gt500-eleanor-replica",
    marca: "Ford",
    modelo: "Mustang Shelby GT500 (réplica Eleanor)",
    titulo: "Ford Mustang Shelby GT500 — réplica Eleanor",
    precio: 140000,
    anio: 2026,
    km: 0,
    motor: "V8",
    transmision: "Manual",
    descripcion:
      "Réplica fiel del icónico Ford Mustang Shelby GT500 \"Eleanor\". Base Mustang clásico, motor V8, con reconstrucción integral de chapa, pintura y mecánica: el coche sale de nuestro taller en estado de kilómetro 0. Pintura gris antracita mate con bandas Le Mans negras y llantas estilo Shelby.",
    fotos: [
      "/images/eleanor/eleanor-cover.png",
      "/images/eleanor/eleanor-front.jpg",
      "/images/eleanor/eleanor-detail.jpg",
    ],
    destacado: true,
    tipo: "stock",
  },
];

export function getCarBySlug(slug: string) {
  return cars.find((c) => c.slug === slug);
}
