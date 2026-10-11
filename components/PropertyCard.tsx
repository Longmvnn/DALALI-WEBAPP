import Link from "next/link";
import type { Property } from "@/lib/types";
import { tsh, typeLabel } from "@/lib/format";
import { Icon } from "./Icon";
import { SaveButton } from "./SaveButton";

// Placeholder photo tones until listing images come from the backend.
const TONES = [
  "linear-gradient(135deg, #1f4166 0%, #0f2a47 100%)",
  "linear-gradient(135deg, #2a8a84 0%, #1e5f5b 100%)",
  "linear-gradient(135deg, #c99b6a 0%, #9b6b3f 100%)",
  "linear-gradient(135deg, #5a6878 0%, #3b4757 100%)",
  "linear-gradient(135deg, #d98a45 0%, #b5642a 100%)",
];

export function Photo({ tone, children, label }: { tone: number; children?: React.ReactNode; label?: string }) {
  return (
    <div className="photo" style={{ background: TONES[tone % TONES.length] }} role="img" aria-label={label ?? "Listing photo"}>
      <svg className="house" viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 22 32 4l26 18" />
        <path d="M12 18v26h40V18" />
        <rect x="27" y="28" width="10" height="16" />
        <rect x="16" y="24" width="7" height="7" />
        <rect x="41" y="24" width="7" height="7" />
      </svg>
      {children}
    </div>
  );
}

export function PropertyCard({ p }: { p: Property }) {
  const rented = p.status === "rented";
  return (
    <article className="card pcard">
      <div className="save">
        <SaveButton id={p.id} />
      </div>
      <Link href={`/property/${p.id}`} aria-label={`${p.title}, ${p.area}, ${tsh(p.price)} per month`}>
        <Photo tone={p.tone}>
          <div className="badges">
            {p.verified && <span className="badge badge-verified">Verified</span>}
            {rented && <span className="badge badge-rented">Rented</span>}
          </div>
        </Photo>
        <div className="body">
          <div className="price">
            {tsh(p.price)} <small>/ month</small>
          </div>
          <div className="title">{p.title}</div>
          <div className="small row" style={{ gap: 4 }}>
            <Icon name="pin" size={15} /> {p.area}, Dar es Salaam
          </div>
          <div className="meta">
            {p.bedrooms > 0 ? (
              <span><Icon name="bed" size={15} /> {p.bedrooms} bed</span>
            ) : (
              <span><Icon name="building" size={15} /> {typeLabel[p.type]}</span>
            )}
            <span><Icon name="bath" size={15} /> {p.bathrooms} bath</span>
            <span><Icon name="area" size={15} /> {p.sizeM2} m²</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
