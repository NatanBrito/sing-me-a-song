import { recommendationRepository } from "../repositories/recommendationRepository.js";

async function deleteData() {
  return await recommendationRepository.removeData();
}

export const resetDataBaseService = {
  deleteData,
};
