import { lazy, Suspense } from "react";
import { Home } from "@/components/home";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";

const LandingBelowFold = lazy(() =>
  import("@/components/landing-below-fold").then((module) => ({
    default: module.LandingBelowFold,
  })),
);

export function LandingPage() {
  useScrollToHash();

  return (
    <>
      <Home />
      <Suspense fallback={null}>
        <LandingBelowFold />
      </Suspense>
    </>
  );
}
