/**
 * @module SignInFormTests
 * @description Test suite for the Sign-In form.
 */
describe("Sign In Form", () => {
  /**
   * @type {Object} loginData - Holds the login fixture data for valid and invalid users.
   */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
  let loginData;

  /**
   * @function beforeEach
   * @description Sets up the test environment before each test.
   * Loads login fixture data, intercepts the login API call, and mocks the response.
   */
  beforeEach(() => {
    // Load the login fixture data
    cy.fixture('login').then((data) => {
      loginData = data; // Assign to the variable
    });

    // Intercept the login API and mock the response
    cy.intercept('POST', '/api/login', (req) => {
      const { email, password } = req.body;

      // Check against the loaded login data
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (email === loginData.validUser.email && password === loginData.validUser.password) {
        req.reply({
          statusCode: 200,
          body: { message: "Login Successful!" }
        });
      } else {
        req.reply({
          statusCode: 401,
          body: { error: "Invalid credentials" }
        });
      }
    }).as('loginApi');

    // Visit the login page
    cy.visit('/login');
  });

  /**
   * @function shouldShowValidationErrorsOnEmptyFields
   * @description Verifies that submitting the form with empty fields triggers validation errors.
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
   * @description Simulates a login error with invalid credentials.
   * Mocks the API response to return a 401 error and verifies the displayed error message.
   */
  it('should show error with invalid credentials', () => {
    // Use the fixture data to fill out the form
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('input[id="email"]').type(loginData.invalidUser.email);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('input[id="password"]').type(loginData.invalidUser.password);

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert the invalid credentials error
    cy.contains('Invalid credentials').should('exist');
  });

  /**
   * @function shouldRedirectToDashboardAfterLogin
   * @description Verifies the sign-in process with valid credentials.
   * Ensures that after a successful login, the user is redirected to the dashboard.
   */
  it('should login successfully with valid credentials', () => {
    // Use the fixture data to fill out the form
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('input[id="email"]').type(loginData.validUser.email);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('input[id="password"]').type(loginData.validUser.password);

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert the successful login message
    cy.contains('Login Successfully!').should('exist');

    // Assert that the user is redirected to the dashboard page
    cy.url().should("include", "/dashboard");

    // Optionally, check if a specific element in the dashboard exists
    cy.get("h2").should("contain.text", "Dashboard"); // Adjust if necessary based on your dashboard structure
  });
});
