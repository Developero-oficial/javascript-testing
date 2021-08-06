import {screen, render, fireEvent} from '@testing-library/react'

import {WithProviders, authUser} from '../../utils/test-utils'
import {AddProductPage} from '.'

import {server} from '../../mocks/server.js'

beforeAll(() => {
  authUser()
  server.listen()
})

beforeEach(() => {
  render(<AddProductPage />, {wrapper: WithProviders})
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('AddProductPage Integration', () => {
  test('should add a new product', async () => {
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

    expect(
      await screen.findByText(/Product saved successfully/i),
    ).toBeInTheDocument()
  })
})
