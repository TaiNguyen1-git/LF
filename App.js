import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Login from './src/components/Login';
import Home from './src/components/Home';

export default function App() {
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {isLoggedIn ? (
          // Show Home screen if logged in
          <Home setIsLoggedIn={setIsLoggedIn} />
        ) : (
          // Show Login screen if not logged in
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
