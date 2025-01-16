/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("User Registration and Login Flow", () => {
  // Store generated user data for reuse in login
  const userData = {
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 12,
      pattern: /[A-Za-z0-9!@#$%^&*]/,
    }),
    securityAnswer: faker.lorem.word(),
  };

  it("should show validation messages when submitting empty form", () => {
    // Click on the account button
    cy.visit("#/register");
    // Click on each form field without entering data
    cy.get("#emailControl").should("be.visible");
    cy.get("#emailControl").click().blur();
    cy.get("#passwordControl").click().blur();
    cy.get("#repeatPasswordControl").click().blur();
    cy.get('mat-select[name="securityQuestion"]').focus().blur();
    cy.get("#securityAnswerControl").click().blur();

    // Assert validation messages are displayed
    cy.get("mat-error").should("have.length.at.least", 5);
    cy.get("mat-error")
      .eq(0)
      .should("contain.text", "Please provide an email address.");
    cy.get("mat-error")
      .eq(1)
      .should("contain.text", "Please provide a password.");
    cy.get("mat-error")
      .eq(2)
      .should("contain.text", "Please repeat your password.");
    cy.get("mat-error")
      .eq(3)
      .should("contain.text", "Please select a security question.");
    cy.get("mat-error")
      .eq(4)
      .should(
        "contain.text",
        "Please provide an answer to your security question."
      );
    cy.registerUser();
    cy.url().should("not.include", "/login");
  });
});

// Configure Cypress for the application
Cypress.on("uncaught:exception", (err: Error, runnable: Mocha.Runnable) => {
  // Juice Shop throws some uncaught exceptions that shouldn't fail our tests
  return false;
});
