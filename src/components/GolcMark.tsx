const SPECTRUM = ["#C0554A", "#CC8A47", "#B6A24C", "#4E9E68", "#1B44D9", "#6A50A8"];

export default function GolcMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GOLC mark"
    >
      <rect width="48" height="48" rx="11" fill="var(--mark-tile)" />
      <rect x="10" y="12" width="28" height="4" rx="2" fill="var(--mark-bar)" />
      {SPECTRUM.map((color, i) => {
        const x0 = 13 + i * 3.7;
        const spread = 2 + i * 1.4;
        return (
          <polygon
            key={color}
            points={`${x0},17 ${x0 + 3.2},17 ${x0 + 3.2 + spread},36 ${x0 - spread},36`}
            fill={color}
            opacity={0.92}
          />
        );
      })}
    </svg>
  );
}
