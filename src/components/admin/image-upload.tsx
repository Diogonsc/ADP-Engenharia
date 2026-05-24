import { useRef, useState } from "react";
import { Loader2Icon, UploadIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  deleteArticleImage,
  isStorageUrl,
  uploadArticleImage,
  type UploadPhase,
} from "@/lib/articles-api";
import { getImageErrorMessage } from "@/lib/image";
import {
  adminFieldClassName,
  adminLabelClassName,
} from "@/components/ui/field-variants";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
};

const phaseLabel: Record<UploadPhase, string> = {
  validating: "Validando imagem…",
  optimizing: "Otimizando…",
  uploading: "Enviando…",
  done: "Concluído",
};

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [phase, setPhase] = useState<UploadPhase | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{
    reductionPercent: number;
  } | null>(null);

  const uploading = phase !== null && phase !== "done";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setUploadError(null);
    setMetrics(null);
    setPhase("validating");

    const previousUrl = value;

    try {
      const result = await uploadArticleImage(file, {
        signal: controller.signal,
        onPhase: setPhase,
      });

      setMetrics({ reductionPercent: result.reductionPercent });

      if (isStorageUrl(previousUrl)) {
        deleteArticleImage(previousUrl).catch((err) => {
          console.warn(
            "[ImageUpload] Falha ao remover imagem antiga do bucket:",
            err,
          );
        });
      }

      onChange(result.url);
    } catch (err) {
      const msg = getImageErrorMessage(err);
      if (msg) setUploadError(msg);
    } finally {
      setPhase(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    setPhase(null);
  };

  const handleRemove = () => {
    if (isStorageUrl(value)) {
      deleteArticleImage(value).catch((err) => {
        console.warn("[ImageUpload] Falha ao remover imagem do bucket:", err);
      });
    }
    onChange("");
    setMetrics(null);
    setUploadError(null);
  };

  return (
    <div className="space-y-3">
      <Label className={adminLabelClassName}>Imagem de capa</Label>

      {value && !uploading && (
        <div className="relative w-full overflow-hidden rounded-md border border-border">
          <img
            src={value}
            alt="Preview da capa"
            className="aspect-video w-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remover imagem"
            className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white transition hover:bg-black/80"
          >
            <XIcon className="size-4" />
          </button>
          {metrics && (
            <span className="absolute bottom-2 left-2 rounded-sm bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white">
              ↓ {metrics.reductionPercent}% · WebP
            </span>
          )}
        </div>
      )}

      {!value && (
        <button
          type="button"
          onClick={() => !uploading && inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2",
            "rounded-md border border-dashed border-border bg-bg-secondary py-8",
            "text-sm text-text-muted transition",
            !uploading && "cursor-pointer hover:border-brand hover:text-brand",
            uploading && "cursor-not-allowed opacity-80",
          )}
        >
          {uploading ? (
            <>
              <Loader2Icon className="size-6 animate-spin" />
              <span>{phaseLabel[phase!]}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
                className="mt-1 text-xs underline underline-offset-2 hover:text-destructive"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <UploadIcon className="size-6" />
              <span>Clique para fazer upload</span>
              <span className="text-xs">
                JPG, PNG, WEBP — máx. 8 MB · 4000×4000px
              </span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={handleFileChange}
      />

      <div>
        <Label className={cn(adminLabelClassName, "mt-2")}>
          Ou cole uma URL externa
        </Label>
        <Input
          type="url"
          value={value}
          placeholder="https://..."
          className={adminFieldClassName}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {uploadError && (
        <p className="text-xs text-destructive">{uploadError}</p>
      )}
    </div>
  );
}
