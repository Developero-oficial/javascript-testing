import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/vue";

import App from "@/App.vue";

beforeEach(() => {
  render(App);
});

test("renders calculator title", () => {
  const title = screen.getByText(/bmi calculator/i);
  expect(title).toBeInTheDocument();
});

test("calculate Thinness result", async () => {
  const weightEl = screen.getByLabelText("Weight (KG)");
  const heightEl = screen.getByLabelText("Height (M)");
  const sendBtnEl = screen.getByRole("button", { name: /send/i });

  weightEl.value = "1.7";
  heightEl.value = "50";

  fireEvent.click(sendBtnEl);

  const bmiResult = await screen.findByText(/bmi: 0.001/i);
  const bmiEstimation = await screen.findByText(/bmi estimation: thiness/i);

  expect(bmiResult).toBeInTheDocument();
  expect(bmiEstimation).toBeInTheDocument();
});

test("calculate Normal result", async () => {
  const weightEl = screen.getByLabelText("Weight (KG)");
  const heightEl = screen.getByLabelText("Height (M)");
  const sendBtnEl = screen.getByRole("button", { name: /send/i });

  weightEl.value = "80";
  heightEl.value = "1.8";

  fireEvent.click(sendBtnEl);

  const bmiResult = await screen.findByText(/bmi: 24.691/i);
  const bmiEstimation = await screen.findByText(/bmi estimation: normal/i);

  expect(bmiResult).toBeInTheDocument();
  expect(bmiEstimation).toBeInTheDocument();
});

test("calculate Overweight result", async () => {
  const weightEl = screen.getByLabelText("Weight (KG)");
  const heightEl = screen.getByLabelText("Height (M)");
  const sendBtnEl = screen.getByRole("button", { name: /send/i });

  weightEl.value = "90";
  heightEl.value = "1.8";

  fireEvent.click(sendBtnEl);

  const bmiResult = await screen.findByText(/bmi: 27.778/i);
  const bmiEstimation = await screen.findByText(/bmi estimation: overweight/i);

  expect(bmiResult).toBeInTheDocument();
  expect(bmiEstimation).toBeInTheDocument();
});

test("calculate Obese result", async () => {
  const weightEl = screen.getByLabelText("Weight (KG)");
  const heightEl = screen.getByLabelText("Height (M)");
  const sendBtnEl = screen.getByRole("button", { name: /send/i });

  weightEl.value = "100";
  heightEl.value = "1.8";

  fireEvent.click(sendBtnEl);

  const bmiResult = await screen.findByText(/bmi: 30.864/i);
  const bmiEstimation = await screen.findByText(/bmi estimation: obese/i);

  expect(bmiResult).toBeInTheDocument();
  expect(bmiEstimation).toBeInTheDocument();
});
