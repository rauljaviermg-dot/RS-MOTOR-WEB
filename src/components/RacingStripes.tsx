export default function RacingStripes({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="animate-stripes absolute inset-y-0 -left-1/3 flex w-[200%] gap-6 opacity-40">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`h-full w-4 -skew-x-12 ${
              i % 3 === 1 ? "bg-rs-red" : "bg-rs-gray-light"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
