import type { Dispatch, SetStateAction, ReactNode } from 'react'
import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import type { IAuthUser } from '#/types/account'
import store from '#/utils/store'
import { useQueryClient } from '@tanstack/react-query'
import { accountQueryKeys } from '#/hooks/account/useAccountQueryKeys'
import { useAuthUserQueryFn } from '#/hooks/account/useAccountQueries'

export type AuthContextValue = {
  authUser: IAuthUser | null
  setAuthUser: Dispatch<SetStateAction<IAuthUser | null>>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<IAuthUser | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    async function loadUser() {
      const jwt = store.loggedIn
      console.log('Auth Context, jwt: ', jwt)
      if (jwt) {
        try {
          const authUserData = await queryClient.ensureQueryData({
            queryKey: accountQueryKeys.authUser(),
            queryFn: useAuthUserQueryFn,
          })
          setAuthUser(authUserData)
        } catch (error) {
          console.log(error)
          setAuthUser(null)
        }
      }
    }

    loadUser()
  }, [queryClient])

  const value = useMemo<AuthContextValue>(
    () => ({
      authUser,
      setAuthUser,
    }),
    [authUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
