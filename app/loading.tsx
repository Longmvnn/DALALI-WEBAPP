export default function Loading() {
  return (
    <div className="container page" aria-busy="true" aria-label="Loading">
      <div className="grid">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="card" style={{ height: 300, background: "var(--surface-2)" }} />
        ))}
      </div>
    </div>
  );
}
