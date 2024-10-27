/**
 * @module VideoUploadTests
 * @description This module contains end-to-end tests for verifying video upload functionality,
 * including successful upload, display updates, and error handling.
 */

describe('Video Upload Functionality', () => {

    /**
     * @function beforeEach
     * @description Navigates to the videos page before each test.
     * This ensures that each test starts from the correct page.
     */
    beforeEach(() => {
        cy.visit('/dashboard/videos');
    });

    /**
     * @function displaysUploaderAndAcceptsVideoFiles
     * @description Verifies the visibility of the video uploader and its ability to accept video files.
     * - Checks if the uploader UI is visible.
     * - Simulates a video file upload using a sample video file.
     * - Verifies the disappearance of the initial upload message upon successful upload.
     */
    it('displays the uploader and accepts video files', () => {
        cy.get('h3').contains('Videos');
        cy.get('p').contains('Upload and manage private videos.');
        cy.get('div[class*="border-dashed"]').should('be.visible');

        const videoFile = 'video/Best No Text Intro.mp4'; // Use a sample video file in your fixtures folder

        cy.fixture(videoFile, 'base64').then(fileContent => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('input[type="file"]').attachFile({
                fileContent: Cypress.Buffer.from(fileContent, 'base64'),
                fileName: videoFile,
                mimeType: 'video/mp4'
            });
        });

        cy.get('div').contains('Drop the video files here ...').should('not.exist');
    });

    /**
     * @function uploadsVideoAndAddsToTable
     * @description Simulates a video file upload and verifies that the video appears in the table.
     * - Mocks the API call response to simulate a successful upload.
     * - Waits for the API call and checks for a success message.
     * - Verifies the video appears in the table after a successful upload.
     */
    it('uploads video and adds it to the table', () => {
        const videoFile = 'video/Best No Text Intro.mp4';

        cy.fixture(videoFile, 'base64').then(fileContent => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('input[type="file"]').attachFile({
                fileContent: Cypress.Buffer.from(fileContent, 'base64'),
                fileName: videoFile,
                mimeType: 'video/mp4'
            });
        });

        cy.intercept('POST', '/api/video-upload', {
            statusCode: 200,
            body: { message: 'Video uploaded successfully!' },
        }).as('videoUpload');

        cy.wait('@videoUpload').its('response.statusCode').should('eq', 200);
        cy.get("[data-cy='api-res-msg']").contains('Video uploaded successfully!').should('be.visible');

        cy.get('table').within(() => {
            cy.get('tr').should('have.length.greaterThan', 1);
            cy.get('td').contains('Best No Text Intro.mp4').should('be.visible');
        });
    });


    /**
     * @function verifiesVideoDataInTable
     * @description Checks that the uploaded video data is displayed correctly in the table.
     * - Uploads a sample video.
     * - Verifies that the expected video details are displayed in the table after the upload.
     */
    it('verifies video data in table is correct', () => {

        cy.fixture('db/video-upload').then((videos) => {
            // Intercept the video upload API to simulate success
            cy.intercept('POST', '/api/video-upload', {
                statusCode: 200,
                body: { message: 'Video uploaded successfully!' },
            }).as('videoUpload');

            const lastVideo = videos[videos.length - 1];

            cy.fixture(lastVideo?.filename, 'base64').then(fileContent => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cy.get('input[type="file"]').attachFile({
                    fileContent: Cypress.Buffer.from(fileContent, 'base64'),
                    fileName: lastVideo?.filename,
                    mimeType: 'video/mp4'
                });
            });

            // Wait for the video upload API call to complete
            cy.wait('@videoUpload').its('response.statusCode').should('eq', 200);
            cy.get("[data-cy='api-res-msg']").contains('Video uploaded successfully!').should('be.visible');

            // Verify that the video appears in the table with correct data
            cy.get('table').within(() => {
                cy.get('tr').last() // Assuming the last row is the newly uploaded video
                    .within(() => {
                        // Check for video name
                        cy.get('td').contains(lastVideo?.id).should('be.visible');
                        cy.get('td').contains(lastVideo?.filename).should('be.visible');
                        cy.get('td').contains(lastVideo?.duration).should('be.visible');
                    });
            });
        })


    });

    /**
     * @function handlesVideoUploadError
     * @description Simulates an error during video upload and verifies that the correct error message is displayed.
     * - Mocks the API call response to simulate an upload error.
     * - Waits for the API call and checks for an error message.
     */
    it('handles video upload error', () => {
        cy.intercept('POST', '/api/video-upload', {
            statusCode: 500,
            body: { error: 'Video upload failed' },
        }).as('videoUploadError');

        const videoFile = 'video/Best No Text Intro.mp4';
        cy.fixture(videoFile, 'base64').then(fileContent => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.get('input[type="file"]').attachFile({
                fileContent: Cypress.Buffer.from(fileContent, 'base64'),
                fileName: videoFile,
                mimeType: 'video/mp4'
            });
        });

        cy.wait('@videoUploadError').its('response.statusCode').should('eq', 500);
        cy.get("[data-cy='api-res-msg']").contains('Video upload failed').should('be.visible');
    });


});
