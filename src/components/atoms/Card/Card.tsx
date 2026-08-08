export function Card({
  children,
  outerClass,
  innerClass,
  onClick,
}: {
  children: React.ReactNode
  outerClass?: string
  innerClass?: string
  onClick?: () => void
}) {
  return (
    <div
      className={`${outerClass ? outerClass : 'min-h-screen bg-background text-foreground'}`}
      onClick={onClick}
    >
      <div
        className={`mx-auto ${innerClass ? innerClass : 'flex max-w-6xl flex-col gap-4 rounded-2xl border border-white/10 bg-surface p-8 shadow-2xl shadow-black/30'} `}
      >
        {children}
      </div>
    </div>
  )
}
