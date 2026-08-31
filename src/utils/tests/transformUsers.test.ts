import { describe, expect, test } from 'vitest'
import { dummyLocations, transformDummyUsers } from '../transformUsers'
import { dummyUsers } from '../dummyUsers.mock'
import { Statuses } from '#/types/users'

describe('Transform Users', () => {
  const transformed = transformDummyUsers(dummyUsers)
  const emily = transformed![0]
  const ava = transformed![1]

  test('should return undefined when no users are passed', () => {
    const result = transformDummyUsers([])

    expect(result).toBeUndefined()
  })

  test('should return new user objects', () => {
    const result = transformDummyUsers(dummyUsers)

    expect(result![0]).toBeTypeOf('object')
  })

  test('should return and equal number of results as input', () => {
    const dummyLength = dummyUsers.length

    expect(transformed).toHaveLength(dummyLength)
  })

  test('should remove unused users keys like role and weight', () => {
    expect(transformed).toHaveLength(2)

    expect(emily).not.toHaveProperty('gender')
    expect(ava).not.toHaveProperty('gender')

    expect(emily).not.toHaveProperty('bank')
    expect(ava).not.toHaveProperty('bank')

    expect(emily).not.toHaveProperty('role')
    expect(ava).not.toHaveProperty('role')

    expect(emily).not.toHaveProperty('weight')
    expect(ava).not.toHaveProperty('weight')
  })

  test('should add admission date and status with correct types', () => {
    expect(emily).toHaveProperty('admissionDate')
    expect(emily.admissionDate).toBeTypeOf('object')

    expect(emily).toHaveProperty('status')
    expect(emily.status).toBeTypeOf('string')
  })

  test('should structure adress correctly', () => {
    expect(emily).toHaveProperty('address')
    expect(emily).not.toHaveProperty('address.postalCode')
    expect(emily).not.toHaveProperty('address.country')

    expect(emily).toHaveProperty('address.state')
    expect(emily.address.state).toBeTypeOf('string')
    expect(emily).toHaveProperty('address.city')
    expect(emily.address.city).toBeTypeOf('string')
  })

  test('should create address based on available options', () => {
    expect(emily).toHaveProperty('address.city')
    expect(emily).toHaveProperty('address.state')
    expect(ava).toHaveProperty('address.city')
    expect(ava).toHaveProperty('address.state')

    const possibleStates = Object.values(dummyLocations).map(
      (location) => location.state,
    )

    const possibleCities = Object.values(dummyLocations).flatMap(
      (location) => location.cities,
    )

    const emilyAddress = emily.address
    const avaAddress = ava.address

    expect(possibleStates).toContain(emilyAddress.state)
    expect(possibleCities).toContain(emilyAddress.city)
    expect(possibleStates).toContain(avaAddress.state)
    expect(possibleCities).toContain(avaAddress.city)
  })

  test('should structure company correctly', () => {
    expect(emily.company).toHaveProperty('department')
    expect(ava.company).toHaveProperty('jobTitle')
    expect(emily.company).toHaveProperty('department')
    expect(ava.company).toHaveProperty('jobTitle')

    expect(emily.company).not.toHaveProperty('title')
    expect(emily.company).not.toHaveProperty('address')
    expect(ava.company).not.toHaveProperty('title')
    expect(ava.company).not.toHaveProperty('address')
  })

  test('should add admission date as today', () => {
    const today = new Date()
    expect(emily.admissionDate.getDate()).toBe(today.getDate())
    expect(emily.admissionDate.getMonth()).toBe(today.getMonth())
    expect(emily.admissionDate.getFullYear()).toBe(today.getFullYear())
  })

  test('should add salary within expected range', () => {
    const emiSalary = emily.salary
    const avaSalary = ava.salary

    expect(emiSalary).toBeGreaterThanOrEqual(75000)
    expect(emiSalary).toBeLessThanOrEqual(115000)

    expect(avaSalary).toBeGreaterThanOrEqual(110000)
    expect(avaSalary).toBeLessThanOrEqual(160000)
  })

  test('should add user status correctly', () => {
    const statuses = Array.from(Object.values(Statuses))

    expect(statuses).toContain(emily.status)
    expect(statuses).toContain(ava.status)
  })
})
