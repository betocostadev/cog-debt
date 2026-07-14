import { FormField } from '#/components/atoms/FormInputs/FormField'
import type { BaseInputProps } from '#/types/form'

export function InputText({
  name,
  error,
  label,
  labelClassName,
  inputClassName,
  placeholder = '',
  ...props
}: BaseInputProps) {
  const id = props.id ?? String(name)

  return (
    <FormField
      id={id}
      label={label}
      error={error}
      labelClassName={labelClassName}
    >
      <input
        name={name}
        id={id}
        className={`w-full rounded-sm border-2 border-sky-100 p-2 ${inputClassName ?? ''}`}
        placeholder={placeholder}
        disabled={props.disabled}
        {...props}
      />
    </FormField>
  )
}
