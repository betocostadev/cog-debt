import { ApiClient } from '#/api'
import { db } from '#/db/db'
import type {
  DummyUsersQueryParams,
  DummyUsersResponse,
  UsersQueryParams,
} from '#/types/queries'

const USER_LIST_FIELDS = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone',
  'username',
  'birthDate',
  'image',
  'address',
  'company',
] as const

/* Foto
TABELA - Aqui já vira do Dexie
Nome = name
Cargo = position
Departamento = department
Cidade = address.city
Status = status - Active (todos do Dummy) depois select Active, Inactive
Ações = Tabela apenas (Editar, apagar - usar DropDown Actions)

*/

const USER_LIST_SELECT = USER_LIST_FIELDS.join(',')

export class UsersService extends ApiClient {
  // Uses online DummyJSON data for the first time
  // Feeds users to IndexedDB using Dexie
  // https://dummyjson.com/docs/users#users-limit_skip
  async getDummyUsers(
    params: DummyUsersQueryParams,
  ): Promise<DummyUsersResponse> {
    const { limit = 10, skip = 0, order, sortBy } = params

    return this.get<DummyUsersResponse>(
      this.buildUrl('users', {
        limit,
        skip,
        order,
        sortBy,
        select: USER_LIST_SELECT,
      }),
    )
  }

  /*
    Queries below use DB users
  */
  async getAllUsers(params: UsersQueryParams) {
    // use .reverse to control Sort asc or desc
    const { where, offset = 0, equalsIgnoreCase, orderBy, limit = 10 } = params
    // const users = await db.users
    //   .orderBy('firstName')
    //   .offset(offset)
    //   .limit(limit)
    //   .reverse()
    //   .toArray()

    const total = await db.users.count()
    const users = await db.users.offset(offset).limit(limit).toArray()

    return { total, users }
  }

  async searchUser(params: { limit: number; search: string }) {
    const { limit = 10, search } = params
    console.log(limit)
    console.log(search)
  }
}

export const usersService = new UsersService()

/* Search by - After Dexie
- Nome
- Departamento
- Cidade
*/

/* Order by
- Nome
users?sortBy=firstName&order=asc'
- Departamento 
users?sortBy=company.department&order=asc'
- Cidade
users?sortBy=address.city
*/

/* Filter
- Todos
- Ativos
filter?key=hair.color&value=Brown'
- Inativos

filter?key=status&value=active'
*/
