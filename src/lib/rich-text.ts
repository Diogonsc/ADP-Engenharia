export function isRichTextEmpty(content: string) {
  const text = content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  return !text;
}

export function isHtmlContent(content: string) {
  return /<[a-z][\s\S]*>/i.test(content.trim());
}

export function toEditorContent(content: string) {
  if (!content.trim()) return "";
  if (isHtmlContent(content)) return content;

  return content
    .split(/\n\n+/)
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export function stripHtml(content: string) {
  return content.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
