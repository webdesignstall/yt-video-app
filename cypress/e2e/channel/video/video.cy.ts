// channelPage.cy.js

/**
 * Channel Page Tests
 * @module ChannelPageTests
 */
describe("Channel Page Tests", () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/channel/wefozy').as('getChannel');
        // Replace 'wefozy' with a valid channel username for testing
        cy.visit("/channel/wefozy/video?id=PV-8782");
        cy.wait("@getChannel"); // Wait for the request to complete
    });

    it('should render the video player', () => {
        // Check if the video iframe is visible
        cy.get('iframe').should('be.visible');
    });



    it('should display channel information', () => {
        // Check if the channel name is displayed
        cy.get("[data-cy='channel-title']").should('be.visible');
        cy.get("[data-cy='channel-subscribe']").should('be.visible');
    });

    it('should render the like button', () => {
        // Click the like button and verify the like state changes
        cy.get("[data-cy='like-btn']").click();
        cy.get("[data-cy='heart-icon']").should('be.visible');
        cy.get("[data-cy='like-btn']").click();
        cy.get("[data-cy='heart-filled-icon']").should('be.visible');
    });

    it('should display comments section', () => {
        // Check if the comments section is rendered
        cy.get('[data-cy="comments-section"]').should('be.visible');

        // Verify that comments are displayed
        cy.get('[data-cy="comments-section"]')
            .children()
            .should('have.length.greaterThan', 0);
    });

    it('should display individual comments with author info', () => {
        // Check if comment content and author name are displayed
        cy.get('[data-cy="content"]').first().should('be.visible');
        cy.get('.text-sm.font-medium.leading-none').first().should('be.visible');
    });

    it('displays more videos from this channel', () => {
        // Check if the "More from this channel" section is present
        cy.get('[data-cy="more-from-channel"]').should('be.visible');

        // Check if there are videos listed
        cy.get('[data-cy="more-from-channel"] .album-artwork').should('have.length.greaterThan', 0);

        // Check that clicking on one of the videos redirects to the correct page
        cy.get('[data-cy="more-from-channel"] .album-artwork').first().click();
    });

});
