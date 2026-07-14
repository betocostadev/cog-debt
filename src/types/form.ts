import type { ComponentPropsWithoutRef } from 'react'

export type BaseInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  label?: string
  error?: string
  inputClassName?: string
  labelClassName?: string
}
