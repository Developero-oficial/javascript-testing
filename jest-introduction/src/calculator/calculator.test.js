const calculator = require(".");

test("sum calculator", () => {
  const result = calculator.sum(1, 2);
  expect(result).toBe(3);
});

test.todo("extract calculator");

test.todo("multiply calculator");

test.todo("divide calculator");
