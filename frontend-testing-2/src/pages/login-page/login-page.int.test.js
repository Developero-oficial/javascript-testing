import {screen, render, fireEvent, waitFor} from '@testing-library/react'

import {WithProviders} from '../../utils/test-utils'
import {LoginPage} from '.'
import {removeItem} from '../../utils/storage-utils'

import {server} from '../../mocks/server.js'

beforeAll(() => server.listen())

beforeEach(() => {
  removeItem({key: '@token'})
  render(<LoginPage />, {wrapper: WithProviders})
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('LoginPage Integration', () => {
  test('should succesfully login', async () => {
    const emailInputEl = screen.getByLabelText(/email address/i)
    const passwordInputEl = screen.getByLabelText(/password/i)
    const submitBtnEl = screen.getByRole('button', {name: /send/i})

    fireEvent.change(emailInputEl, {target: {value: 'johana.doe@mail.com'}})
    fireEvent.change(passwordInputEl, {target: {value: '123'}})
    fireEvent.click(submitBtnEl)

    await waitFor(() => {
      expect(screen.queryByText(/login/i)).not.toBeInTheDocument()
    })
    expect(window.location.pathname).toBe('/dashboard')
  })

  test('should validate required fields', () => {
    const submitBtnEl = screen.getByRole('button', {name: /send/i})

    fireEvent.click(submitBtnEl)

    const emailRequiredEl = screen.queryByText(/the email is required/i)
    const passwordRequiredEl = screen.queryByText(/the password is required/i)

    expect(emailRequiredEl).toBeInTheDocument()
    expect(passwordRequiredEl).toBeInTheDocument()
  })
})
