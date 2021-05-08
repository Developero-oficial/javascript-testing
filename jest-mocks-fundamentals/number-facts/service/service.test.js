import fetch from "node-fetch";

import { getRandomNumberFactService } from "./";

jest.mock("node-fetch");

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
