import { ApiClient } from '#/api'
import type { UsersQueryParams } from '#/types/queries'
import type { UsersResponse } from '#/types/users'

const USER_LIST_FIELDS = [
  'id',
  'firstName',
  'lastName',
  'maidenName',
  'age',
  'gender',
  'email',
  'phone',
  'username',
  'birthDate',
  'image',
  'weight',
  'eyeColor',
  'address',
  'university',
  'bank',
  'company',
  'role',
] as const

const USER_LIST_SELECT = USER_LIST_FIELDS.join(',')

export class UsersService extends ApiClient {
  async getAllUsers(params: UsersQueryParams): Promise<UsersResponse> {
    const { limit = 10, skip = 0, order, sortBy } = params

    const searchParams = new URLSearchParams()

    searchParams.set('limit', String(limit))
    searchParams.set('skip', String(skip))
    searchParams.set('select', USER_LIST_SELECT)

    if (sortBy) searchParams.set('sortBy', sortBy)

    if (order) searchParams.set('order', order)

    const endpoint = `/users?${searchParams.toString()}`

    const data = await this.get(endpoint)
    return data as Promise<UsersResponse>
  }
}

export const usersService = new UsersService()

// https://dummyjson.com/docs/users#users-limit_skip

/* Search by
- Nome
- Departamento
- Cidade
*/

/* Order by
- Nome
users?sortBy=firstName&order=asc'
- Departamento 
users?sortBy=company.department&order=asc' - Does not work, probably only for search
Do it client side, or after adding Dexie.js
- Cidade
*/

/* Filter
- Todos
- Ativos
filter?key=hair.color&value=Brown'
- Inativos
*/

// filter?key=company.department&value=Engineering' (company.department)
