import { Dexie } from 'dexie'
import type { EntityTable } from 'dexie'
import type { IUser } from '#/types/users'
import type { ICompanyDepartment } from '#/types/company'

const db = new Dexie('CogDB') as Dexie & {
  users: EntityTable<IUser, 'id'>
  company_departments: EntityTable<ICompanyDepartment, 'id'>
}

db.version(1).stores({
  users:
    '++id, firstName, lastName, company.title, company.department, company.jobTitle, address.city, address.state, status',
  company_departments: '++id, departmentKey, title',
})

// Migration to add numberOfEmployees field to company_departments
db.version(2)
  .stores({
    users:
      '++id, firstName, lastName, company.title, company.department, company.jobTitle, address.city, address.state, status',
    company_departments: '++id, departmentKey, title',
  })
  .upgrade(async (trans) => {
    const users = await trans.table('users').toArray()
    const departments = await trans.table('company_departments').toArray()

    const employeeCountMap: Record<string, number> = {}

    users.forEach((user: IUser) => {
      const deptName = user.company.department
      if (deptName) {
        employeeCountMap[deptName] = (employeeCountMap[deptName] || 0) + 1
      }
    })

    for (const dept of departments) {
      const count = employeeCountMap[dept.title] || 0

      await trans.table('company_departments').update(dept.id, {
        numberOfEmployees: count,
      })
    }
  })

export { db }
