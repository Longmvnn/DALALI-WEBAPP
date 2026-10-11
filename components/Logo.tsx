// DALALI door mark (from dalali_logo_with_doorknob.svg) + wordmark.
// Brand rules: navy mark with amber knob on light, sand mark on dark.

export function LogoMark({ size = 28, mark = "var(--mark)", knob = "var(--amber)" }: { size?: number; mark?: string; knob?: string }) {
  return (
    <svg width={size} height={size} viewBox="18 12 122 133" aria-hidden="true">
      <path
        fill={mark}
        d="M78.76,15.22,21.5,14.75a1.62,1.62,0,0,0-.61.12,1.64,1.64,0,0,0-.52.35,1.67,1.67,0,0,0-.34.52,1.58,1.58,0,0,0-.12.61V116a1.840,1.840,0,0,0,.23.89,1.81,1.81,0,0,0,.64.65l42.94,25.11a1.45,1.45,0,0,0,.71.19,1.34,1.34,0,0,0,.7-.19,1.3,1.3,0,0,0,.52-.52,1.45,1.45,0,0,0,.19-.71V48.24a1.8,1.8,0,0,0-.25-.91,1.74,1.74,0,0,0-.67-.65L42.1,34.11a.85.85,0,0,1-.41-.48.92.92,0,0,1,.39-1.12.87.87,0,0,1,.61-.11l41.18,7.1a1.63,1.63,0,0,1,1,.56,1.61,1.61,0,0,1,.38,1V125a1.56,1.56,0,0,0,.15.67,1.69,1.69,0,0,0,.4.56,1.77,1.77,0,0,0,.6.33,1.61,1.61,0,0,0,.69.06c30.49-3.43,51.27-25,51.66-55C139.14,38.05,114.49,15.69,78.76,15.22Z"
      />
      <circle cx="57.2" cy="84.8" r="3.4" fill={knob} />
    </svg>
  );
}

export function Logo({ size = 28, inverse = false }: { size?: number; inverse?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.36 }}>
      <LogoMark size={size} mark={inverse ? "var(--sand)" : undefined} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: size * 0.68,
          letterSpacing: "0.04em",
          color: inverse ? "#f3eee5" : "var(--wordmark)",
          lineHeight: 1,
        }}
      >
        DALALI
      </span>
    </span>
  );
}
