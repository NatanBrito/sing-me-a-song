/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
describe("Recommendation", () => {
  const youtubeLink = xx;
  it("create recommendation", () => {
    cy.visit("http://localhost:3000/");
    cy.get("input[placeholder=Name]").type("natanzinho o malado");
    cy.get("input[placeholder=https://youtu.be/...]").type(``);
  });
});
