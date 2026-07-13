import type { MetadataRoute } from "next";
import { getCars } from "@/lib/cars-repo";

const BASE_URL = "https://rsmotormalaga.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getCars();

  const paginasFijas: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/coches`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/transporters`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/a-la-carta`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contacto`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const fichasCoches: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${BASE_URL}/coches/${car.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...paginasFijas, ...fichasCoches];
}
