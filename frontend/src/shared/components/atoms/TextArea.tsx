import React, { type TextareaHTMLAttributes } from 'react'

const defaultClassName =
  'w-full resize-none rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-sm text-emerald-950 shadow-sm outline-none ring-emerald-400/0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/60 disabled:bg-emerald-50'

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', ...rest }, ref) => (
    <textarea
      ref={ref}
      className={`${defaultClassName} ${className}`.trim()}
      {...rest}
    />
  ),
)

TextArea.displayName = 'TextArea'
