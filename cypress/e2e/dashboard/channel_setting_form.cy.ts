/// <reference types="cypress" />

describe('Channel Settings Form', () => {

    beforeEach(() => {
        cy.visit('/dashboard/channels');
        cy.get('[data-cy="settings-tab"]').click();
        cy.fixture('channelSettingForm.json').as('channelSettingsFormData')
    })


    it("should display form validation errors for empty fields", () => {

        cy.get('[data-cy="description"]').clear();
        cy.get('[data-cy="price"]').clear();
        // Try submitting the form without filling any fields
        cy.get("form").submit();

        // Check if validation error messages are displayed
        cy.get('[data-cy="error-message"]').should('be.visible');
    });


    it("should display error if the channel name is too short", () => {
        cy.get('@channelSettingsFormData').then(data => {
            // Try setting the channel name less than 4 characters
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
            cy.get('[data-cy="option"]').last().click().should('have.value', '2')

            // Upload avatar image
            const coverImagePath = "images/slide1.png";  // Path to the avatar image
            cy.get('[data-cy="header-file-input"]').attachFile(coverImagePath);

            const avatarImagePath = "images/slide2.png";  // Path to the avatar image
            cy.get('[data-cy="file-input"]').attachFile(avatarImagePath);

            // Submit the form
            cy.get("form").submit();

            // Check if validation error messages are displayed
            cy.get('[data-cy="error-message"]').should('be.visible').should('contain', 'Channel name must be at least 4 characters.');

        })
    });


    it("should display error if the channel name is too long", () => {
        cy.get('@channelSettingsFormData').then(data => {
            // Try setting the channel name less than 4 characters
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
            cy.get('[data-cy="option"]').last().click().should('have.value', '2')

            // Upload avatar image
            const coverImagePath = "images/slide1.png";  // Path to the avatar image
            cy.get('[data-cy="header-file-input"]').attachFile(coverImagePath);

            const avatarImagePath = "images/slide2.png";  // Path to the avatar image
            cy.get('[data-cy="file-input"]').attachFile(avatarImagePath);

            // Submit the form
            cy.get("form").submit();

            // Check if validation error messages are displayed
            cy.get('[data-cy="error-message"]').should('be.visible').should('contain', 'Channel name must not be longer than 30 characters.');

        })
    });

    it("should display error if the username is too short or too long", () => {
        // Try setting the username less than 2 characters
        cy.get('[data-cy="username"]').type("a");
        cy.get('form').submit();
        cy.contains("Username must be at least 2 characters.").should("exist");

        // Try setting the username more than 30 characters
        cy.get('[data-cy="username"]').clear().type("a".repeat(31));
        cy.get('form').submit();
        cy.contains("Username must not be longer than 30 characters.").should("exist");

    });

    it("should display error if description is too short or too long", () => {
        cy.get('@channelSettingsFormData').then(data => {
            // Try setting the description less than 4 characters
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="description"]').clear().type(data.invalid.short_and_long_description.sort_description);
            cy.get('form').submit();
            cy.contains("Description must be at least 4 characters.").should("exist");

            // Try setting the description more than 160 characters
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="description"]').clear().type(data.invalid.short_and_long_description.long_description);
            cy.get('form').submit();
            cy.contains("Description must not be longer than 160 characters.").should("exist");
        })
    });

    it("should display error if price per month is below the minimum", () => {
        cy.get('@channelSettingsFormData').then(data => {
            // Try setting the price less than 5
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('input[name="price_per_month"]').clear().type(data.invalid.low_price_per_month.price_per_month);
            cy.get('form').submit();
            cy.contains("Number must be greater than or equal to 5").should("exist");
        })
    });


    it("should successfully submit the form with valid inputs", () => {
        // Access the valid data from the alias

        cy.get('@channelSettingsFormData').then(validData => {
            // Fill the form using data-cy attributes
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
            cy.get('[data-cy="option"]').last().click().should('have.value', '2')

            // Upload avatar image
            const coverImagePath = "images/slide1.png";  // Path to the avatar image
            cy.get('[data-cy="header-file-input"]').attachFile(coverImagePath);

            const avatarImagePath = "images/slide2.png";  // Path to the avatar image
            cy.get('[data-cy="file-input"]').attachFile(avatarImagePath);
            // Submit the form
            cy.get("form").submit();
        })


    });
})