import { isHtmlContent } from "@/lib/rich-text";
import { cn } from "@/lib/utils";

type ArticleContentProps = {
  content: string;
  className?: string;
};

export function ArticleContent({ content, className }: ArticleContentProps) {
  if (isHtmlContent(content)) {
    return (
      <div
        className={cn("article-content", className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className={cn("article-content whitespace-pre-line", className)}>
      {content}
    </div>
  );
}
