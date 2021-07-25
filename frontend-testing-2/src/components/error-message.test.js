import {render, screen} from '@testing-library/react'

import {ErrorMessage} from './errorMessage'

describe('ErroeMessage', () => {
  test('should render a texr', () => {
    render(<ErrorMessage text="test test" />)

    const textEl = screen.getByText(/test pass/i)

    expect(textEl).toBeInTheDocument()
  })
})
