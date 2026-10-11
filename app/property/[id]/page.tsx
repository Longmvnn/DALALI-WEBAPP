import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Photo, PropertyCard } from "@/components/PropertyCard";
import { SaveButton } from "@/components/SaveButton";
import { getDalali, getProperty, searchProperties } from "@/lib/api";
import { initials, listedAgo, tsh, typeLabel } from "@/lib/format";
import { ShareButton } from "./ShareButton";

export async function generateMetadata({ params }: PageProps<"/property/[id]">): Promise<Metadata> {
  const p = await getProperty((await params).id);
  if (!p) return { title: "Property not found" };
  return { title: `${p.title}, ${p.area}`, description: `${tsh(p.price)} / month. ${p.description}` };
}

export default function PropertyPage({ params }: PageProps<"/property/[id]">) {
  return (
    <Suspense fallback={<Loading />}>
      <PropertyContent params={params} />
    </Suspense>
  );
}

async function PropertyContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getProperty(id);
  if (!p) notFound();
  const dalali = await getDalali(p.dalaliId);
  const similar = (await searchProperties({ category: p.category }))
    .filter((x) => x.id !== p.id && x.status === "available")
    .sort((a, b) => Number(b.area === p.area) - Number(a.area === p.area))
    .slice(0, 3);
  const available = p.status === "available";

  const specs = [
    p.bedrooms > 0
      ? { k: "Bedrooms", v: String(p.bedrooms), icon: "bed" as const }
      : { k: "Type", v: typeLabel[p.type], icon: "building" as const },
    { k: "Bathrooms", v: String(p.bathrooms), icon: "bath" as const },
    { k: "Size", v: `${p.sizeM2} m²`, icon: "area" as const },
    { k: "Furnishing", v: p.furnishing === "furnished" ? "Furnished" : "Unfurnished", icon: "sofa" as const },
  ];

  const booking = available ? (
    <Link href={`/property/${p.id}/request`} className="btn btn-primary btn-lg btn-block">
      <Icon name="calendar" size={18} /> Request a viewing
    </Link>
  ) : (
    <button className="btn btn-primary btn-lg btn-block" disabled>This property is rented</button>
  );

  return (
    <>
      <div className="container page">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Icon name="chevron" size={14} />
          <Link href={`/search?q=${encodeURIComponent(p.area)}`}>{p.area}</Link>
          <Icon name="chevron" size={14} />
          <span aria-current="page">{p.title}</span>
        </nav>

        <div className="gallery">
          <Photo tone={p.tone} label={`${p.title}, photo 1 of ${p.photos}`}>
            <div className="badges">
              {p.verified && <span className="badge badge-verified">Verified</span>}
              <span className={`badge ${available ? "badge-available" : "badge-rented"}`}>{available ? "Available" : "Rented"}</span>
            </div>
          </Photo>
          <Photo tone={p.tone + 1} label={`${p.title}, photo 2`} />
          <Photo tone={p.tone + 2} label={`${p.title}, photo 3`}>
            <span className="count">1 / {p.photos}</span>
          </Photo>
        </div>

        <div className="detail" style={{ marginTop: 28 }}>
          <div className="stack" style={{ gap: 24 }}>
            <div className="stack" style={{ gap: 8 }}>
              <div className="row" style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <h1>{p.title}</h1>
                  <p className="row" style={{ gap: 6, margin: "6px 0 0", color: "var(--text-2)" }}>
                    <Icon name="pin" size={17} /> {p.area}, Dar es Salaam
                  </p>
                </div>
                <div className="row" style={{ gap: 8 }}>
                  <ShareButton title={p.title} />
                  <SaveButton id={p.id} withLabel />
                </div>
              </div>
              <div className="price" style={{ fontSize: 24, marginTop: 4 }}>
                {tsh(p.price)} <small>/ month</small>
              </div>
              <span className="small">{listedAgo(p.listedDaysAgo)} · {p.category === "commercial" ? "Commercial" : "Residential"}</span>
            </div>

            <div className="card specs">
              {specs.map((s) => (
                <div key={s.k}>
                  <span className="small row" style={{ gap: 6 }}><Icon name={s.icon} size={16} /> {s.k}</span>
                  <strong>{s.v}</strong>
                </div>
              ))}
            </div>

            <section>
              <h2 style={{ marginBottom: 8 }}>Description</h2>
              <p style={{ margin: 0 }}>{p.description}</p>
            </section>

            <section>
              <h2 style={{ marginBottom: 14 }}>Amenities</h2>
              <ul className="amenities">
                {p.amenities.map((a) => (
                  <li key={a}><Icon name="check" size={18} stroke={2.2} /> {a}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="sticky-side">
            <div className="card card-pad booking stack">
              <div className="price">
                {tsh(p.price)} <small>/ month</small>
              </div>
              {booking}
              <p className="small" style={{ margin: 0, textAlign: "center" }}>
                Free to request. The dalali confirms the time with you.
              </p>
            </div>
            {dalali && (
              <div className="card card-pad stack" style={{ gap: 14 }}>
                <span className="label" style={{ color: "var(--text-2)" }}>Listed by</span>
                <div className="row">
                  <span className="avatar" style={{ width: 48, height: 48 }}>{initials(dalali.name)}</span>
                  <div>
                    <strong style={{ color: "var(--heading)" }}>{dalali.name}</strong>
                    <div className="small row" style={{ gap: 4 }}>
                      {dalali.verified && <span style={{ color: "var(--teal)", display: "inline-flex" }}><Icon name="shield" size={15} /></span>}
                      {dalali.verified ? "Verified Dalali" : "Dalali"} · {dalali.listings} listings
                    </div>
                  </div>
                </div>
                <div className="small row" style={{ gap: 6 }}>
                  <Icon name="star" size={15} filled /> {dalali.rating} rating · {dalali.area}
                </div>
                <a href={`tel:${dalali.phone.replace(/\s/g, "")}`} className="btn btn-secondary btn-block">
                  <Icon name="phone" size={18} /> Call {dalali.name.split(" ")[0]}
                </a>
              </div>
            )}
          </aside>
        </div>

        {similar.length > 0 && (
          <section style={{ marginTop: 56 }}>
            <div className="section-head">
              <h2>Similar properties</h2>
              <Link href={`/search?category=${p.category}`} className="link small">See all</Link>
            </div>
            <div className="grid">
              {similar.map((s) => (
                <PropertyCard key={s.id} p={s} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mobile-cta">
        <div style={{ flex: 1 }}>
          <div className="price" style={{ fontSize: 17, lineHeight: "22px" }}>{tsh(p.price)}</div>
          <span className="small">per month</span>
        </div>
        <div style={{ flex: 1.4 }}>{booking}</div>
      </div>
    </>
  );
}
