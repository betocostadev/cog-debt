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
    '++id, firstName, lastName, company.title, company.department, address.city, address.state, status',
  company_departments: '++id, departmentKey, title',
})

export { db }
