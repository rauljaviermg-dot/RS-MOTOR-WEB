"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { createSession } from "@/app/admin/actions";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      const idToken = await credential.user.getIdToken();
      await createSession(idToken);
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Email o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <Image src="/logo.png" alt="RS.MOTOR" width={2172} height={724} className="h-10 w-auto" />
        <h1 className="mt-6 font-heading text-2xl font-medium text-white">
          Acceso al panel
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-rs-gray-light bg-rs-gray px-4 py-3 text-white placeholder:text-rs-muted focus:border-rs-red focus:outline-none"
          />
          <input
            type="password"
            required
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-rs-gray-light bg-rs-gray px-4 py-3 text-white placeholder:text-rs-muted focus:border-rs-red focus:outline-none"
          />
          {error && <p className="text-sm text-rs-red">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-rs-red px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
