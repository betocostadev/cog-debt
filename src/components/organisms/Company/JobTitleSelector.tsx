import { useId } from 'react'

interface JobTitleSelectorProps {
  isLoading: boolean
  deptJobTitles: string[] | undefined
  jobTitle: string | undefined
  onJobTitleChange: (value: string) => void
}
export function JobTitleSelector({
  isLoading,
  deptJobTitles,
  jobTitle,
  onJobTitleChange,
}: JobTitleSelectorProps) {
  const jobTitleFieldId = useId()

  return (
    <div className="flex flex-col gap-2 mt-2 sm:w-full lg: w-2/4">
      <label htmlFor={jobTitleFieldId} className="text-secondary flex">
        Job Title
      </label>
      <select
        id={jobTitleFieldId}
        value={jobTitle || ''}
        disabled={isLoading}
        onChange={(e) => onJobTitleChange(e.target.value)}
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
        ) : deptJobTitles ? (
          deptJobTitles.map((jt) => (
            <option key={`job-title-${jt}`} value={jt}>
              {jt}
            </option>
          ))
        ) : null}
      </select>
    </div>
  )
}
