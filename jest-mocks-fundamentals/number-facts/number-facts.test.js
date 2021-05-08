import { getRandomNumberFact } from "./";
import { getRandomNumberFactService } from "./service";

jest.mock("./service");

test("should return a random number fact", async () => {
  getRandomNumberFactService.mockReturnValueOnce({
    text:
      "158 is the year that the earliest dated use of Sol invictus, in a dedication from Rome.",
  });

  const numberFact = await getRandomNumberFact();

  expect(numberFact.text).toBe(
    "158 is the year that the earliest dated use of Sol invictus, in a dedication from Rome."
  );
});
