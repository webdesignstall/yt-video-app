/// < reference type="cypress" />

/**
 * @fileoverview Cypress E2E tests for the Video Page, covering video rendering, channel information display,
 * interactions with like buttons, comments, and additional video sections.
 * @module VideoPageTests
 */

describe("Channel Page Tests", () => {
    /**
     * Runs before each test, intercepting the API call to the channel's endpoint and visiting the channel's video page.
     * @function beforeEach
     */
    beforeEach(() => {
        cy.intercept('GET', '/api/channel/wefozy').as('getChannel');
        // Replace 'wefozy' with a valid channel username for testing
        cy.visit("/channel/wefozy/video?id=PV-8782");
        cy.wait("@getChannel"); // Wait for the request to complete
    });

    /**
     * Checks if the video player is rendered and visible on the page.
     * @name shouldRenderVideoPlayer
     * @function
     */
    it('should render the video player', () => {
        cy.frameLoaded('[data-cy="video-iframe"]');
    });

    /**
     * Checks if the video player is rendered and visible on the page.
     * @name shouldRenderVideoPlayer
     * @function
     */
    it('should play the video on click', () => {
        // Load the iframe with the specified data-cy attribute
        cy.frameLoaded('[data-cy="video-iframe"]');

        // Access the play button within the iframe and click it
        cy.iframe('[data-cy="video-iframe"]').find('.ytp-large-play-button').should('be.visible').click();

        // Verify the video is playing by checking for the pause button
        cy.iframe('[data-cy="video-iframe"]').find('.ytp-large-play-button').should('have.attr', 'title', 'Play');
    });

        /**
         * Verifies the display of channel-specific information like the title and subscribe button.
         * @name shouldDisplayChannelInfo
         * @function
         */
        it('should display channel information', () => {
            cy.get("[data-cy='channel-title']").should('be.visible');
            cy.get("[data-cy='channel-subscribe']").should('be.visible');
        });

        /**
         * Tests the functionality of the like button by toggling its state and checking for the visible icons.
         * @name shouldRenderLikeButton
         * @function
         */
        it('should render the like button', () => {
            cy.get("[data-cy='like-btn']").click();
            cy.get("[data-cy='heart-icon']").should('be.visible');
            cy.get("[data-cy='like-btn']").click();
            cy.get("[data-cy='heart-filled-icon']").should('be.visible');
        });

        /**
         * Ensures the comments section is present and contains one or more comments.
         * @name shouldDisplayCommentsSection
         * @function
         */
        it('should display comments section', () => {
            cy.get('[data-cy="comments-section"]').should('be.visible');
            cy.get('[data-cy="comments-section"]')
                .children()
                .should('have.length.greaterThan', 0);
        });

        /**
         * Verifies that individual comments include both content and author information.
         * @name shouldDisplayIndividualCommentsWithAuthorInfo
         * @function
         */
        it('should display individual comments with author info', () => {
            cy.get('[data-cy="content"]').first().should('be.visible');
            cy.get('.text-sm.font-medium.leading-none').first().should('be.visible');
        });

        /**
         * Checks if the "More from this channel" section displays additional videos, and verifies the click navigation on these videos.
         * @name displaysMoreVideosFromThisChannel
         * @function
         */
        it('displays more videos from this channel', () => {
            cy.get('[data-cy="more-from-channel"]').should('be.visible');
            cy.get('[data-cy="more-from-channel"] .album-artwork').should('have.length.greaterThan', 0);
            cy.get('[data-cy="more-from-channel"] .album-artwork').first().click();
        });
});
