export class InvalidImageTypeError extends Error {
  readonly code = "INVALID_IMAGE_TYPE" as const;
  constructor() {
    super("Formato de imagem inválido. Use JPG, PNG, WEBP ou GIF.");
  }
}

export class FileTooLargeError extends Error {
  readonly code = "FILE_TOO_LARGE" as const;
  constructor() {
    super("O arquivo excede 8 MB. Escolha uma imagem menor.");
  }
}

export class ImageDimensionsTooLargeError extends Error {
  readonly code = "IMAGE_DIMENSIONS_TOO_LARGE" as const;
  constructor() {
    super("A imagem excede 4000×4000px. Reduza as dimensões antes de enviar.");
  }
}

export class ImageLoadFailedError extends Error {
  readonly code = "IMAGE_LOAD_FAILED" as const;
  constructor() {
    super("Não foi possível ler a imagem. O arquivo pode estar corrompido.");
  }
}

export function getImageErrorMessage(error: unknown): string {
  if (error instanceof InvalidImageTypeError) return error.message;
  if (error instanceof FileTooLargeError) return error.message;
  if (error instanceof ImageDimensionsTooLargeError) return error.message;
  if (error instanceof ImageLoadFailedError) return error.message;
  if (error instanceof DOMException && error.name === "AbortError") return "";
  if (error instanceof Error) {
    if (
      error.message.includes("413") ||
      error.message.toLowerCase().includes("payload too large")
    )
      return "Arquivo muito grande para o servidor. Tente uma imagem menor.";
    if (
      error.message.toLowerCase().includes("network") ||
      error.message.toLowerCase().includes("fetch")
    )
      return "Falha de rede. Verifique sua conexão e tente novamente.";
  }
  return "Erro ao processar a imagem. Tente outro arquivo.";
}
