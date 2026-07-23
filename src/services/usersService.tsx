import { ApiClient } from '#/api'
import type { DummyUsersResponse, UsersQueryParams } from '#/types/queries'

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

/* Foto
TABELA - Aqui já vira do Dexie
Nome = name
Cargo = position
Departamento = department
Cidade = address.city
Status = status - Active (todos do Dummy) depois select Active, Inactive
Ações = Tabela apenas (Editar, apagar - usar DropDown Actions)

CONVERSÃO PARA O DEXIE (Para ter no cadastro depois):

Nome = firstName
Sobrenome = lastName
Email = email
Telefone = phone 
Departamento = company.department
Cargo = company.title
Cidade = address.city
Estado = address.state
Data de admissão = new Date()
Salário = Random Range (2.500 - 20.000) ou fazer por cargo
Status = ACTIVE (Enum)
Foto = image

*/

const USER_LIST_SELECT = USER_LIST_FIELDS.join(',')

export class UsersService extends ApiClient {
  async getAllUsers(params: UsersQueryParams): Promise<DummyUsersResponse> {
    const { limit = 10, skip = 0, order, sortBy } = params

    return this.get<DummyUsersResponse>(
      this.buildUrl('users', {
        limit,
        skip,
        order,
        sortBy,
        USER_LIST_SELECT,
      }),
    )
  }

  async searchUser(params: { limit: number; search: string }) {
    const { limit = 10, search } = params
    console.log(limit)
    console.log(search)
  }
}

export const usersService = new UsersService()

// https://dummyjson.com/docs/users#users-limit_skip

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
