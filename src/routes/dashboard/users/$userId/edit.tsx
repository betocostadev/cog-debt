import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { Card } from '#/components/atoms/Card/Card'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { UserForm } from '#/components/organisms/Users/UserForm'
import { UserViewEditHeader } from '#/components/organisms/Users/UserViewEditHeader'
import {
  useGetSettings,
  useSetStarCollaborator,
} from '#/hooks/settings/useSettings'
import { useGetUser, useUpdateUser } from '#/hooks/users/useUsers'
import type { TUserDataInput } from '#/types/users'
import { Statuses } from '#/types/users'
import { icons } from '#/utils/icons'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/users/$userId/edit')({
  component: EditUserPage,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Edit Colaborator' },
    ],
  }),
})

function EditUserPage() {
  const { userId } = Route.useParams()
  const { data, isLoading, error } = useGetUser({
    options: {},
    id: Number(userId),
  })
  const {
    settings,
    isLoading: isLoadingSettings,
    error: settingsError,
  } = useGetSettings({ autoload: true })

  const { update, isPending, isError, error: mutationError } = useUpdateUser()
  const {
    setStarCollaborator,
    isPending: isPendingCollab,
    isError: isErrorCollab,
    error: errorCollab,
  } = useSetStarCollaborator()

  const [isCollabBtnDisabled, setIsCollabBtnDisabled] = useState(false)

  if (settingsError) {
    console.error(settingsError)
    toast.error(settingsError.message)
  }

  const handleSetStarCollaborator = async () => {
    if (!isCollabBtnDisabled && data && data.id) {
      if (
        data.status === Statuses.ONLEAVE ||
        data.status === Statuses.VACATION
      ) {
        switch (data.status) {
          case Statuses.ONLEAVE:
            toast.warning(`${data.firstName} is on leave`)
            break
          case Statuses.VACATION:
            toast.warning(`${data.firstName} is on vacation`)
            break
          default:
            toast.warning(`${data.firstName} is already the star of the month`)
            break
        }
        return
      }

      setStarCollaborator(data.id)
      setIsCollabBtnDisabled(true)
      return
    }

    if (data?.id && isCollabBtnDisabled) {
      switch (data.status) {
        case Statuses.INACTIVE:
          toast.warning(`${data.firstName} is inactive`)
          break
        case Statuses.ONLEAVE:
          toast.warning(`${data.firstName} is on leave`)
          break
        case Statuses.VACATION:
          toast.warning(`${data.firstName} is on vacation`)
          break
        default:
          toast.warning(`${data.firstName} is already the star of the month`)
          break
      }
    }

    if (isErrorCollab) {
      console.error(errorCollab?.message ?? 'Error')
      toast.error(errorCollab?.message ?? 'Error')
    }
  }

  const handleUpdateUser = async (updatedData: TUserDataInput) => {
    if (updatedData.id) {
      await update({
        id: updatedData.id,
        payload: updatedData,
      })
    }
    if (isError) {
      console.error(mutationError)
      toast.error(mutationError?.message)
    }
  }

  if (error) {
    console.error(error)
    toast.error(error.message)
    return (
      <ErrorBoundary>
        <div>
          <p>Error when loading user with id: {userId}</p>
          {error.message && <pre>Error: {error.message}</pre>}
        </div>
      </ErrorBoundary>
    )
  }

  useEffect(() => {
    if (data?.id === settings?.starColaboratorId) setIsCollabBtnDisabled(true)
  }, [data, settings?.starColaboratorId])

  return (
    <ErrorBoundary>
      <div className="w-full">
        <UserViewEditHeader
          isLoading={isLoading || isPending}
          hasData={!!data}
          userId={userId}
          userFullname={
            data?.firstName ? `${data.firstName} ${data.lastName}` : 'User'
          }
        />
        <Card outerClass="mt-2">
          {isLoadingSettings ? (
            <p>Loading...</p>
          ) : data?.status !== Statuses.INACTIVE ? (
            <div className="flex items-center justify-center">
              <BaseButton
                label="Pick as Star"
                variant={isCollabBtnDisabled ? 'secondary' : 'primary'}
                iconLeft={icons.Star}
                iconColor={`${isCollabBtnDisabled ? 'black' : 'palegoldenrod'}`}
                onClick={handleSetStarCollaborator}
                disabled={isPendingCollab}
              />
            </div>
          ) : null}
          <UserForm
            isEditing={true}
            isLoading={isLoading || isPending}
            userId={userId}
            userData={data}
            onSubmit={handleUpdateUser}
          />
        </Card>
      </div>
    </ErrorBoundary>
  )
}
