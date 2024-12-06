import React, { useState, useEffect } from 'react';
import AppNavigator from './components/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, AuthContext } from './context/AuthContext';
import axios from 'axios';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await SplashScreen.hideAsync(); // Ocultar splash screen inmediatamente
      setLoading(false);
    };
    prepare();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
