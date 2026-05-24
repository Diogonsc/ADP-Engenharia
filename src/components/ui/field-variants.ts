import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Estilos compartilhados do formulário de contato (tema escuro). */
export const contactFieldVariants = cva(
  "w-full rounded border bg-white/5 text-sm text-white/85 outline-none transition-[border-color,background] placeholder:text-white/25 focus:border-brand-vivid focus:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      field: {
        input: "border-white/10 px-3.5 py-2.5",
        textarea: "min-h-[100px] resize-y border-white/10 px-3.5 py-2.5",
      },
    },
    defaultVariants: {
      field: "input",
    },
  }
)

export const contactLabelClassName =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-white/50"

export const adminFieldClassName =
  "w-full rounded border border-border bg-white px-3.5 py-2.5 text-sm text-text-primary outline-none transition-[border-color,background] placeholder:text-text-muted focus:border-brand-vivid focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"

export const adminLabelClassName =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-text-muted"

export const adminTextareaClassName =
  "min-h-[120px] w-full resize-y rounded border border-border bg-white px-3.5 py-2.5 text-sm text-text-primary outline-none transition-[border-color,background] placeholder:text-text-muted focus:border-brand-vivid focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"

export const selectTriggerVariants = cva(
  "flex items-center justify-between gap-2 text-sm outline-none transition-[border-color,background] disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
  {
    variants: {
      variant: {
        default:
          "w-fit cursor-default rounded-none border border-transparent border-b-input bg-transparent px-0 py-2 whitespace-nowrap focus-visible:border-b-ring data-placeholder:text-muted-foreground data-[size=default]:h-10 data-[size=sm]:h-9",
        contact: cn(
          contactFieldVariants({ field: "input" }),
          "h-auto min-h-[42px] w-full cursor-pointer shadow-none focus-visible:border-brand-vivid focus-visible:ring-0 data-placeholder:text-white/25 [&_svg]:text-white/50",
        ),
      },
      size: {
        default: "",
        sm: "text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const selectContentVariants = cva(
  "relative z-50 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto shadow-md duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default:
          "min-w-36 rounded-none bg-popover text-popover-foreground ring-1 ring-foreground/10",
        contact:
          "min-w-[var(--radix-select-trigger-width)] rounded border border-border-dark bg-bg-dark-surface p-1 text-white/85 shadow-lg ring-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export const selectItemVariants = cva(
  "relative flex w-full cursor-default items-center rounded-sm py-2.5 pr-9 pl-3 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        contact:
          "text-white/85 data-highlighted:bg-white/10 data-highlighted:text-white data-[state=checked]:text-brand-vivid [&_svg]:text-brand-vivid",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
