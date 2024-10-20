/// <reference types="cypress" />
/**
 * @module User Profile Form
 * @description Test suite for the Profile form.
 */
/**
 * Profile Form Test Suite.
 * This suite contains tests for the profile form functionality including validation
 * of username, email, bio, and URLs.
 */
describe('Profile Form', () => {
  /**
   * Runs before each test to visit the dashboard page.
   */
  beforeEach(() => {
    cy.visit('/dashboard'); // Adjust the URL to where the form is located
  });

  /**
   * @function shouldSubmitFormWithValidData
   * @description Test to submit the form with valid data and check for success message.
   */
  it('should submit form with valid data and show success message', () => {
    cy.fixture('profileFormData').then((data) => {
      // Fill in form with valid data
      cy.get('input[name="username"]').clear().type(data.validData.username);

      // Interact with the email dropdown (Select component)
      cy.get('[role="combobox"]').click(); // Open the dropdown
      cy.contains(data.validData.email).click({ force: true }); // Select the email from dropdown

      // Fill in other fields
      cy.get('textarea[name="bio"]').clear().type(data.validData.bio);
      cy.get('input[name="urls.0.value"]').clear().type(data.validData.urls[0].value);

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Assert success message
      cy.get('.toast').should('be.visible').and('contain', 'You submitted the following values:');
    });
  });

  /**
   * @function shouldShowValidationErrorsOnEmptyFields
   * @description Verifies that submitting the form with empty fields triggers validation errors.
   */
  it('should show validation error for empty fields', () => {
    cy.fixture('profileFormData').then((data) => {
      // Attempt to submit form with empty username
      cy.get('input[name="username"]').clear();

      cy.get('[role="combobox"]').click(); // Open the dropdown
      cy.contains(data.validData.email).click({ force: true });

      cy.get('textarea[name="bio"]').clear();
      cy.get('input[name="urls.0.value"]').clear();

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Assert validation error
      cy.get('[data-cy="error-message"]').should('be.visible');
    });
  });

  /**
   * @function shouldShowValidationErrorWhenUsernameChangedWithin30Days
   * @description Test to show validation error when username is changed within 30 days.
   */
  it('should show validation error when username is changed within 30 days', () => {
    cy.fixture('profileFormData').then((data) => {
      // Fill in the form with valid username
      cy.get('input[name="username"]').clear().type(data.validData.username);

      // Interact with the email select dropdown
      cy.get('[role="combobox"]').click();
      cy.contains(data.validData.email).click({ force: true });

      // Fill in other valid fields
      cy.get('textarea[name="bio"]').clear().type(data.validData.bio);
      cy.get('input[name="urls.0.value"]').clear().type(data.validData.urls[0].value);

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Simulate the scenario where the username change period (30 days) has not passed
      if (data.invalidData.usernameChangesDays < 30) {
        // Assert the validation error message for trying to change the username within 30 days
        cy.get('[data-cy="error-message"]').should('be.visible')
            .and('contain', 'You can only change this once every 30 days.');
      }
    });
  });

  /**
   * @function shouldShowValidationErrorForInvalidEmailSelection
   * @description Test to show validation error for selecting an invalid email.
   */
  it('should show validation error for invalid email selection', () => {
    cy.fixture('profileFormData').then((data) => {
      // Fill in valid username
      cy.get('input[name="username"]').clear().type(data.validData.username);

      // Interact with the email select dropdown
      cy.get('[role="combobox"]').click(); // Open the dropdown

      // Select an invalid email option
      cy.contains('[role="option"]', data.invalidData.email).click({ force: true });

      // Fill in other valid fields
      cy.get('textarea[name="bio"]').clear().type(data.validData.bio);
      cy.get('input[name="urls.0.value"]').clear().type(data.validData.urls[0].value);

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Assert validation error for invalid email
      cy.get('[data-cy="error-message"]').should('be.visible').and('contain', 'Invalid email');
    });
  });

  /**
   * @function shouldShowValidationErrorForBioTooShort
   * @description Test to show validation error for bio being too short.
   */
  it('should show validation error for bio being too short', () => {
    cy.fixture('profileFormData').then((data) => {
      // Fill in form with a short bio
      cy.get('input[name="username"]').clear().type(data.validData.username);

      // Interact with the email select dropdown
      cy.get('[role="combobox"]').click(); // Open the dropdown
      cy.contains(data.validData.email).click({ force: true });

      // Use a short bio
      cy.get('textarea[name="bio"]').clear().type('Hi');
      cy.get('input[name="urls.0.value"]').clear().type(data.validData.urls[0].value);

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Assert validation error for bio
      cy.get('[data-cy="error-message"]').should('be.visible').and('contain', 'Bio must be at least 4 characters.');
    });
  });

  /**
   * @function shouldShowValidationErrorForInvalidUrl
   * @description Test to show validation error for invalid URL.
   */
  it('should show validation error for invalid URL', () => {
    cy.fixture('profileFormData').then((data) => {
      // Fill in form with an invalid URL
      cy.get('input[name="username"]').clear().type(data.validData.username);

      // Interact with the email select dropdown
      cy.get('[role="combobox"]').click(); // Open the dropdown
      cy.contains(data.validData.email).click({ force: true });

      // Use an invalid URL
      cy.get('textarea[name="bio"]').clear().type(data.validData.bio);
      cy.get('input[name="urls.0.value"]').clear().type('invalid-url');

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Assert validation error for URL
      cy.get('[data-cy="error-message"]').should('be.visible').and('contain', 'Please enter a valid URL.');
    });
  });
});
