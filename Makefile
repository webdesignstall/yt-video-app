# Variables
CYPRESS=./node_modules/.bin/cypress
CI_REPORTER=mocha-junit-reporter
CYPRESS_BASE_URL=http://localhost:3000
TEST_TYPE=$(filter-out $@,$(MAKECMDGOALS))  # Allows passing test type, e.g., make run test=e2e

# Targets

.PHONY: install test run open clean help

# Install all dependencies
install:
	@echo "Installing dependencies..."
	npm install --legacy-peer-deps

# Run Cypress tests in headless mode
test:
	@echo "Running Cypress tests in headless mode..."
	$(CYPRESS) run --headless --config baseUrl=$(CYPRESS_BASE_URL) --reporter $(CI_REPORTER) --reporter-options "mochaFile=./results/results.xml"

# Run Cypress in interactive mode (opens the Cypress UI)
open:
	@echo "Opening Cypress in interactive mode..."
	$(CYPRESS) open --config baseUrl=$(CYPRESS_BASE_URL)

# Clean up previous test results
clean:
	@echo "Cleaning up test results..."
	rm -rf ./results

# Clean up previous test results
doc:
	@echo "Making doc for testing files..."
	npm run jsdoc:make

# Run test with open mode
run-gui: clean install open

# Run tests with a specific target
run: clean install test
	@echo "Running all Cypress tests..."

# Show help
help:
	@echo "Available commands:"
	@echo "  make install       - Install dependencies"
	@echo "  make test          - Run Cypress tests in headless mode"
	@echo "  make open          - Run Cypress in interactive mode"
	@echo "  make clean         - Clean up test results"
	@echo "  make run           - Clean, install, and run tests"
	@echo "  make run-gui       - Clean, install, and run tests in interactive mode"
	@echo "  make help          - Show this help message"
