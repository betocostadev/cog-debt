import type { DummyUserListItem } from '#/types/dummyUsers'
import type { IUser, Statuses } from '#/types/users'
import { sanitizeString } from './strings'

/*
Functions related to user transformation. Refer to types at
types/DummyUsers - Original data
types/users - Users added to DB
*/

function getRandomBase(length: number) {
  return Math.floor(Math.random() * length)
}

function getUserAddress() {
  const locations = {
    saoPaulo: {
      state: 'SP',
      cities: ['São Paulo', 'Campinas', 'Osasco'],
    },
    curitiba: {
      state: 'PR',
      cities: ['Curitiba', 'Londrina', 'Ponta Grossa'],
    },
    porto: {
      state: 'PR',
      cities: ['Porto', 'Maia', 'Vila Nova de Gaia'],
    },
    lisbon: {
      state: 'LB',
      cities: ['Lisboa', 'Almada', 'Cascais'],
    },
  }

  const states = Object.keys(locations) as (keyof typeof locations)[]

  const matchState = states[getRandomBase(states.length)]
  const randomCity = locations[matchState].cities[getRandomBase(3)]

  return {
    state: locations[matchState].state,
    city: randomCity,
  }
}

function getRandomSalary(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getSalary(department: string, title: string): number {
  const cleanDept = sanitizeString(department)
  const cleanTitle = sanitizeString(title)

  const isExecutive =
    cleanTitle.includes('chief') || cleanTitle.includes('executive')
  const isManager =
    cleanTitle.includes('manager') ||
    cleanTitle.includes('architect') ||
    cleanTitle.includes('lead')

  switch (cleanDept) {
    case 'engineering':
    case 'research_and_development':
      if (isExecutive) return getRandomSalary(120000, 180000)
      if (isManager) return getRandomSalary(75000, 115000)
      return getRandomSalary(50000, 85000)

    case 'marketing':
    case 'sales':
      if (isExecutive) return getRandomSalary(110000, 160000)
      if (isManager) return getRandomSalary(65000, 95000)
      return getRandomSalary(40000, 70000)

    case 'accounting':
    case 'legal':
      if (isExecutive) return getRandomSalary(130000, 190000)
      if (isManager) return getRandomSalary(80000, 120000)
      return getRandomSalary(45000, 75000)

    case 'human_resources':
    case 'support':
    case 'training':
    case 'services':
      if (isExecutive) return getRandomSalary(95000, 140000)
      if (isManager) return getRandomSalary(55000, 85000)
      return getRandomSalary(32000, 55000)

    case 'product_management':
      if (isExecutive) return getRandomSalary(125000, 175000)
      if (isManager) return getRandomSalary(85000, 125000)
      return getRandomSalary(60000, 90000)

    default:
      return getRandomSalary(40000, 60000)
  }
}

function getUserStatus() {
  const possibleStatus = ['Active', 'Inactive', 'On Leave', 'Vacation']
  const match = getRandomBase(possibleStatus.length)

  return possibleStatus[match]
}

export const transformDummyUsers = (
  users: DummyUserListItem[],
): IUser[] | undefined => {
  if (!users.length) return undefined

  const today = new Date()

  const newUsers = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      company: {
        department: user.company.department,
        jobTitle: user.company.title,
      },
      address: getUserAddress(),
      admissionDate: today,
      salary: getSalary(user.company.department, user.company.title),
      status: getUserStatus() as Statuses,
      image: user.image,
    }
  })

  return newUsers
}
