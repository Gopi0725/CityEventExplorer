import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ImageBackground } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/splash.jpg')} // replace with your splash image
        style={styles.logo}
      >
        <Text style={styles.text}>Welcome to City Pulse App</Text>
      </ImageBackground>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    zIndex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent background for better readability
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android shadow
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50, // adjust as needed
    left: 0,
    right: 0,
    fontFamily: 'Arial', // or any other font you prefer
  },
});

export default SplashScreen;