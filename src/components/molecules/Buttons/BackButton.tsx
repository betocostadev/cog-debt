import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { icons } from '#/utils/icons'
import { useCanGoBack, useRouter } from '@tanstack/react-router'

export function BackButton() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <>
      {canGoBack && (
        <BaseButton
          label="Back"
          iconLeft={icons.ChevronLeft}
          className="bg-slate-700 hover:bg-slate-800"
          onClick={() => router.history.back()}
        />
      )}
    </>
  )
}
