/**
 * @module SignInFormTests
 * @description Test suite for the Sign In form.
 */
describe("Sign In Form", () => {
  /**
   * @function beforeEach
   * @description Runs before each test to intercept the login API call and visit the login page.
   * Mocks the API response for a successful login.
   */
  beforeEach(() => {
    // Intercept the API call and mock the response
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: { message: "Login Successfully!" },
    }).as("loginUser");

    // Visit the login page
    cy.visit("/login");
  });

  /**
   * @function shouldShowValidationErrorsOnEmptyFields
   * @description Test case for validating that empty form fields show error messages.
   * Verifies that submitting without filling out the form triggers validation errors.
   */
  it("should show validation errors on empty fields", () => {
    // Click the submit button without filling out the form
    cy.get("button[type='submit']").click();

    // Ensure error states are visible
    cy.get('input[id="email"]').should("have.class", "is-invalid");
    cy.get('input[id="password"]').should("have.class", "is-invalid");

    // Assert that error messages are displayed
    cy.contains("Email is required").should("exist");
    cy.contains("Password is required").should("exist");
  });

  /**
   * @function shouldShowLoginError
   * @description Test case to simulate a login error with invalid credentials.
   * Mocks the API response to return a 400 error and verifies that the error message is shown.
   */
  it("should show login error", () => {
    // Intercept the API call for this test with error response
    cy.intercept("POST", "/api/login", {
      statusCode: 400,
      body: {
        error: "Invalid credentials",
      },
    }).as("loginUserWithErrors");

    // Fill out the form with invalid credentials
    cy.get('input[id="email"]').type("invalid@example.com");
    cy.get('input[id="password"]').type("password");

    // Submit the form
    cy.get("button[type='submit']").click();

    // Wait for the login API call
    cy.wait("@loginUserWithErrors");

    // Assert that the error message is displayed
    cy.contains("Invalid credentials").should("exist");
  });

  /**
   * @function shouldRedirectToDashboardAfterLogin
   * @description Test case to verify the sign in process with valid credentials.
   * Ensures that after a successful login, the user is redirected to the dashboard.
   */
  it("should fill out the sign in form and redirect to the dashboard after login", () => {
    // Fill out the form with valid credentials
    cy.get('input[id="email"]').type("johndoe@example.com");
    cy.get('input[id="password"]').type("password123");

    // Click the submit button
    cy.get("button[type='submit']").click();

    // Wait for the login API call and assert the response
    cy.wait("@loginUser").its("response.statusCode").should("eq", 200);

    // Assert that the user is redirected to the dashboard page
    cy.url().should("include", "/dashboard"); // Check that the user is redirected to '/dashboard'

    // Optionally, check if a specific element in the dashboard exists to ensure successful navigation
    cy.get("h2").should("contain.text", "Dashboard"); // Adjust if necessary based on your dashboard structure
  });
});
