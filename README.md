# Login Functionality

This project implements a simple login functionality for a React Native application using Expo.

## Features

- User authentication with username/password validation
- Login state management
- Error handling for invalid credentials
- Unit tests for all components and utilities

## Login Process

The login functionality follows these steps:

1. **Check username/password against stored data**
   - Validates credentials against a mock user database
   - Returns true if credentials are valid, false otherwise

2. **If credentials are valid, update isLoggedIn = true**
   - Updates the application state to reflect successful login
   - Redirects user to the Home screen

3. **If credentials are invalid, show error message**
   - Displays error message in the console
   - Shows error message in the UI

## Project Structure

```
src/
├── components/
│   ├── Login.js         # Login component
│   ├── Login.test.js    # Tests for Login component
│   ├── Home.js          # Home component shown after login
│   └── Home.test.js     # Tests for Home component
└── utils/
    ├── auth.js          # Authentication utilities
    └── auth.test.js     # Tests for authentication utilities
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode using Expo.

### `npm test`

Launches the test runner.

### `npm run test:watch`

Runs tests in watch mode for development.

### `npm run test:coverage`

Runs tests and generates a coverage report.

## Test Users

For testing purposes, the following users are available:

- Username: `user1`, Password: `password1`
- Username: `user2`, Password: `password2`

## Implementation Details

The login functionality is implemented using React's state management with the `useState` hook. The authentication logic is separated into utility functions for better testability and maintainability.

The main components are:

- **App.js**: Main component that manages the login state and renders either Login or Home screen
- **Login.js**: Handles user input and authentication
- **Home.js**: Displayed after successful login
- **auth.js**: Contains authentication utilities 