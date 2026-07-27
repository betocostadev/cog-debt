import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { TableHeader } from '#/components/atoms/Table/Table'

import { InputText } from '#/components/molecules/Form/InputText'
import { icons } from '#/utils/icons'
import { useNavigate } from '@tanstack/react-router'

export function UsersTableHeader() {
  const navigate = useNavigate()

  const handleRedirectNewUser = () => {
    navigate({ to: '/dashboard/users/new' })
  }

  return (
    <TableHeader>
      <div className="w-4/5 ml-2 mr-4">
        <InputText
          id="search-field"
          placeholder="Search for name or last name"
          // error={errors.username?.message}
          error=""
          disabled={false}
          // {...register('username')}
        />
      </div>
      <div className="h-10 w-1/4 mx-4">
        <p>Filter dropdown</p>
      </div>
      <div className="flex w-1/4 ml-4 pr-4 justify-end">
        <BaseButton
          title="Add User"
          label="Add"
          variant="primary"
          iconRight={icons.UserPlus}
          iconSize={20}
          loading={false}
          onClick={handleRedirectNewUser}
        />
      </div>
    </TableHeader>
  )
}
