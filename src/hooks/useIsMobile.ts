import { useState, useLayoutEffect } from 'react'

export const useIsMobile = (breakpoint: number = 580) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= breakpoint)
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [breakpoint])

  return isMobile
}
