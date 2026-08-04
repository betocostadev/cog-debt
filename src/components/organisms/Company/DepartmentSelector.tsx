import type { ICompanyDepartment } from '#/types/company'
import { useId } from 'react'

interface DepartmentSelectorProps {
  isLoading: boolean
  departments: ICompanyDepartment[] | undefined
  selectedDepartmentTitle: string
  onDepartmentChange: (value: string) => void
}

export function DepartmentSelector({
  isLoading,
  departments,
  selectedDepartmentTitle,
  onDepartmentChange,
}: DepartmentSelectorProps) {
  const departmentFieldId = useId()

  return (
    <div className="flex flex-col gap-2 mt-2 sm:w-full lg:w-2/4">
      <label
        htmlFor={departmentFieldId}
        className="text-secondary text-md flex"
      >
        Department
      </label>
      <select
        id={departmentFieldId}
        value={selectedDepartmentTitle || ''}
        disabled={isLoading}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className={`h-12 w-full rounded-md border border-input px-2 py-2 ${isLoading ? 'bg-slate-600 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <option
            key={'loading-departments'}
            value={''}
            disabled
            className="bg-slate-600 cursor-not-allowed"
          >
            Loading...
          </option>
        ) : departments ? (
          departments.map((department) => (
            <option key={department.departmentKey} value={department.title}>
              {department.title}
            </option>
          ))
        ) : null}
      </select>
    </div>
  )
}
