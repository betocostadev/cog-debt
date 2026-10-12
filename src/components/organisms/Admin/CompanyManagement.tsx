import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { icons } from '#/utils/icons'
import { useNavigate } from '@tanstack/react-router'

export function CompanyManagement() {
  const navigate = useNavigate()

  const goToUsers = () => {
    navigate({ to: '/dashboard/users', viewTransition: true })
  }

  const goToDepartments = () => {
    navigate({ to: '/dashboard/departments', viewTransition: true })
  }

  return (
    <section
      data-testid="admin-settings-company"
      className="sm:w-full lg:w-4/5 items-center mx-auto pt-2 px-2"
    >
      <h3
        data-testid="admin-company-heading"
        className="text-xl sm:mt-6 mt-4 font-bold"
      >
        Company management
      </h3>
      <div className="mt-2 flex flex-col my-2 pb-4">
        <div data-testid="manage-users">
          <h4 className="text-lg my-2">Users</h4>
          <BaseButton
            label="Manage"
            iconLeft={icons.UsersRound}
            onClick={goToUsers}
          />
        </div>
        <div data-testid="manage-departments">
          <h4 className="text-lg my-2">Departments</h4>
          <BaseButton
            label="Manage"
            iconLeft={icons.Grid2x2Check}
            onClick={goToDepartments}
          />
        </div>
      </div>
    </section>
  )
}
