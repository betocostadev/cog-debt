export default function IconLoading({
  className,
  iconSize,
}: {
  className?: string
  iconSize: number
}) {
  const getSkeletonClassName = () => {
    switch (iconSize) {
      case 18:
        return 'w-4 h-4'
      case 20:
        return 'w-5 h-5'
      case 22:
        return 'w-6 h-6'
      case 24:
        return 'w-7 h-7'
      case 26:
        return 'w-8 h-8'
      case 28:
        return 'w-9 h-9'
      default:
        return 'w-5 h-5'
    }
  }

  return (
    <div
      className={`bg-slate-300 animate-pulse rounded-2xl mr-4 self-center ${getSkeletonClassName()} ${className}`}
    />
  )
}
