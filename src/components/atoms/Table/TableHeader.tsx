export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex content-evenly items-center w-full p-2 mt-2 mb-6 border-2 border-slate-400 rounded-xl">
      {children}
    </div>
  )
}
