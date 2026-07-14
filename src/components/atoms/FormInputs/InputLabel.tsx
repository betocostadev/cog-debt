import type { ComponentPropsWithoutRef } from 'react'

type InputLabelProps = ComponentPropsWithoutRef<'label'> & {
  htmlFor: string
  label?: string
  labelClassName?: string
}

export function InputLabel({
  htmlFor,
  label,
  labelClassName,
  ...props
}: InputLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-thin my-2 ${labelClassName ?? ''}`}
      {...props}
    >
      {label}
    </label>
  )
}
