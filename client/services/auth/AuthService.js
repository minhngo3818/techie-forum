import { useState, useEffect, createContext } from "react"
import { axiosInstance } from "axios"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState()
  const [isAuth, setIsAuth] = useState(false)

  const login = () => {

  }

  const logout = () => {

  }

  const register = () => {

  }


  const authService = {
    user: user,
    isAuth: isAuth,
    login: login,
    logout: logout,
    register: register,
  }

  return (
    <AuthContext.Provider value={authService}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;