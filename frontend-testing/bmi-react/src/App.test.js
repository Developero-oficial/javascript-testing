import {render, screen, fireEvent} from '@testing-library/react'
import App from './App'

beforeEach(() => {
  render(<App />)
})

test('renders calculator title', () => {
  const title = screen.getByText(/bmi calculator/i)
  expect(title).toBeInTheDocument()
})

test('calculate Thinness result', () => {
  const weightEl = screen.getByLabelText('Weight (KG)')
  const heightEl = screen.getByLabelText('Height (M)')
  const sendBtnEl = screen.getByRole('button', {name: /send/i})

  weightEl.value = '1.7'
  heightEl.value = '50'

  fireEvent.click(sendBtnEl)

  const bmiResult = screen.queryByText(/bmi: 0.001/i)
  const bmiEstimation = screen.queryByText(/bmi estimation: thiness/i)

  expect(bmiResult).toBeInTheDocument()
  expect(bmiEstimation).toBeInTheDocument()
})
