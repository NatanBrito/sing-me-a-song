import fake from "../factorys/AuthData.js";

export function CreateRecommendations() {
  return {
    name: fake.nameSong(),
    youtubeLink: fake.youtubeUrl(),
  };
}
