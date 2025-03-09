import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from './App';
import * as authUtils from './src/utils/auth';

// Mock the auth module
jest.mock('./src/utils/auth', () => ({
  handleLogin: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    authUtils.handleLogin.mockReset();
  });

  test('renders Login screen by default', () => {
    const { getByTestId, getByPlaceholderText } = render(<App />);
    
    // Check if Login screen is rendered
    expect(getByTestId('login-screen')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  test('switches to Home screen after successful login', () => {
    // Mock successful login
    authUtils.handleLogin.mockImplementation((username, password, setIsLoggedIn) => {
      setIsLoggedIn(true);
      return true;
    });

    const { getByText, getByPlaceholderText, queryByText, getByTestId } = render(<App />);
    
    // Enter credentials and login
    fireEvent.changeText(getByPlaceholderText('Username'), 'user1');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password1');
    fireEvent.press(getByTestId('login-button'));
    
    // Check if Home screen is rendered
    expect(getByText('Welcome!')).toBeTruthy();
    expect(getByText('You are successfully logged in.')).toBeTruthy();
    expect(queryByText('Username')).toBeNull();
  });

  test('switches back to Login screen after logout', () => {
    // Mock successful login
    authUtils.handleLogin.mockImplementation((username, password, setIsLoggedIn) => {
      setIsLoggedIn(true);
      return true;
    });

    const { getByText, getByPlaceholderText, queryByText, getByTestId } = render(<App />);
    
    // Login
    fireEvent.changeText(getByPlaceholderText('Username'), 'user1');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password1');
    fireEvent.press(getByTestId('login-button'));
    
    // Logout
    fireEvent.press(getByText('Logout'));
    
    // Check if Login screen is rendered again
    expect(getByTestId('login-screen')).toBeTruthy();
    expect(queryByText('Welcome!')).toBeNull();
  });
}); 