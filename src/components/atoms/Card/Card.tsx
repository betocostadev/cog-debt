export function Card({
  children,
  outerClass,
  innerClass,
  onClick,
  testId,
}: {
  children: React.ReactNode
  outerClass?: string
  innerClass?: string
  onClick?: () => void
  testId?: string
}) {
  return (
    <div
      data-testid={testId}
      className={`${outerClass ? outerClass : 'min-h-screen bg-background text-foreground'}`}
      onClick={onClick}
    >
      <div
        className={`mx-auto ${innerClass ? innerClass : 'flex max-w-6xl flex-col gap-4 p-2 md:p-4 rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/30'} `}
      >
        {children}
      </div>
    </div>
  )
}
