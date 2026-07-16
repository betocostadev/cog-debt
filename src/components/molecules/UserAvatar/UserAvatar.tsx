import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { AvatarImageLoading } from '#/components/atoms/UserAvatarImage/AvatarImageLoading'
import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { useGetAuthUser } from '#/hooks/account/useAccount'
import { useLogout } from '#/hooks/account/useLogout'
import { icons } from '#/utils/icons'
import { useState } from 'react'
import type { DropdownOption } from '../DropdownMenu'
import { DropdownMenu } from '../DropdownMenu'

export function UserAvatar() {
  const { authUser, isLoading } = useGetAuthUser({
    autoload: true,
  })
  const { logout } = useLogout()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  if (isLoading) {
    return <AvatarImageLoading />
  }

  const image = authUser?.image
  const userName = authUser?.firstName

  const dropdownOptions: DropdownOption[] = [
    {
      id: 'profile',
      label: userName ?? 'User',
      action: '/dashboard/profile',
    },
    {
      id: 'about',
      label: 'About',
      action: '/dashboard/about',
    },
    {
      id: 'logout',
      label: 'Logout',
      action: logout,
    },
  ]

  return (
    <div className="relative">
      <button
        type="button"
        className="transition-opacity hover:opacity-80 cursor-pointer flex items-center gap-2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {image ? (
          <UserAvatarImage src={image} alt={userName} />
        ) : (
          <LazyIcon icon={icons.User} size={18} />
        )}
        <span>{userName}</span>
      </button>
      {isDropdownOpen ? <DropdownMenu options={dropdownOptions} /> : ''}
    </div>
  )
}
