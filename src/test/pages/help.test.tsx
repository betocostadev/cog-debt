// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/dom'
import { renderWithFileRoutes } from '../file-route-utils'

describe('HelpPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders main help layout and texts', async () => {
    renderWithFileRoutes(undefined, {
      initialLocation: '/help',
    })

    const helpHeader = await screen.findByTestId('help-page-header')

    expect(helpHeader).toBeDefined()
    expect(helpHeader.textContent).toBe('Cognitive Debt')

    const helpText = await screen.findByTestId('help-text')

    expect(helpText).toBeDefined()
  })

  it('renders help page links with correct destination', async () => {
    renderWithFileRoutes(undefined, {
      initialLocation: '/help',
    })
    const linkToDummy = await screen.findByTestId('help-link-to-dummy')
    expect(linkToDummy).toBeDefined()
    expect(linkToDummy.getAttribute('href')).toBe('https://dummyjson.com/users')
    expect(linkToDummy.textContent).toBe('Dummy JSON users')

    const linkToHome = screen.getByTestId('help-link-to-home')
    expect(linkToHome).toBeDefined()
    expect(linkToHome.getAttribute('href')).toBe('/')
    expect(linkToHome.textContent).toBe('Go to Login')
  })

  it('renders loading paragraph when loading', async () => {
    renderWithFileRoutes(undefined, {
      initialLocation: '/help',
    })

    const loadingP = await screen.findByTestId('help-loading-text')

    expect(loadingP).toBeDefined()
    expect(loadingP.textContent).toBe('Loading...')
  })
})
