/// <reference types="cypress" />
/**
 * @module PaymentCardUpdateForm
 * @description Test suite for verifying the Payment Card Update Form functionalities.
 */

describe("Payment Card Update Form", () => {
  /**
   * @function beforeEach
   * @description Navigates to the payment form page before each test case.
   */
  beforeEach(() => {
    cy.visit("/dashboard/payment");
  });

  /**
   * @function shouldShowValidationErrorsOnEmptyFields
   * @description Tests that submitting the form with empty required fields triggers validation errors.
   *              It checks that appropriate error messages are displayed for each required field.
   */
  it("should show validation errors for empty required fields", () => {
    // Verify that all fields are empty before submission
    cy.get('[data-cy="first-name"]').should("have.value", "");
    cy.get('[data-cy="card-number"]').should("have.value", "");

    // Check month and year placeholders
    cy.get('[data-cy="month"]').click({ force: true }).should("contain", 'Month');
    cy.get('[data-cy="year"]').click({ force: true }).should("contain", 'Year');

    cy.get('[data-cy="cvc"]').should("have.value", "");

    // Submit the form
    cy.get("button[type='submit']").click({ force: true });

    // Assert that the error message is visible
    cy.get('[data-cy="error-message"]').should("be.visible");
  });

  /**
   * @function shouldSubmitFormWithValidData
   * @description Verifies that the form submits successfully when all required fields are filled with valid data.
   *              Upon successful submission, a success message is displayed to the user.
   */
  it("should submit the form with valid data and display toast message", () => {
    cy.fixture("dummyPaymentCardData").then((data) => {
      // Fill in the payment form with valid data from the fixture
      cy.get('[data-cy="first-name"]').clear().type(data.newCard.firstName);
      cy.get('[data-cy="card-number"]').clear().type(data.newCard.cardNumber);

      // Open the month dropdown and select the month
      cy.get('[data-cy="month"]').click();
      cy.get(`[role="option"][data-value="${data.newCard.month}"]`, { timeout: 10000 }).click();

      // Open the year dropdown and select the year
      cy.get('[data-cy="year"]').click();
      cy.get(`[role="option"][data-value="${data.newCard.year}"]`, { timeout: 10000 }).click();

      // Enter valid CVC
      cy.get('[data-cy="cvc"]').type(data.newCard.cvc);

      // Submit the form
      cy.get("button[type='submit']").click();

      // Assert that the success message is visible
      cy.get("[data-cy='paymentApiSuccess']").should("be.visible");
    });
  });

  /**
   * @function shouldFetchAndPopulateCardInformation
   * @description Tests that the payment card form fetches and populates existing card information correctly.
   */
  it("should fetch and populate the form with card information", () => {
    cy.fixture("payment-card").then((data) => {
      // Intercept the API call to fetch payment card data
      cy.intercept('GET', '/api/payment-card', {
        statusCode: 200,
        body: {
          data: {
            name: data?.name,
            number: data?.number,
            month: data?.month,
            year: data?.year,
            cvc: data?.cvc,
          },
        },
      }).as('getPaymentCard');

      // Wait for the API call to complete
      cy.wait('@getPaymentCard');

      // Assert that the fields are populated with the fetched data
      cy.get('[data-cy="first-name"]').should('have.value', data?.name);
      cy.get('[data-cy="card-number"]').should('have.value', data?.number);

      // Open the month dropdown and select the month
      cy.get('[data-cy="month"]').click();
      cy.get(`[role="option"][data-value="${data.month}"]`, { timeout: 10000 }).click();

      // Open the year dropdown and select the year
      cy.get('[data-cy="year"]').click();
      cy.get(`[role="option"][data-value="${data.year}"]`, { timeout: 10000 }).click();

      // Fill in the CVC
      cy.get('[data-cy="cvc"]').type(data.cvc);
    });
  });

  /**
   * @function shouldUpdateCardInformation
   * @description Verifies that the form updates the payment card information successfully when all required fields have valid data.
   *              A success message is displayed upon successful submission.
   */
  it("should update card information", () => {
    cy.fixture("dummyPaymentCardData").then((data) => {
      // Fill in the payment form with updated data from the fixture
      cy.get('[data-cy="first-name"]').clear().type(data.updateCard.firstName);
      cy.get('[data-cy="card-number"]').clear().type(data.updateCard.cardNumber);

      // Open the month dropdown and select the month
      cy.get('[data-cy="month"]').click();
      cy.get(`[role="option"][data-value="${data.updateCard.month}"]`, { timeout: 10000 }).click();

      // Open the year dropdown and select the year
      cy.get('[data-cy="year"]').click();
      cy.get(`[role="option"][data-value="${data.updateCard.year}"]`, { timeout: 10000 }).click();

      // Enter valid CVC
      cy.get('[data-cy="cvc"]').type(data.updateCard.cvc);

      // Submit the form
      cy.get("button[type='submit']").click();

      // Assert that the success message is visible
      cy.get("[data-cy='paymentApiSuccess']").should("be.visible");
    });
  });
});
