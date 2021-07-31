import {BrowserRouter as Router} from 'react-router-dom'

import {AuthGuard} from '../components/auth-guard'

export const WithProviders = ({children}) => (
  <AuthGuard>
    <Router>{children}</Router>
  </AuthGuard>
)
