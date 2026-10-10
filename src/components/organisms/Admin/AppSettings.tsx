import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import {
  useChangeTheme,
  useSetStarCollaborator,
} from '#/hooks/settings/useSettings'
import type { IAppSettings } from '#/types/settings'
import { icons } from '#/utils/icons'
import { toast } from 'sonner'
import { StarUserCard } from '../StarUser/StarUserCard'

export function AppSettings({ settings }: { settings: IAppSettings }) {
  const { changeTheme, isPending, isError, error } = useChangeTheme()
  const {
    setStarCollaborator,
    isPending: isPendingCollab,
    isError: isErrorCollab,
    error: errorCollab,
  } = useSetStarCollaborator()

  const setTheme = async () => {
    changeTheme('System')

    if (isError) {
      console.error(error)
      toast.error(error?.message)
    }
  }

  const resetStarCollaborator = () => {
    setStarCollaborator(null)

    if (isErrorCollab) {
      console.error(errorCollab?.message)
      toast.error(errorCollab?.message)
    }
  }

  return (
    <section
      data-testid="admin-settings-section"
      className="sm:w-full lg:w-4/5 items-center mx-auto pt-2 px-2"
    >
      <h3
        data-testid="admin-settings-error-heading"
        className="text-xl sm:mt-6 mt-4 font-bold"
      >
        Application settings
      </h3>

      <div className="pt-3 flex flex-col" data-testid="theme-section">
        <div>
          <h4 className="text-lg mt-2">App Theme: {settings.theme}</h4>
        </div>
        <div className="mt-2" data-testid="theme-buttons">
          <BaseButton
            className="rounded-r-none"
            label={settings.theme.toUpperCase()}
            onClick={setTheme}
            disabled={isPending}
          />
          <BaseButton
            className="rounded-r-none rounded-l-none border-l-2"
            label="LIGHT"
            onClick={setTheme}
            disabled={true}
          />
          <BaseButton
            className="rounded-l-none border-l-2"
            label="DARK"
            onClick={setTheme}
            disabled={true}
          />
        </div>
        <div>
          <h4 className="text-lg mt-3">Star Collaborator</h4>
        </div>
        <div
          data-testid="star-user-section"
          className="flex flex-col items-start"
        >
          <div>
            <StarUserCard showTitle={false} />
          </div>
          <BaseButton
            label="Reset collaborator"
            className="mt-4 bg-red-400 hover:bg-red-500"
            iconLeft={icons.Trash2}
            onClick={resetStarCollaborator}
            disabled={isPendingCollab}
          />
        </div>
      </div>
    </section>
  )
}
