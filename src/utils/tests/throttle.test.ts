import { describe, expect, test } from 'vitest'
import { throttle } from '../throttle'

describe('Throttle', () => {
  test('should return a function', () => {
    const throttled = throttle(() => {}, 100)
    expect(typeof throttled).toBe('function')
  })

  test('should run immediately on first call', () => {
    let callCount = 0
    const throttled = throttle(() => {
      callCount++
    }, 50)

    throttled()
    expect(callCount).toBe(1)
  })

  test('should ignore calls within delay period', () => {
    let callCount = 0
    const throttled = throttle(() => {
      callCount++
    }, 100)

    throttled()
    throttled()
    throttled()
    expect(callCount).toBe(1)
  })

  test('should allow call after delay period', async () => {
    let callCount = 0
    const throttled = throttle(() => {
      callCount++
    }, 40)

    throttled()
    expect(callCount).toBe(1)

    await new Promise((r) => setTimeout(r, 50))

    throttled()
    expect(callCount).toBe(2)
  })

  test('should use first call args when throttled', () => {
    let str = ''
    const throttled = throttle((msg: string) => {
      str = msg
    }, 50)

    throttled('cog')
    throttled('cog d')
    throttled('cog debt')

    expect(str).toBe('cog')
  })

  test('should not call throttled outside time window', async () => {
    let callCount = 0
    const throttled = throttle(() => {
      callCount++
    }, 50)

    expect(callCount).toBe(0)

    throttled()
    expect(callCount).toBe(1)

    await new Promise((r) => setTimeout(r, 10))
    throttled()

    await new Promise((r) => setTimeout(r, 10))
    throttled()

    expect(callCount).toBe(1)

    await new Promise((r) => setTimeout(r, 35))
    throttled()

    expect(callCount).toBe(2)
  })
})
