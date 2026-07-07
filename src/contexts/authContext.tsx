import type { Dispatch, SetStateAction, ReactNode } from 'react'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import type { IAuthUser } from '#/types/account'
import store from '#/utils/store'
import { useQueryClient } from '@tanstack/react-query'
import { accountQueryKeys } from '#/hooks/account/useAccountQueryKeys'
import { useAuthUserQueryFn } from '#/hooks/account/useAccountQueries'

export type AuthContextValue = {
  authUser: IAuthUser | null
  setAuthUser: Dispatch<SetStateAction<IAuthUser | null>>
}

const authState = {
  authUser: null as IAuthUser | null,
}

function resolveAuthUser(
  next: SetStateAction<IAuthUser | null>,
): IAuthUser | null {
  return typeof next === 'function' ? next(authState.authUser) : next
}

function setSharedAuthUser(next: SetStateAction<IAuthUser | null>) {
  authState.authUser = resolveAuthUser(next)
}

export function getAuthContextValue(
  auth?: Partial<AuthContextValue>,
): AuthContextValue {
  return {
    get authUser() {
      return authState.authUser
    },
    setAuthUser: (next) => {
      setSharedAuthUser(next)
      auth?.setAuthUser?.(next)
    },
  }
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUserState] = useState<IAuthUser | null>(
    authState.authUser,
  )
  const queryClient = useQueryClient()

  const setAuthUser = useCallback((next: SetStateAction<IAuthUser | null>) => {
    const resolved = resolveAuthUser(next)
    setSharedAuthUser(resolved)
    setAuthUserState(resolved)
  }, [])

  useEffect(() => {
    async function loadUser() {
      const jwt = store.loggedIn

      if (!jwt) {
        setAuthUser(null)
        return
      }

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

    loadUser()
  }, [queryClient, setAuthUser])

  const value = useMemo<AuthContextValue>(
    () => ({
      authUser,
      setAuthUser,
    }),
    [authUser, setAuthUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
