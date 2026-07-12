import type { TCredentialsOutput } from '#/types/account'
import { credentialsSchema } from '#/types/account'
import { useLogin } from '#/hooks/account/useAccount'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputText } from '../molecules/Form/InputText'
import { InputPassword } from '../molecules/Form/InputPassword'
import { BaseButton } from '../atoms/Buttons/BaseButton'

export function LoginForm() {
  const { login, isPending, isError, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCredentialsOutput>({
    resolver: zodResolver(credentialsSchema),
  })

  // username: 'emilys',
  // password: 'emilyspass',
  const onSubmit = async (data: TCredentialsOutput) => {
    await login({
      username: data.username,
      password: data.password,
    })
    if (isError) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText<TCredentialsOutput>
        name="username"
        label="Username"
        placeholder="Your user name"
        register={register}
        error={errors.password?.message}
        disabled={isPending}
      />

      <InputPassword<TCredentialsOutput>
        name="password"
        label="Password"
        register={register}
        error={errors.password?.message}
        disabled={isPending}
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
