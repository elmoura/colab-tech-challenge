import React, { type InputHTMLAttributes } from 'react'

const defaultClassName =
  'w-full rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-sm text-emerald-950 shadow-sm outline-none ring-emerald-400/0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/60 disabled:bg-emerald-50'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...rest }, ref) => (
    <input
      ref={ref}
      className={`${defaultClassName} ${className}`.trim()}
      {...rest}
    />
  ),
)

Input.displayName = 'Input'
