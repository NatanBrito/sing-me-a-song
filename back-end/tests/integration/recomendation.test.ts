import supertest from "supertest";

import app from "../../src/app.js";
import * as dataRecomendation from "../scenarioFactorys/ScenarioRecomendation.js";
import { prisma } from "../../src/database.js";

// beforeEach(async () => {
//   await prisma.recommendation.deleteMany();
// });
describe("recomendation tests", () => {
  it(" test create  sucess", async () => {
    const result = await supertest(app)
      .post("/recommendations/")
      .send(dataRecomendation.CreateRecommendations());
    expect(result.status).toEqual(201);
  });
  it(" test get  sucess", async () => {
    const result = await supertest(app).get("/recommendations/");
    expect(result.status).toEqual(200);
    expect(result.body).toBeDefined();
  });
  it(" upVote  sucess", async () => {
    const { id, score } = await prisma.recommendation.findFirst({
      where: { id: 1 },
    });
    const result = await supertest(app)
      .post(`/recommendations/${id}/upvote`)
      .send();
    const upVote = await prisma.recommendation.findFirst({
      where: { id: 1 },
    });
    expect(result.status).toEqual(200);
    expect(score + 1).toEqual(upVote.score);
  });
  it(" donwVote  sucess", async () => {
    const { id, score } = await prisma.recommendation.findFirst({
      where: { id: 1 },
    });
    const result = await supertest(app)
      .post(`/recommendations/${id}/downvote`)
      .send();
    const upVote = await prisma.recommendation.findFirst({
      where: { id: 1 },
    });
    expect(result.status).toEqual(200);
    expect(score - 1).toEqual(upVote.score);
  });
  it(" test random  sucess", async () => {
    const result = await supertest(app).get("/recommendations/random");
    expect(result.status).toEqual(200);
    expect(result.body).toBeDefined();
  });
  it(" get amount  sucess", async () => {
    const result = await supertest(app).get("/recommendations/top/100");
    expect(result.status).toEqual(200);
    expect(result.body).toBeDefined();
  });
  it(" get amount  sucess", async () => {
    const result = await supertest(app).get("/recommendations/100");
    expect(result.status).toEqual(200);
    expect(result.body).toBeDefined();
  });
});
