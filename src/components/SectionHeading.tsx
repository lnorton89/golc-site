export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <span className="block font-mono text-[13px] tracking-[1.3px] text-link">
        {index}
      </span>
      <h2 className="text-[34px] font-bold leading-tight tracking-[-0.02em] text-ink">
        {title}
      </h2>
    </div>
  );
}
