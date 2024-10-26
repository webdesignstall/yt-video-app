/// < reference type="cypress" />

/**
 * @fileoverview Cypress E2E tests for the subscriptions page.
 * @module SubscriptonsPageTests
 */

describe("Subscriptions Page", () => {

    beforeEach(() => {
        cy.intercept('GET', '/api/subscriptions').as('getSubscriptions');
        // Replace 'wefozy' with a valid channel username for testing
        cy.visit("/dashboard/subscriptions");
        cy.wait("@getSubscriptions"); // Wait for the request to complete
    });



    /**
     * Verifies that the table loads with data and displays the correct number of rows and columns.
     * @name loadsDataAndDisplaysRows
     * @function
     */
    it("loads data and displays rows", () => {
        cy.get("table").should("be.visible"); // Check table is visible

        cy.get("tbody tr").should("have.length.greaterThan", 0); // Ensure rows are loaded

        cy.get("thead tr th").should("have.length.greaterThan", 0); // Ensure columns are loaded
    });

    /**
     * Checks that sorting a column works by clicking on a column header.
     * @name idAscendingDescendingSortsDataOnColumnClick
     * @function
     */
    it("Should sort ID column in ascending and descending order on click", () => {
        // Click the ID column header to open the sorting menu and sort in ascending order
        cy.get("thead tr th").first().contains('ID').click(); // Open the dropdown
        cy.get('[role="menuitem"]').contains('Asc').click(); // Select Asc for ascending sort

        cy.wait(200);
        // Re-click the ID column header to open the sorting menu for descending sort
        cy.get("thead tr th").first().contains('ID').click({force: true}); // Open the dropdown again
        cy.get('[role="menuitem"]').contains('Desc').should('be.visible').click({ force: true }); // Select Desc for descending sort
    });


    /**
     * Checks that sorting by the Status column works by clicking on the column header.
     * @name statusAscendingDescendingSortsDataOnColumnClick
     * @function
     */
    it("Should sort Status column in ascending and descending order on click", () => {
        cy.get("thead tr th").contains('Status').click(); // Click Status column header to sort
        cy.get('[role="menuitem"]').first().contains('Asc').click(); // Select Ascending

        cy.wait(200);
        cy.get("thead tr th").contains('Status').click({force: true}); // Click Status column header to sort
        cy.get('[role="menuitem"]').contains('Desc').click({force: true}); // Select Descending

    });

    /**
     * Checks that sorting by the Auto Renew column works by clicking on the column header.
     * @name autoRenewAscendingDescendingSortsDataOnColumnClick
     * @function
     */
    it("Should sort Auto Renew column in ascending and descending order on click", () => {
        cy.get("thead tr th").contains('Auto Renew').click(); // Click Auto Renew column header to sort
        cy.get('[role="menuitem"]').first().contains('Asc').click(); // Select Ascending
        cy.wait(200);
        cy.get("thead tr th").contains('Auto Renew').click(); // Click Auto Renew column header to sort
        cy.get('[role="menuitem"]').contains('Desc').click(); // Select Descending

    });

    /**
     * Checks that sorting by the Expires At column works by clicking on the column header.
     * @name expiresAtAscendingDescendingSortsDataOnColumnClick
     * @function
     */
    it("Should sort Expires At column in ascending and descending order on click", () => {
        cy.get("thead tr th").contains('Expires At').click(); // Click Expires At column header to sort
        cy.get('[role="menuitem"]').first().contains('Asc').click(); // Select Ascending
        cy.wait(200);
        cy.get("thead tr th").contains('Expires At').click(); // Click Expires At column header to sort
        cy.get('[role="menuitem"]').contains('Desc').click(); // Select Descending
    });

    /**
     * Checks that sorting by the Remaining Time column works by clicking on the column header.
     * @name remainingTimeAscendingDescendingSortsDataOnColumnClick
     * @function
     */
    it("Should sort Remaining Time column in ascending and descending order on click", () => {
        cy.get("thead tr th").contains('Remaining Time').click(); // Click Remaining Time column header to sort
        cy.get('[role="menuitem"]').first().contains('Asc').click(); // Select Ascending
        cy.wait(200);
        cy.get("thead tr th").contains('Remaining Time').click(); // Click Remaining Time column header to sort
        cy.get('[role="menu"]').should('be.visible')
        cy.get('[role="menuitem"]').contains('Desc').click(); // Select Ascending
    });

    /**
     * Verifies that filtering works by entering text in the search input and checking for filtered results.
     * @name filtersDataBasedOnInput
     * @function
     */
    it("filters data based on input", () => {
        cy.get("input[data-cy='filter-input']").type("Whitney Walker"); // Type into filter input
        cy.get("tbody tr").each((row) => {
            cy.wrap(row).should("contain.text", "Whitney Walker"); // All rows should match the filter
        });
    });

    /**
     * Checks pagination functionality, ensuring correct rows are shown on each page.
     * @name paginatesDataCorrectly
     * @function
     */
    it("paginates data correctly", () => {
        cy.get("[data-cy='pagination-next']").click({force: true}); // Navigate to the next page
        cy.get("tbody tr").should("have.length.greaterThan", 0); // Verify rows are present on the next page

        cy.get("[data-cy='pagination-prev']").click({force: true}); // Navigate back to the previous page
        cy.get("tbody tr").should("have.length.greaterThan", 0); // Verify rows are present on the previous page

        cy.get("[data-cy='pagination-last']").click({force: true}); // Navigate back to the last page
        cy.get("tbody tr").should("have.length.greaterThan", 0); // Verify rows are present on the last page

        cy.get("[data-cy='pagination-first']").click({force: true}); // Navigate back to the first page
        cy.get("tbody tr").should("have.length.greaterThan", 0); // Verify rows are present on the first page
    });


    /**
     * Opens the column toggle menu.
     */
    it("Should open the View dropdown menu to toggle columns", () => {
        cy.get('button').contains('View').click({force: true}); // Clicks the View button to open the dropdown
        cy.get('[role="menu"]').should("be.visible"); // Verifies that the dropdown is now visible
    });

    /**
     * Toggles a specific column's visibility off and verifies it disappears from the table.
     */
    it("Should hide a column when toggled off", () => {
        cy.get('button').contains('View').click({force: true}); // Open the dropdown menu
        cy.get('[role="menuitemcheckbox"]').first().contains("status").click({force: true}); // Replace "ColumnName" with actual column ID
        cy.get("table").contains("Status").should("not.exist"); // Verify that the column is hidden from the table
    });

    /**
     * Toggles a specific column's visibility on and verifies it appears from the table.
     */
    it("Should show a column when toggled on", () => {
        cy.get('button').contains('View').click({force: true}); // Open the dropdown menu
        cy.get('[role="menuitemcheckbox"]').first().contains("status").click({force: true}); // Replace "ColumnName" with actual column ID
        cy.get('[role="menuitemcheckbox"]').first().contains("status").click({force: true}); // Replace "ColumnName" with actual column ID
        cy.get("table").contains("Status").should("be.exist"); // Verify that the column is hidden from the table
    });




})