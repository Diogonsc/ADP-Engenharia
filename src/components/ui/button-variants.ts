import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap border border-transparent font-semibold transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default:
          "rounded bg-brand-vivid text-sm tracking-[0.02em] text-white hover:-translate-y-px hover:bg-brand-light",
        outline:
          "rounded border-primary/60 bg-transparent text-sm font-medium text-primary/60 hover:border-primary hover:bg-transparent hover:text-primary",
        secondary:
          "rounded bg-secondary text-sm text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "rounded border-brand bg-transparent text-sm text-brand hover:bg-brand hover:text-white",
        destructive:
          "rounded bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-brand underline-offset-4 hover:underline",
        filter:
          "rounded-full border-border bg-transparent px-4 py-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary",
        "filter-active":
          "rounded-full border-brand bg-brand px-4 py-1.5 text-[13px] font-medium text-white",
        tab: "rounded px-5 py-2.5 text-[13px] font-medium text-text-secondary hover:text-text-primary",
        "tab-active":
          "rounded bg-white px-5 py-2.5 text-[13px] font-medium text-text-primary shadow-sm",
        cta: "rounded bg-white px-8 py-4 text-[15px] font-bold text-brand hover:-translate-y-px hover:bg-white/92",
        "icon-ghost":
          "size-auto border-0 bg-transparent p-0 text-white shadow-none hover:bg-transparent focus-visible:ring-0",
          outlined:
          "rounded border-white/60 bg-transparent text-sm font-medium text-white/60 hover:border-white hover:bg-transparent hover:text-white",
      },
      size: {
        default: "h-auto px-7 py-3.5",
        sm: "h-9 gap-1 px-4 text-xs",
        lg: "h-11 gap-1.5 px-8",
        icon: "size-10",
        "icon-sm": "size-9",
        filter: "h-auto px-4 py-1.5",
        tab: "h-auto px-5 py-2.5",
        cta: "h-auto px-8 py-4",
        none: "h-auto p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
