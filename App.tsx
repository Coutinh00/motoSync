/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Settings from './src/screens/Settings';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Details: { id?: string } | undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ title: 'Entrar' }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: 'Criar conta' }} />
          <Stack.Screen name="Home" component={Home} options={{ title: 'Início' }} />
          <Stack.Screen name="Details" component={Details} options={{ title: 'Detalhes' }} />
          <Stack.Screen name="Settings" component={Settings} options={{ title: 'Configurações' }} />
        </Stack.Navigator>
      </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
