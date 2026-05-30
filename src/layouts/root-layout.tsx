import { Suspense } from "react";
import { BackToTop } from "@/components/back-to-top";
import { Header } from "@/components/header";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useLenis } from "@/hooks/use-lenis";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";
import { Outlet, useLocation } from "react-router";

export function RootLayout() {
  const location = useLocation();
  useLenis();
  useScrollAnimate([location.pathname]);

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden">
      <CustomCursor />
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
