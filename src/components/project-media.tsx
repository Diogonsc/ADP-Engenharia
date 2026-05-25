import { getYoutubeEmbedUrl } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type ProjectMediaProps = {
  title: string;
  type?: string;
  image?: string;
  videoUrl?: string;
  className?: string;
};

export function ProjectMedia({
  title,
  type,
  image,
  videoUrl,
  className,
}: ProjectMediaProps) {
  const embedUrl = videoUrl ? getYoutubeEmbedUrl(videoUrl) : null;
  const hasImage = Boolean(image);
  const hasVideo = Boolean(embedUrl);

  if (!hasImage && !hasVideo) return null;

  return (
    <div
      className={cn(
        "grid gap-0",
        hasImage && hasVideo && "sm:grid-cols-2",
        className,
      )}
    >
      {hasImage && (
        <div className="project-card__image relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
          {type && (
            <div className="absolute inset-0 bg-linear-to-t from-[rgba(17,18,16,0.55)] via-transparent to-transparent" />
          )}
          {type && (
            <span className="absolute bottom-4 left-4 rounded-sm bg-bg-dark/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/90 backdrop-blur-sm sm:left-6">
              {type}
            </span>
          )}
        </div>
      )}

      {hasVideo && (
        <div className="relative aspect-video overflow-hidden bg-bg-dark">
          <iframe
            src={embedUrl!}
            title={`Vídeo do projeto: ${title}`}
            className="absolute inset-0 size-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
    </div>
  );
}
