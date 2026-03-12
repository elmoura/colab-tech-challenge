import React, { type ButtonHTMLAttributes } from 'react'

const defaultClassName =
  'inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:from-emerald-600 hover:to-emerald-700 hover:shadow-emerald-600/40 disabled:cursor-not-allowed disabled:from-emerald-200 disabled:to-emerald-200 disabled:shadow-none'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', ...rest }, ref) => (
    <button
      ref={ref}
      className={`${defaultClassName} ${className}`.trim()}
      {...rest}
    />
  ),
)

Button.displayName = 'Button'
