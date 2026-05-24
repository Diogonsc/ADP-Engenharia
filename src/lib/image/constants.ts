/** Lado maior da imagem após redimensionamento (mantém aspect ratio) */
export const IMAGE_MAX_WIDTH = 1200;

/** Qualidade inicial WebP — 0.75 é o ponto de equilíbrio qualidade/tamanho */
export const IMAGE_WEBP_QUALITY = 0.75;

/** Tamanho máximo do arquivo ORIGINAL antes de comprimir (8 MB) */
export const MAX_IMAGE_INPUT_BYTES = 8 * 1024 * 1024;

/** Target de tamanho para compressão iterativa da lib (6 MB) */
export const MAX_OUTPUT_SIZE_MB = 6;

/** Dimensão máxima (largura ou altura) aceita antes de comprimir */
export const MAX_ORIGINAL_DIMENSION_PX = 4000;

/** Extensões aceitas como fallback quando o OS não preenche o MIME type */
export const ACCEPTED_IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "avif",
  "bmp",
  "ico",
] as const;
