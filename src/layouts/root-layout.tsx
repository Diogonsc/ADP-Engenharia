import { BackToTop } from "@/components/back-to-top";
import { Header } from "@/components/header";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";
import { Outlet, useLocation } from "react-router";

export function RootLayout() {
  const location = useLocation();
  useScrollAnimate([location.pathname]);

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <BackToTop />
    </div>
  );
}
