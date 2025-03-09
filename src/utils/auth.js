/**
 * Authentication utility functions
 */

// Mock user database - in a real app, this would be stored securely
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

/**
 * Validates user credentials against stored data
 * @param {string} username - The username to check
 * @param {string} password - The password to check
 * @returns {boolean} - Whether the credentials are valid
 */
export const validateCredentials = (username, password) => {
  return users.some(user => 
    user.username === username && user.password === password
  );
};

/**
 * Handles the login process
 * @param {string} username - The username to check
 * @param {string} password - The password to check
 * @param {Function} setIsLoggedIn - Function to update login state
 * @returns {boolean} - Whether login was successful
 */
export const handleLogin = (username, password, setIsLoggedIn) => {
  const isValid = validateCredentials(username, password);
  
  if (isValid) {
    // 4.2 If correct, update isLoggedIn = true
    setIsLoggedIn(true);
  } else {
    // 4.3 If incorrect, show error message
    console.log('Login failed: Invalid username or password');
  }
  
  return isValid;
}; 