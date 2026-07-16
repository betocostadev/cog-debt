import { useAuth } from '#/contexts/authContext'
import store from '#/utils/store'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { setAuthUser } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    try {
      setAuthUser(null)
      const jwt = store.jwt
      if (jwt) {
        store.jwt = null
      }
      queryClient.clear()
      navigate({ to: '/login' })
    } catch (error) {
      console.log(`Error performing logout: ${error}`)
    }
  }

  return { logout }
}
