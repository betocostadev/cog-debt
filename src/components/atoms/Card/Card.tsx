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
        className={`mx-auto p-2 mr-4 md:mr-2 md:p-4 ${innerClass ? innerClass : 'flex max-w-6xl flex-col gap-4 rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/30'} `}
      >
        {children}
      </div>
    </div>
  )
}
