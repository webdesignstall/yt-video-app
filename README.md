
## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version v20.12.2 or later)
- **npm** (Node Package Manager) or **yarn**

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/webdesignstall/yt-video-app.git
    cd yt-video-app
    ```

2. **Install Dependencies**:
    ```bash
    npm install --legacy-peer-deps
    ```

## Running the Project

### Development Mode

To start the development server for local testing and debugging:

```bash
npm run dev
```

## Running Cypress Tests
### Open another terminal and run Cypress in interactive mode (opens the Cypress UI):

This way, you can continue to have your development server running in one terminal while using the Cypress UI for testing in another.

```bash
npm run cypress:open
```

### Running Cypress tests in headless mode:

```bash
npm run cypress:run
```

## Generating Documentation
#### To generate code documentation using JSDoc:

```bash
npm run jsdoc:make
```
