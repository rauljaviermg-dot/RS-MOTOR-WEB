import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialBubble from "@/components/SocialBubble";
import { hasActiveSession } from "@/app/admin/actions";
import { firebaseAdminConfigured } from "@/lib/firebase/admin";
import { hasUnreadMensajes } from "@/lib/mensajes";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = firebaseAdminConfigured ? await hasActiveSession() : false;
  const hasUnread = isAdmin ? await hasUnreadMensajes() : false;

  return (
    <>
      <Header isAdmin={isAdmin} hasUnread={hasUnread} />
      <main className="flex-1">{children}</main>
      <Footer />
      <SocialBubble />
    </>
  );
}
