import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-rs-gray-light bg-rs-gray">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-rs-muted">
        <Image src="/logo.png" alt="RS.MOTOR" width={2172} height={724} className="h-8 w-auto" />
        <p className="mt-4">
          Málaga · Coches de importación europea con 1 año de garantía.
        </p>
        <p className="mt-2">© {new Date().getFullYear()} RS-Motor. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
