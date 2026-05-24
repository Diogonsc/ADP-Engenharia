import imageCompression from "browser-image-compression";
import {
  IMAGE_MAX_WIDTH,
  IMAGE_WEBP_QUALITY,
  MAX_IMAGE_INPUT_BYTES,
  MAX_OUTPUT_SIZE_MB,
} from "./constants";
import { acceptImageFile } from "./acceptImageFile";
import { FileTooLargeError } from "./errors";

export async function optimizeImage(
  file: File,
  signal?: AbortSignal,
): Promise<File> {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  acceptImageFile(file);

  if (file.size > MAX_IMAGE_INPUT_BYTES) throw new FileTooLargeError();

  const compressed = await imageCompression(file, {
    maxSizeMB: MAX_OUTPUT_SIZE_MB,
    maxWidthOrHeight: IMAGE_MAX_WIDTH,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: IMAGE_WEBP_QUALITY,
    signal,
  });

  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  const base =
    file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^\w\-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image";

  return new File([compressed], `${base}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });
}
