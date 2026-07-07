"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/coches", label: "Catálogo" },
  { href: "/transporters", label: "Transporters" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header({ isAdmin = false }: { isAdmin?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rs-gray-light bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo className="text-xl" />
        </Link>
        <nav className="hidden gap-8 text-sm text-rs-muted sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className="text-rs-red transition-colors hover:text-white">
              Panel
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="tel:+34900000000"
            className="rounded-md border border-rs-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rs-red"
          >
            Llamar
          </a>
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
          >
            <span className="h-0.5 w-5 bg-white" />
            <span className="h-0.5 w-5 bg-white" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-rs-gray-light px-6 py-4 text-sm text-rs-muted sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="py-2 text-rs-red transition-colors hover:text-white"
            >
              Panel
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
