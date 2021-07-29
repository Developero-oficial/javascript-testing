import {screen, render, fireEvent} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import {saveProductService} from '../../services/products-services'

import {AddProductPage} from '.'

jest.mock('../../services/products-services')

const WithProviders = ({children}) => <Router>{children}</Router>

beforeEach(() => {
  saveProductService.mockReset()
})

describe('AddProductPage Unit', () => {
  test('should send form data successfully', async () => {
    saveProductService.mockReturnValueOnce({status: 201})

    render(
      <WithProviders>
        <AddProductPage />
      </WithProviders>,
    )

    const nameInputEl = screen.getByLabelText(/name/i)
    const sizeInputEl = screen.getByLabelText(/size/i)
    const descriptionInputEl = screen.getByLabelText(/description/i)
    const btnEl = screen.getByRole('button', {name: /save/i})

    const formData = {
      name: 'name test',
      size: '10',
      description: 'this is a test',
    }

    fireEvent.change(nameInputEl, {target: {value: formData.name}})
    fireEvent.change(sizeInputEl, {target: {value: formData.size}})
    fireEvent.change(descriptionInputEl, {
      target: {value: formData.description},
    })

    fireEvent.click(btnEl)

    expect(saveProductService).toHaveBeenCalledWith(formData)

    expect(
      await screen.findByText(/Product saved successfully/i),
    ).toBeInTheDocument()
  })
})
