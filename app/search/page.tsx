import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { Icon } from "@/components/Icon";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { filtersFromParams, searchProperties } from "@/lib/api";
import { Filters, FiltersSheetProvider, FiltersToggle, SortSelect } from "./Filters";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <Suspense fallback={<Loading />}>
      <SearchContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchContent({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const f = filtersFromParams(sp);
  const results = await searchProperties(f);
  const where = f.q ? ` in ${f.q.replace(/^./, (c) => c.toUpperCase())}` : "";
  const heading =
    f.category === "commercial" ? "Commercial spaces" : f.category === "residential" ? "Residential homes" : "Homes to rent";

  return (
    <div className="container page">
      <div style={{ marginBottom: 24 }}>
        <SearchBar key={JSON.stringify(sp)} initial={{ q: f.q, max: f.maxPrice?.toString(), beds: f.bedrooms?.toString() }} />
      </div>
      <FiltersSheetProvider>
      <div className="search-layout">
        <Filters />
        <section>
          <div className="results-head">
            <div>
              <h1 className="h2">{heading}</h1>
              <p className="small" style={{ margin: 0 }} aria-live="polite">
                {results.length} result{results.length === 1 ? "" : "s"}{where}
              </p>
            </div>
            <div className="spacer" />
            <FiltersToggle />
            <SortSelect />
          </div>
          {results.length ? (
            <div className="grid">
              {results.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <div className="card empty">
              <div className="ring"><Icon name="search" size={30} /></div>
              <h2>No properties found</h2>
              <p className="small" style={{ maxWidth: 360, margin: 0 }}>
                Try a different area, widen your price range, or clear some filters.
              </p>
            </div>
          )}
        </section>
      </div>
      </FiltersSheetProvider>
    </div>
  );
}
