export const MAX_FEATURED_PROJECTS = 6;
export const MAX_FEATURED_ARTICLES = 3;

export class FeaturedLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FeaturedLimitError";
  }
}
