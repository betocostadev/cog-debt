export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-white/10 bg-surface p-8 shadow-2xl shadow-black/30">
        {children}
      </div>
    </div>
  )
}
