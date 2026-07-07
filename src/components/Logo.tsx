export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-heading italic font-semibold tracking-tight ${className}`}
    >
      <span className="text-rs-red">RS</span>
      <span className="text-white">.MOTOR</span>
    </span>
  );
}
