import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

const GoogleSignInButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/google.png')}// Replace with your local image path}}
          style={styles.logo}
          //uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
        />
        <Text style={styles.text}>Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {

    backgroundColor: '#000000',
    borderRadius: 30,
    height: 50,
    width: '90%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'absolute',
    bottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GoogleSignInButton;
