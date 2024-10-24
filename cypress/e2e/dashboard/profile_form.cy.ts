/// <reference types="cypress" />
/**
 * @module User Profile Form
 * @description Test suite for the Profile form.
 */

/**
 * Profile Form Test Suite.
 * This suite contains tests for the profile form functionality, including validation
 * of username, email, bio, and URLs.
 */
describe('Profile Update Form', () => {
  /**
   * Runs before each test to visit the dashboard page and set up API interception.
   */
  beforeEach(() => {
    cy.intercept('GET', '/api/profile-update').as('getProfileUpdate');
    cy.visit('/dashboard'); // Adjust the URL to where the form is located
    cy.wait('@getProfileUpdate'); // Wait for the GET request to complete
  });

  /**
   * @function shouldShowValidationErrorsOnEmptyFields
   * @description Verifies that submitting the form with empty fields triggers validation errors.
   */
  it('should show validation error for empty fields', () => {
    // Attempt to submit form with empty username
    cy.get("[data-cy='username']").clear({ force: true });

    cy.get('[role="combobox"]').click(); // Open the dropdown
    cy.contains('jonyahmed19@gmail.com').click({ force: true });

    cy.get("[data-cy='bio']").clear();
    cy.get('input[name="urls.0.value"]').clear({ force: true });

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert validation error
    cy.get('[data-cy="error-message"]').should('be.visible');
  });

  /**
   * @function shouldSubmitFormWithValidData
   * @description Test to submit the form with valid data and check for a success message.
   */
  it('should send a POST request and handle the response correctly', () => {
    cy.fixture('db/registration').then((data) => {
      // Fill in the form fields
      cy.get('[role="combobox"]').click(); // Open dropdown
      cy.contains(data[0].email).click({ force: true }); // Select email

      cy.get("[data-cy='bio']").clear().type('Update'.repeat(10)); // Fill in the bio field

      if (!data[0]?.urls?.length) {
        cy.get("[data-cy='url-add-btn']").click(); // Click add URL button
        cy.get('input[name="urls.0.value"]').clear().type('http://localhost:3000'); // Fill in the URL field
      } else {
        cy.get('input[name="urls.0.value"]').clear().type('http://localhost:4000');
      }

      // Submit the form
      cy.get('button[type="submit"]').click();

      cy.get("[data-cy='apiResponseMsg']").should('be.visible');
    });
  });

  /**
   * @function shouldShowValidationErrorWhenUsernameChangedWithin30Days
   * @description Test to show validation error when username is changed within 30 days.
   */
  it('should show validation error when username is changed within 30 days', () => {
    cy.fixture('db/registration').then((data) => {
      // Set the value of the hidden 'id' field
      cy.get("[data-cy='id']").invoke('val', data[0].id);

      // Fill in other form fields
      cy.get("[data-cy='username']").clear().type('changeusername');

      // Open the dropdown and select email
      cy.get('[role="combobox"]').click({ force: true });
      cy.contains(data[0].email).click({ force: true });

      // Fill in the bio field
      cy.get("[data-cy='bio']").type('Update'.repeat(10));

      // Submit the form
      cy.get('button[type="submit"]').click();
      cy.get("[data-cy='apiResponseMsg']").should('be.visible');
    });
  });

  /**
   * @function shouldShowValidationErrorForBioTooShort
   * @description Test to show validation error for bio being too short.
   */
  it('should show validation error for bio being too short', () => {
    // Use a short bio
    cy.get('textarea[name="bio"]').clear().type('Hi');
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible').and('contain', 'Bio must be at least 4 characters.');

    // Use an excessively long bio
    cy.get('textarea[name="bio"]').clear().type('Hi'.repeat(161));
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible');
  });
});
