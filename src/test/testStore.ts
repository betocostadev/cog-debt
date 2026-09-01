// Testing Utils
// Use mock store ONLY for TESTS
// Mocks store and set's localStorage so vi can run the tests
import { vi } from 'vitest'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = String(value)
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

// Bind it to global/window scope before importing store module
globalThis.localStorage = localStorageMock as any

// eslint-disable-next-line import/first
import store from '#/utils/store'

export { store as mockStore }
