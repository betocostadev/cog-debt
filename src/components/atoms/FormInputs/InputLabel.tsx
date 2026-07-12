import type { ComponentPropsWithoutRef } from 'react'

type InputLabelProps = ComponentPropsWithoutRef<'label'> & {
  name: string
  label?: string
  labelClassName?: string
}

export function InputLabel({
  name,
  label,
  labelClassName,
  ...props
}: InputLabelProps) {
  return (
    <label
      htmlFor={name}
      className={`font-thin my-2 ${labelClassName ?? ''}`}
      {...props}
    >
      {label}
    </label>
  )
}
