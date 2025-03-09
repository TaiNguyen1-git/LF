import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { handleLogin } from '../utils/auth';

/**
 * Login component that handles user authentication
 * @param {Object} props - Component props
 * @param {Function} props.setIsLoggedIn - Function to update login state
 */
const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLoginPress = () => {
    // Clear previous errors
    setError('');
    
    // Validate inputs
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    
    // 4.1 Check credentials against stored data
    const loginSuccess = handleLogin(username, password, setIsLoggedIn);
    
    // If login failed, show error message in UI (in addition to console log)
    if (!loginSuccess) {
      setError('Invalid username or password');
    }
  };

  return (
    <View style={styles.container} testID="login-screen">
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <Button 
        title="Login" 
        onPress={onLoginPress} 
        testID="login-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login; 