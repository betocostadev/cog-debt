import type { ReactNode } from 'react'
import { InputLabel } from './InputLabel'

type FormFieldProps = {
  id: string
  label?: string
  error?: string
  children: ReactNode
  className?: string
  labelClassName?: string
}

export function FormField({
  id,
  label,
  error,
  children,
  className,
  labelClassName,
}: FormFieldProps) {
  return (
    <div className={`flex flex-col mb-2 ${className ?? ''}`}>
      {label && (
        <InputLabel
          htmlFor={id}
          label={label}
          labelClassName={labelClassName}
        />
      )}
      {children}

      {error && (
        <p id={`${id}-error`} className="pt-1 font-light text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
