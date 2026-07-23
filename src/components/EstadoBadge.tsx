export default function EstadoBadge({
  estado,
}: {
  estado?: "disponible" | "reservado" | "vendido";
}) {
  if (estado !== "reservado" && estado !== "vendido") return null;

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-10 h-28 w-28 overflow-hidden">
      <span className="absolute -left-10 top-5 block w-[150px] -rotate-45 bg-rs-red py-1 text-center text-xs font-bold tracking-wide text-white shadow-md">
        {estado === "vendido" ? "VENDIDO" : "RESERVADO"}
      </span>
    </div>
  );
}
