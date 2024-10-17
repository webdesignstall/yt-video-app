describe("Sign Up Form", () => {
  beforeEach(() => {
    // Intercept the API call and mock the response
    cy.intercept("POST", "/api/signup", {
      statusCode: 201,
      body: { message: "Account created successfully!" },
    }).as("signupUser");

    // Visit the signup page
    cy.visit("/signup");
  });

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


  it("should navigate to login page", () => {
    // Click the link to navigate to the login page
    cy.get("a").contains("Sign in").click();

    // Verify that the login page is displayed
    cy.url().should("include", "/login");
  });
});
