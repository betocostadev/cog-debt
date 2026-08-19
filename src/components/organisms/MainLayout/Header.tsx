import { Logo } from '#/components/atoms/Icons/Logo'
import { UserAvatar } from '#/components/molecules/UserAvatar/UserAvatar'
import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="border-b border-white/10 bg-background/90 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex items-center justify-between px-2 lg:px-10">
        <Link
          to="/dashboard"
          className="flex items-center text-xl font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <Logo />
          <span className="ml-1">Cog Debt</span>
        </Link>

        <UserAvatar />
      </div>
    </header>
  )
}
