/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByTestId(
      dataTestAttribute?: string,
      args?: any
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to handle the initial login process
     * @param email - The email to login with
     * @param password - The password to login with
     */
    login(email: string, password: string): Chainable<void>;

    /**
     * Custom command to register a user using faker data
     * @example cy.registerUser()
     */
    registerUser(): Chainable<UserData>;
    /**
     * Custom command to wait for products API response.
     * This command intercepts product API requests and waits for their completion.
     * @example
     * cy.waitForProducts()
     */
    waitForProducts(): Chainable<void>;

    /**
     * Custom command to select a product from the grid by its name
     * @example
     * cy.selectProduct('Apple Juice (1000ml)')
     * @param productName - The exact name of the product as it appears in the alt attribute
     */
    selectProduct(productName: string): Chainable<void>;

    /**
     * Custom command to intercept and verify product reviews API
     * @param productId - The ID of the product to get reviews for
     * @example cy.interceptProductReviews(1)
     */

    interceptProductReviews(productId: number): Chainable<null>;

    /**
     * Custom command to add a new address during checkout
     * @param address - The address details to be added
     */
    addNewAddress(address: AddressForm): Chainable<void>;

    /**
     * Custom command to add a new payment card
     * @param cardDetails - The card details to be added
     */
    addNewCard(cardDetails: CardDetails): Chainable<void>;

    /**
     * Custom command to add a product to basket and verify
     * @param productName - Name of the product to add
     * @param expectedCount - Expected number in cart after adding
     */
    addProductToBasket(
      productName: string,
      expectedCount: number
    ): Chainable<void>;
  }
}

interface AddressForm {
  fullName: string;
  street: string;
  mobile: string;
  zipCode: string;
  city: string;
  state: string;
}

interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
}

// Define a TypeScript interface for the UserData
interface UserData {
  email: string;
  password: string;
  securityAnswer: string;
}

// Price related selectors and aliases
interface PriceSelectors {
  totalPrice: string;
  priceAfterIncrease: string;
}

type PriceAliases = "priceAfterIncrease";

interface TestCredentials {
  email: string;
  password: string;
}
