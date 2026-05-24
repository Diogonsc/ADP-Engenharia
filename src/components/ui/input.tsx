import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { contactFieldVariants } from "@/components/ui/field-variants"

const inputVariants = contactFieldVariants

function Input({
  className,
  type,
  field = "input",
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ field }), className)}
      {...props}
    />
  )
}

export { Input }
