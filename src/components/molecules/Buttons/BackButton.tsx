import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { icons } from '#/utils/icons'
import { useCanGoBack, useRouter } from '@tanstack/react-router'

export function BackButton() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  const goBack = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (document.startViewTransition) {
      document.startViewTransition({
        update: () => {
          router.history.back()
        },
        types: ['slide-right'],
      })
    } else {
      router.history.back()
    }
  }

  return (
    <>
      {canGoBack && (
        <BaseButton
          label="Back"
          iconLeft={icons.ChevronLeft}
          className="bg-slate-700 hover:bg-slate-800 text-sm sm:text-md"
          onClick={goBack}
        />
      )}
    </>
  )
}
