import type { PropertyType } from "./types";

export function tsh(n: number): string {
  return `TSh ${n.toLocaleString("en-US")}`;
}

/** Short form for chips and summaries: 1.2M, 450k */
export function tshShort(n: number): string {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(n);
}

export const typeLabel: Record<PropertyType, string> = {
  apartment: "Apartment",
  house: "House",
  room: "Room",
  studio: "Studio",
  shop: "Shop",
  office: "Office",
};

export function listedAgo(days: number): string {
  if (days <= 0) return "Listed today";
  if (days === 1) return "Listed yesterday";
  if (days < 7) return `Listed ${days} days ago`;
  const w = Math.floor(days / 7);
  return `Listed ${w} week${w > 1 ? "s" : ""} ago`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]!.toUpperCase())
    .join("");
}

const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MON_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y!, m! - 1, d!);
}

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function dayParts(iso: string) {
  const d = parseISO(iso);
  return { dow: DAY[d.getDay()]!, day: d.getDate() };
}

/** "Wed 15 Oct" */
export function shortDate(iso: string): string {
  const d = parseISO(iso);
  return `${DAY[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
}

/** "Wednesday, 15 October" */
export function longDate(iso: string): string {
  const d = parseISO(iso);
  return `${DAY_LONG[d.getDay()]}, ${d.getDate()} ${MON_LONG[d.getMonth()]}`;
}
