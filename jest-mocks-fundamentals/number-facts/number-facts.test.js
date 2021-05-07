import { getRandomNumberFact } from "./";

test("should return a random number fact", async () => {
  const numberFact = await getRandomNumberFact();

  expect(numberFact.text).toBe(
    "158 is the year that the earliest dated use of Sol invictus, in a dedication from Rome."
  );
});
