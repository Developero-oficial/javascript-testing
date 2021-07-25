import {DashboardPage} from './pages/dashboard-page'
import {AddProductPage} from './pages/add-product-page'

export const routes = [
  {
    path: '/',
    Component: DashboardPage,
    isPrivate: false,
    isExact: true,
  },
  {
    path: '/add-product',
    Component: AddProductPage,
    isPrivate: false,
  },
]
