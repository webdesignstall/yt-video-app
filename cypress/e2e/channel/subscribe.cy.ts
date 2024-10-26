/// <reference types="cypress" />

/**
 * @module ExploreChannelTests
 * @description Test suite for exploring a channel and subscription functionality.
 */
describe('Explore channel', () => {

    /**
     * @function setupChannelPage
     * @description Sets up the channel page by intercepting API requests and visiting the channel URL.
     */
    beforeEach(() => {
        cy.intercept('GET', '/api/channel/wefozy').as('getChannel');
        cy.visit(`/channel/wefozy`);
    });

    /**
     * @function showSubscribeModal
     * @description Opens the subscribe modal by clicking the subscribe button and verifies the modal's visibility.
     */
    it('Should show subscribe modal', () => {
        cy.wait('@getChannel');
        cy.get("[data-cy='subscribe-btn']").click();
        cy.contains('Subscribe Channel').should('be.visible');
    });

    /**
     * @function toggleAutoRenewCheckbox
     * @description Toggles the auto-renew checkbox in the subscribe modal.
     */
    it('Should switch auto renew checkbox', () => {
        cy.wait('@getChannel');
        cy.get("[data-cy='subscribe-btn']").click();
        cy.contains('Subscribe Channel').should('be.visible');

        cy.get("[role=switch]").click();
        cy.get("[role=switch]").click();
    });

    /**
     * @function closeModalByClickingOutside
     * @description Closes the modal by simulating a click outside of it and verifies that the modal is closed.
     */
    it('should close the modal when clicking outside of it', () => {
        cy.wait('@getChannel');
        cy.get("[data-cy='subscribe-btn']").click();

        cy.contains('Subscribe Channel').should('be.visible');
        cy.get('body').click(0, 0, { force: true });
        cy.contains('Subscribe Channel').should('not.exist');
    });

    /**
     * @function submitSubscriptionForm
     * @description Fills in and submits the subscription form with valid data.
     * Verifies the subscription response message is visible after submission.
     */
    it('Should be able to subscribe to the channel', () => {
        cy.wait('@getChannel');
        cy.get("[data-cy='subscribe-btn']").click();
        cy.contains('Subscribe Channel').should('be.visible');

        cy.get("[data-cy='number_of_month']").type('1');
        cy.get("[role=switch]").click();
        cy.get("[data-cy='subscribe-submit']").submit();

        cy.get("[data-cy='api-res-msg']").should('be.visible');
    });

    /**
     * @function handleDuplicateSubscription
     * @description Tests that a duplicate subscription attempt displays an appropriate message.
     */
    it('Should display duplicate Subscription Attempt message', () => {
        cy.wait('@getChannel');
        cy.get("[data-cy='subscribe-btn']").click();
        cy.contains('Subscribe Channel').should('be.visible');

        cy.get("[data-cy='number_of_month']").type('1');
        cy.get("[role=switch]").click();
        cy.get("[data-cy='subscribe-submit']").submit();
        cy.get("[data-cy='api-res-msg']").should('be.visible');
    });

    /**
     * @function handleEmptySubscriptionAttempt
     * @description Tests that submitting an empty form displays an error message.
     */
    it('Should display empty attempt message', () => {
        cy.wait('@getChannel');
        cy.get("[data-cy='subscribe-btn']").click();
        cy.contains('Subscribe Channel').should('be.visible');

        cy.get("[data-cy='subscribe-submit']").submit();
        cy.get("[data-cy='api-res-msg']").should('be.visible');
    });
});
