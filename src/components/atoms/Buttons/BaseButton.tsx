import type { ComponentPropsWithoutRef } from 'react'

type BaseButtonProps = ComponentPropsWithoutRef<'button'> & {
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
  loading: boolean
}

export function BaseButton({
  label,
  variant = 'primary',
  className = '',
  loading = false,
  ...props
}: BaseButtonProps) {
  const baseStyle = 'rounded-lg px-4 py-2 font-medium transition-colors'
  const variantStyle = props.disabled
    ? 'bg-secondary text-slate-400 cursor-not-allowed hover:bg-secondary/80'
    : variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary/90'
      : 'bg-secondary text-black hover:bg-secondary/80'

  return (
    <button
      {...props}
      className={`${baseStyle} ${variantStyle} ${className} ${loading ? 'animate-pulse' : ''}`}
    >
      {loading ? (
        <div role="status">
          <span className="sr-only">Loading...</span>
          {label}
        </div>
      ) : (
        label
      )}
    </button>
  )
}
