// cypress/e2e/juice-shop-workflow.cy.js
import { TEST_CARD } from "../../support/constants";

describe("Juice Shop E2E purchase funnel Test ", () => {
  it("should complete the shopping workflow and complete purchase", () => {
    cy.visit("#/register");
    cy.registerUser();

    // Wait for redirect to login page
    cy.url().should("include", "/login");
    // Add 5 different products to basket
    const addProduct = (index) => {
      cy.get(".mat-card")
        .eq(index)
        .within(() => {
          cy.get('[aria-label="Add to Basket"]').click();

          // Assert success message appears
          //   cy.get(".mat-snack-bar-container")
          //     .should("be.visible")
          //     .and("contain", "added to basket");
        });

      // Assert cart number updated
      cy.get(".fa-layers-counter")
        .parent()
        .should("contain", index + 1);
    };

    // Add 5 products sequentially
    for (let i = 0; i < 5; i++) {
      addProduct(i);
    }

    // Navigate to basket
    cy.get('[routerlink="/basket"]').click();
    cy.wait(4000);

    // Get initial total price
    cy.get("#price")
      .invoke("text")
      .then((initialPrice) => {
        // Increase quantity of first product
        // Selector for the quantity text (to verify changes)
        const quantitySelector = "mat-cell span";

        // Selector for the minus and plus buttons
        const minusButtonSelector = "button .fa-minus-square";
        const plusButtonSelector = "button .fa-plus-square";

        // Verify initial quantity (optional)
        cy.get(quantitySelector).should("contain.text", "1");

        // Click the plus button to increase quantity
        cy.get(plusButtonSelector).eq(0).click();

        // Assert price changed
        cy.get("#price").invoke("text").should("not.eq", initialPrice);

        // Verify quantity increased
        cy.get(quantitySelector).should("contain.text", "2");

        // Click the minus button to decrease quantity
        cy.get(minusButtonSelector).eq(0).click();

        // Verify quantity decreased
        cy.get(quantitySelector).should("contain.text", "1");
        // Assert price changed again
        cy.get("#price").invoke("text").should("eq", initialPrice);
      });

    // Proceed to checkout
    cy.get("#checkoutButton").click();

    // Add address information
    cy.get('button[aria-label="Add a new address"]')
      .as("add_new_address")
      .click()
      .within(() => {
        cy.get('[placeholder="Please provide a country."]').type(
          "Test Country"
        );
        cy.get('[placeholder="Please provide a name."]').type("Test Name");
        cy.get('[placeholder="Please provide a mobile number."]').type(
          "1234567890"
        );
        cy.get('[placeholder="Please provide a ZIP code."]').type("12345");
        cy.get('[placeholder="Please provide an address."]').type(
          "Test Address"
        );
        cy.get('[placeholder="Please provide a city."]').type("Test City");
        cy.get('[placeholder="Please provide a state."]').click().type("State");
      });

    //Click on submit button
    cy.get("#submitButton").click();
    // Select the radio button
    cy.get("input#mat-radio-42-input").click();

    cy.get("#continueButton").click();

    cy.get("h1").should("contain.text", "Choose a delivery speed");
    // Select delivery method
    // Click on the Standard Delivery radio button
    cy.get("#mat-radio-45-input").click({ force: true });

    // Verify the radio button is selected
    cy.get("#mat-radio-45-input").should("be.checked");

    cy.get("#continueButton").click();
    // Assert insufficient wallet balance
    cy.get(".wallet-balance").then(($element) => {
      expect($element.text().trim()).to.satisfy(
        (text) => text.includes("0") || text.includes("Insufficient")
      );

      // Select add new card option
      // Click on the "Add New Card" expansion panel header
      cy.get("mat-expansion-panel-header#mat-expansion-panel-header-0").click();

      // Fill card information
      cy.addNewCard(TEST_CARD);
      //   // Fill card information
      //   // Name field
      //   cy.get("#mat-input-8")
      //     .type(testData.card.name)
      //     .should("have.value", testData.card.name);

      //   // Card number field
      //   cy.get("#mat-input-9")
      //     .type(testData.card.cardNumber)
      //     .should("have.value", testData.card.cardNumber);

      //   // Expiry month dropdown
      //   cy.get("#mat-input-10")
      //     .select(testData.card.expiryMonth)
      //     .should("have.value", testData.card.expiryMonth);

      //   // Expiry year dropdown
      //   cy.get("#mat-input-11")
      //     .select(testData.card.expiryYear)
      //     .should("have.value", testData.card.expiryYear);

      // Submit button - wait for it to be enabled and click

      // Continue with purchase
      cy.contains("button", "Continue").click();
      cy.contains("button", "Place your order and pay").click();
    });
  });
});
