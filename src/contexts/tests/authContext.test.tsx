import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AuthProvider, useAuth } from '../authContext'
import store from '#/utils/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TokenExpiredError } from '#/types/errors'
import { toast } from 'sonner'

// Mock router, sonner and account hook
const mockNavigate = vi.fn()
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}))

vi.mock('#/hooks/account/useAccountQueries', () => ({
  useAuthUserQueryFn: vi.fn(),
}))

const TestComponent = () => {
  const { authUser } = useAuth()
  return (
    <div>
      {authUser ? `Logged in as ${authUser.username}` : 'Not logged in'}
    </div>
  )
}

describe('AuthContext', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    vi.clearAllMocks()
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    })
    store.jwt = null
  })

  it('should throw an error if useAuth is used outside of AuthProvider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow(
      'useAuth must be used within an AuthProvider',
    )

    consoleErrorSpy.mockRestore()
  })

  it('should set authUser to null if no JWT exists in store', async () => {
    store.jwt = null

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </QueryClientProvider>,
    )

    expect(await screen.findByText('Not logged in')).toBeDefined()
  })

  it('should handle token expiration error gracefully on load', async () => {
    store.jwt = 'expired-token-jwt'

    vi.spyOn(queryClient, 'ensureQueryData').mockRejectedValueOnce(
      new TokenExpiredError(),
    )

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </QueryClientProvider>,
    )

    expect(await screen.findByText('Not logged in')).toBeDefined()
    expect(toast.error).toHaveBeenCalledWith(
      'Session expired. Please log in again.',
    )
  })
})
