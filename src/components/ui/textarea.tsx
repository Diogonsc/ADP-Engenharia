import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { contactFieldVariants } from "@/components/ui/field-variants"

function Textarea({
  className,
  field = "textarea",
  ...props
}: React.ComponentProps<"textarea"> &
  VariantProps<typeof contactFieldVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(contactFieldVariants({ field }), className)}
      {...props}
    />
  )
}

export { Textarea }
