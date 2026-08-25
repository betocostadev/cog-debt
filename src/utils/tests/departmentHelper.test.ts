import { describe, expect, expectTypeOf, test } from 'vitest'
import { getDeptIcon } from '../departmentHelper'

describe('Department Icon Helper', () => {
  test('should return an object with string for color and icon', () => {
    const hr = getDeptIcon('research_and_development')

    expectTypeOf(hr.icon).toBeString()
    expectTypeOf(hr.color).toBeString()
  })

  test('argument engineering should return correct icon and color', () => {
    const eng = getDeptIcon('engineering')

    expect(typeof eng.icon).toBe('string')
    expect(eng.icon).toBe('brain-cog')
    expect(typeof eng.color).toBe('string')
    expect(eng.color).toBe('darkgray')
  })

  test('unknown department should return info icon and color', () => {
    const unknownDept = getDeptIcon('unknown')

    expect(typeof unknownDept.icon).toBe('string')
    expect(unknownDept.icon).toBe('info')
    expect(typeof unknownDept.color).toBe('string')
  })
})
