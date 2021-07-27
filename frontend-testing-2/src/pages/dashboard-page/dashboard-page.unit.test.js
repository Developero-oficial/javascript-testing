import {screen, render} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import {getProductsService} from '../../services/products-services'

import {DashboardPage} from '.'

jest.mock('../../services/products-services')

const makeProducts = ({
  _id = 'abc',
  name = 'test',
  size = 1,
  description = 'pass',
} = {}) => ({
  _id,
  name,
  size,
  description,
})

const WithProviders = ({children}) => <Router>{children}</Router>

beforeEach(() => {
  getProductsService.mockReset()
})

describe('DashboardPage unit', () => {
  test('should render an add new button', async () => {
    getProductsService.mockReturnValueOnce({data: {products: []}})
    render(<DashboardPage />, {wrapper: WithProviders})

    expect(await screen.findByText(/empty/i)).toBeInTheDocument()

    expect(screen.getByRole('button', {name: /add new/i})).toBeInTheDocument()
  })

  test('should render loading state when the api is fetching', async () => {
    getProductsService.mockReturnValueOnce({data: {products: []}})
    render(<DashboardPage />, {wrapper: WithProviders})

    expect(screen.getByTestId(/loading/i)).toBeInTheDocument()

    expect(await screen.findByText(/empty/i)).toBeInTheDocument()
  })

  test('should render error message when the API returns an error', async () => {
    getProductsService.mockImplementation(() => {
      throw new Error('test')
    })

    render(<DashboardPage />, {wrapper: WithProviders})

    expect(await screen.findByText(/there was an error/i)).toBeInTheDocument()
  })

  test('should render the API data', async () => {
    getProductsService.mockReturnValueOnce({
      data: {
        products: [makeProducts()],
      },
    })
    render(<DashboardPage />, {wrapper: WithProviders})

    expect(await screen.findByText(/products/i)).toBeInTheDocument()

    expect(screen.getByText(/test/i)).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText(/pass/i)).toBeInTheDocument()
  })
})
