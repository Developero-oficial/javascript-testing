import React from 'react'

import {AuthContext} from '../contexts/auth-context'
import {decodeJwt} from '../utils/jwt-utils'
import {setItem, getItem, removeItem} from '../utils/storage-utils'

export const AuthGuard = ({children}) => {
  const [isChecking, setIsChecking] = React.useState(true)
  const [isAuth, setIsAuth] = React.useState(false)
  const [user, setUser] = React.useState({email: ''})

  const onLoginSuccess = React.useCallback(({token}) => {
    const decoded = decodeJwt(token)
    const {email} = decoded
    setItem({key: '@token', value: token})
    setIsAuth(true)
    setUser({email})
  }, [])

  const handleLogout = () => {
    setIsAuth(false)
    setUser({email: ''})
    removeItem({key: '@token'})
  }

  React.useEffect(() => {
    const token = getItem({key: '@token'})

    if (token) {
      const {username} = decodeJwt(token)
      setIsAuth(true)
      setUser({username})
    }

    setIsChecking(false)
  }, [])

  const authContextValues = {
    isAuth,
    user,
    onLoginSuccess,
    handleLogout,
  }

  if (isChecking) {
    return 'Loading...'
  }

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  )
}
