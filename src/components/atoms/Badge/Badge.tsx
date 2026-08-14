type BadgeProps = {
  variant?: 'primary' | 'secondary'
  className?: string
  children: React.ReactNode | string
}
export function Badge({
  variant = 'primary',
  className,
  children,
}: BadgeProps) {
  const selectedVariant =
    variant === 'primary'
      ? 'bg-primary/15 text-primary'
      : 'bg-secondary/15 text-secondary'
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${selectedVariant} ${className}`}
    >
      {children}
    </span>
  )
}
