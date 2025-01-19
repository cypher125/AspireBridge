import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  role: string
  profile_picture?: string
  phone_number?: string
  description?: string
  organization_details?: string
  course?: string
  matriculation_number?: string
  current_semester?: string
  gpa?: string
  credits_earned?: number
  total_credits?: number
  study_duration?: string
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  setAuth: (auth: { accessToken: string; refreshToken: string; user: User }) => void
  updateAccessToken: (newToken: string) => void
  clearAuth: () => void
  isAuthenticated: () => boolean
  isAdmin: () => boolean
  hasValidRefreshToken: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setAuth: (auth) => {
        console.log('Setting auth state:', auth)
        document.cookie = `auth-storage=${encodeURIComponent(JSON.stringify({
          state: {
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
            user: auth.user
          }
        }))}; path=/`
        
        set({
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
          user: auth.user
        })
      },
      updateAccessToken: (newToken) => {
        console.log('Updating access token')
        const currentState = get()
        const newState = {
          ...currentState,
          accessToken: newToken
        }
        
        document.cookie = `auth-storage=${encodeURIComponent(JSON.stringify({
          state: newState
        }))}; path=/`
        
        set(newState)
      },
      clearAuth: () => {
        console.log('Clearing auth state')
        document.cookie = 'auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        set({ accessToken: null, refreshToken: null, user: null })
      },
      isAuthenticated: () => {
        const state = get()
        return !!state.accessToken && !!state.user
      },
      isAdmin: () => {
        const user = get().user
        return user?.role?.toLowerCase() === 'administrator'
      },
      hasValidRefreshToken: () => {
        const state = get()
        return !!state.refreshToken
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
) 