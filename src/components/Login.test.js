import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from './Login';
import * as authUtils from '../utils/auth';

// Mock the auth module
jest.mock('../utils/auth', () => ({
  handleLogin: jest.fn(),
}));

describe('Login Component', () => {
  let mockSetIsLoggedIn;

  beforeEach(() => {
    mockSetIsLoggedIn = jest.fn();
    // Reset the mock implementation before each test
    authUtils.handleLogin.mockReset();
  });

  test('renders correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Login setIsLoggedIn={mockSetIsLoggedIn} />
    );

    // Check if username and password inputs are rendered
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    
    // Check if login button is rendered using testID
    expect(getByTestId('login-button')).toBeTruthy();
  });

  test('shows error when fields are empty', () => {
    const { getByTestId, queryByText, getByText } = render(
      <Login setIsLoggedIn={mockSetIsLoggedIn} />
    );

    // Initially, there should be no error message
    expect(queryByText('Username and password are required')).toBeNull();

    // Press login button without entering credentials
    fireEvent.press(getByTestId('login-button'));

    // Error message should be displayed
    expect(getByText('Username and password are required')).toBeTruthy();
    
    // handleLogin should not be called
    expect(authUtils.handleLogin).not.toHaveBeenCalled();
  });

  test('calls handleLogin with correct credentials', () => {
    // Mock successful login
    authUtils.handleLogin.mockReturnValue(true);

    const { getByPlaceholderText, getByTestId } = render(
      <Login setIsLoggedIn={mockSetIsLoggedIn} />
    );

    // Enter username and password
    fireEvent.changeText(getByPlaceholderText('Username'), 'user1');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password1');

    // Press login button
    fireEvent.press(getByTestId('login-button'));

    // handleLogin should be called with correct arguments
    expect(authUtils.handleLogin).toHaveBeenCalledWith(
      'user1',
      'password1',
      mockSetIsLoggedIn
    );
  });

  test('shows error message when login fails', () => {
    // Mock failed login
    authUtils.handleLogin.mockReturnValue(false);

    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Login setIsLoggedIn={mockSetIsLoggedIn} />
    );

    // Enter username and password
    fireEvent.changeText(getByPlaceholderText('Username'), 'user1');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongPassword');

    // Press login button
    fireEvent.press(getByTestId('login-button'));

    // Error message should be displayed
    expect(getByText('Invalid username or password')).toBeTruthy();
  });
}); 