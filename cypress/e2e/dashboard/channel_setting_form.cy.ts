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

        cy.visit('/dashboard/channels', {failOnStatusCode: false})
        cy.get('[data-cy="settings-tab"]').click();
    });


    it('should retrieve the correct channel data', () => {
        cy.fixture('db/channel').then(data => {
            cy.request('/api/channel').then((response) => {
                expect(response.status).to.eq(200);
                // cy.log(response.body.data[0]);
                const channelData = response.body.data[0];
                expect(channelData).to.have.property('name', data[0].name);
                expect(channelData).to.have.property('username', data[0].username);
                expect(channelData).to.have.property('description', data[0].description);
                expect(channelData).to.have.property('price_per_month', data[0].price_per_month);
                // expect(channelData).to.have.property('option', data[0].name);
            });
        })

    });

    /**
     * @function it
     * @description Ensures form validation errors are displayed for empty fields.
     */
    it("should display form validation errors for empty fields", () => {
        cy.get('[data-cy="description"]').clear();
        cy.get('[data-cy="price"]').clear();
        cy.get("form").submit();
        cy.get('[data-cy="error-message"]').should('be.visible');
    });

    /**
     * @function it
     * @description Validates that an error is shown if the channel name is too short.
     */
    it("should display error if the channel name is too short", () => {
        cy.get('[data-cy="channel-name"]').clear().type('SC').blur()
        cy.get('[data-cy="error-message"]').should('be.visible').contains('Channel name must be at least 4 characters.');
    });

    /**
     * @function it
     * @description Validates that an error is shown if the channel name is too long.
     */
    it("should display error if the channel name is too long", () => {
        cy.get('[data-cy="channel-name"]').clear().type("L".repeat(31)).blur()
        cy.get('[data-cy="error-message"]').should('be.visible').contains('Channel name must not be longer than 30 characters.');
    });

    /**
     * @function it
     * @description Ensures that the username field enforces length validation.
     */
    it("should display error if the username is too short or too long", () => {

        cy.get('[data-cy="username"]').clear().type('a').blur()
        cy.get('[data-cy="error-message"]').should('be.visible').contains('Username must be at least 2 characters.');

        cy.get('[data-cy="username"]').type("a".repeat(31));
        cy.get('[data-cy="error-message"]').should('be.visible').contains('Username must not be longer than 30 characters.');
    });

    /**
     * @function it
     * @description Ensures the description field enforces length validation.
     */
    it("should display error if description is too short or too long", () => {

        cy.get('[data-cy="description"]').clear().type('ab').blur()
        cy.get('[data-cy="error-message"]').should('be.visible').contains('Description must be at least 4 characters.').should('exist');

        cy.get('[data-cy="description"]').type("a".repeat(161));
        cy.get('[data-cy="error-message"]').should('be.visible').contains('Description must not be longer than 160 characters.').should('exist');
    });

    /**
     * @function it
     * @description Validates the price per month field for minimum value.
     */
    it("should display error if price per month is below the minimum", () => {
        cy.get('input[name="price_per_month"]').clear({force: true});
        cy.get('input[name="price_per_month"]').type('2').blur()
        // cy.get('form').submit();
        cy.get('[data-cy="error-message"]').should('be.visible').contains('Number must be greater than or equal to 5').should('exist');
    });




    /**
     * @function it
     * @description Populate the channel settings from with the channel's crated data.
     */
    it("should populate the channel settings form with the channel's created data", () => {
        cy.fixture('db/channel').then(data => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="channel-name"]').should('have.value', data[0].name);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="username"]').should('have.value', data[0].username);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="description"]').should('have.value', data[0].description);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="price"]').should('have.value', data[0].price_per_month);
            if (data[0].option === '1') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cy.get('[data-cy="option"]').first().click().should('have.value', data[0].option);
            }else if (data[0].option === '2') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cy.get('[data-cy="option"]').last().click().should('have.value', data[0].option);
            }

        });
    });


    /**
     * @function it
     * @description Submits the form successfully with valid inputs.
     */
    it("should channel setting Update successfully", () => {
        cy.fixture('db/channel').then(data => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="channel-name"]').clear()
            cy.get('[data-cy="channel-name"]').clear().type(` Update`);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="username"]').should('have.value',`${data[0].username}`);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="description"]').clear();
            cy.get('[data-cy="description"]').clear().type(` update`);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="price"]').clear().type('100');
            cy.get('[data-cy="option"]').first().click().should('have.value', '1');
            const coverImagePath = "images/slide2.png";
            cy.get('[data-cy="header-file-input"]').attachFile(coverImagePath);
            const avatarImagePath = "images/slide1.png";
            cy.get('[data-cy="file-input"]').attachFile(avatarImagePath);
            cy.get("form").submit();
            cy.contains('Channel updated successfully')
        });
    });


    /**
     * @function it
     * @description Populate the channel settings from with the channel's crated data.
     */
    it("should update the channel settings form when switching between channels", () => {

        cy.fixture('db/channel').then(data => {
            // Open the dropdown
            cy.get('button[aria-label="Select a team"]').click();

            // Check if the dropdown is visible
            cy.get('[role="combobox"]').should('be.visible');

            // Select the "Create Channel" option
            cy.get(`[data-cy=${data[1].username}]`).click();

            // Optionally, click outside the dropdown to close it
            cy.get('body').click(0, 0); // Click in the top-left corner of the body

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="channel-name"]').should('have.value', data[1].name);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="username"]').should('have.value', data[1].username);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="description"]').should('have.value', data[1].description);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('[data-cy="price"]').should('have.value', data[1].price_per_month);
            if (data[1].option === '1') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cy.get('[data-cy="option"]').first().click().should('have.value', data[1].option);
            }else if (data[1].option === '2') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cy.get('[data-cy="option"]').last().click().should('have.value', data[1].option);
            }

        });
    });

});
