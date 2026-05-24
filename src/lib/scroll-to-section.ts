export function getHeaderOffset() {
  if (typeof window === "undefined") return 56;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-height")
    .trim();

  if (!value) return 56;

  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return 56;

  if (value.endsWith("rem")) return parsed * 16;
  return parsed;
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const top =
    element.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", `/#${sectionId}`);
}
