import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { supabase } from "@/lib/supabase";

export function ProtectedRoute() {
  const [status, setStatus] = useState<"loading" | "authed" | "unauthed">(
    "loading",
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? "authed" : "unauthed");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "authed" : "unauthed");
    });

    return () => subscription.unsubscribe();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-secondary text-sm text-text-muted">
        Verificando sessão…
      </div>
    );
  }
  if (status === "unauthed") return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
