import { MAX_ORIGINAL_DIMENSION_PX } from "./constants";
import { ImageDimensionsTooLargeError, ImageLoadFailedError } from "./errors";

export async function validateImageBeforeOptimize(
  file: File,
  signal?: AbortSignal,
): Promise<void> {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  const url = URL.createObjectURL(file);

  try {
    await new Promise<void>((resolve, reject) => {
      const img = new Image();

      const onAbort = () => {
        img.src = "";
        reject(new DOMException("Aborted", "AbortError"));
      };

      signal?.addEventListener("abort", onAbort, { once: true });

      img.onload = () => {
        signal?.removeEventListener("abort", onAbort);
        if (
          img.naturalWidth > MAX_ORIGINAL_DIMENSION_PX ||
          img.naturalHeight > MAX_ORIGINAL_DIMENSION_PX
        ) {
          reject(new ImageDimensionsTooLargeError());
        } else {
          resolve();
        }
      };

      img.onerror = () => {
        signal?.removeEventListener("abort", onAbort);
        reject(new ImageLoadFailedError());
      };

      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}
