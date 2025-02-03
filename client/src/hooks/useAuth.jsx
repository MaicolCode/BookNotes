import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    errors,
    messageError
  } = useContext(AuthContext)

  return {
    user,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    errors,
    messageError
  }
}
