import {screen, render} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import {getProductsService} from '../../services/products-services'

import {DashboardPage} from '.'

jest.mock('../../services/products-services')

describe('DashboardPage unit', () => {
  test('should render an add new button', async () => {
    getProductsService.mockReturnValueOnce({data: {products: []}})
    render(
      <Router>
        <DashboardPage />
      </Router>,
    )

    expect(await screen.findByText(/empty/i)).toBeInTheDocument()

    expect(screen.getByRole('button', {name: /add new/i})).toBeInTheDocument()
  })
})
