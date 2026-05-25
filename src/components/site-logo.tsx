import { siteLogo } from "@/lib/optimized-images";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <img
      src={siteLogo.src}
      srcSet={siteLogo.srcSet}
      sizes={siteLogo.sizes}
      width={siteLogo.width}
      height={siteLogo.height}
      alt=""
      aria-hidden
      decoding="async"
      className={cn(className)}
    />
  );
}
