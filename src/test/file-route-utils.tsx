import React from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import {
  createRouter,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router'

// Based on the official docs
// https://tanstack.com/router/latest/docs/how-to/test-file-based-routing

// Import the generated route tree
import { routeTree } from '#/routeTree.gen'
import { getAuthContextValue } from '#/contexts/authContext'
import { QueryClient } from '@tanstack/react-query'

// Create test router with generated route tree
export function createTestRouterFromFiles(initialLocation = '/') {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: {
      auth: getAuthContextValue(),
      queryClient: new QueryClient(),
    },
  })

  return router
}

// Custom render function for file-based routes
interface RenderWithFileRoutesOptions extends Omit<RenderOptions, 'wrapper'> {
  initialLocation?: string
  routerContext?: Partial<{
    auth: ReturnType<typeof getAuthContextValue>
    queryClient: QueryClient
  }>
}

export function renderWithFileRoutes(
  ui?: React.ReactElement,
  {
    initialLocation = '/',
    routerContext = {},
    ...renderOptions
  }: RenderWithFileRoutesOptions = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: {
      auth: getAuthContextValue(),
      queryClient,
      ...routerContext,
    },
  })

  const renderTarget = ui ?? <RouterProvider router={router} />

  return {
    ...render(renderTarget, renderOptions),
    router,
  }
}

// Helper to test specific file routes
export function createMockFileRoute(
  path: string,
  component: React.ComponentType,
) {
  // This is useful for isolated testing when you don't want to use the full route tree
  return {
    path,
    component,
    // Add other common route properties as needed
  }
}
