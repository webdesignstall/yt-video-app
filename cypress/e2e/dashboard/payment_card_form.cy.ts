/// <reference types="cypress" />
/**
 * @module PaymentCardUpdateForm
 * @description Test suite for the Registration Tests.
 */

describe("Payment Card Update Form", () => {
  beforeEach(() => {
    cy.visit("/dashboard/payment"); // Navigate to the payment form page before each test
  });

  /**
   * @function shouldShowValidationErrorsOnEmptyFields
   * @description Verifies that submitting the form with empty required fields triggers validation errors.
   *              The test checks each required field to ensure it displays appropriate error messages.
   */
  it("should show validation errors for empty required fields", () => {
    // Verify that all fields are empty before submission
    cy.get('[data-cy="first-name"]').should("contain", "");
    cy.get('[data-cy="card-number"]').should("contain", "");
    cy.get('[data-cy="month"]').click({ force: true });
    cy.get('[data-cy="month"]').should("contain", 'Month'); // Check month placeholder
    cy.get('[data-cy="year"]').click({ force: true });
    cy.get('[data-cy="year"]').should("contain", 'Year'); // Check year placeholder
    cy.get('[data-cy="cvc"]').should("contain", "");

    // Submit the form
    cy.get("button[type='submit']").click({ force: true });

    // Check for the visibility of the error message indicating validation errors
    cy.get('[data-cy="error-message"]').should("be.visible");
  });

  /**
   * @function shouldSubmitFormWithValidData
   * @description Verifies that the form submits successfully when all required fields have valid data.
   *              Upon successful submission, a success message is displayed to the user.
   */
  it("should submit the form with valid data and display toast message", () => {
    cy.fixture("paymentCard").then((data) => {
      // Fill in the payment form with valid data from the fixture
      cy.get('[data-cy="first-name"]').type(data.validCard.firstName);
      cy.get('[data-cy="card-number"]').type(data.validCard.cardNumber);

      // Select the expiration month
      cy.get('[data-cy="month"]').click();
      cy.get('[role="option"]').contains(data.validCard.month).click();
      cy.get('[data-cy="month"]').should("contain", data.validCard.month); // Verify selected month

      // Select the expiration year
      cy.get('[data-cy="year"]').click();
      cy.get('[role="option"]').contains(data.validCard.year).click();
      cy.get('[data-cy="year"]').should("contain", data.validCard.year); // Verify selected year

      // Enter valid CVC
      cy.get('[data-cy="cvc"]').type("123");

      // Submit the form
      cy.get("button[type='submit']").click();

      // Check for the success message indicating successful payment
      cy.get("[data-cy='paymentApiSuccess']").should("be.visible");
      cy.get(".toast").should("contain", "You submitted the following values:"); // Verify toast message
    });
  });

  /**
   * @function shouldRejectInvalidCardNumber
   * @description Verifies that entering an invalid card number triggers validation errors.
   *              This includes cases where the card number does not meet the required format or length.
   */
  it("should show an error for an invalid card number", () => {
    cy.fixture("paymentCard").then((data) => {
      // Fill in the payment form with invalid card number
      cy.get('[data-cy="first-name"]').type(data.invalidCard.firstName);
      cy.get('[data-cy="card-number"]').type(data.invalidCard.cardNumber);

      // Select the expiration month
      cy.get('[data-cy="month"]').click();
      cy.get('[role="option"]').contains("January").click();
      cy.get('[data-cy="month"]').should("contain", "January"); // Verify selected month

      // Select the expiration year
      cy.get('[data-cy="year"]').click();
      cy.get('[role="option"]').contains("2024").click();
      cy.get('[data-cy="year"]').should("contain", "2024"); // Verify selected year

      // Enter invalid CVC
      cy.get('[data-cy="cvc"]').type(data.invalidCard.cvc);
      cy.get('button[type="submit"]').click();

      // Check for the error message indicating invalid card number
      cy.get("[data-cy='paymentApiError']").should("be.visible");
    });
  });

  /**
   * @function shouldNotAllowInvalidCVC
   * @description Verifies that the CVC field only accepts valid inputs consisting of exactly 3 digits.
   *              This test checks for any CVC input that does not match this requirement and triggers an error.
   */
  it("should not allow invalid CVC inputs", () => {
    cy.fixture("paymentCard").then((data) => {
      // Fill in the payment form with valid data
      cy.get('[data-cy="first-name"]').type(data.validCard.firstName);
      cy.get('[data-cy="card-number"]').type(data.validCard.cardNumber);
      cy.get('[data-cy="month"]').click();
      cy.get('[role="option"]').contains(data.validCard.month).click();
      cy.get('[data-cy="year"]').click();
      cy.get('[role="option"]').contains(data.validCard.year).click();

      // Enter an invalid CVC
      cy.get('[data-cy="cvc"]').type(data.invalidCvc);
      cy.get('button[type="submit"]').click();

      // Check for the error message related to CVC validation
      cy.get('[data-cy="error-message"]').should("be.visible").should('contain', 'CVC must be 3 digits');
    });
  });

  /**
   * @function shouldNotAllowInvalidCardNumber
   * @description Verifies that the card number input must contain exactly 16 digits.
   *              This test checks for any invalid card number inputs and expects a corresponding error message.
   */
  it("should show an error for card number not being 16 digits", () => {
    cy.fixture("paymentCard").then((data) => {
      // Test with an invalid card number (less than or more than 16 digits)
      cy.get('[data-cy="first-name"]').type(data.validCard.firstName);
      cy.get('[data-cy="card-number"]').type(data.shortCardNumber); // Use an invalid short card number

      // Select the expiration month
      cy.get('[data-cy="month"]').click();
      cy.get('[role="option"]').contains(data.validCard.month).click();

      // Select the expiration year
      cy.get('[data-cy="year"]').click();
      cy.get('[role="option"]').contains(data.validCard.year).click();

      // Enter a valid CVC
      cy.get('[data-cy="cvc"]').type(data.validCard.cvc);

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Check for the error message related to card number validation
      cy.get('[data-cy="error-message"]').should("be.visible").should('contain', 'Card number must be 16 digits');
    });
  });

  /**
   * @function shouldValidateCardExpirationDate
   * @description Verifies that the card expiration date is valid and not in the past.
   *              This test checks if the selected expiration date is in the future; otherwise, an error should be shown.
   */
  it("should not accept past expiration dates", () => {
    cy.fixture("paymentCard").then((data) => {
      // Fill in the payment form with valid data
      cy.get('[data-cy="first-name"]').type(data.validCard.firstName);
      cy.get('[data-cy="card-number"]').type(data.validCard.cardNumber);
      cy.get('[data-cy="month"]').click();
      cy.get('[role="option"]').contains(data.cardExpireMonth).click();
      cy.get('[data-cy="month"]').should("contain", data.cardExpireMonth); // Verify selected month

      // Select the expiration year
      cy.get('[data-cy="year"]').click();
      cy.get('[role="option"]').contains(data.cardExpireYear).click();
      cy.get('[data-cy="year"]').should("contain", data.cardExpireYear); // Verify selected year

      // Enter valid CVC
      cy.get('[data-cy="cvc"]').type(data.validCard.cvc);
      cy.get('button[type="submit"]').click();

      // Check for the error message indicating that the expiration date is invalid
      cy.get("[data-cy='paymentApiError']").should("be.visible");
    });
  });
});
