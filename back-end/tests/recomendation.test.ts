import app from "../src/app.js";
import supertest from "supertest";
import * as dataRecomendation from "./scenarioFactorys/ScenarioRecomendation.js";
import { prisma } from "../src/database.js";

beforeEach(async () => {
  await prisma.recommendation.deleteMany();
});
describe("recomendation tests", () => {
  it(" test create /recommendations sucess", async () => {
    const result = await supertest(app)
      .post("/recommendations")
      .send(dataRecomendation.CreateRecommendations());
    expect(result.status).toEqual(201);
  });
  it(" like and recomendation", async () => {
    const result = await supertest(app)
      .post("/recommendations/:id/upvote")
      .send();
    expect(result.status).toEqual(201);
  });
});
