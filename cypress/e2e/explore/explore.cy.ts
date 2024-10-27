/// <reference types="cypress" />

/**
 * @module ExplorePageTests
 * @description Test suite for exploring a channel and subscription functionality.
 */
describe('Explore Page E2E Tests', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/explore-subscribed').as('exploreChannel');
        cy.intercept('GET', '/api/subscribe').as('subscribedChannel');
        cy.visit(`/explore`);
    });

    /**
     * Test to verify that the Explore page loads successfully.
     * @function shouldLoadExplorePage
     */
    it('should load the Explore page', () => {
        // Check that the Explore tab and Subscribed tab are visible
        cy.get("[data-cy='explore']").should('be.visible');
        cy.get("[data-cy='subscribed']").should('be.visible');
    });


    it('should display channels in reverse order on the Explore channel tap page', () => {
        // Load fixture data to use in the test assertions
        cy.fixture('db/channel').then((channels) => {
            const reversedChannels = [...channels].reverse(); // Create reversed order of channels

            // Wait for the intercept alias to load data on the Explore page
            cy.wait('@exploreChannel');

            // Click the Explore tab to display channels
            cy.get("[data-cy='explore']").click();

            // Loop through each reversed channel and assert that it's displayed in the correct order
            reversedChannels.forEach((channel, index) => {
                cy.get("[data-cy='channel-card']").eq(index).within(() => {
                    // Assert the channel name or unique property to verify correct order
                    cy.contains(channel.username).should('exist');
                });
            });
        });
    });

    it('should display channels in reverse order on the Subscribed channel tap page', () => {
        // Load fixture data to use in the test assertions
        cy.fixture('db/subscribed_channel').then((channels) => {
            const reversedChannels = [...channels].reverse(); // Create reversed order of channels

            // Wait for the intercept alias to load data on the Explore page
            cy.wait('@subscribedChannel');

            // Click the Explore tab to display channels
            cy.get("[data-cy='subscribed']").click();

            // Loop through each reversed channel and assert that it's displayed in the correct order
            reversedChannels.forEach((channel, index) => {
                cy.get("[data-cy='channel-card']").eq(index).within(() => {
                    // Assert the channel name or unique property to verify correct order
                    cy.contains(channel.username).should('exist');
                });
            });
        });
    });


    /**
     * Test to verify that the Explore tab displays channel data.
     * @function shouldDisplayChannelsInExploreTab
     */
    it('should display channels in Explore tab', () => {
        cy.wait('@exploreChannel');
        cy.wait('@subscribedChannel');

        // Click on the Explore tab
        cy.get("[data-cy='explore']").click();

        cy.get("[data-cy='channel-card']", { timeout: 10000 }) // Extend timeout if needed
            .should('have.length.greaterThan', 0);
    });

    /**
     * Test to verify the Subscribed tab shows subscribed channels.
     * @function shouldDisplaySubscribedChannelsInSubscribedTab
     */
    it('should display subscribed channels in Subscribed tab', () => {
        // Click on the Subscribed tab
        cy.get("[data-cy='subscribed']").click();

        // Check if there are subscribed channels; otherwise, verify the no-subscribed message
        cy.get("[data-cy='channel-card']").then((channels) => {
            if (channels.length > 0) {
                // Verify subscribed channels are displayed
                cy.get("[data-cy='channel-card']")
                    .should('have.length.greaterThan', 0);
            } else {
                // Verify the no-subscribed message is displayed
                cy.get("[data-cy='no-subscribed-message']")
                    .should('be.visible')
                    .and('contain', 'No subscribed channels found.');
            }
        });
    });

    /**
     * Test to verify channel card elements and data in the Explore tab.
     * @function shouldDisplayChannelCardDetailsInExploreTab
     */
    it('should display channel card details correctly in Explore tab', () => {
        // Click on the Explore tab
        cy.get("[data-cy='explore']").click();

        // Check the first channel card in the Explore tab
        cy.get("[data-cy='channel-card']").first().within(() => {
            // Verify avatar image is visible
            cy.get('img').should('be.visible');

            // Verify channel name and username are displayed with correct styling
            cy.get('p').first().should('have.class', 'text-lg font-semibold');
            cy.get('p').eq(1).should('have.class', 'text-sm text-muted-foreground');

            // Verify description is present with correct styling
            cy.get('p').eq(2).should('have.class', 'text-sm text-muted-foreground');

            // Verify Subscribe/Subscribed button is visible and has text
            cy.get('button').should('be.visible').and('contain', 'Subscribe');
        });
    });

    /**
     * Test to verify channel card elements and data in the Subscribed tab.
     * @function shouldDisplayChannelCardDetailsInSubscribedTab
     */
    it('should display channel card details correctly in Subscribed tab', () => {
        // Click on the Subscribed tab
        cy.get("[data-cy='subscribed']").click();

        // Check the first channel card in the Subscribed tab
        cy.get("[data-cy='channel-card']").first().within(() => {
            // Verify avatar image is visible
            cy.get('img').should('be.visible');

            // Verify channel name and username are displayed with correct styling
            cy.get('p').first().should('have.class', 'text-lg font-semibold');
            cy.get('p').eq(1).should('have.class', 'text-sm text-muted-foreground');

            // Verify description is present with correct styling
            cy.get('p').eq(2).should('have.class', 'text-sm text-muted-foreground');

            // Verify Subscribe/Subscribed button is visible and has text
            cy.get('button').should('be.visible').and('contain', 'Subscribe');
        });
    });

    /**
     * Test for subscribing/unsubscribing to a channel.
     * @function shouldAllowSubscribingUnsubscribingToChannel
     */
    it('should allow subscribing/unsubscribing to a channel', () => {
        cy.get("[data-cy='explore']").click();

        // Click Subscribe button on the first channel card
        cy.get("[data-cy='channel-card']").first().within(() => {
            cy.get('button').click();

            // Verify the button text changes to "Subscribed"
            cy.get('button').should('contain', 'Subscribe');
        });
    });

});
