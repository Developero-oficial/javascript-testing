import {DashboardPage} from './pages/dashboard-page'
import {AddProductPage} from './pages/add-product-page'
import {LoginPage} from './pages/login-page'

export const routes = [
  {
    path: '/',
    Component: LoginPage,
    isPrivate: false,
    isExact: true,
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
    isPrivate: true,
  },
  {
    path: '/add-product',
    Component: AddProductPage,
    isPrivate: true,
  },
]
