import type { ComponentPropsWithoutRef } from 'react'

// export type BaseInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
export type BaseInputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string
  error?: string
  inputClassName?: string
  labelClassName?: string
}
