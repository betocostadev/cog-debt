import type { TCredentialsOutput } from '#/types/account'
import { credentialsSchema } from '#/types/account'
import { useLogin } from '#/hooks/account/useAccount'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputText } from '../molecules/Form/InputText'
import { InputPassword } from '../molecules/Form/InputPassword'
import { BaseButton } from '../atoms/Buttons/BaseButton'
import { useId, useRef } from 'react'
import { throttle } from '#/utils/throttle'
import { TokenExpiredError } from '#/types/errors'
import { toast } from 'sonner'

export function LoginForm() {
  const { login, isPending, isError, error } = useLogin()
  const usernameId = useId()
  const passId = useId()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCredentialsOutput>({
    resolver: zodResolver(credentialsSchema),
  })

  // username: 'emilys',
  // password: 'emilyspass',
  // Added for better controlling the firing function for throttling
  const throttledSubmitRef = useRef(
    throttle(async (data: TCredentialsOutput) => {
      await login({
        username: data.username,
        password: data.password,
      })
      if (isError) {
        if (error instanceof TokenExpiredError) {
          toast.error('Session expired, please log in again.')
        } else {
          toast.error(error?.message)
          console.error(error)
        }
      }
    }, 1000),
  )

  return (
    <form onSubmit={handleSubmit((data) => throttledSubmitRef.current(data))}>
      <InputText
        id={usernameId}
        label="Username"
        placeholder="Your user name"
        error={errors.username?.message}
        disabled={isPending}
        {...register('username')}
      />

      <InputPassword
        id={passId}
        label="Password"
        error={errors.password?.message}
        disabled={isPending}
        {...register('password')}
      />
      <div className="mt-6 flex flex-wrap gap-3">
        <BaseButton
          type="submit"
          label="Login"
          variant="primary"
          loading={isPending}
          disabled={isPending}
        />
      </div>
    </form>
  )
}
