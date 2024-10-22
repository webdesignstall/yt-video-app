/// <reference types="cypress" />

/**
 * @module ChannelSettingsFormTests
 * @description Test suite for the Channel Settings form.
 */
describe('Channel Create Form', () => {

    /**
     * @function beforeEach
     * @description Sets up the test environment before each test.
     * Loads form data fixture and navigates to the Channel Settings page.
     */
    beforeEach(() => {
        cy.visit('/dashboard/channels');
        // Open the dropdown
        cy.get('button[aria-label="Select a team"]').click();

        // Check if the dropdown is visible
        cy.get('[role="combobox"]').should('be.visible');

        // Select the "Create Channel" option
        cy.get("[data-cy='channel-create-modal-open-btn']").click();
    });

    /**
     * @function it
     * @description Ensures form validation errors are displayed for empty fields.
     */
    it("should display form validation errors for empty fields", () => {
        cy.get("form").submit();
        cy.get('[data-cy="apiResponse-msg"]').should('be.visible');
    });

    /**
     * @function it
     * @description Submits the form with valid inputs and displays a success or error message.
     * Verifies the correct radio button is selected based on fixture data.
     */
    it("should display successfully or error message upon submitting the form", () => {
        cy.fixture('dummyChannelCreateData').then(data => {
            // Fill out the text fields with fixture data
            cy.get('[data-cy="channel-name"]').clear().type(data.name);
            cy.get('[data-cy="username"]').clear().type(data.username);
            cy.get('[data-cy="description"]').clear().type(data.description);
            cy.get('[data-cy="price_per_month"]').clear().type(data.price_per_month);

            // Select the radio button based on the option value
            if (data.option === '1') {
                cy.contains('Everything').click();
            } else if (data.option === '2') {
                cy.contains('Ignoring').click();
            }

            // Verify the correct radio button is checked
            cy.get(`input[value="${data.option}"]`).should('be.checked');

            // Submit the form
            cy.get("[data-cy='channel-form']").submit();

            // Verify the API response message is visible
            cy.get("[data-cy='apiResponse-msg']").should('be.visible');
        });
    });

});
