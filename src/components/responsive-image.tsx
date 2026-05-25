import { cn } from "@/lib/utils";

type PictureSource = {
  src: string;
  srcSet: string;
  type: "image/avif" | "image/webp";
};

type ResponsiveImageProps = {
  alt: string;
  width: number;
  height: number;
  sources: PictureSource[];
  fallback: { src: string; srcSet?: string };
  sizes?: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
};

export function ResponsiveImage({
  alt,
  width,
  height,
  sources,
  fallback,
  sizes,
  className,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
}: ResponsiveImageProps) {
  return (
    <picture>
      {sources.map((source) => (
        <source
          key={source.type}
          type={source.type}
          srcSet={source.srcSet}
          sizes={sizes}
        />
      ))}
      <img
        src={fallback.src}
        srcSet={fallback.srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        className={cn(className)}
      />
    </picture>
  );
}
