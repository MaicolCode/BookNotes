import { createContext, useEffect, useState } from 'react'
import {
  loginFetch,
  logoutFetch,
  registerFetch,
  validateToken
} from '../api/auth'
import Cookie from 'js-cookie'
import Loader from '../components/Loader'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])
  const [accessToken, setAccessToken] = useState(null)
  const [messageError, setMessageError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const signUp = async (user) => {
    setErrors([])
    setMessageError(null)
    try {
      const res = await registerFetch(user)

      if (res.ok) {
        const response = await res.json()
        setIsLoading(true)
        setTimeout(() => {
          checkAuth()
        }, 2000)
      } else {
        const error = await res.json()
        console.log(error)
        if (Array.isArray(error.errors)) {
          setErrors(error.errors)
          return
        } else {
          setMessageError(error.message)
          return
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const signIn = async (user) => {
    setErrors([])
    setMessageError(null)
    try {
      const res = await loginFetch(user)

      if (res.ok) {
        checkAuth()
      } else {
        const error = await res.json()
        console.log(error)
        if (Array.isArray(error.errors)) {
          setErrors(error.errors)
          return
        } else {
          setMessageError(error.message)
          return
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const checkAuth = async () => {
    if (accessToken) {
    } else {
      const token = Cookie.get()
      if (token) {
        try {
          const response = await validateToken(token.token)

          if (response.ok) {
            const user = await response.json()
            saveUser(user, token.token)
            setIsLoading(false)
          }
        } catch (error) {
          console.log('Error en el token')
        }
      }
    }
    setIsLoading(false)
  }

  const saveUser = (user, token) => {
    setUser(user)
    setIsAuthenticated(true)
    setAccessToken(token)
  }

  const signOut = async (user) => {
    try {
      const res = await logoutFetch()
      if (res.ok) {
        setUser(null)
        setIsAuthenticated(false)
        setAccessToken(null)
      } else {
        console.log('Error al realizar la accion')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        errors,
        messageError
      }}
    >
      <div className='h-screen w-full'>
        {isLoading ? <Loader /> : <>{children}</>}
      </div>
    </AuthContext.Provider>
  )
}
