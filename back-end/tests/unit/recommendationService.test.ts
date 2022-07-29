import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

describe("unit test recommendation sucess", () => {
  jest
    .spyOn(recommendationRepository, "create")
    .mockImplementation((): any => {});

  it("insert recommendation sucess", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementation((): any => {
        return false;
      });
    await recommendationService.insert({
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=uaebgEChyDQ&t=23s",
    });
    expect(recommendationRepository.create).toBeCalled();
  });
  it("insert recommendation fail", async () => {
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementation((): any => {
        return true;
      });
    const insert = recommendationService.insert({
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=uaebgEChyDQ&t=2380s",
    });
    expect(insert).rejects.toHaveProperty("type", "conflict");
  });
});
