import { faker } from "@faker-js/faker";
Cypress.Commands.add("getByTestId", (selector, ...args) =>
  cy.get(`[data-testid=${selector}]`, ...args)
);

// Custom command to handle waiting for API requests
Cypress.Commands.add("waitForProducts", () => {
  cy.intercept("GET", "**/rest/products/**").as("getProducts");
  cy.wait("@getProducts");
});

// Command implementation
Cypress.Commands.add("selectProduct", (productName: string) => {
  // Find the specific product tile containing our target product
  // Using contains() to find the tile with the exact product name
  cy.contains(".item-name", productName)
    .parents("mat-grid-tile")
    .within(() => {
      cy.get(".product").should("be.visible").click();
    });

  // Verify the modal appears after clicking
  cy.get("mat-dialog-container").should("be.visible");
});

Cypress.Commands.add("registerUser", () => {
  const userData = {
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 12,
      pattern: /[A-Za-z0-9!@#$%^&*]/,
    }),
    securityAnswer: faker.lorem.word(),
  };
  // Fill registration form with generated data
  cy.get("#emailControl").type(userData.email);
  cy.get("#passwordControl").type(userData.password);
  cy.get("#repeatPasswordControl").type(userData.password);

  // Show password advice toggle button
  cy.get('input[role="switch"]')
    .parents("mat-slide-toggle")
    .contains("Show password advice")
    .click();

  // Show password advice and verify it's displayed
  cy.get(".mat-card-content").should("be.visible");

  // Verify the toggle state
  cy.get('input[role="switch"]').should("be.checked");

  // Open security question dropdown and select an option
  cy.get("mat-form-field")
    .contains("Security Question")
    .parents("mat-form-field")
    .find("mat-select")
    .click();

  // Wait for the overlay to be present and select the first option
  cy.get(".mat-select-panel mat-option").should("be.visible").first().click();

  // Verify the selection was made by checking if the select is no longer empty
  cy.get("mat-form-field")
    .contains("Security Question")
    .parents("mat-form-field")
    .find("mat-select")
    .should("not.have.class", "mat-select-empty");

  // Fill in the security answer
  cy.get("#securityAnswerControl").type(userData.securityAnswer);

  // Submit registration form
  cy.get("#registerButton").click();

  // Assert successful registration message
  cy.contains("Registration completed successfully").should("be.visible");

  // Wait for redirect to login page
  cy.url().should("include", "/login");

  // Login with registered credentials
  cy.get("#email").type(userData.email);
  cy.get("#password").type(userData.password);
  cy.get("#loginButton").click();
});

Cypress.Commands.add("addNewAddress", (address: AddressForm): void => {
  cy.get("#mat-input-3").type(address.fullName);
  cy.get("#mat-input-4").type(address.street);
  cy.get("#mat-input-5").type(address.mobile);
  cy.get("#mat-input-6").type(address.zipCode);
  cy.get("#address").type(`${address.city}, ${address.state}`);
  cy.get("#submitButton").click();
});

Cypress.Commands.add("addNewCard", (cardDetails: CardDetails): void => {
  cy.get("#mat-input-8").type(cardDetails.cardholderName);
  cy.get("#mat-input-9").type(cardDetails.cardNumber);
  cy.get('select[name="mat-input-10"]').select(cardDetails.expiryMonth);
  cy.get('select[name="mat-input-11"]').select(cardDetails.expiryYear);
  cy.get("mat-radio-46-input").click();
});

Cypress.Commands.add(
  "addProductToBasket",
  (productName: string, expectedCount: number): void => {
    cy.contains("mat-card", productName)
      .find('button[aria-label="Add to Basket"]')
      .click();
    // cy.get(".mat-simple-snack-bar-content")
    //   .should("be.visible")
    //   .and("contain", `${productName} into basket.`);

    // Placed Apple Juice (1000ml) into basket.
    // Placed Apple Pomace into basket.

    cy.get('button[aria-label="Show the shopping cart"]')
      .find("span.mat-badge-content")
      .should("contain", expectedCount);
  }
);
