import supertest from "supertest";

import app from "../../src/app.js";
import * as dataRecomendation from "../scenarioFactorys/ScenarioRecomendation.js";
import { prisma } from "../../src/database.js";

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
  it(" upVote  recommendation", async () => {
    // const users = await prisma.recommendation.findMany();
    // const { id, score } = users[0];
    // const result = await supertest(app)
    //   .post(`/recommendations/${id}/upvote`)
    //   .send();
    // const CountVotesUpdate = await prisma.recommendation.findUnique({
    //   where: { id: 1 },
    // });
    // expect(result.status).toEqual(200);
    // expect(score).toBe(score);
  });
});
