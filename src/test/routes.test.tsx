import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithFileRoutes } from './file-route-utils'

describe('File Route Conventions', () => {
  it('redirects unauthenticated users from the root route to the login page', async () => {
    renderWithFileRoutes(undefined, {
      initialLocation: '/',
    })

    expect(await screen.findByText(/welcome to cog debt/i)).toBeDefined()
  })
})
