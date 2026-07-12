import type { ComponentPropsWithoutRef } from 'react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { InputLabel } from '../../atoms/FormInputs/InputLabel'

type InputTextProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    name: Path<T>
    register: UseFormRegister<T>
    error?: string
    label?: string
    labelClassName?: string
    inputClassName?: string
  }

export function InputText<T extends FieldValues>({
  name,
  register,
  error,
  label,
  labelClassName,
  inputClassName,
  placeholder = '',
  ...props
}: InputTextProps<T>) {
  const inputBaseStyle = 'w-full border-2 border-sky-100 p-2 pr-10 rounded-sm'
  const inputId = props.id ?? String(name)

  return (
    <div className="flex flex-col mb-2">
      {label && <InputLabel name={inputId} label={label} />}

      <input
        id={inputId}
        className={`${inputBaseStyle} ${inputClassName}`}
        type="text"
        placeholder={placeholder}
        disabled={props.disabled}
        {...register(name)}
      />
      {error && <p className="text-red-400 font-light pt-1">{error}</p>}
    </div>
  )
}
