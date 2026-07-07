import Link from "next/link";
import Logo from "@/components/Logo";
import { logout, requireSession } from "@/app/admin/actions";
import { firebaseAdminConfigured } from "@/lib/firebase/admin";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (firebaseAdminConfigured) {
    await requireSession();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-rs-gray-light">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/">
            <Logo className="text-lg" />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-sm text-rs-muted transition-colors hover:text-white"
            >
              Panel
            </Link>
            <Link
              href="/admin/mensajes"
              className="text-sm text-rs-muted transition-colors hover:text-white"
            >
              Mensajes
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-sm text-rs-muted transition-colors hover:text-white"
            >
              Ver web
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-rs-muted transition-colors hover:text-white"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
