import { ACCEPTED_IMAGE_EXTENSIONS } from "./constants";
import { InvalidImageTypeError } from "./errors";

export function acceptImageFile(file: File): void {
  const mimeOk = file.type.startsWith("image/");

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const extOk = (ACCEPTED_IMAGE_EXTENSIONS as readonly string[]).includes(ext);

  if (!mimeOk && !extOk) throw new InvalidImageTypeError();
}
