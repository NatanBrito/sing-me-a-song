import { faker } from "@faker-js/faker";

export function getByIdOrFail() {
  return {
    id: 1,
    name: "xangai",
    youtubeLink: "https://www.youtube.com/",
    score: 10,
  };
}
export function dataRecommendation() {
  return {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v=uaebgEChyDQ&t=23s",
  };
}
export function recommendationFactory() {
  return {
    id: 1,
    name: "tarzan na selva",
    youtubeLink: "https://www.youtube.com/watch",
    score: 20,
  };
}
