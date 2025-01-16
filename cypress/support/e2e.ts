import "./commands";

Cypress.on("uncaught:exception", (e, runnable) => {
  console.log("error is", e);
  console.log("runnable", runnable);
  if (e.message.includes("error")) {
    // we expected this error, so let's ignore it
    // and let the test continue
    return false;
  }
});

before(() => {});

after(() => {});

beforeEach(() => {
  //cy.clearCookies();
  //cy.clearLocalStorage();
  // Visit the application URL
  cy.visit("/");
});
