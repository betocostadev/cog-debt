import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { InputText } from '#/components/molecules/Form/InputText'
import { icons } from '#/utils/icons'
import { useId } from 'react'

interface IUserFormProps {
  isEditing: boolean
  userId?: string
}

export function UserForm({ isEditing, userId }: IUserFormProps) {
  const usernameId = useId()
  const emailId = useId()
  const firstNameId = useId()
  const lastNameId = useId()
  const phoneId = useId()
  const cityId = useId()
  const stateId = useId()
  const departmentId = useId()
  const roleId = useId() // import user roles T-Area-Functions - company types
  const admDateId = useId()
  const salaryId = useId()

  return (
    <form>
      <div className="flex justify-between pb-4">
        <div className="flex content-center items-center justify-center h-28 w-28 rounded-full object-cover bg-slate-200 cursor-pointer">
          <span className="text-background text-sm">Upload image</span>
        </div>
        <div>
          {isEditing && userId && <p>ID: {userId}</p>}
          <p>Status selector</p>
        </div>
      </div>

      <h3 className="flex y-4 text-lg items-center">
        <LazyIcon icon={icons.User} iconClassName="mr-4" /> User information
      </h3>

      <div className="flex w-full sm:flex-col sm:gap-4 lg:flex-row lg:gap-6 mt-4">
        <InputText
          className="w-2/4 sm:w-full lg:w-2/4"
          id={firstNameId}
          label="First Name"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
        <InputText
          className="w-2/4 sm:w-full lg:w-2/4"
          id={lastNameId}
          label="Last Name"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
      </div>
      <div className="flex w-full sm:flex-col sm:gap-4 lg:flex-row lg:gap-6 mt-4">
        <InputText
          className="w-2/4 sm:w-full lg:w-2/4"
          id={usernameId}
          label="Username"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
        <InputText
          className="w-2/4 sm:w-full lg:w-2/4"
          id={emailId}
          label="Email"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
      </div>
      <div className="flex w-full sm:flex-col sm:gap-4 lg:flex-row lg:gap-6 mt-4 mb-4">
        <InputText
          className="w-2/5 sm:w-full lg:w-2/5"
          id={phoneId}
          label="Phone"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
        <InputText
          className="w-2/5 sm:w-full lg:w-2/5"
          id={cityId}
          label="City"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
        <InputText
          className="w-1/5 sm:w-full lg:w-1/5"
          id={stateId}
          label="State"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
      </div>
      <h3 className="flex y-4 text-lg items-center">
        <LazyIcon icon={icons.Building2} iconClassName="mr-4" /> Company
        information
      </h3>

      <div className="flex w-full sm:flex-col sm:gap-4 lg:flex-row lg:gap-6 mt-4">
        <InputText
          className="sm:w-full lg:w-2/4"
          id={departmentId}
          label="Department"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
        <InputText
          className="sm:w-full lg:w-2/4"
          id={roleId}
          label="Role"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
      </div>
      <div className="flex w-full sm:flex-col sm:gap-4 lg:flex-row lg:gap-6 mt-4">
        <InputText
          className="sm:w-full lg:w-2/4"
          id={admDateId}
          label="Department"
          type="date"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
        <InputText
          className="sm:w-full lg:w-2/4"
          id={salaryId}
          label="Anual salary (€)"
          type="number"
          // error={errors.username?.message}
          // disabled={isPending | isEditing && isLoading}
          // {...register('username')}
        />
      </div>
    </form>
  )
}
