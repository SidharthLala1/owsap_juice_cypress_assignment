/// <reference types="cypress" />
describe("Juice Shop Product Detail Modal", () => {
  it("should open Apple Juice product details and verify modal content", () => {
    // Using the custom command to select and open the product
    cy.selectProduct("Apple Juice (1000ml)");

    // Verify product details in modal
    cy.get("mat-dialog-container").within(() => {
      // Verify title matches selected product
      cy.get("h1").should("contain", "Apple Juice (1000ml)");

      // Verify product image is visible and has correct source
      cy.get("img")
        .should("be.visible")
        .and("have.attr", "src")
        .and("include", "apple_juice.jpg");

      // Verify price is displayed correctly
      cy.get("p").should("contain", "1.99¤");

      // Look for reviews and expand if they exist
      // Look for reviews section
      cy.get("mat-expansion-panel-header")
        .contains("Reviews")
        .then(($header) => {
          // If reviews exist, click to expand
          if ($header.length > 0) {
            cy.wrap($header).click();

            // Wait for reviews to load (if there's an API call)
            cy.wait(2000); // Wait for 2 seconds to see the expanded content

            // Verify reviews panel is expanded
            cy.get("mat-expansion-panel").should("have.class", "mat-expanded");
          }
        });
      // Wait for a moment to see the expanded content
      cy.wait(2000);

      // Close the dialog and verify it's visible before clicking
      cy.get("button[mat-dialog-close]").should("be.visible").click();
    });

    // Final verification that dialog is fully closed
    cy.get("mat-dialog-container").should("not.exist");
  });
});
