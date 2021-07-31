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
  test('should render the dashboard elements successfully', () => {
    const titleEl = screen.queryByText(/dashboard/i)

    expect(titleEl).toBeInTheDocument()
  })
})
