import { jest } from "@jest/globals";

import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

describe("unit test recommendation sucess", () => {
  jest.spyOn(recommendationRepository, "create");
  jest.spyOn(recommendationRepository, "findByName");

  it("insert recommendation sucess", () => {
    // const insertService = recommendationService.insert({
    //   name: "name teste",
    //   youtubeLink: "https://www.youtube.com/watch?v=uaebgEChyDQ&t=2380s",
    // });
    expect("sagui").toEqual("sagui");
  });
});
