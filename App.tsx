import './i18n'; 
import React from 'react';
import {I18nManager, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/Screens/SplashScreen';
import LoginScreen from './src/Screens/LoginScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import HomeScreen from './src/Screens/HomeScreen';
import DetailScreen from './src/Screens/DetailScreen';
import ProfileScreen from './src/Screens/ProfileScreen';


//I18nManager.forceRTL(false);

const Stack = createNativeStackNavigator();


function App() {

  const[isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if(isLoading) return <SplashScreen />

  return (
    <SafeAreaProvider>
      <NavigationContainer>

      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false, headerTitleAlign: 'center', headerStyle: { backgroundColor: '#4e73df' }, headerTintColor: '#fff' }}>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Profile'component={ProfileScreen}/>
        <Stack.Screen name='Details' component={DetailScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
