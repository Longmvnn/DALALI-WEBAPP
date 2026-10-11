import { dalalis, properties } from "./mock-data";
import type { Dalali, Property, SearchFilters } from "./types";

// Data access layer. Every page reads listings through these functions, so
// connecting the real backend (Firebase, Supabase or a REST API) only means
// replacing the bodies below — the pages don't need to change.

export async function searchProperties(f: SearchFilters = {}): Promise<Property[]> {
  const q = f.q?.trim().toLowerCase();
  let list = properties.filter((p) => {
    if (q && !`${p.title} ${p.area} ${p.district}`.toLowerCase().includes(q)) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.minPrice != null && p.price < f.minPrice) return false;
    if (f.maxPrice != null && p.price > f.maxPrice) return false;
    if (f.bedrooms != null && (f.bedrooms >= 4 ? p.bedrooms < 4 : p.bedrooms < f.bedrooms)) return false;
    if (f.furnishing && p.furnishing !== f.furnishing) return false;
    return true;
  });
  if (f.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  else if (f.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  else list = [...list].sort((a, b) => a.listedDaysAgo - b.listedDaysAgo);
  return list;
}

export async function getProperty(id: string): Promise<Property | undefined> {
  return properties.find((p) => p.id === id);
}

export async function getPropertiesByIds(ids: string[]): Promise<Property[]> {
  return ids.map((id) => properties.find((p) => p.id === id)).filter((p): p is Property => !!p);
}

export async function getDalali(id: string): Promise<Dalali | undefined> {
  return dalalis.find((d) => d.id === id);
}

export async function getListingsByDalali(dalaliId: string): Promise<Property[]> {
  return properties.filter((p) => p.dalaliId === dalaliId);
}

/** Parse URL search params into filters. Shared by the search page and its form. */
export function filtersFromParams(sp: Record<string, string | string[] | undefined>): SearchFilters {
  const one = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v || undefined;
  };
  const num = (k: string) => {
    const v = one(k);
    const n = v ? Number(v) : NaN;
    return Number.isFinite(n) ? n : undefined;
  };
  const category = one("category");
  const type = one("type");
  const furnishing = one("furnishing");
  const sort = one("sort");
  return {
    q: one("q"),
    category: category === "residential" || category === "commercial" ? category : undefined,
    type: (["apartment", "house", "room", "studio", "shop", "office"] as const).find((t) => t === type),
    minPrice: num("min"),
    maxPrice: num("max"),
    bedrooms: num("beds"),
    furnishing: furnishing === "furnished" || furnishing === "unfurnished" ? furnishing : undefined,
    sort: sort === "price-asc" || sort === "price-desc" ? sort : "recent",
  };
}
