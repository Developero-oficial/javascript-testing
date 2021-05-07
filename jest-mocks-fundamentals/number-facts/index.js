import { getRandomNumberFactService } from "./service";

export const getRandomNumberFact = async () => {
  const randomNumberFact = await getRandomNumberFactService();
  return randomNumberFact;
};
