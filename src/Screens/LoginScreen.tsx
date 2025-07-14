import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  I18nManager,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import ReactNativeBiometrics from 'react-native-biometrics';
import InputTextField from '../components/InputTextField';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isArabic, setIsArabic] = useState(i18n.language === 'ar');
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

  /*const onLogin = async () => {
    // Validate email and password
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    } else {
      try {
        const usersList = await AsyncStorage.getItem('users');
        const users = usersList ? JSON.parse(usersList) : [];
        console.log('Users:', JSON.stringify(users));
        const getUser = users.find(
          u =>
            (u.userName === email || u.emailAddress === email) &&
            u.password === password,
        );
        if (getUser) {
          await AsyncStorage.setItem('currentUser', JSON.stringify(getUser));
          console.log('User logged in:', getUser);
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', 'Login failed. Please try again.');
        return;
      }
    }
  };*/
  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);

      console.log('User logged in:', auth().currentUser?.email);
      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Firebase login error:', error);

      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Login Error', 'User not found');
          break;
        case 'auth/wrong-password':
          Alert.alert('Login Error', 'Incorrect password');
          break;
        case 'auth/invalid-email':
          Alert.alert('Login Error', 'Invalid email format');
          break;
        default:
          Alert.alert('Login Error', error.message);
          break;
      }
    }
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };
  const toggleLanguage = async () => {
    const newLang = isArabic ? 'en' : 'ar';
    const isRTL = newLang === 'ar';
    try {
      await i18n.changeLanguage(newLang);
      I18nManager.forceRTL(false);
      setIsArabic(!isArabic);
    } catch (err) {
      console.error('Language switch error', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.langContainer}>
        <Text style={styles.langLabel}>{isArabic ? t('language') : t('language')}</Text>
        <Switch value={isArabic} onValueChange={toggleLanguage} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={[styles.title, isRTL && styles.textRTL]}>{t('login')}</Text>
        <InputTextField
          icon={require('../assets/images/mail.png')}
          placeholder={t('email')}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <InputTextField
          icon={require('../assets/images/lock.png')}
          placeholder={t('password')}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>{t('log_in')}</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>{t('no_account')}
          <Text style={styles.signUpText} onPress={onSignUp}>
            {' '}
            {t('signup')}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#dfdfbaff',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  textRTL: {
    textAlign: 'right',
  },
  rowRTL: {
    flexDirection: 'row-reverse',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginContainer: {
    top: '22%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 20,
    shadowRadius: 3,
    width: '100%',
    maxWidth: 400,
    height: 305,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
  },
  button: {
    marginTop: 5,
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18,
  },

  biologo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 175,
  },
  googlebutton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#4285F4',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  footerText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpText: {
    color: '#e32828',
    fontWeight: 'bold',
    fontSize: 16,
  },
  langContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  langLabel: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default LoginScreen;