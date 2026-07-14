import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { BaseInputProps } from '#/types/form'
import { FormField } from '#/components/atoms/FormInputs/FormField'

export function InputPassword({
  name,
  error,
  label,
  labelClassName,
  inputClassName,
  placeholder = 'Password',
  ...props
}: BaseInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const id = props.id ?? String(name)

  return (
    <FormField
      id={id}
      label={label}
      error={error}
      labelClassName={labelClassName}
      aria-invalid={!!error}
      aria-describedby={`${id}-error`}
    >
      <div className="relative">
        <input
          name={name}
          id={id}
          className={`w-full rounded-sm border-2 border-sky-100 p-2 pr-10 ${inputClassName ?? ''}`}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete="current-password"
          disabled={props.disabled}
          {...props}
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
    </FormField>
  )
}
