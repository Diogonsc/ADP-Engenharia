import { useEffect, useRef, useState, type ReactNode } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import {
  BoldIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  Loader2Icon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uploadArticleImage } from "@/lib/articles-api";
import { getImageErrorMessage } from "@/lib/image";
import { toEditorContent } from "@/lib/rich-text";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "aria-invalid"?: boolean;
};

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: ReactNode;
};

function normalizeUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      className={cn(
        "size-8 rounded-md text-text-secondary hover:text-text-primary",
        active &&
          "bg-brand-subtle text-brand hover:bg-brand-subtle hover:text-brand",
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Escreva o conteúdo completo do artigo...",
  className,
  "aria-invalid": ariaInvalid,
}: RichTextEditorProps) {
  const lastEmittedHtml = useRef(value);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
          HTMLAttributes: {
            class: "text-brand underline underline-offset-2",
            rel: "noopener noreferrer",
            target: "_blank",
          },
        },
        bulletList: {
          HTMLAttributes: { class: "list-disc" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal" },
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "mx-auto max-w-full rounded-md",
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: toEditorContent(value),
    editorProps: {
      attributes: {
        class:
          "tiptap-editor min-h-[240px] px-4 py-3 text-sm leading-relaxed text-text-primary outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const html = currentEditor.getHTML();
      lastEmittedHtml.current = html;
      onChange(html);
    },
  });

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;

    const next = toEditorContent(value);
    if (next === lastEmittedHtml.current) return;

    const current = editor.getHTML();
    if (current !== next) {
      editor.commands.setContent(next, { emitUpdate: false });
      lastEmittedHtml.current = next;
    }
  }, [editor, value]);

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL do link", previousUrl ?? "https://");

    if (url === null) return;

    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const href = normalizeUrl(url);

    if (editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: href,
          marks: [{ type: "link", attrs: { href } }],
        })
        .run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };

  const handleImageUpload = async (file: File) => {
    if (uploadingImage) return;

    setUploadingImage(true);
    try {
      const result = await uploadArticleImage(file);
      editor
        .chain()
        .focus()
        .setImage({ src: result.url, alt: file.name })
        .run();
    } catch (err) {
      const message = getImageErrorMessage(err);
      if (message) window.alert(message);
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded border border-border bg-white transition-[border-color,box-shadow]",
        "focus-within:border-brand-vivid",
        ariaInvalid && "border-destructive focus-within:border-destructive",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-bg-secondary/60 px-2 py-1.5">
        <ToolbarButton
          label="Negrito"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Itálico"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Sublinhado"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Tachado"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon className="size-4" />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" aria-hidden />

        <ToolbarButton
          label="Título 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <span className="text-xs font-bold">H2</span>
        </ToolbarButton>
        <ToolbarButton
          label="Título 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <span className="text-xs font-bold">H3</span>
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" aria-hidden />

        <ToolbarButton
          label="Lista com marcadores"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Lista numerada"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrderedIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Citação"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <QuoteIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Inserir link"
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <LinkIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Inserir imagem"
          disabled={uploadingImage}
          onClick={() => imageInputRef.current?.click()}
        >
          {uploadingImage ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <ImageIcon className="size-4" />
          )}
        </ToolbarButton>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleImageUpload(file);
          }}
        />

        <span className="mx-1 h-5 w-px bg-border" aria-hidden />

        <ToolbarButton
          label="Desfazer"
          disabled={!editor.can().chain().focus().undo().run()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Refazer"
          disabled={!editor.can().chain().focus().redo().run()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon className="size-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
