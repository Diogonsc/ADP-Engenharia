import { type FormEvent, useState } from "react";
import { EyeIcon } from "lucide-react";
import { ArticlePreview } from "@/components/admin/article-preview";
import { ImageUpload } from "@/components/admin/image-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
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
  articleCategories,
  articleFormToPreview,
  slugify,
  type Article,
  type ArticleFormData,
  type ArticleStatus,
} from "@/data/articles";
import { FeaturedField } from "@/components/admin/featured-field";
import { getErrorMessage } from "@/lib/errors";
import { MAX_FEATURED_ARTICLES } from "@/lib/featured";
import { isRichTextEmpty } from "@/lib/rich-text";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ArticleFormProps = {
  initialData?: Article;
  submitLabel: string;
  onSubmit: (data: ArticleFormData) => void | Promise<void>;
};

const defaultForm: ArticleFormData = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "lt",
  image: "",
  status: "draft",
  featured: false,
};

export function ArticleForm({
  initialData,
  submitLabel,
  onSubmit,
}: ArticleFormProps) {
  const [form, setForm] = useState<ArticleFormData>(() =>
    initialData
      ? {
          slug: initialData.slug,
          title: initialData.title,
          excerpt: initialData.excerpt,
          content: initialData.content,
          category: initialData.category,
          image: initialData.image,
          status: initialData.status,
          featured: initialData.featured,
        }
      : defaultForm,
  );
  const [slugEdited, setSlugEdited] = useState(Boolean(initialData?.slug));
  const [contentError, setContentError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof ArticleFormData>(
    field: K,
    value: ArticleFormData[K],
  ) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };

      if (field === "title" && !slugEdited) {
        next.slug = slugify(String(value));
      }

      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRichTextEmpty(form.content)) {
      setContentError("Informe o conteúdo do artigo");
      return;
    }

    setContentError(null);
    setSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      window.alert(getErrorMessage(err, "Erro ao salvar o artigo."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle className="font-display text-2xl font-semibold normal-case tracking-normal">
          {initialData ? "Editar artigo" : "Novo artigo"}
        </CardTitle>
        <CardDescription>
          Preencha as informações do artigo para publicação no blog.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="title" className={adminLabelClassName}>
                Título
              </Label>
              <Input
                id="title"
                value={form.title}
                placeholder="Título do artigo"
                className={adminFieldClassName}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug" className={adminLabelClassName}>
                Slug
              </Label>
              <Input
                id="slug"
                value={form.slug}
                placeholder="titulo-do-artigo"
                className={adminFieldClassName}
                onChange={(e) => {
                  setSlugEdited(true);
                  updateField("slug", slugify(e.target.value));
                }}
                required
              />
            </div>

            <div>
              <Label htmlFor="category" className={adminLabelClassName}>
                Categoria
              </Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  updateField("category", value as ArticleFormData["category"])
                }
              >
                <SelectTrigger
                  id="category"
                  className={cn(adminFieldClassName, "h-auto min-h-[42px]")}
                >
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {articleCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status" className={adminLabelClassName}>
                Status
              </Label>
              <Select
                value={form.status}
                onValueChange={(value) =>
                  updateField("status", value as ArticleStatus)
                }
              >
                <SelectTrigger
                  id="status"
                  className={cn(adminFieldClassName, "h-auto min-h-[42px]")}
                >
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <ImageUpload
                value={form.image}
                onChange={(url) => updateField("image", url)}
              />
            </div>
          </div>

          <FeaturedField
            id="featured"
            checked={form.featured}
            maxItems={MAX_FEATURED_ARTICLES}
            entityLabel="Artigos publicados"
            onChange={(featured) => updateField("featured", featured)}
          />

          <div>
            <Label htmlFor="excerpt" className={adminLabelClassName}>
              Resumo
            </Label>
            <Textarea
              id="excerpt"
              rows={3}
              value={form.excerpt}
              placeholder="Breve descrição exibida na listagem"
              className={adminTextareaClassName}
              onChange={(e) => updateField("excerpt", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="content" className={adminLabelClassName}>
              Conteúdo
            </Label>
            <RichTextEditor
              value={form.content}
              aria-invalid={!!contentError}
              onChange={(value) => {
                updateField("content", value);
                if (contentError) setContentError(null);
              }}
            />
            {contentError && (
              <p className="mt-1 text-xs text-destructive">{contentError}</p>
            )}
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreviewOpen(true)}
            >
              <EyeIcon />
              Visualizar prévia
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando…" : submitLabel}
            </Button>
          </div>
        </form>

        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="font-display text-xl font-semibold normal-case tracking-normal">
                Pré-visualização do artigo
              </DialogTitle>
              <DialogDescription>
                Veja como o artigo ficará antes de salvar ou publicar.
              </DialogDescription>
            </DialogHeader>
            <ArticlePreview
              article={articleFormToPreview(form, {
                id: initialData?.id,
                date: initialData?.date,
              })}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
