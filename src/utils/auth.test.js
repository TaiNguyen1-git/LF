import { validateCredentials, handleLogin } from './auth';

describe('Authentication Utilities', () => {
  // Tests for validateCredentials function
  describe('validateCredentials', () => {
    test('should return true for valid credentials', () => {
      expect(validateCredentials('user1', 'password1')).toBe(true);
      expect(validateCredentials('user2', 'password2')).toBe(true);
    });

    test('should return false for invalid username', () => {
      expect(validateCredentials('nonexistentUser', 'password1')).toBe(false);
    });

    test('should return false for invalid password', () => {
      expect(validateCredentials('user1', 'wrongPassword')).toBe(false);
    });

    test('should return false for empty credentials', () => {
      expect(validateCredentials('', '')).toBe(false);
    });
  });

  // Tests for handleLogin function
  describe('handleLogin', () => {
    let mockSetIsLoggedIn;
    let originalConsoleLog;

    beforeEach(() => {
      // Create a mock function for setIsLoggedIn
      mockSetIsLoggedIn = jest.fn();
      
      // Mock console.log to test error messages
      originalConsoleLog = console.log;
      console.log = jest.fn();
    });

    afterEach(() => {
      // Restore original console.log
      console.log = originalConsoleLog;
    });

    test('should call setIsLoggedIn with true for valid credentials', () => {
      const result = handleLogin('user1', 'password1', mockSetIsLoggedIn);
      
      expect(result).toBe(true);
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
      expect(console.log).not.toHaveBeenCalled();
    });

    test('should not call setIsLoggedIn for invalid credentials', () => {
      const result = handleLogin('user1', 'wrongPassword', mockSetIsLoggedIn);
      
      expect(result).toBe(false);
      expect(mockSetIsLoggedIn).not.toHaveBeenCalled();
    });

    test('should log error message for invalid credentials', () => {
      handleLogin('invalidUser', 'invalidPassword', mockSetIsLoggedIn);
      
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Login failed')
      );
    });
  });
}); 