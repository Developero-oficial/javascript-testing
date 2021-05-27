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

test('calculate Normal result', () => {
  const weightEl = screen.getByLabelText('Weight (KG)')
  const heightEl = screen.getByLabelText('Height (M)')
  const sendBtnEl = screen.getByRole('button', {name: /send/i})

  weightEl.value = '80'
  heightEl.value = '1.8'

  fireEvent.click(sendBtnEl)

  const bmiResult = screen.queryByText(/bmi: 24.691/i)
  const bmiEstimation = screen.queryByText(/bmi estimation: normal/i)

  expect(bmiResult).toBeInTheDocument()
  expect(bmiEstimation).toBeInTheDocument()
})

test('calculate Overweight result', () => {
  const weightEl = screen.getByLabelText('Weight (KG)')
  const heightEl = screen.getByLabelText('Height (M)')
  const sendBtnEl = screen.getByRole('button', {name: /send/i})

  weightEl.value = '90'
  heightEl.value = '1.8'

  fireEvent.click(sendBtnEl)

  const bmiResult = screen.queryByText(/bmi: 27.778/i)
  const bmiEstimation = screen.queryByText(/bmi estimation: overweight/i)

  expect(bmiResult).toBeInTheDocument()
  expect(bmiEstimation).toBeInTheDocument()
})

test('calculate Obese result', () => {
  const weightEl = screen.getByLabelText('Weight (KG)')
  const heightEl = screen.getByLabelText('Height (M)')
  const sendBtnEl = screen.getByRole('button', {name: /send/i})

  weightEl.value = '100'
  heightEl.value = '1.8'

  fireEvent.click(sendBtnEl)

  const bmiResult = screen.queryByText(/bmi: 30.864/i)
  const bmiEstimation = screen.queryByText(/bmi estimation: obese/i)

  expect(bmiResult).toBeInTheDocument()
  expect(bmiEstimation).toBeInTheDocument()
})
