import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import 'fake-indexeddb/auto'

afterEach(() => {
  cleanup()
})

// Mock ResizeObserver (Required by Recharts)
beforeEach(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
})
