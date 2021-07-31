import {BrowserRouter as Router} from 'react-router-dom'
import jwt from 'jsonwebtoken'

import {AuthGuard} from '../components/auth-guard'
import {setItem} from './storage-utils'

export const WithProviders = ({children}) => (
  <AuthGuard>
    <Router>{children}</Router>
  </AuthGuard>
)

export const authUser = () => {
  const token = jwt.sign({email: 'johana.doe@mail.com'}, 'secret')
  setItem({key: '@token', value: token})
}
