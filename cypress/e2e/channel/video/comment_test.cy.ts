/// <reference types="cypress" />

/**
 * @module VideoCommentTests
 * @description Test suite for submitting comments on a single video page.
 */
describe('Video Comment Tests', () => {

    /**
     * @function setupSingleVideoPage
     * @description Sets up the single video page by intercepting API requests and navigating to the video URL.
     */
    beforeEach(() => {
        cy.intercept('GET', '/api/channel/kizuqyhe').as('getVideo');
        cy.visit(`/channel/kizuqyhe/video?id=PV-8782`);
    });



    /**
     * @function submitCommentForm
     * @description Enters and submits a comment, then verifies that the comment appears as the latest comment.
     */
    it('Should submit a comment and verify its appearance in the comments section', () => {
        cy.wait('@getVideo');

        const content = 'Great video! Thanks for sharing.';

        cy.get("[data-cy='comment-input']").clear().type(content);
        cy.get("[data-cy='comment-form']").submit();

        // Wait for the comment to be submitted and page to update
        cy.wait('@getVideo');
        cy.get("[data-cy='content']").last().contains('Great video! Thanks for sharing.');
    });


    /**
     * @function verifyCommentsSection
     * @description Checks if the comments section is visible and verifies that it contains at least one comment.
     */
    it('Should display the comments section with at least one comment', () => {
        cy.wait('@getVideo');

        // Ensure the comments section is visible
        cy.get("[data-cy='comments-section']").should('be.visible');

        // Verify that there's at least one comment in the section
        cy.get("[data-cy='content']").its('length').should('be.gte', 1);
    });

});
