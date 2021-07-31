import {screen, render} from '@testing-library/react'

import {WithProviders, authUser} from '../../utils/test-utils'
import {DashboardPage} from '.'

import {server} from '../../mocks/server.js'

beforeAll(() => {
  authUser()
  server.listen()
})

beforeEach(() => {
  render(<DashboardPage />, {wrapper: WithProviders})
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('DashboardPage Integration', () => {
  test('should render the dashboard elements successfully', async () => {
    const productsTitleEl = await screen.findByText(/products/i)
    const productName = screen.getByText(/test/i)
    const productSize = screen.getByText(/1/i)
    const productDescription = screen.getByText(/pass/i)
    const addNewBtnEl = screen.getByRole('button', {name: /add new/i})

    expect(productsTitleEl).toBeInTheDocument()
    expect(productName).toBeInTheDocument()
    expect(productSize).toBeInTheDocument()
    expect(productDescription).toBeInTheDocument()
    expect(addNewBtnEl).toBeInTheDocument()
  })
})
