import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import 'fake-indexeddb/auto'

// Mock DevTools at the top level to prevent JSDOM unmount crashes
vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => null,
  ReactQueryDevtoolsPanel: () => null,
}))

vi.mock('@tanstack/router-devtools', () => ({
  TanStackRouterDevtools: () => null,
  TanStackRouterDevtoolsPanel: () => null,
}))

vi.mock('@tanstack/react-devtools', () => ({
  TanStackDevtools: () => null,
}))

afterEach(() => {
  cleanup()
})

// Mock ResizeObserver (Required by Recharts)
beforeEach(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})
