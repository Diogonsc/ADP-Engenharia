import { Label } from "@/components/ui/label";
import { adminLabelClassName } from "@/components/ui/field-variants";
import { cn } from "@/lib/utils";

type FeaturedFieldProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  maxItems: number;
  entityLabel: string;
  disabled?: boolean;
};

export function FeaturedField({
  id,
  checked,
  onChange,
  maxItems,
  entityLabel,
  disabled,
}: FeaturedFieldProps) {
  return (
    <div className="rounded-md border border-border bg-bg-secondary/40 p-4">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="mt-1 size-4 shrink-0 accent-brand"
          onChange={(e) => onChange(e.target.checked)}
        />
        <div>
          <Label htmlFor={id} className={cn(adminLabelClassName, "cursor-pointer")}>
            Destaque na página inicial
          </Label>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            {entityLabel} marcados como destaque aparecem na seção da home. Máximo
            de {maxItems} em destaque.
          </p>
        </div>
      </div>
    </div>
  );
}
