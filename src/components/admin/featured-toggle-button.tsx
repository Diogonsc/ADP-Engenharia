import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/lib/errors";

type FeaturedToggleButtonProps = {
  featured: boolean;
  label: string;
  onToggle: (featured: boolean) => Promise<unknown>;
};

export function FeaturedToggleButton({
  featured,
  label,
  onToggle,
}: FeaturedToggleButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onToggle(!featured);
    } catch (err) {
      window.alert(getErrorMessage(err, "Não foi possível atualizar o destaque."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      disabled={loading}
      aria-label={
        featured
          ? `Remover ${label} dos destaques`
          : `Marcar ${label} como destaque`
      }
      className={cn(
        featured && "text-amber-600 hover:bg-amber-500/10 hover:text-amber-700",
      )}
      onClick={handleClick}
    >
      <Star
        className={cn("size-4", featured && "fill-current")}
        aria-hidden
      />
    </Button>
  );
}
