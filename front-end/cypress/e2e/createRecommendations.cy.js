/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
describe("Recommendation", () => {
  const nameSong = faker.music.songName();
  const youtubeLink =
    "https://www.youtube.com/watch?v=rs-cV16krbQ&list=RDrs-cV16krbQ&start_radio=1";
  it("create recommendation", () => {
    cy.visit("http://localhost:3000/");
    cy.get("input[placeholder=Name]").type(nameSong);
    cy.get("input[placeholder=https://youtu.be/...]").type(`${youtubeLink}`);
    cy.get("#buttonRecommendation").click();
  });
});
