import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import LoginScreen from './src/screens/LoginScreen';
import { useThemeStore } from './src/store/ThemeStore';
import { useAuthStore } from './src/store/AuthStore';
import { View, ActivityIndicator } from 'react-native';

function AppContent() {
  const { isDark, colors } = useThemeStore();
  const { isLoggedIn, isLoading, getUser } = useAuthStore();

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg }}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.bg}
      />
      <NavigationContainer>
        {isLoggedIn ? <DrawerNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

export default App;
