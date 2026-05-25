import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getYoutubeEmbedUrl } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type ProjectDialogMediaProps = {
  title: string;
  type?: string;
  image?: string;
  videoUrl?: string;
};

const carouselControlClassName =
  "top-1/2 z-20 size-9 -translate-y-1/2 border-0 bg-bg-dark/75 text-white shadow-md backdrop-blur-sm hover:bg-bg-dark/90 hover:text-white disabled:opacity-40";

const slideClassName = "relative h-full min-h-0 w-full pl-0";

export function ProjectDialogMedia({
  title,
  type,
  image,
  videoUrl,
}: ProjectDialogMediaProps) {
  const embedUrl = videoUrl ? getYoutubeEmbedUrl(videoUrl) : null;
  const hasImage = Boolean(image);
  const hasVideo = Boolean(embedUrl);
  const slideCount = (hasImage ? 1 : 0) + (hasVideo ? 1 : 0);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (slideCount === 0) return null;

  if (slideCount === 1) {
    return (
      <div className="project-dialog__media relative aspect-video overflow-hidden">
        {hasImage ? (
          <>
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[rgba(17,18,16,0.55)] via-transparent to-transparent" />
            {type && (
              <span className="absolute bottom-4 left-6 z-10 rounded-sm bg-bg-dark/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/90 backdrop-blur-sm">
                {type}
              </span>
            )}
          </>
        ) : (
          <iframe
            src={embedUrl!}
            title={`Vídeo do projeto: ${title}`}
            className="absolute inset-0 size-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>
    );
  }

  return (
    <div className="project-dialog__media relative aspect-video overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="absolute inset-0 size-full"
        aria-label={`Mídia do projeto: ${title}`}
      >
        <CarouselContent className="ml-0 h-full">
          {hasImage && (
            <CarouselItem className={slideClassName}>
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[rgba(17,18,16,0.55)] via-transparent to-transparent" />
              {type && current === 0 && (
                <span className="absolute bottom-4 left-6 z-10 rounded-sm bg-bg-dark/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/90 backdrop-blur-sm">
                  {type}
                </span>
              )}
            </CarouselItem>
          )}
          {hasVideo && (
            <CarouselItem className={slideClassName}>
              <iframe
                src={embedUrl!}
                title={`Vídeo do projeto: ${title}`}
                className="absolute inset-0 size-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </CarouselItem>
          )}
        </CarouselContent>

        <CarouselPrevious
          className={cn(carouselControlClassName, "left-3")}
        />
        <CarouselNext className={cn(carouselControlClassName, "right-3")} />

        <div
          className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2"
          role="tablist"
          aria-label="Slides do projeto"
        >
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={current === index}
              aria-label={
                index === 0
                  ? "Ver imagem do projeto"
                  : "Ver vídeo do projeto"
              }
              className={cn(
                "size-2 rounded-full transition-colors",
                current === index
                  ? "bg-white"
                  : "bg-white/45 hover:bg-white/70",
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
