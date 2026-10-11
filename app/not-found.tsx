import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="container page" style={{ maxWidth: 520 }}>
      <div className="card empty">
        <div className="ring"><Icon name="home" size={28} /></div>
        <h1 className="h2">Page not found</h1>
        <p className="small" style={{ margin: "0 0 8px" }}>
          This page doesn&apos;t exist, or the listing has been removed.
        </p>
        <Link href="/search" className="btn btn-primary">Browse properties</Link>
      </div>
    </div>
  );
}
