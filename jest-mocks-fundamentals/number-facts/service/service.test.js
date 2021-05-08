import fetch from "node-fetch";

import { getRandomNumberFactService } from "./";

jest.mock("node-fetch");

beforeEach(() => {
  fetch.mockClear();
});

test("should return a valid response", async () => {
  fetch.mockReturnValueOnce({
    json: () =>
      Promise.resolve({
        text: "test pass",
      }),
  });

  const data = await getRandomNumberFactService();

  expect(data.text).toBe("test pass");
});

test("should return an error when fetch throws an exception", async () => {
  fetch.mockReturnValueOnce({
    json: () => Promise.reject(new Error("error expected")),
  });

  const data = await getRandomNumberFactService();

  expect(data).toBeInstanceOf(Error);
  expect(data.message).toBe("error expected");
});
