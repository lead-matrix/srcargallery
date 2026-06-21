import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[100px] w-full rounded-xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white placeholder:text-platinum-500 transition-all duration-200 focus-visible:outline-none focus-visible:border-orange-500 focus-visible:ring-1 focus-visible:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
