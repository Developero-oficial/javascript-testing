import {screen, render, fireEvent, waitFor} from '@testing-library/react'

import {WithProviders} from '../../utils/test-utils'
import {LoginPage} from '.'

import {server} from '../../mocks/server.js'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('LoginPage Integration', () => {
  test('should succesfully login', async () => {
    render(<LoginPage />, {wrapper: WithProviders})

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
})
