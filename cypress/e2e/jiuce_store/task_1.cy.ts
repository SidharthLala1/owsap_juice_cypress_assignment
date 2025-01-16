/// <reference types="cypress" />
describe("Juice Shop Products Page Pagination", () => {
  const MAX_ITEMS_PER_PAGE = 48;
  it("should display maximum 48 items per page when selected", () => {
    // Scroll to the bottom where pagination controls are located
    cy.get("mat-paginator").scrollIntoView();

    // Click the items per page dropdown
    cy.get("mat-paginator .mat-select-trigger").click();

    // Select 48 items per page option
    cy.get("mat-option").contains(MAX_ITEMS_PER_PAGE.toString()).click();

    // Verify the items per page text shows the correct value
    cy.get("mat-paginator").should("contain", "48");

    // Verify the pagination range
    cy.get("mat-paginator .mat-paginator-range-label").should(($label) => {
      const rangeText = $label.text();
      expect(rangeText).to.include("1 – 37 of 37");
    });

    // Additional verification that all items are displayed
    cy.get("mat-paginator .mat-paginator-navigation-next").should(
      "be.disabled"
    );
    cy.get("mat-paginator .mat-paginator-navigation-previous").should(
      "be.disabled"
    );
    // Get all grid items and verify count
    cy.get("mat-grid-tile").should("have.length", 37);

    // Collect all item names and verify uniqueness
    cy.get(".item-name").then(($elements) => {
      // Extract text content from each element
      const itemNames = Array.from($elements).map((el) =>
        el.textContent.trim()
      );

      // Verify all names are unique
      const uniqueNames = new Set(itemNames);
      expect(uniqueNames.size).to.equal(itemNames.length);

      // Log the names for verification
      cy.log(`Found ${itemNames.length} unique product names`);

      // Additional verification: specific products should exist
      const expectedProducts = [
        "Apple Juice (1000ml)",
        "Banana Juice (1000ml)",
        "Orange Juice (1000ml)",
      ];

      expectedProducts.forEach((product) => {
        expect(itemNames).to.include(product);
      });
    });
  });
});
