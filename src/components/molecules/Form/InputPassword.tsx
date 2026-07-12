import type { ComponentPropsWithoutRef } from 'react'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { InputLabel } from '../../atoms/FormInputs/InputLabel'

type InputPasswordProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    name: Path<T>
    register: UseFormRegister<T>
    error?: string
    label?: string
    labelClassName?: string
    inputClassName?: string
  }

export function InputPassword<T extends FieldValues>({
  name,
  register,
  error,
  label,
  labelClassName,
  inputClassName,
  placeholder = 'Password',
  ...props
}: InputPasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(false)
  const inputBaseStyle = 'w-full border-2 border-sky-100 p-2 pr-10 rounded-sm'
  const inputId = props.id ?? String(name)

  return (
    <div className="flex flex-col mb-2">
      {label && <InputLabel name={inputId} label={label} />}
      <div className="relative">
        <input
          id={inputId}
          className={`${inputBaseStyle} ${inputClassName}`}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete="current-password"
          disabled={props.disabled}
          {...register(name)}
        />
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="text-slate-200" size={20} />
          ) : (
            <Eye className="text-slate-200" size={20} />
          )}
        </button>
      </div>
      {error && <p className="text-red-400 font-light pt-1">{error}</p>}
    </div>
  )
}
