import { useNavigate } from '@tanstack/react-router'

export type DropdownOption = {
  id: string
  label: string
  action: string | (() => void)
}

type DropdownMenuProps = {
  options: DropdownOption[]
}

export function DropdownMenu({ options }: DropdownMenuProps) {
  const navigate = useNavigate()

  const buttons = options.map((option, idx) => (
    <button
      key={option.id}
      type="button"
      data-option={option.id}
      className={`block w-full px-4 py-3 text-left hover:bg-slate-700 rounded-t-xl ${idx < options.length - 1 ? 'border-b-2 border-b-slate-500' : ''}`}
    >
      {option.label}
    </button>
  ))

  const getBtnOption = (id: string) => options.find((opt) => opt.id === id)

  const handleClick: React.MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (!(target instanceof HTMLButtonElement)) return

    const id = target.dataset.option
    if (!id) return

    const option = getBtnOption(id)
    if (!option) return

    if (typeof option.action === 'function') {
      option.action()
    } else {
      navigate({ to: option.action })
    }
  }

  return (
    <div
      className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-600 bg-slate-800 shadow-xl z-50"
      onClick={handleClick}
    >
      {buttons}
    </div>
  )
}
