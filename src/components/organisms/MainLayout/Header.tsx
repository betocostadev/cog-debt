import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="border-b border-white/10 bg-background/90 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          Cog Debt
        </Link>
      </div>
    </header>
  )
}
