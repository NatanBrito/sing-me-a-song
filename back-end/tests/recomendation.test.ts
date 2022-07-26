import app from "../src/app.js";
import supertest from "supertest";
import fake from "./factorys/AuthData.js";

describe("create recomendation", () => {
  it(" test create /recommendations", async () => {
    const bodyRecommendations = {
      name: "fake.name()",
      youtubeLink:
        "https://www.youtube.com/watch?v=uaebgEChyDQ&list=PLpI679rmsJ1ACWMG1vhBlmQgU39UgYjMn&index=8",
    };
    const result = await supertest(app)
      .post("/recommendations")
      .send(bodyRecommendations);
    expect(result.status).toEqual(201);
  });
});
