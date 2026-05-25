/** Converte URL do YouTube em URL de embed para iframe. */
export function getYoutubeEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");
    let videoId: string | null = null;

    if (host === "youtu.be") {
      videoId = parsed.pathname.slice(1).split("/")[0] || null;
    } else if (host.includes("youtube.com") || host.includes("youtube-nocookie.com")) {
      if (parsed.pathname.includes("/shorts/")) {
        videoId = parsed.pathname.split("/shorts/")[1]?.split("/")[0] ?? null;
      } else if (parsed.pathname.includes("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1]?.split("/")[0] ?? null;
      } else {
        videoId = parsed.searchParams.get("v");
      }
    }

    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
}

export function isValidYoutubeUrl(url: string): boolean {
  if (!url.trim()) return true;
  return getYoutubeEmbedUrl(url) !== null;
}
