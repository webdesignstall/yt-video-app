/// <reference types="cypress" />

/**
 * @module VideoCommentTests
 * @description Test suite for submitting comments on a single video page.
 */
describe('Video Comment Tests', () => {

    /**
     * @function setupSingleVideoPage
     * @description Sets up the single video page by intercepting API requests and navigating to the video URL.
     *
     */
    beforeEach(() => {
        cy.intercept('GET', '/api/channel/kizuqyhe').as('getVideo');
        cy.visit(`/channel/kizuqyhe/video?id=PV-8782`);
        cy.wait('@getVideo');
    });

    /**
     * Checks if the video player is rendered and visible on the page.
     * @name shouldRenderVideoPlayer
     * @function
     */
    it('should render the video player', () => {
        cy.get('iframe').should('be.visible').and('have.attr', 'src').should('contain', 'https://www.youtube.com/embed/40AYjP0_xdE');
    });


    /**
     * @function submitCommentForm
     * @description Enters and submits a comment, then verifies that the comment appears as the latest comment.
     */
    it('Should submit a comment and verify its appearance in the comments section', () => {

        const content = 'Great video! Thanks for sharing.';

        cy.get("[data-cy='comment-input']").clear().type(content);
        cy.get("[data-cy='comment-form']").submit();

        // Wait for the comment to be submitted and page to update
        cy.wait('@getVideo');
        cy.get("[data-cy='content']").first().should('have.text',content);
    });


    /**
     * @function verifyCommentsSection
     * @description Checks if the comments section is visible and verifies that it contains at least one comment.
     */
    it('Should display the comments section with at least one comment', () => {
        // Ensure the comments section is visible
        cy.get("[data-cy='comments-section']").should('be.visible');

        // Verify that there's at least one comment in the section
        cy.get("[data-cy='content']").its('length').should('be.gte', 1);
    });


    /**
     * @function submitMultipleComments
     * @description Adds multiple comments and verifies that they appear in the correct order in the comments section.
     */
    it('Should submit multiple comments and verify their order in the comments section', () => {
        cy.wait('@getVideo');

        // Define an array of comments to be added
        const comments = [
            'First comment',
            'Second comment',
            'Third comment'
        ];

        // Get the initial count of existing comments
        cy.get("[data-cy='content']").then(commentElements => {
            const initialCount = commentElements.length;

            // Loop through each comment, submit it, and wait for the DOM to update
            comments.forEach(comment => {
                cy.get("[data-cy='comment-input']").clear().type(comment);
                cy.get("[data-cy='comment-form']").submit();

                // Wait to ensure each comment submission completes before the next
                cy.wait('@getVideo');
            });

            // Calculate expected total count after submitting new comments
            const expectedTotalCount = initialCount + comments.length;

            // Verify the order of comments in the comments section
            cy.get("[data-cy='content']").should('have.length', expectedTotalCount).then(commentElements => {
                // Use a separate reversed array for the assertions
                const reversedComments = [...comments].reverse();

                // Check that each comment appears in reverse order (assuming latest comment is displayed at the top)
                reversedComments.forEach((comment, index) => {
                    cy.wrap(commentElements[index]).should('contain.text', comment);
                });
            });
        });
    });






});
