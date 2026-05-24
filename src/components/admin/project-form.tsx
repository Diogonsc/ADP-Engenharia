import { type FormEvent, useState } from "react";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  adminFieldClassName,
  adminLabelClassName,
  adminTextareaClassName,
} from "@/components/ui/field-variants";
import {
  projectCategories,
  type Project,
  type ProjectFormData,
} from "@/data/projects";

type ProjectFormProps = {
  initialData?: Project;
  submitLabel: string;
  onSubmit: (data: ProjectFormData) => Promise<void>;
};

function getInitialForm(initial?: Project): ProjectFormData {
  return {
    title: initial?.title ?? "",
    tag: initial?.tag ?? "",
    type: initial?.type ?? "",
    meta: initial?.meta ?? "",
    category: initial?.category ?? "lt",
    image: initial?.image ?? "",
    description: initial?.description ?? "",
    highlights: initial?.highlights?.length ? initial.highlights : [""],
    order: initial?.order ?? 0,
  };
}

export function ProjectForm({
  initialData,
  submitLabel,
  onSubmit,
}: ProjectFormProps) {
  const [form, setForm] = useState<ProjectFormData>(() =>
    getInitialForm(initialData),
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProjectFormData | "highlights_items", string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof ProjectFormData>(
    field: K,
    value: ProjectFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const updateHighlight = (index: number, value: string) => {
    const next = [...form.highlights];
    next[index] = value;
    setForm((prev) => ({ ...prev, highlights: next }));
    setErrors((prev) => ({ ...prev, highlights_items: undefined }));
  };

  const addHighlight = () => {
    setForm((prev) => ({ ...prev, highlights: [...prev.highlights, ""] }));
  };

  const removeHighlight = (index: number) => {
    if (form.highlights.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.title.trim()) next.title = "Título obrigatório";
    if (!form.tag.trim()) next.tag = "Tag obrigatória";
    if (!form.type.trim()) next.type = "Tipo obrigatório";
    if (!form.description.trim()) next.description = "Descrição obrigatória";
    const filledHighlights = form.highlights.filter((h) => h.trim());
    if (filledHighlights.length === 0) {
      next.highlights_items = "Adicione ao menos um item do escopo";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        highlights: form.highlights.filter((h) => h.trim()),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="font-display text-xl font-semibold normal-case tracking-normal">
          {initialData ? "Editar projeto" : "Novo projeto"}
        </CardTitle>
        <CardDescription>
          {initialData
            ? "Atualize as informações do projeto."
            : "Preencha as informações do novo projeto."}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="title" className={adminLabelClassName}>
                Título
              </Label>
              <Input
                id="title"
                value={form.title}
                placeholder="LT 500kV Norte/SE"
                className={adminFieldClassName}
                aria-invalid={!!errors.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-destructive">{errors.title}</p>
              )}
            </div>
            <div>
              <Label htmlFor="tag" className={adminLabelClassName}>
                Tag
              </Label>
              <Input
                id="tag"
                value={form.tag}
                placeholder="LT 500kV"
                className={adminFieldClassName}
                aria-invalid={!!errors.tag}
                onChange={(e) => updateField("tag", e.target.value)}
              />
              {errors.tag && (
                <p className="mt-1 text-xs text-destructive">{errors.tag}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="type" className={adminLabelClassName}>
                Tipo
              </Label>
              <Input
                id="type"
                value={form.type}
                placeholder="Linha de Transmissão"
                className={adminFieldClassName}
                aria-invalid={!!errors.type}
                onChange={(e) => updateField("type", e.target.value)}
              />
              {errors.type && (
                <p className="mt-1 text-xs text-destructive">{errors.type}</p>
              )}
            </div>
            <div>
              <Label htmlFor="category" className={adminLabelClassName}>
                Categoria
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  updateField("category", v as ProjectFormData["category"])
                }
              >
                <SelectTrigger id="category" className={adminFieldClassName}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projectCategories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="order" className={adminLabelClassName}>
                Ordem
              </Label>
              <Input
                id="order"
                type="number"
                min={0}
                value={form.order}
                className={adminFieldClassName}
                onChange={(e) => updateField("order", Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="meta" className={adminLabelClassName}>
              Meta (cliente e período)
            </Label>
            <Input
              id="meta"
              value={form.meta}
              placeholder="Cliente: Eletronorte · Jan–Dez 2023"
              className={adminFieldClassName}
              onChange={(e) => updateField("meta", e.target.value)}
            />
          </div>

          <ImageUpload
            value={form.image}
            onChange={(url) => updateField("image", url)}
          />

          <div>
            <Label htmlFor="description" className={adminLabelClassName}>
              Descrição
            </Label>
            <Textarea
              id="description"
              rows={4}
              value={form.description}
              placeholder="Breve descrição do projeto exibida no modal"
              className={adminTextareaClassName}
              aria-invalid={!!errors.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-destructive">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <Label className={adminLabelClassName}>
              Escopo técnico (highlights)
            </Label>
            <div className="space-y-2">
              {form.highlights.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    placeholder={`Item ${index + 1}`}
                    className={adminFieldClassName}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Remover item"
                    className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeHighlight(index)}
                    disabled={form.highlights.length <= 1}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={addHighlight}
            >
              <PlusIcon className="size-4" />
              Adicionar item
            </Button>
            {errors.highlights_items && (
              <p className="mt-1 text-xs text-destructive">
                {errors.highlights_items}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando…" : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
