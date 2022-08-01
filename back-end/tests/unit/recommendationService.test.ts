import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

const recoFactory = {
  id: 1,
  name: "tarzan na selva",
  youtubeLink: "https://www.youtube.com/watch",
  score: 20,
};
beforeEach(async () => {
  jest.resetAllMocks();
});
jest.spyOn(recommendationRepository, "find").mockImplementation((): any => {
  return recoFactory;
});
describe("insert recommendation ", () => {
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
describe(" sucess Upvote", () => {
  it("Sucess in upvote", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(recoFactory);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(recoFactory);

    await recommendationService.upvote(1);
    expect(recommendationRepository.find).toHaveBeenCalledWith(1);
    expect(recommendationRepository.updateScore).toHaveBeenLastCalledWith(
      1,
      "increment"
    );
  });
  it("Fail in upvote", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    expect(recommendationService.upvote(1)).rejects.toEqual({
      message: "",
      type: "not_found",
    });
  });
  describe("downvotes tests suites", () => {
    it("Sucess in downvote", async () => {
      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(recoFactory);

      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValueOnce(recoFactory);

      await recommendationService.downvote(1);
      expect(recommendationRepository.find).toHaveBeenCalledWith(1);
      expect(recommendationRepository.updateScore).toHaveBeenLastCalledWith(
        1,
        "decrement"
      );
    });
    it("Fail in downvote", async () => {
      jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

      expect(recommendationService.downvote(1)).rejects.toEqual({
        message: "",
        type: "not_found",
      });
    });
    it("Downvote with delete recommendation", async () => {
      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(recoFactory);

      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValueOnce({ ...recoFactory, score: -6 });

      jest
        .spyOn(recommendationRepository, "remove")
        .mockResolvedValueOnce(null);

      await recommendationService.downvote(1);
      expect(recommendationRepository.find).toHaveBeenCalledWith(1);
      expect(recommendationRepository.updateScore).toHaveBeenLastCalledWith(
        1,
        "decrement"
      );
      expect(recommendationRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
describe("tests get", () => {
  it("should call findAll 1 time", async () => {
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue(null);

    await recommendationService.get();

    expect(recommendationRepository.findAll).toBeCalledTimes(1);
  });
  it(" call findAll 1 time sucess", async () => {
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockResolvedValue(null);

    await recommendationService.getTop(1);

    expect(recommendationRepository.getAmountByScore).toBeCalledTimes(1);
  });
});
describe("tests- getRandom", () => {
  it("given math Random < 0.7,  return gt on filter", async () => {
    const data = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=uaebgEChyDQ&t=23s",
    };
    jest.spyOn(global.Math, "random").mockReturnValue(0);
    jest.spyOn(global.Math, "floor").mockReturnValue(0);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue([{ ...data, id: 1, score: 5 }]);

    const randomRecommendation = await recommendationService.getRandom();

    expect(randomRecommendation).toMatchObject({ ...data, id: 1, score: 5 });
  });

  it("given math Random > 0.7, return lte on filter", async () => {
    const data = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=uaebgEChyDQ&t=23s",
    };
    jest.spyOn(global.Math, "random").mockReturnValue(0.8);
    jest.spyOn(global.Math, "floor").mockReturnValue(0);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue([{ ...data, id: 1, score: 5 }]);

    const randomRecommendation = await recommendationService.getRandom();

    expect(randomRecommendation).toMatchObject({ ...data, id: 1, score: 5 });
  });

  it("void array, should return not found error", () => {
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

    const promise = recommendationService.getRandom();

    expect(promise).rejects.toEqual({ type: "not_found", message: "" });
  });
});
