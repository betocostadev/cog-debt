import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { useCallback } from 'react'

export function ToTopButton() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 10, left: 0, behavior: 'smooth' })
  }, [])

  return <BaseButton variant="secondary" label="To top" onClick={scrollToTop} />
}
