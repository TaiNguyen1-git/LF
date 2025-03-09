import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from './Home';

describe('Home Component', () => {
  test('renders correctly', () => {
    const mockSetIsLoggedIn = jest.fn();
    const { getByText } = render(<Home setIsLoggedIn={mockSetIsLoggedIn} />);
    
    // Check if welcome message is displayed
    expect(getByText('Welcome!')).toBeTruthy();
    expect(getByText('You are successfully logged in.')).toBeTruthy();
    
    // Check if logout button is rendered
    expect(getByText('Logout')).toBeTruthy();
  });

  test('calls setIsLoggedIn with false when logout button is pressed', () => {
    const mockSetIsLoggedIn = jest.fn();
    const { getByText } = render(<Home setIsLoggedIn={mockSetIsLoggedIn} />);
    
    // Press logout button
    fireEvent.press(getByText('Logout'));
    
    // Check if setIsLoggedIn was called with false
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
  });
}); 