import { type FormEvent, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormState = { email: string; senha: string };
const initialForm: FormState = { email: "", senha: "" };

const loginLabelClassName =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-text-muted";

const loginInputClassName =
  "border-border bg-white text-text-primary placeholder:text-text-muted focus:border-brand-vivid focus:bg-white";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setAuthError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.email.trim()) nextErrors.email = "Informe seu e-mail";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "E-mail inválido";
    if (!form.senha.trim()) nextErrors.senha = "Informe sua senha";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setAuthError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.senha,
    });

    setLoading(false);

    if (error) {
      setAuthError("E-mail ou senha incorretos.");
      return;
    }

    navigate("/admin/articles");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-secondary px-4 py-10">
      <Card className="w-full max-w-md gap-6 rounded-lg py-8 shadow-sm">
        <CardHeader className="px-8 text-center">
          <CardTitle className="font-display text-2xl font-semibold tracking-[-0.02em] normal-case text-text-primary">
            Acesso administrativo
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Entre com suas credenciais para acessar o painel.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {authError && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {authError}
              </p>
            )}

            <div>
              <Label htmlFor="email" className={loginLabelClassName}>
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                placeholder="seu@email.com"
                aria-invalid={!!errors.email}
                className={loginInputClassName}
                onChange={(e) => updateField("email", e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="senha" className={loginLabelClassName}>
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={visiblePassword ? "text" : "password"}
                  name="senha"
                  autoComplete="current-password"
                  value={form.senha}
                  placeholder="••••••••"
                  aria-invalid={!!errors.senha}
                  className={`${loginInputClassName} pr-10`}
                  onChange={(e) => updateField("senha", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setVisiblePassword((p) => !p)}
                  aria-label={
                    visiblePassword ? "Ocultar senha" : "Mostrar senha"
                  }
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-text-muted transition-colors hover:text-text-primary"
                >
                  {visiblePassword ? (
                    <EyeOffIcon className="size-4" aria-hidden />
                  ) : (
                    <EyeIcon className="size-4" aria-hidden />
                  )}
                </button>
              </div>
              {errors.senha && (
                <p className="mt-1 text-xs text-destructive">{errors.senha}</p>
              )}
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {loading ? "Entrando…" : "Entrar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-full text-primary/80 hover:text-primary"
              onClick={() => navigate("/")}
            >
              Voltar para a página inicial
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
