import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '../LoginForm'

const mockLogin = vi.fn()
vi.mock('#/hooks/account/useAccount', () => ({
  useLogin: () => ({
    login: mockLogin,
    isPending: false,
    isError: false,
    error: null,
  }),
}))

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form fields and submit button', () => {
    render(<LoginForm />)

    expect(screen.getByTestId('field-username')).toBeDefined()
    expect(screen.getByTestId('field-password')).toBeDefined()
    expect(screen.getByTestId('login-submit-btn')).toBeDefined()
  })

  it('calls login mutation with credentials on submit', async () => {
    render(<LoginForm />)
    const usernameInput = screen.getByTestId('field-username')
    const passwordInput = screen.getByTestId('field-password')
    const submitButton = screen.getByTestId('login-submit-btn')

    fireEvent.change(usernameInput, { target: { value: 'emilys' } })
    fireEvent.change(passwordInput, { target: { value: 'emilyspass' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'emilys',
        password: 'emilyspass',
      })
    })
  })
})
