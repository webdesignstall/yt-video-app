/**
 * @fileoverview Cypress E2E tests for the Feed Page, which covers loading and displaying of
 * video sections, and navigation functionality upon video click.
 * @module FeedPageTests
 */

describe('FeedPage E2E Test', () => {
    /**
     * Runs before each test, intercepting the API call for fetching videos and visiting the Feed Page.
     * @function beforeEach
     */
    beforeEach(() => {
        // Intercept the API call to return mock data
        cy.intercept('GET', '/api/public-videos').as('fetchVideos');

        // Visit the FeedPage component
        cy.visit('/'); // Adjust this path based on your routing
        cy.wait('@fetchVideos');
    });

    /**
     * Verifies that the "Latest" section loads correctly with title, description, and video items.
     * @name loadsAndDisplaysLatestSection
     * @function
     */
    it('loads and displays the latest section', () => {
        cy.wait('@fetchVideos');

        cy.get("[data-cy='latest']").contains('Latest').should('be.visible');
        cy.get("[data-cy='latest-desc']").contains('Stay up to date with your followed channels.').should('be.visible');

        cy.get("[data-cy='latest-videos']").first().within(() => {
            cy.get("[data-cy='latest-video']").should('have.length.greaterThan', 0);
        });
    });

    /**
     * Verifies that the "Made for You" section loads with the correct title, description, and video items.
     * @name loadsAndDisplaysMadeForYouSection
     * @function
     */
    it('loads and displays the made-for-you section', () => {
        cy.wait('@fetchVideos');

        cy.get("[data-cy='make-for-you']").contains('Made for You').should('be.visible');
        cy.get("[data-cy='make-for-you-desc']").contains('Top picks for you. Updated daily.').should('be.visible');

        cy.get("[data-cy='make-for-you-videos']").last().within(() => {
            cy.get("[data-cy='make-for-you-video']").should('have.length.greaterThan', 0);
        });
    });

    /**
     * Checks the navigation functionality when clicking on a video from the "Latest" section.
     * Ensures that clicking a video redirects to the video page and displays the video player.
     * @name navigatesToVideoPageOnVideoClick
     * @function
     */
    it('navigates to video page on video click', () => {
        cy.wait('@fetchVideos');

        cy.get("[data-cy='latest-videos']").first().within(() => {
            cy.get("[data-cy='latest-video']").first().click();
        });

        cy.url().should('include', '/channel/wefozy/video?id=PV-8782'); // Adjust this path based on your routing
        cy.get('iframe').should('be.visible');
    });
});
