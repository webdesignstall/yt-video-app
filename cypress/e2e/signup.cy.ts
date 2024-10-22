/**
 * @module SignUpFormTests
 * @description Test suite for the Registration Tests.
 */
describe("Registration Tests", () => {
  /**
   * @function beforeEach
   * @description Sets up the test environment before each test by loading registration fixture data,
   * intercepting the signup API call, and mocking the API response for successful or failed signups.
   */
  beforeEach(() => {
      // Visit the signup page
      cy.visit('/signup');
    });

  /**
   * @function shouldShowValidationErrorsOnEmptyFields
   * @description Validates that appropriate error messages are displayed when the signup form is submitted with empty fields.
   */
  it("should show validation errors on empty fields", () => {
    // Click the submit button without filling out the form
    cy.get("button[type='submit']").click();

    // Ensure error states are visible
    cy.get('input[id="username"]').should("have.class", "is-invalid");
    cy.get('input[id="email"]').should("have.class", "is-invalid");
    cy.get('input[id="password"]').should("have.class", "is-invalid");

    // Assert that error messages are displayed
    cy.contains("Username is required").should("exist");
    cy.contains("Email is required").should("exist");
    cy.contains("Password is required").should("exist");
  });

  /**
   * @function shouldRegisterNewUserSuccessfully
   * @description Verifies the signup process by filling out the registration form and submitting it.
   * Asserts that the success message is displayed upon successful signup.
   */
  it('should register a new user successfully or error', () => {
    // Use the fixture data to fill out the form
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('input[id="username"]').type('jonyahmed19');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('input[id="email"]').type('jonyahmed19@gmail.com');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('#password').type('password123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert the success message
    cy.contains('Account created successfully!').should('exist');
  });

  /**
   * @function shouldShowErrorsForExistingUsernameAndEmail
   * @description Simulates a signup error when the username or email already exists.
   * Mocks the API response to return a 400 error and verifies that the corresponding error messages are displayed.
   */
  it('should show errors for existing username and email', () => {
    // Use the fixture data to fill out the form
    cy.fixture('db/registration').then((registrationData) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cy.get('input[id="username"]').clear().type(registrationData[0].username);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cy.get('input[id="email"]').clear().type('new@gmail.com');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cy.get('input[id="password"]').clear().type('password1111');

      // Submit the form
      cy.get('button[type="submit"]').click();
      // Assert the error messages
      cy.contains('Username already taken').should('exist');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cy.get('input[id="username"]').clear().type('newusername');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cy.get('input[id="email"]').clear().type(registrationData[0].email);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cy.get('input[id="password"]').clear().type('password1111');
      // Submit the form
      cy.get('button[type="submit"]').click();
      cy.contains('Email already taken').should('exist');

    })
  });


  /**
   * @function shouldShowValidationErrorForInvalidEmail
   * @description Test case to show validation error for an invalid email format.
   * Ensures that submitting the form with an invalid email displays the appropriate error message.
   */
  it("should show validation error for invalid email", () => {
    // Fill out the form with an invalid email
    cy.get('input[id="username"]').type("johndoe");
    cy.get('input[id="email"]').type("invalid-email");
    cy.get('input[id="password"]').type("password123");
    // Click the submit button
    cy.get("button[type='submit']").click();

    // Assert that the invalid email message is displayed
    cy.contains("Invalid email format").should("exist");
  });

  /**
   * @function shouldShowValidationErrorForShortPassword
   * @description Tests that submitting the form with a short password displays the appropriate error message.
   */
  it("should show validation error for short password", () => {
    // Fill out the form with a short password
    cy.get('input[id="username"]').type("johndoe");
    cy.get('input[id="email"]').type("johndoe@example.com");
    cy.get('input[id="password"]').type("short");

    // Click the submit button
    cy.get("button[type='submit']").click();

    // Assert that the short password message is displayed
    cy.contains("Password must be at least 8 characters long").should("exist");
  });

  /**
   * @function shouldNavigateToLoginPage
   * @description Verifies that clicking the "Sign in" link navigates to the login page.
   */
  it("should navigate to login page", () => {
    // Click the link to navigate to the login page
    cy.get("a").contains("Sign in").click();

    // Verify that the login page is displayed
    cy.url().should("include", "/login");
  });
});
