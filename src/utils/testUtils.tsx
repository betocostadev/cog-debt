import { vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import type * as TanStackRouter from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '#/contexts/authContext'

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof TanStackRouter>()
  return {
    ...(actual as Record<string, unknown>),
    Link: ({ children, to, 'data-testid': testId, ...props }: any) => (
      <a href={to} data-testid={testId} {...props}>
        {children}
      </a>
    ),
    createFileRoute: vi.fn().mockReturnValue(() => () => null),
    useNavigate: () => vi.fn(),
    useSearch: () => ({}),
    useRouter: () => ({}),
  }
})

export const renderWithProviders = (ui: React.ReactElement) => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={testQueryClient}>
      <AuthProvider>{ui}</AuthProvider>
    </QueryClientProvider>,
  )
}
