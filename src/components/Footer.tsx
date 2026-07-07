import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-rs-gray-light bg-rs-gray">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-rs-muted">
        <Logo className="text-lg" />
        <p className="mt-4">
          Málaga · Coches de importación europea con 1 año de garantía.
        </p>
        <p className="mt-2">© {new Date().getFullYear()} RS-Motor. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
