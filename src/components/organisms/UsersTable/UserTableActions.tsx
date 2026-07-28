import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import type { DropdownOption } from '#/components/molecules/DropdownMenu'
import { DropdownMenu } from '#/components/molecules/DropdownMenu'
import { icons } from '#/utils/icons'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export function UserTableActions({
  userId,
  name,
}: {
  userId: number
  name: string
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const editUser = () => {
    navigate({
      to: '/dashboard/users/$userId',
      params: { userId: String(userId) },
    })
    setIsDropdownOpen(false)
  }

  const goToUser = () => {
    navigate({
      to: '/dashboard/users/$userId/edit',
      params: { userId: String(userId) },
    })
    setIsDropdownOpen(false)
  }

  const deleteUser = () => {
    // TODO: Show modal for deletion
    setIsDropdownOpen(false)
    return
  }

  const getLabelAndIcon = ({
    userName,
    action,
  }: {
    userName: string
    action: string
  }) => {
    switch (action) {
      case 'view':
        return (
          <div className="flex gap-2">
            <LazyIcon icon={icons.Eye} size={18} iconColor="deepskyblue" />
            <span>View {userName}</span>
          </div>
        )
      case 'edit':
        return (
          <div className="flex gap-2">
            <LazyIcon icon={icons.UserPen} size={18} iconColor="deepskyblue" />
            <span>Edit {userName}</span>
          </div>
        )

      default:
        return (
          <div className="flex gap-2">
            <LazyIcon icon={icons.Trash2} size={18} iconColor="red" />
            <span>Delete {userName}</span>
          </div>
        )
    }
  }

  const dropdownOptions: DropdownOption[] = [
    {
      id: `view-user-${userId}`,
      label: getLabelAndIcon({ userName: name, action: 'view' }),
      action: goToUser,
    },
    {
      id: `edit-user-${userId}`,
      label: getLabelAndIcon({ userName: name, action: 'edit' }),
      action: editUser,
    },
    {
      id: `delete-user-${userId}`,
      label: getLabelAndIcon({ userName: name, action: 'delete' }),
      action: deleteUser,
    },
  ]

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropdownOpen(false)
    }
  }

  return (
    <div className="relative" onBlur={handleBlur}>
      <button
        type="button"
        className="transition-opacity hover:opacity-80 cursor-pointer flex items-center gap-2"
        data-handle="activator"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <LazyIcon icon={icons.EllipsisVertical} size={22} />
      </button>
      {isDropdownOpen ? <DropdownMenu options={dropdownOptions} /> : ''}
    </div>
  )
}
