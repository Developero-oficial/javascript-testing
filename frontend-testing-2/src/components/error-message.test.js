import {render, screen} from '@testing-library/react'

import {ErrorMessage} from './errorMessage'

describe('ErroeMessage', () => {
  test('should render a texr', () => {
    render(<ErrorMessage text="test pass" />)

    const textEl = screen.getByText(/test pass/i)

    expect(textEl).toBeInTheDocument()
  })
})
