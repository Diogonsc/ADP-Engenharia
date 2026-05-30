import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { contactLabelClassName } from "@/components/ui/field-variants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  container,
  containerPx,
  overline,
  sectionDark,
  sectionPy,
  sectionScroll,
} from "@/lib/layout";
import { SECTION_IDS } from "@/lib/sections";
import { cn } from "@/lib/utils";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { type FormEvent, useState } from "react";

type FormState = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  tipo: string;
  mensagem: string;
};

const initialForm: FormState = {
  nome: "",
  empresa: "",
  email: "",
  telefone: "",
  tipo: "",
  mensagem: "",
};

const projectTypes = [
  { value: "lt", label: "Linha de Transmissão" },
  { value: "se", label: "Subestação" },
  { value: "automacao", label: "Automação e Proteção" },
  { value: "consultoria", label: "Consultoria Técnica" },
  { value: "outro", label: "Outro" },
] as const;

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.nome.trim()) nextErrors.nome = "Informe seu nome";
    if (!form.email.trim()) {
      nextErrors.email = "Informe seu e-mail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "E-mail inválido";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section
      id={SECTION_IDS.contact}
      className={cn(
        "noise-overlay",
        sectionDark,
        sectionScroll,
        containerPx,
        sectionPy,
      )}
    >
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div data-animate>
            <span className={cn(overline, "text-brand-vivid")}>
              Entre em contato
            </span>
            <h2 className="font-display text-[32px] font-semibold leading-[1.1] text-white sm:text-[40px]">
              Fale com nossa
              <br />
              equipe técnica
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
              Projetos, parcerias e dúvidas técnicas. Nossa equipe responde em
              até 1 dia útil.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <a
                href="mailto:contato@adpengenharia.com.br"
                className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <MailIcon className="size-4 shrink-0" aria-hidden />
                contato@adpengenharia.com.br
              </a>
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <PhoneIcon className="size-4 shrink-0" aria-hidden />
                +55 (21) 99999-9999
              </a>
              <p className="flex items-center gap-3 text-sm text-white/70">
                <MapPinIcon className="size-4 shrink-0" aria-hidden />
                Rio de Janeiro, RJ — Brasil
              </p>
            </div>
          </div>

          <Card
            className="gap-0 rounded-lg border-border-dark bg-bg-dark-surface py-0 shadow-none ring-0"
            data-animate
          >
            <CardContent className="p-6 sm:p-9">
              {submitted ? (
                <p className="text-sm leading-relaxed text-white/75">
                  Mensagem enviada com sucesso. Nossa equipe entrará em contato em
                  até 1 dia útil.
                </p>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="nome" className={contactLabelClassName}>
                        Nome completo
                      </Label>
                      <Input
                        id="nome"
                        type="text"
                        name="nome"
                        value={form.nome}
                        placeholder="Seu nome"
                        aria-invalid={!!errors.nome}
                        onChange={(e) => updateField("nome", e.target.value)}
                      />
                      {errors.nome && (
                        <p className="mt-1 text-xs text-red-400">{errors.nome}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="empresa" className={contactLabelClassName}>
                        Empresa
                      </Label>
                      <Input
                        id="empresa"
                        type="text"
                        name="empresa"
                        value={form.empresa}
                        placeholder="Nome da empresa"
                        onChange={(e) => updateField("empresa", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="email" className={contactLabelClassName}>
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        placeholder="seu@email.com"
                        aria-invalid={!!errors.email}
                        onChange={(e) => updateField("email", e.target.value)}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="telefone" className={contactLabelClassName}>
                        Telefone
                      </Label>
                      <Input
                        id="telefone"
                        type="tel"
                        name="telefone"
                        value={form.telefone}
                        placeholder="(11) 99999-9999"
                        onChange={(e) => updateField("telefone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tipo" className={contactLabelClassName}>
                      Tipo de projeto
                    </Label>
                    <Select
                      value={form.tipo || undefined}
                      onValueChange={(value) => updateField("tipo", value)}
                    >
                      <SelectTrigger id="tipo" variant="contact">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent variant="contact">
                        {projectTypes.map(({ value, label }) => (
                          <SelectItem key={value} value={value} variant="contact">
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="mensagem" className={contactLabelClassName}>
                      Mensagem
                    </Label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      rows={4}
                      value={form.mensagem}
                      placeholder="Descreva brevemente seu projeto ou dúvida..."
                      onChange={(e) => updateField("mensagem", e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Enviar mensagem
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
