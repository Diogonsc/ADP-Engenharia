import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'src'> {
  src: string;
  alt: string;
  priority?: boolean; // Para imagens críticas (LCP)
  className?: string;
  width?: number;
  height?: number;
  sizes?: string; // Para srcset responsivo
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Componente de imagem otimizada com lazy loading inteligente
 * - Usa Intersection Observer para lazy loading eficiente
 * - Suporta preload para imagens críticas
 * - Adiciona blur placeholder para melhor UX
 * - Otimiza decoding e fetchPriority automaticamente
 */
export function OptimizedImage({
  src,
  alt,
  priority = false,
  className = '',
  width,
  height,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Imagens prioritárias já começam visíveis
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || isInView) return; // Não precisa observar se já está visível ou é prioritária

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Começa a carregar 50px antes de entrar na viewport
        threshold: 0.01,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Para não ficar em loading infinito
  };

  // Atributos otimizados baseados na prioridade
  const imageAttributes = {
    src: isInView ? src : undefined, // Só carrega quando visível
    alt,
    width,
    height,
    className: `${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
    onLoad: handleLoad,
    onError: handleError,
    ...props,
  };

  // Detecta se a imagem é absoluta para fazer o wrapper ocupar todo o espaço
  const isAbsolute = className.includes('absolute');
  const containerClassName = isAbsolute 
    ? "relative overflow-hidden w-full h-full" 
    : "relative overflow-hidden";

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={width && height && !isAbsolute ? { width, height } : undefined}
    >
      {/* Placeholder blur ou skeleton */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/10 animate-pulse"
          aria-hidden="true"
        >
          {placeholder === 'blur' && blurDataURL && (
            <img
              src={blurDataURL}
              alt=""
              className="w-full h-full object-cover blur-sm scale-110"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* Imagem principal */}
      {isInView && (
        <img
          ref={imgRef}
          {...imageAttributes}
        />
      )}

      {/* Fallback para erro */}
      {hasError && (
        <div
          className="absolute inset-0 bg-muted flex items-center justify-center"
          role="img"
          aria-label={alt}
        >
          <span className="text-muted-foreground text-sm">Imagem não disponível</span>
        </div>
      )}
    </div>
  );
}