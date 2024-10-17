/**
 * @module SignUpFormTests
 * @description Test suite for the Sign Up form.
 */
describe("Sign Up Form", () => {
  /**
   * @function beforeEach
   * @description Runs before each test to intercept the signup API call and visit the signup page.
   * Mocks the API response for a successful signup.
   */
  beforeEach(() => {
    // Intercept the API call and mock the response
    cy.intercept("POST", "/api/signup", {
      statusCode: 201,
      body: { message: "Account created successfully!" },
    }).as("signupUser");

    // Visit the signup page
    cy.visit("/signup");
  });

  /**
   * @function shouldFillOutSignupFormAndSubmit
   * @description Test case to fill out the signup form and submit it.
   * Ensures that after a successful signup, the success message is displayed.
   */
  it("should fill out the signup form and submit", () => {
    // Fill out the form
    cy.get('input[id="username"]').type("johndoe");
    cy.get('input[id="email"]').type("johndoe@example.com");
    cy.get('input[id="password"]').type("password123");

    // Click the submit button
    cy.get("button[type='submit']").click();

    // Wait for the signup API call and assert the response
    cy.wait("@signupUser").its("response.statusCode").should("eq", 201);

    // Assert that the user is redirected or shown a success message
    cy.contains("Account created successfully!").should("exist");
  });

  /**
   * @function shouldShowValidationErrorsOnEmptyFields
   * @description Test case for showing validation errors when the signup form is submitted with empty fields.
   * Verifies that appropriate error messages are displayed for required fields.
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
   * @function shouldShowUsernameAndEmailAlreadyExistsErrors
   * @description Test case to simulate a signup error when the username or email already exists.
   * Mocks the API response to return a 400 error and verifies that the corresponding error messages are shown.
   */
  it("should show username and email already exists errors", () => {
    // Intercept the API call for this test with error response
    cy.intercept("POST", "/api/signup", {
      statusCode: 400,
      body: {
        usernameError: "Username already taken",
        emailError: "Email already taken",
      },
    }).as("signupUserWithErrors");

    // Fill out the form
    cy.get('input[id="username"]').type("takenusername");
    cy.get('input[id="email"]').type("takenemail@example.com");
    cy.get('input[id="password"]').type("password123");

    // Submit the form
    cy.get("button[type='submit']").click();

    // Wait for the signup API call
    cy.wait("@signupUserWithErrors");

    // Assert that error messages are displayed
    cy.contains("Username already taken").should("exist");
    cy.contains("Email already taken").should("exist");
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
   * @description Test case to show validation error for a short password.
   * Ensures that submitting the form with a short password displays the appropriate error message.
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
   * @description Test case to verify that clicking the "Sign in" link navigates to the login page.
   */
  it("should navigate to login page", () => {
    // Click the link to navigate to the login page
    cy.get("a").contains("Sign in").click();

    // Verify that the login page is displayed
    cy.url().should("include", "/login");
  });
});
