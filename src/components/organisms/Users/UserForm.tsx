import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { InputText } from '#/components/molecules/Form/InputText'
import { icons } from '#/utils/icons'
import { useEffect, useId, useState } from 'react'
import { StatusSelector } from './StatusSelector'
import type { IUser, TUserDataInput } from '#/types/users'
import { Statuses, userSchema } from '#/types/users'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageLinkDialog } from './ImageLinkDialog'
import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { useNavigate } from '@tanstack/react-router'
import { useGetCompanyDepartments } from '#/hooks/company/useCompany'
import { DepartmentSelector } from '../Company/DepartmentSelector'
import type { ICompanyDepartment } from '#/types/company'
import { JobTitleSelector } from '../Company/JobTitleSelector'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { toast } from 'sonner'

interface IUserFormProps {
  isEditing: boolean
  isLoading: boolean
  userId?: string
  userData?: IUser
  onSubmit?: (data: TUserDataInput) => void
}

export function UserForm({
  isEditing,
  isLoading,
  userId,
  userData,
  onSubmit,
}: IUserFormProps) {
  const usernameId = useId()
  const emailId = useId()
  const firstNameId = useId()
  const lastNameId = useId()
  const phoneId = useId()
  const cityId = useId()
  const stateId = useId()
  const admDateId = useId()
  const salaryId = useId()

  const navigate = useNavigate()

  const {
    data: deptsData,
    isLoading: isFetchingDepartments,
    error,
  } = useGetCompanyDepartments()

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  // } = useForm<TUserDataInput>({ // Zod conflicts with React Hook form due to coerce
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      image: '',
      status: Statuses.ACTIVE,
      department: '',
      jobTitle: '',
      admissionDate: new Date().toISOString().split('T')[0],
    },
  })

  const currentDepartmentTitle = watch('department')

  const selectedDepartment: ICompanyDepartment | undefined =
    deptsData?.departments.find((dept) => dept.title === currentDepartmentTitle)

  const deptFunctions = selectedDepartment?.functions ?? []

  useEffect(() => {
    if (
      deptsData?.departments &&
      deptsData.departments.length > 0 &&
      !hasInitialized
    ) {
      if (userData) {
        reset({
          id: userData.id,
          status: userData.status,
          image: userData.image,
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          city: userData.address.city,
          state: userData.address.state,
          department: userData.company.department,
          jobTitle: userData.company.jobTitle,
          admissionDate: new Date(userData.admissionDate)
            .toISOString()
            .split('T')[0],
          salary: userData.salary,
        })
        setHasInitialized(true)
      } else if (!isEditing && !currentDepartmentTitle) {
        setValue('department', deptsData.departments[0].title)
        setValue('jobTitle', deptsData.departments[0].functions[0])
        setHasInitialized(true)
      }
    }
  }, [
    userData,
    deptsData,
    isEditing,
    reset,
    setValue,
    currentDepartmentTitle,
    hasInitialized,
  ])

  const onFormSubmit = (data: TUserDataInput) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  const handleCancel = () => {
    if (isEditing && userId) {
      navigate({ to: '/dashboard/users/$userId', params: { userId } })
    } else {
      navigate({ to: '/dashboard/users' })
    }
  }

  if (error) {
    toast.error(error.message)
    handleCancel()
  }

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex justify-between pb-4">
          <div>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <>
                  <div
                    onClick={() => setIsImageDialogOpen(true)}
                    className="flex content-center items-center justify-center h-28 w-28 rounded-full overflow-hidden bg-slate-200 cursor-pointer border border-dashed border-slate-400 hover:opacity-90 transition"
                  >
                    {field.value ? (
                      <img
                        aria-disabled={isLoading}
                        src={field.value}
                        alt="Avatar Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-slate-600 text-xs text-center p-2">
                        {isLoading ? 'Loading...' : 'Link image'}
                      </span>
                    )}
                  </div>

                  <ImageLinkDialog
                    showDialog={isImageDialogOpen}
                    setShowDialog={setIsImageDialogOpen}
                    currentImage={field.value}
                    onImageSelected={(url) => field.onChange(url)}
                  />
                </>
              )}
            />
            {errors.image && (
              <span className="text-red-500 block mt-2">
                {errors.image.message}
              </span>
            )}
          </div>
          <div>
            {isEditing && userId && <p>ID: {userId}</p>}
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <StatusSelector
                  isLoading={isLoading || isSubmitting}
                  selectedStatus={field.value}
                  onStatusChange={field.onChange}
                />
              )}
            />
            {errors.status && (
              <span className="text-red-500 text-sm">
                {errors.status.message}
              </span>
            )}
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
            error={errors.firstName?.message}
            disabled={isLoading || isSubmitting}
            {...register('firstName')}
          />
          <InputText
            className="w-2/4 sm:w-full lg:w-2/4"
            id={lastNameId}
            label="Last Name"
            error={errors.lastName?.message}
            disabled={isLoading || isSubmitting}
            {...register('lastName')}
          />
        </div>
        <div className="flex w-full sm:flex-col sm:gap-4 lg:flex-row lg:gap-6 mt-4">
          <InputText
            className="w-2/4 sm:w-full lg:w-2/4"
            id={usernameId}
            label="Username"
            error={errors.username?.message}
            disabled={isLoading || isSubmitting}
            {...register('username')}
          />
          <InputText
            className="w-2/4 sm:w-full lg:w-2/4"
            id={emailId}
            label="Email"
            error={errors.email?.message}
            disabled={isLoading || isSubmitting}
            {...register('email')}
          />
        </div>
        <div className="flex w-full sm:flex-col sm:gap-4 lg:flex-row lg:gap-6 mt-4 mb-4">
          <InputText
            className="w-2/5 sm:w-full lg:w-2/5"
            id={phoneId}
            label="Phone"
            error={errors.phone?.message}
            disabled={isLoading || isSubmitting}
            {...register('phone')}
          />
          <InputText
            className="w-2/5 sm:w-full lg:w-2/5"
            id={cityId}
            label="City"
            error={errors.city?.message}
            disabled={isLoading || isSubmitting}
            {...register('city')}
          />
          <InputText
            className="w-1/5 sm:w-full lg:w-1/5"
            id={stateId}
            label="State"
            error={errors.state?.message}
            disabled={isLoading || isSubmitting}
            {...register('state')}
          />
        </div>
        <h3 className="flex y-4 text-lg items-center">
          <LazyIcon icon={icons.Building2} iconClassName="mr-4" /> Company
          information
        </h3>

        <div className="flex w-full sm:flex-col sm:gap-4 lg:flex-row lg:gap-6 mt-4">
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <DepartmentSelector
                isLoading={isFetchingDepartments || isLoading || isSubmitting}
                departments={deptsData?.departments}
                selectedDepartmentTitle={field.value}
                onDepartmentChange={field.onChange}
              />
            )}
          />
          {errors.department && (
            <span className="text-red-500 text-sm">
              {errors.department.message}
            </span>
          )}
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => (
              <JobTitleSelector
                isLoading={isFetchingDepartments || isLoading || isSubmitting}
                deptJobTitles={deptFunctions}
                jobTitle={field.value}
                onJobTitleChange={field.onChange}
              />
            )}
          />
          {errors.jobTitle && (
            <span className="text-red-500 text-sm">
              {errors.jobTitle.message}
            </span>
          )}
        </div>
        <div className="flex w-full sm:flex-col sm:gap-4 lg:flex-row lg:gap-6 mt-4">
          <InputText
            className="sm:w-full lg:w-2/4"
            id={admDateId}
            label="Admission date"
            type="date"
            error={errors.admissionDate?.message}
            disabled={isLoading || isSubmitting}
            {...register('admissionDate')}
          />
          <InputText
            className="sm:w-full lg:w-2/4"
            id={salaryId}
            label="Annual salary (€)"
            type="number"
            error={errors.salary?.message}
            disabled={isLoading || isSubmitting}
            {...register('salary')}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <BaseButton
            type="button"
            variant="secondary"
            disabled={isLoading || isSubmitting}
            className="px-4 py-2 mr-2"
            label={'Cancel'}
            onClick={handleCancel}
          />
          <BaseButton
            type="submit"
            disabled={isLoading || isSubmitting}
            className="px-4 py-2"
            label={isEditing ? 'Save Changes' : 'Create User'}
          />
        </div>
      </form>
    </ErrorBoundary>
  )
}
