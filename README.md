# Cypress Testing Framework

## Overview

Cypress is a modern, all-in-one testing framework for web applications. It enables you to write end-to-end, integration, and unit tests with ease.

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- A code editor (VS Code recommended)

## Installation

### Quick Start

```bash
# Clone the project
git clone https://github.com/SidharthLala1/owsap_juice_cypress_assignment.git

# move to the dir
cd owsap_juice_cypress_assignment

# Create .env file at root with below values
CYPRESS_APP_BASE_URL=https://juice-shop.herokuapp.com
CYPRESS_APP_ENV=DEV

# Install Cypress dependencies
npm install

# Open Cypress in browser
npm run cy:open
```

## Project Structure

After installation, Cypress creates the following structure:

```
cypress/
├── downloads/       # Downloaded files during tests
├── e2e/            # Test files go here
├── fixtures/       # Test data, mocks, and stubs
├── support/        # Support files, custom commands
└── videos/         # Recorded test videos
```
