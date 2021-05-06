import { getQuote } from "./";

// callbacks
// promises
// async await

test("getQuote", async () => {
  const quote = await getQuote();

  expect(quote).toBe(
    "No creas todo lo que leas en internet, por Benjamin Franklin"
  );
});
