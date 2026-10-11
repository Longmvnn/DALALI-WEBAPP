import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { searchProperties } from "@/lib/api";
import { popularAreas } from "@/lib/mock-data";

const CATEGORIES = [
  { label: "All", href: "/search" },
  { label: "Apartments", href: "/search?type=apartment" },
  { label: "Houses", href: "/search?type=house" },
  { label: "Rooms", href: "/search?type=room" },
  { label: "Furnished", href: "/search?furnishing=furnished" },
  { label: "Commercial", href: "/search?category=commercial" },
];

export default async function Home() {
  const all = await searchProperties();
  const latest = all.filter((p) => p.status === "available").slice(0, 8);
  const budget = (await searchProperties({ maxPrice: 150000, sort: "price-asc" })).filter((p) => p.status === "available").slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="display">Rent Smarter</h1>
          <p>Verified rooms, apartments and shops across Dar es Salaam, with real prices and trusted dalalis.</p>
          <SearchBar />
          <div className="row" style={{ marginTop: 18, flexWrap: "wrap", gap: 8 }}>
            <span className="small" style={{ color: "#c7cfda" }}>Popular:</span>
            {popularAreas.slice(0, 5).map((a) => (
              <Link
                key={a}
                href={`/search?q=${encodeURIComponent(a)}`}
                className="chip"
                style={{ background: "transparent", color: "#f3eee5", borderColor: "rgba(234,223,203,.35)", height: 32 }}
              >
                {a}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container page">
        <nav className="chips" aria-label="Categories" style={{ marginBottom: 28 }}>
          {CATEGORIES.map((c, i) => (
            <Link key={c.label} href={c.href} className={`chip${i === 0 ? " active" : ""}`}>
              {c.label}
            </Link>
          ))}
        </nav>

        <section>
          <div className="section-head">
            <h2>Latest listings</h2>
            <Link href="/search" className="link small">See all</Link>
          </div>
          <div className="grid">
            {latest.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <div className="section-head">
            <h2>Under TSh 150,000</h2>
            <Link href="/search?max=150000&sort=price-asc" className="link small">See all</Link>
          </div>
          <div className="grid">
            {budget.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section className="card card-pad" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {[
            { icon: "shield" as const, t: "Verified dalalis", d: "Every verified badge means we have checked the dalali's identity." },
            { icon: "calendar" as const, t: "Book a viewing", d: "Pick a day and time online. The dalali confirms and you get a notification." },
            { icon: "checkCircle" as const, t: "Real prices in TSh", d: "Rent is shown per month, up front. No surprises when you arrive." },
          ].map((f) => (
            <div key={f.t} className="row" style={{ alignItems: "flex-start", gap: 14 }}>
              <span style={{ color: "var(--teal)", marginTop: 2 }}><Icon name={f.icon} size={24} /></span>
              <div>
                <h3>{f.t}</h3>
                <p className="small" style={{ margin: "4px 0 0" }}>{f.d}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
