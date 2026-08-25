import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { BackButton } from '#/components/molecules/Buttons/BackButton'
import { icons } from '#/utils/icons'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { DeleteUserDialog } from './DeleteUserDialog'
import { useDeleteUser } from '#/hooks/users/useUsers'
import { toast } from 'sonner'
import { useIsMobile } from '#/hooks/useIsMobile'

interface IUserViewEditHeaderProps {
  isLoading: boolean
  hasData: boolean
  userId: string
  userFullname: string
}

export function UserViewEditHeader({
  isLoading = false,
  hasData,
  userId,
  userFullname,
}: IUserViewEditHeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isEditPage = location.pathname.includes('/edit')
  const isMobile = useIsMobile()

  const { deleteUser, isPending, isError, error } = useDeleteUser()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const goToEditPage = () => {
    navigate({ to: '/dashboard/users/$userId/edit', params: { userId } })
  }

  const handleDeleteUser = () => {
    if (hasData && userId) {
      deleteUser(Number(userId))
    }
    setIsDeleteDialogOpen(false)
  }

  const handleDeleteDropdown = () => {
    setIsDeleteDialogOpen(true)
  }

  if (isError) {
    console.error(error)
    toast.error('Error deleting user')
  }

  return (
    <>
      <div className="flex pb-4 justify-baseline sm:justify-between">
        <div className="self-start pl-1 md:pl-2">
          <BackButton />
        </div>
        <div className="flex flex-row text-sm sm:text-md pl-4">
          {!isEditPage && (
            <BaseButton
              label={isMobile ? 'Edt.' : 'Edit'}
              variant="primary"
              className="mx-2 mb-2 sm:mb-0"
              iconLeft={icons.SquarePen}
              disabled={isLoading || !hasData || isPending}
              onClick={goToEditPage}
            />
          )}
          <BaseButton
            label={isMobile ? 'Del.' : 'Delete'}
            className="mx-2 mb-2 sm:mb-0 bg-red-400 hover:bg-red-500"
            iconLeft={icons.Trash2}
            disabled={isLoading || !hasData || isPending}
            onClick={handleDeleteDropdown}
          />
        </div>
      </div>
      {isDeleteDialogOpen && (
        <DeleteUserDialog
          showDeleteDialog={isDeleteDialogOpen}
          setShowDeleteDialog={setIsDeleteDialogOpen}
          confirmDelete={handleDeleteUser}
          username={userFullname}
        />
      )}
    </>
  )
}
