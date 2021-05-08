import { getRandomNumberFact } from "./";
import { getRandomNumberFactService } from "./service";

jest.mock("./service");

beforeEach(() => {
  getRandomNumberFactService.mockClear();
});

test("should return a random number fact", async () => {
  getRandomNumberFactService.mockReturnValueOnce({
    text:
      "158 is the year that the earliest dated use of Sol invictus, in a dedication from Rome.",
  });

  const numberFact = await getRandomNumberFact();

  expect(numberFact.text).toBe(
    "158 is the year that the earliest dated use of Sol invictus, in a dedication from Rome."
  );
  expect(getRandomNumberFactService).toHaveBeenCalledTimes(1);
});

test("should return an error when the service throws an exception", async () => {
  getRandomNumberFactService.mockReturnValueOnce(new Error("ups"));

  const numberFact = await getRandomNumberFact();

  expect(numberFact).toBeInstanceOf(Error);
  expect(getRandomNumberFactService).toHaveBeenCalledTimes(1);
});
