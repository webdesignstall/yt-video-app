/// <reference types="cypress" />

/**
 * @module ChannelSettingsFormTests
 * @description Test suite for the Channel Settings form.
 */
describe('Channel Settings Form', () => {

    /**
     * @function beforeEach
     * @description Sets up the test environment before each test.
     * Loads form data fixture and navigates to the Channel Settings page.
     */
    beforeEach(() => {
        cy.visit('/dashboard/channels');
        cy.get('[data-cy="settings-tab"]').click();
    });
/*
    /!**
     * @function it
     * @description Ensures form validation errors are displayed for empty fields.
     *!/
    it("should display form validation errors for empty fields", () => {
        cy.get('[data-cy="description"]').clear();
        cy.get('[data-cy="price"]').clear();
        cy.get("form").submit();
        cy.get('[data-cy="error-message"]').should('be.visible');
    });

    /!**
     * @function it
     * @description Validates that an error is shown if the channel name is too short.
     *!/
    it("should display error if the channel name is too short", () => {
        cy.get('@channelSettingsFormData').then(data => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="channel-name"]').type(data.invalid.short_channel_name.channel_name);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="username"]').type(data.invalid.short_channel_name.username);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="description"]').type(data.invalid.short_channel_name.description);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="price"]').type(data.invalid.short_channel_name.price_per_month);
            cy.get('[data-cy="option"]').last().click().should('have.value', '2');
            const coverImagePath = "images/slide1.png";
            cy.get('[data-cy="header-file-input"]').attachFile(coverImagePath);
            const avatarImagePath = "images/slide2.png";
            cy.get('[data-cy="file-input"]').attachFile(avatarImagePath);
            cy.get("form").submit();
            cy.get('[data-cy="error-message"]').should('be.visible').should('contain', 'Channel name must be at least 4 characters.');
        });
    });

    /!**
     * @function it
     * @description Validates that an error is shown if the channel name is too long.
     *!/
    it("should display error if the channel name is too long", () => {
        cy.get('@channelSettingsFormData').then(data => {
            cy.get('[data-cy="channel-name"]').clear().type("a".repeat(31));
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="username"]').type(data.invalid.short_channel_name.username);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="description"]').type(data.invalid.short_channel_name.description);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="price"]').type(data.invalid.short_channel_name.price_per_month);
            cy.get('[data-cy="option"]').last().click().should('have.value', '2');
            const coverImagePath = "images/slide1.png";
            cy.get('[data-cy="header-file-input"]').attachFile(coverImagePath);
            const avatarImagePath = "images/slide2.png";
            cy.get('[data-cy="file-input"]').attachFile(avatarImagePath);
            cy.get("form").submit();
            cy.get('[data-cy="error-message"]').should('be.visible').should('contain', 'Channel name must not be longer than 30 characters.');
        });
    });

    /!**
     * @function it
     * @description Ensures that the username field enforces length validation.
     *!/
    it("should display error if the username is too short or too long", () => {
        cy.get('[data-cy="username"]').type("a");
        cy.get('form').submit();
        cy.contains("Username must be at least 2 characters.").should("exist");
        cy.get('[data-cy="username"]').clear().type("a".repeat(31));
        cy.get('form').submit();
        cy.contains("Username must not be longer than 30 characters.").should("exist");
    });

    /!**
     * @function it
     * @description Ensures the description field enforces length validation.
     *!/
    it("should display error if description is too short or too long", () => {
        cy.get('@channelSettingsFormData').then(data => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="description"]').clear().type(data.invalid.short_and_long_description.sort_description);
            cy.get('form').submit();
            cy.contains("Description must be at least 4 characters.").should("exist");
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="description"]').clear().type(data.invalid.short_and_long_description.long_description);
            cy.get('form').submit();
            cy.contains("Description must not be longer than 160 characters.").should("exist");
        });
    });

    /!**
     * @function it
     * @description Validates the price per month field for minimum value.
     *!/
    it("should display error if price per month is below the minimum", () => {
        cy.get('@channelSettingsFormData').then(data => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('input[name="price_per_month"]').clear().type(data.invalid.low_price_per_month.price_per_month);
            cy.get('form').submit();
            cy.contains("Number must be greater than or equal to 5").should("exist");
        });
    });

    */
    /**
     * @function it
     * @description Submits the form successfully with valid inputs.
     */
    it("should channel setting successfully Update", () => {
        cy.get('@channelSettingsFormData').then(validData => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="channel-name"]').type(validData.valid.channel_name);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="username"]').type(validData.valid.username);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="description"]').type(validData.valid.description);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="price"]').type(validData.valid.price_per_month);
            cy.get('[data-cy="option"]').last().click().should('have.value', '2');
            const coverImagePath = "images/slide1.png";
            cy.get('[data-cy="header-file-input"]').attachFile(coverImagePath);
            const avatarImagePath = "images/slide2.png";
            cy.get('[data-cy="file-input"]').attachFile(avatarImagePath);
            cy.get("form").submit();
        });
    });
});
