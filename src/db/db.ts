import { Dexie } from 'dexie'
import type { EntityTable } from 'dexie'
import type { IUser } from '#/types/users'
import type { ICompanyDepartment } from '#/types/company'
import { departments as deptObj } from '#/types/company'
import type { IAppSettings } from '#/types/settings'
import { defaultSettings } from '#/utils/defaultSettings'

const db = new Dexie('CogDB') as Dexie & {
  users: EntityTable<IUser, 'id'>
  company_departments: EntityTable<ICompanyDepartment, 'id'>
  settings: EntityTable<IAppSettings, 'key'>
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

// Migration to add description to each department
db.version(3)
  .stores({
    users:
      '++id, firstName, lastName, company.title, company.department, company.jobTitle, address.city, address.state, status',
    company_departments: '++id, departmentKey, title',
  })
  .upgrade(async (trans) => {
    const departments = await trans.table('company_departments').toArray()
    const descriptionMap: Record<string, string> = Object.entries(
      deptObj,
    ).reduce(
      (acc, [key, value]) => {
        acc[key] = value.description
        return acc
      },
      {} as Record<string, string>,
    )

    for (const dept of departments) {
      const lookupKey = dept.departmentKey

      const description = descriptionMap[lookupKey] || 'Company department'

      await trans.table('company_departments').update(dept.id, {
        description: description,
      })
    }
  })

// Migration 4: Add settings table and seed default settings
db.version(4)
  .stores({
    users:
      '++id, firstName, lastName, company.title, company.department, company.jobTitle, address.city, address.state, status',
    company_departments: '++id, departmentKey, title',
    settings: 'key',
  })
  .upgrade(async (trans) => {
    await trans.table('settings').put(defaultSettings)
  })

// When adding migrations, make sure to also update the test matcher for version number
export { db }
