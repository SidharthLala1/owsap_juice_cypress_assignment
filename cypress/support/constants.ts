/**
 * File Created to add constants to import them in tests
 */

export const PRODUCTS_TO_ADD: ReadonlyArray<string> = [
  "Apple Juice",
  "Banana Juice",
  "Carrot Juice",
  "Green Smoothie",
  "Lemon Juice",
] as const;

export const TEST_ADDRESS: Readonly<AddressForm> = {
  fullName: "John Doe",
  street: "123 Test Street",
  mobile: "12345",
  zipCode: "12345",
  city: "Test City",
  state: "Test State",
} as const;

export const TEST_CARD: Readonly<CardDetails> = {
  cardholderName: "John Doe",
  cardNumber: "4111111111111111",
  expiryMonth: "1",
  expiryYear: "2080",
} as const;

// Application-specific selectors for better maintenance
export const SELECTORS = {
  LOGIN: {
    EMAIL_INPUT: "#email",
    PASSWORD_INPUT: "#password",
    LOGIN_BUTTON: "#loginButton",
  },
  SHOPPING: {
    CART_BUTTON: 'button[aria-label="Show the shopping cart"]',
    ADD_TO_BASKET: 'button[aria-label="Add to Basket"]',
    CHECKOUT_BUTTON: "#checkoutButton",
  },
  DIALOGS: {
    CLOSE_WELCOME: ".close-dialog",
    CLOSE_BANNER: 'button[aria-label="Close Welcome Banner"]',
  },
} as const;

export const TEST_CREDENTIALS: Readonly<TestCredentials> = {
  email: "test@gmailcom",
  password: "p@ssw0rd",
} as const;
