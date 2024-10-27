/// <reference types="cypress" />


describe('Single Video Page Channel Subscribe Test', () => {

    /**
     * @function setupSignleVideoPage
     * @description Sets up the channel page by intercepting API requests and visiting the channel URL.
     */
    beforeEach(() => {
        cy.intercept('GET', '/api/channel/kizuqyhe').as('getVideo');
        cy.visit(`/channel/kizuqyhe/video?id=PV-8782`);
    });

    /**
     * @function showSubscribeModal
     * @description Opens the subscribe modal by clicking the subscribe button and verifies the modal's visibility.
     */
    it('Should show subscribe modal', () => {
        cy.wait('@getVideo');
        cy.get("[data-cy='subscribe-btn']").click();
        cy.contains('Subscribe Channel').should('be.visible');
    });

    /**
     * @function toggleAutoRenewCheckbox
     * @description Toggles the auto-renewal checkbox in the subscribe modal.
     */
    it('Should switch auto-renew checkbox', () => {
        cy.wait('@getVideo');
        cy.get("[data-cy='subscribe-btn']").click();
        cy.contains('Subscribe Channel').should('be.visible');

        // Verify initial state of the checkbox (assuming it's unchecked initially)
        cy.get("[role=switch]").should('have.attr', 'aria-checked', 'false');

        // Toggle the checkbox to enable auto-renew
        cy.get("[role=switch]").click();
        cy.get("[role=switch]").should('have.attr', 'aria-checked', 'true');

        // Toggle the checkbox again to disable auto-renew
        cy.get("[role=switch]").click();
        cy.get("[role=switch]").should('have.attr', 'aria-checked', 'false');
    });


    /**
     * @function closeSubscribeModalByClickingOutside
     * @description Closes the subscribe modal by simulating a click outside of it and verifies that the modal is closed.
     */
    it('should close the subscribe modal when clicking outside of it', () => {
        // Wait for the video data to load before interacting with the modal
        cy.wait('@getVideo');

        // Open the subscribe modal by clicking the subscribe button
        cy.get("[data-cy='subscribe-btn']").click();

        // Verify that the subscribe modal is visible
        cy.contains('Subscribe Channel').should('be.visible');

        // Simulate a click outside the modal to close it (clicking in the top-left corner of the body)
        cy.get('body').click(0, 0, { force: true });

        // Verify that the subscribe modal is no longer visible after clicking outside
        cy.contains('Subscribe Channel').should('not.exist');
    });


    /**
     * @function submitSubscriptionForm
     * @description Fills in and submits the subscription form with valid data.
     * Verifies the subscription response message is visible after submission.
     */
    it('Should be able to subscribe to the channel', () => {
        cy.wait('@getVideo');
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
        cy.wait('@getVideo');
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
        cy.wait('@getVideo');
        cy.get("[data-cy='subscribe-btn']").click();
        cy.contains('Subscribe Channel').should('be.visible');

        cy.get("[data-cy='subscribe-submit']").submit();
        cy.get("[data-cy='api-res-msg']").should('be.visible');
    });
});
