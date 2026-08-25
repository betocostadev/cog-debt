import { describe, test, expect } from 'vitest'
import { sanitizeString } from '../strings'

describe('Sanitize String', () => {
  test('empty string should return empty', () => {
    const empty = sanitizeString('')
    expect(empty).toBe('')
  })

  test('should trim strings', () => {
    const eng = sanitizeString(' engineering ')
    expect(eng).toBe('engineering')
  })

  test('should lowercase strings', () => {
    const sales = sanitizeString('SaLes')
    expect(sales).toBe('sales')
  })

  test('should remove symbols from strings', () => {
    const str = sanitizeString('!Be10.*++=')
    expect(str).toBe('be10')
  })

  test('should not replace underscores', () => {
    const pdMgm = sanitizeString('product_management')
    expect(pdMgm).toBe('product_management')
  })

  test('should add underscore on strings with spaces', () => {
    const hr = sanitizeString('human resources')
    expect(hr).toBe('human_resources')
  })

  test('should handle more than three words strings', () => {
    const hrDept = sanitizeString('The Human Resources Department')
    expect(hrDept).toBe('the_human_resources_department')
  })
})
