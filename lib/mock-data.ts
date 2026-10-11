import type { Dalali, Property } from "./types";

// Sample data used until the web app is connected to the real backend.
// Content mirrors the Android designs (Mabibo apartment, Juma Hassan, etc.).

export const dalalis: Dalali[] = [
  { id: "d1", name: "Juma Hassan", area: "Kinondoni, Dar es Salaam", phone: "+255 712 345 678", verified: true, listings: 24, views: "1.2k", rating: 4.8 },
  { id: "d2", name: "Neema Mushi", area: "Kinondoni, Dar es Salaam", phone: "+255 754 220 118", verified: true, listings: 11, views: "860", rating: 4.6 },
  { id: "d3", name: "Baraka Homes", area: "Ilala, Dar es Salaam", phone: "+255 688 901 442", verified: true, listings: 37, views: "3.4k", rating: 4.9 },
  { id: "d4", name: "Salim Omari", area: "Temeke, Dar es Salaam", phone: "+255 715 663 090", verified: false, listings: 5, views: "210", rating: 4.2 },
];

const BASIC = ["Running water", "Electricity (LUKU)"];

export const properties: Property[] = [
  {
    id: "mabibo-2br", title: "Modern 2-Bedroom Apartment", category: "residential", type: "apartment",
    area: "Mabibo", district: "Ubungo", price: 60000, bedrooms: 2, bathrooms: 1, sizeM2: 50,
    furnishing: "unfurnished", status: "available", verified: true, photos: 8, tone: 0, dalaliId: "d1", listedDaysAgo: 2,
    description: "A bright, newly renovated apartment in the heart of Mabibo. Tiled floors throughout, reliable water supply, and secure parking. Walking distance to the main road, daladala stops, and local markets.",
    amenities: [...BASIC, "Secure parking", "24/7 security", "Tiled floors", "Water tank"],
  },
  {
    id: "mabibo-room", title: "Self-Contained Room near UDSM", category: "residential", type: "room",
    area: "Mabibo", district: "Ubungo", price: 45000, bedrooms: 1, bathrooms: 1, sizeM2: 18,
    furnishing: "furnished", status: "available", verified: true, photos: 5, tone: 1, dalaliId: "d1", listedDaysAgo: 1,
    description: "A quiet self-contained room with its own bathroom, five minutes from the university hostels. Bed, wardrobe and study desk included.",
    amenities: [...BASIC, "Tiled floors", "Water tank"],
  },
  {
    id: "sinza-studio", title: "Studio Room", category: "residential", type: "studio",
    area: "Sinza", district: "Ubungo", price: 120000, bedrooms: 1, bathrooms: 1, sizeM2: 28,
    furnishing: "furnished", status: "rented", verified: true, photos: 6, tone: 2, dalaliId: "d1", listedDaysAgo: 14,
    description: "Compact furnished studio on a quiet street in Sinza, close to restaurants and the Mori road stage.",
    amenities: [...BASIC, "24/7 security", "Tiled floors"],
  },
  {
    id: "kariakoo-shop", title: "Commercial Shop Space", category: "commercial", type: "shop",
    area: "Kariakoo", district: "Ilala", price: 450000, bedrooms: 0, bathrooms: 1, sizeM2: 36,
    furnishing: "unfurnished", status: "available", verified: true, photos: 4, tone: 3, dalaliId: "d1", listedDaysAgo: 5,
    description: "Ground-floor shop frontage on a busy Kariakoo street with steady foot traffic. Roller shutter, storage room at the back.",
    amenities: ["Electricity (LUKU)", "24/7 security", "Tiled floors"],
  },
  {
    id: "mikocheni-3br", title: "3 Bedroom Apartment", category: "residential", type: "apartment",
    area: "Mikocheni", district: "Kinondoni", price: 1200000, bedrooms: 3, bathrooms: 2, sizeM2: 140,
    furnishing: "furnished", status: "available", verified: true, photos: 10, tone: 0, dalaliId: "d3", listedDaysAgo: 2,
    description: "Bright corner flat near Shoppers Plaza, with parking, backup water and 24-hour security.",
    amenities: [...BASIC, "Secure parking", "24/7 security", "Backup generator", "Water tank", "Air conditioning"],
  },
  {
    id: "regent-3br-house", title: "3 Bed House", category: "residential", type: "house",
    area: "Regent Estate", district: "Kinondoni", price: 950000, bedrooms: 3, bathrooms: 2, sizeM2: 180,
    furnishing: "unfurnished", status: "available", verified: true, photos: 9, tone: 4, dalaliId: "d3", listedDaysAgo: 4,
    description: "Standalone house in a gated compound with a small garden, servant quarter and space for two cars.",
    amenities: [...BASIC, "Secure parking", "24/7 security", "Garden", "Water tank"],
  },
  {
    id: "masaki-beach-studio", title: "Beachside Studio", category: "residential", type: "studio",
    area: "Masaki", district: "Kinondoni", price: 850000, bedrooms: 1, bathrooms: 1, sizeM2: 45,
    furnishing: "furnished", status: "available", verified: true, photos: 7, tone: 1, dalaliId: "d2", listedDaysAgo: 3,
    description: "Fully furnished studio a short walk from Coco Beach. Fast Wi-Fi, gym access and a backup generator.",
    amenities: [...BASIC, "Wi-Fi", "Gym", "Backup generator", "Air conditioning", "24/7 security"],
  },
  {
    id: "masaki-2br", title: "2 Bed Apartment", category: "residential", type: "apartment",
    area: "Masaki", district: "Kinondoni", price: 2800000, bedrooms: 2, bathrooms: 2, sizeM2: 110,
    furnishing: "furnished", status: "available", verified: true, photos: 12, tone: 2, dalaliId: "d3", listedDaysAgo: 6,
    description: "Sea-view apartment with a pool, lift and dedicated parking in a well-managed block.",
    amenities: [...BASIC, "Swimming pool", "Lift", "Secure parking", "Backup generator", "Air conditioning"],
  },
  {
    id: "oysterbay-2br", title: "2 Bed Apartment", category: "residential", type: "apartment",
    area: "Oyster Bay", district: "Kinondoni", price: 2400000, bedrooms: 2, bathrooms: 2, sizeM2: 105,
    furnishing: "furnished", status: "available", verified: true, photos: 8, tone: 3, dalaliId: "d2", listedDaysAgo: 8,
    description: "Calm, leafy compound close to the embassies, with a shared pool and round-the-clock security.",
    amenities: [...BASIC, "Swimming pool", "24/7 security", "Secure parking", "Air conditioning"],
  },
  {
    id: "tabata-1br", title: "1 Bedroom Apartment", category: "residential", type: "apartment",
    area: "Tabata", district: "Ilala", price: 150000, bedrooms: 1, bathrooms: 1, sizeM2: 38,
    furnishing: "unfurnished", status: "available", verified: false, photos: 4, tone: 4, dalaliId: "d4", listedDaysAgo: 1,
    description: "Affordable one-bedroom with a sitting room and kitchen, near Tabata Relini.",
    amenities: [...BASIC, "Tiled floors"],
  },
  {
    id: "kinondoni-house", title: "4 Bedroom Family House", category: "residential", type: "house",
    area: "Kinondoni", district: "Kinondoni", price: 1500000, bedrooms: 4, bathrooms: 3, sizeM2: 220,
    furnishing: "unfurnished", status: "available", verified: true, photos: 11, tone: 0, dalaliId: "d2", listedDaysAgo: 9,
    description: "Spacious family home with a large compound, borehole water and parking for three cars.",
    amenities: [...BASIC, "Borehole", "Secure parking", "Garden", "24/7 security"],
  },
  {
    id: "sinza-office", title: "Office Space, First Floor", category: "commercial", type: "office",
    area: "Sinza", district: "Ubungo", price: 600000, bedrooms: 0, bathrooms: 1, sizeM2: 70,
    furnishing: "unfurnished", status: "available", verified: true, photos: 5, tone: 1, dalaliId: "d3", listedDaysAgo: 12,
    description: "Open-plan office on Shekilango road with a reception area and a private meeting room.",
    amenities: ["Electricity (LUKU)", "Secure parking", "Backup generator"],
  },
  {
    id: "mikocheni-room", title: "Room in Shared House", category: "residential", type: "room",
    area: "Mikocheni", district: "Kinondoni", price: 80000, bedrooms: 1, bathrooms: 1, sizeM2: 16,
    furnishing: "furnished", status: "available", verified: true, photos: 3, tone: 2, dalaliId: "d2", listedDaysAgo: 3,
    description: "Furnished room in a tidy shared house, with a shared kitchen and lounge. Bills split between tenants.",
    amenities: [...BASIC, "Wi-Fi", "Water tank"],
  },
  {
    id: "mabibo-1br", title: "Cosy 1-Bedroom with Sitting Room", category: "residential", type: "apartment",
    area: "Mabibo", district: "Ubungo", price: 62000, bedrooms: 1, bathrooms: 1, sizeM2: 32,
    furnishing: "unfurnished", status: "available", verified: true, photos: 5, tone: 3, dalaliId: "d1", listedDaysAgo: 4,
    description: "A clean one-bedroom with its own entrance, close to Mabibo market and the main road.",
    amenities: [...BASIC, "Tiled floors", "Water tank"],
  },
];

export const popularAreas = ["Mabibo", "Sinza", "Mikocheni", "Masaki", "Kinondoni", "Tabata", "Kariakoo"];
