import type { ComponentPropsWithoutRef } from 'react'
import type { IconName } from '#/utils/icons'
import LazyIcon from '../Icons/LazyIcon'

type IconButtonProps = ComponentPropsWithoutRef<'button'> & {
  iconName: IconName
  label: string
  iconSize?: number
  iconColor?: string
  className?: string
}
export function IconButton({
  iconName,
  label,
  iconSize = 20,
  iconColor,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      aria-label={label}
      title={label}
      className={`${className}`}
    >
      <span className="sr-only">{label}</span>
      <LazyIcon icon={iconName} size={iconSize} iconColor={iconColor} />
    </button>
  )
}
