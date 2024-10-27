// channelPage.cy.js

/**
 * Channel Page Tests
 * @module ChannelPageTests
 */
describe("Channel Page Tests", () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/channel/wefozy').as('getChannel');
        // Replace 'wefozy' with a valid channel username for testing
        cy.visit("/channel/wefozy");
        cy.wait("@getChannel"); // Wait for the request to complete
    });

    /**
     * Test to ensure the channel header background image is displayed.
     * @function shouldDisplayChannelHeaderBackgroundImage
     */
    it("should display the channel header background image", () => {

        cy.get("[data-cy='channel_header']").should("have.attr", 'src');

    });

    /**
     * Test to ensure the channel avatar is displayed.
     * @function shouldDisplayChannelAvatar
     */
    it("should display the channel avatar", () => {
        cy.get("[data-cy='avatar-image']").should("be.visible");
    });

    /**
     * Test to ensure the channel name, username, description, subscribers, and videos are displayed.
     * @function shouldDisplayChannelDetails
     */
    it("should display the channel name, username, description, subscribers, and videos", () => {
        cy.fixture('db/channel').then((channel: any) => {
            const wefozyChannel = channel[0];
            cy.get("[data-cy='channel-name']").should("have.text", wefozyChannel.name);
            cy.get("[data-cy='description']").should("have.text", wefozyChannel.description);
            // Assuming subscribers is an array of individual subscriber elements, check the count
            cy.get("[data-cy='subscribers']").should('have.text', wefozyChannel?.subscribers?.length);
            cy.get("[data-cy='videos']").should("be.visible", wefozyChannel?.publicVideos?.length);
        });

    });

    /**
     * Test to ensure a list of public videos is displayed.
     * @function shouldDisplayListOfPublicVideos
     */
    it("should display a list of public videos", () => {
        cy.get("[data-cy='videos-list']").should("exist");
        cy.get("[data-cy='videos-list']").children().should("have.length.at.least", 1);
    });

    /**
     * Test to ensure that the video view button works correctly.
     * @function shouldWorkVideoViewButton
     */
    it("should work video view button", () => {
        cy.get("[data-cy='video-link']").click({ multiple: true });
    });

    /*
    /**
     * Test for the AlbumArtwork component to ensure it displays the correct details.
     * @function shouldDisplayVideoAlbumWithCorrectDetails
     */
    /*it("should display video album with correct details", () => {
        cy.get("[data-cy='videos-list']").children().first().within(() => {
            cy.get("[data-cy='video-thumbnail']").should("be.visible");
            cy.get("[data-cy='video-views']").should("be.visible");
            cy.get("[data-cy='video-uploaded-date']").should("be.visible");
            cy.get("[data-cy='video-link']").should("be.visible");
        });
    });*/

});
