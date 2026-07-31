import { Suspense } from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'
import type { IconName } from '#/utils/icons'
import IconLoading from './IconLoading'

type Props = {
  icon: IconName
  ariaLabel?: string
  size?: number
  iconClassName?: string
  iconColor?: string
}

export default function LazyIcon({
  icon,
  ariaLabel,
  size = 20,
  iconClassName,
  iconColor,
}: Props) {
  return (
    <Suspense fallback={<IconLoading iconSize={size} />}>
      <DynamicIcon
        aria-label={ariaLabel ?? 'icon'}
        name={icon}
        size={size}
        className={iconClassName}
        color={iconColor}
      />
    </Suspense>
  )
}
