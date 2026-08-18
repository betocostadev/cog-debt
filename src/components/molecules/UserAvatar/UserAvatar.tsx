import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { AvatarImageLoading } from '#/components/atoms/UserAvatarImage/AvatarImageLoading'
import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { useGetAuthUser } from '#/hooks/account/useAccount'
import { useLogout } from '#/hooks/account/useLogout'
import { icons } from '#/utils/icons'
import { useState } from 'react'
import type { DropdownOption } from '../DropdownMenu'
import { DropdownMenu } from '../DropdownMenu'
import { useNavigate } from '@tanstack/react-router'

export function UserAvatar() {
  const { authUser, isLoading } = useGetAuthUser({
    autoload: true,
  })
  const { logout } = useLogout()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const goToProfile = () => {
    navigate({ to: '/dashboard/profile' })
    setIsDropdownOpen(false)
  }

  const goToAbout = () => {
    navigate({ to: '/dashboard/about' })
    setIsDropdownOpen(false)
  }

  if (isLoading) {
    return <AvatarImageLoading />
  }

  const image = authUser?.image
  const userName = authUser?.firstName

  const dropdownOptions: DropdownOption[] = [
    {
      id: 'profile',
      label: (
        <div className="flex gap-3 items-center">
          <LazyIcon icon={icons.CircleUser} size={18} iconColor="deepskyblue" />
          <span>{userName ?? 'User'}</span>
        </div>
      ),
      action: goToProfile,
    },
    {
      id: 'about',
      label: (
        <div className="flex gap-3 items-center">
          <LazyIcon icon={icons.Info} size={18} iconColor="deepskyblue" />
          <span>About</span>
        </div>
      ),
      action: goToAbout,
    },
    {
      id: 'logout',
      label: (
        <div className="flex gap-3 items-center">
          <LazyIcon icon={icons.LogOut} size={18} iconColor="red" />
          <span>Logout</span>
        </div>
      ),
      action: logout,
    },
  ]

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropdownOpen(false)
    }
  }

  return (
    <div className="relative" onBlur={handleBlur} data-handle="menu">
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
