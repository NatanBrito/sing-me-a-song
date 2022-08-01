/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
describe("Recommendation", () => {
  const nameSong = faker.music.songName();
  const youtubeLink =
    "https://www.youtube.com/watch?v=rs-cV16krbQ&list=RDrs-cV16krbQ&start_radio=1";
  it("create recommendation", () => {
    cy.visit("http://localhost:3000/");
    cy.get("input[placeholder=Name]").type(nameSong);
    cy.get("#youtubinho").type(`${youtubeLink}`);
    cy.get("#buttonRecommendation").click();
  });
  it("upvote sucesss", () => {
    cy.get("#arrow-up-icon").click({ multiple: true });
  });
  it("downvote sucess", () => {
    cy.get("#arrow-down-icon").click({ multiple: true });
  });
});
describe("random page", () => {
  it("get random recommendation", () => {
    cy.visit("http://localhost:3000/random");
    cy.intercept("GET", "/recommendations/random").as("Recommendations");
    cy.wait("@Recommendations");
    cy.get("article").should("have.length", 1);
    console.log("article", cy.get("article"));
  });
  describe("top page", () => {
    it("get 10 recommendations", () => {
      cy.visit("http://localhost:3000/top");
      cy.intercept("GET", "/recommendations/top/10").as("getRecommendations");
      cy.wait("@getRecommendations");
      cy.get("article").should("be.length.lte", 10);
    });
  });
  after(() => {
    cy.request("http://localhost:5000/recommendations/deleteDataTest");
  });
});
