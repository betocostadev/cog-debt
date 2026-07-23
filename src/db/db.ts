import { Dexie } from 'dexie'
import type { EntityTable } from 'dexie'
import type { IUser } from '#/types/users'

const db = new Dexie('CogDB') as Dexie & {
  users: EntityTable<IUser, 'id'>
}

db.version(1).stores({
  users:
    '++id, firstName, lastName, email, phone, company, address, admissionDate, salary, status, image',
})

export { db }
