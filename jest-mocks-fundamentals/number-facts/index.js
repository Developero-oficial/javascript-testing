import { getRandomNumberFactService } from "./service";

export const getRandomNumberFact = async () => {
  console.log(getRandomNumberFactService);
  const randomNumberFact = await getRandomNumberFactService();
  return randomNumberFact;
};
