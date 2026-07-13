import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const title = "RS-Motor | 20 años acompañando a quienes buscan su próximo coche.";
const description =
  "Nuestra experiencia es el aval que nos permite dar la mejor respuesta a las necesidades de cada cliente.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rsmotormalaga.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://rsmotormalaga.com",
    siteName: "RS-Motor",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  verification: {
    google: "9U6xkPO51axPyqTf7jORpwcIwy5r5M4Zkvd7KKiaPDo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
