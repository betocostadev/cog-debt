import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/atoms/Dialog/Dialog'
import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import type { DropdownOption } from '#/components/molecules/DropdownMenu'
import { DropdownMenu } from '#/components/molecules/DropdownMenu'
import { useDeleteUser } from '#/hooks/users/useUsers'
import { icons } from '#/utils/icons'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export function UserTableActions({
  userId,
  name,
}: {
  userId: number
  name: string
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const navigate = useNavigate()
  const { deleteUser, isPending, isError, error } = useDeleteUser()

  const editUser = () => {
    navigate({
      to: '/dashboard/users/$userId/edit',
      params: { userId: String(userId) },
      viewTransition: { types: ['slide-left'] },
    })
    setIsDropdownOpen(false)
  }

  const goToUser = () => {
    navigate({
      to: '/dashboard/users/$userId',
      params: { userId: String(userId) },
      viewTransition: { types: ['slide-left'] },
    })
    setIsDropdownOpen(false)
  }

  const handleDeleteDialog = () => {
    setIsDropdownOpen(false)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    deleteUser(userId)
    setShowDeleteDialog(false)
    if (isError) {
      console.error(`Delete user error: ${error}`)
      toast.error(error?.message)
    }
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
      action: handleDeleteDialog,
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

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-sm bg-slate-500">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              Delete user
            </DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to delete <strong>{name}</strong>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-slate-400 mt-2 pt-4 pb-2">
            <DialogClose
              render={
                <BaseButton
                  label="Cancel"
                  className="bg-secondary/70 hover:bg-secondary/90 text-secondary"
                  disabled={isPending}
                />
              }
            />
            <BaseButton
              label="Delete"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={confirmDelete}
              disabled={isPending}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
