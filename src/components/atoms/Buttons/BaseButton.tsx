import type { IconName } from '#/utils/icons'
import type { ComponentPropsWithoutRef } from 'react'
import LazyIcon from '../Icons/LazyIcon'

type BaseButtonProps = ComponentPropsWithoutRef<'button'> & {
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
  iconLeft?: IconName
  iconRight?: IconName
  iconSize?: number
  loading?: boolean
}

export function BaseButton({
  label,
  variant = 'primary',
  className = '',
  iconSize,
  iconLeft,
  iconRight,
  loading = false,
  ...props
}: BaseButtonProps) {
  const baseStyle = 'rounded-lg px-4 py-2 font-light transition-colors'
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
        <div className="flex content-center items-center">
          {iconLeft && (
            <LazyIcon icon={iconLeft} size={iconSize} iconClassName="mr-2" />
          )}
          {label}
          {iconRight && (
            <LazyIcon icon={iconRight} size={iconSize} iconClassName="ml-2" />
          )}
        </div>
      )}
    </button>
  )
}
