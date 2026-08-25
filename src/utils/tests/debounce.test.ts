import { describe, expect, test } from 'vitest'
import { debounce } from '../debounce'

describe('Debouncer function', () => {
  test('should return a function', () => {
    const debounced = debounce(() => {}, 100)
    expect(typeof debounced).toBe('function')
  })

  test('should delay execution', async () => {
    let callCount = 0
    const debounced = debounce(() => {
      callCount++
    }, 50)

    debounced()
    expect(callCount).toBe(0)

    await new Promise((r) => setTimeout(r, 100))
    expect(callCount).toBe(1)
  })

  test('should reset timer on subsequent calls', async () => {
    let callCount = 0
    const debounced = debounce(() => {
      callCount++
    }, 50)

    debounced()
    await new Promise((r) => setTimeout(r, 30))
    debounced()
    await new Promise((r) => setTimeout(r, 30))

    expect(callCount).toBe(0) // Still waiting

    await new Promise((r) => setTimeout(r, 50))
    expect(callCount).toBe(1)
  })

  test('should use last call arguments', async () => {
    let result = ''
    const debounced = debounce((msg: string) => {
      result = msg
    }, 50)

    debounced('a')
    debounced('aba')
    debounced('abaca')

    await new Promise((r) => setTimeout(r, 100))
    expect(result).toBe('abaca')
  })
})
