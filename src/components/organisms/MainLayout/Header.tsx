import { Logo } from '#/components/atoms/Icons/Logo'
import { UserAvatar } from '#/components/molecules/UserAvatar/UserAvatar'
import { Link } from '@tanstack/react-router'
import { HeaderNav } from './HeaderNav'
import { useIsMobile } from '#/hooks/useIsMobile'

export function Header() {
  const isMobile = useIsMobile()

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur ${isMobile ? 'pt-4 pb-2' : 'py-4 pb-4'}`}
    >
      <div className="mx-auto flex items-center justify-between px-2 lg:px-8">
        <Link
          to="/dashboard"
          className="flex items-center text-xl font-semibold tracking-tight transition-opacity hover:opacity-80"
          viewTransition
        >
          <Logo />
          <span className="ml-1">Cog Debt</span>
        </Link>

        <UserAvatar />
      </div>
      {isMobile && <HeaderNav />}
    </header>
  )
}
