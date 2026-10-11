export type Category = "residential" | "commercial";
export type PropertyType = "apartment" | "house" | "room" | "studio" | "shop" | "office";
export type Furnishing = "furnished" | "unfurnished";
export type ListingStatus = "available" | "rented";
export type Role = "seeker" | "dalali";

export interface Dalali {
  id: string;
  name: string;
  area: string;
  phone: string;
  verified: boolean;
  listings: number;
  views: string;
  rating: number;
}

export interface Property {
  id: string;
  title: string;
  category: Category;
  type: PropertyType;
  area: string;
  district: string;
  /** Monthly rent in TSh */
  price: number;
  bedrooms: number;
  bathrooms: number;
  sizeM2: number;
  furnishing: Furnishing;
  status: ListingStatus;
  verified: boolean;
  description: string;
  amenities: string[];
  photos: number;
  /** Index into the placeholder palette until real photos are wired up */
  tone: number;
  dalaliId: string;
  listedDaysAgo: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  /** ISO date, yyyy-mm-dd */
  date: string;
  time: string;
  note?: string;
  status: "pending" | "confirmed";
  createdAt: string;
}

export interface SearchFilters {
  q?: string;
  category?: Category;
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  furnishing?: Furnishing;
  sort?: "recent" | "price-asc" | "price-desc";
}
