import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AlertWithOkBtn from '../components/AlertWithOkBtn';
import CommonHeader from '../components/CommonHeader';
import { useTranslation } from 'react-i18next';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleOkPress = () => {
    setShowAlert(false);
    navigation.navigate('Login');
  };

  const onRegister = async () => {
    if (
      !userName ||
      !password ||
      !confirmPassword ||
      !emailAddress ||
      !phoneNumber
    ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    } else if (userName.length < 3) {
      Alert.alert('Error', 'User Name should be minimum 3 characters.');
      return;
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    } else if (!isValidEmail(emailAddress)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      // Firebase Auth - create user
      const userCredential = await auth().createUserWithEmailAndPassword(
        emailAddress,
        password,
      );
      const uid = userCredential.user.uid;

      handleShowAlert();
      // Update Firebase user profile with display name
      await auth().currentUser?.updateProfile({ displayName: userName });

      // Save additional user data to Firestore
      await firestore().collection('users').doc(uid).set({
        uid,
        userName,
        emailAddress,
        phoneNumber,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This email is already registered.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'The email address is invalid.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password should be at least 6 characters.');
      } else {
        Alert.alert('Registration Error', error.message);
      }
      console.error('Firebase registration error:', error);
    }
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        title={t('register')}
        onBackPress={() => navigation.goBack()}
        onProfilePress={() =>
          Alert.alert('Profile Icon', 'Go to profile settings')
        }
      />
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 15,
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        <View style={styles.loginContainer}>
          <Text
            style={[
              styles.lblField,
              isRTL && styles.lblFieldRTL,
              { writingDirection: isRTL ? 'rtl' : 'ltr' },
            ]}
          >
            {t('username')}
          </Text>

          <TextInput
            style={[styles.input, isRTL && styles.inputRTL]}
            placeholder={t('enter_username')}
            keyboardType="default"
            autoCapitalize="none"
            value={userName}
            onChangeText={setUserName}
            textContentType="name"
            textAlign={isRTL ? 'right' : 'left'}
          />

          <Text style={[styles.lblField, isRTL && styles.lblFieldRTL]}>
            {t('password')}
          </Text>
          <TextInput
            style={[styles.input, isRTL && styles.inputRTL]}
            placeholder={t('enter_password')}
            secureTextEntry
            autoCapitalize="none"
            keyboardType="default"
            value={password}
            onChangeText={setPassword}
            textContentType="password"
            textAlign={isRTL ? 'right' : 'left'}
          />

          <Text style={[styles.lblField, isRTL && styles.lblFieldRTL]}>
            {t('confirm_password')}
          </Text>
          <TextInput
            style={[styles.input, isRTL && styles.inputRTL]}
            placeholder={t('confirm_password')}
            secureTextEntry
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            textContentType="password"
            textAlign={isRTL ? 'right' : 'left'}
          />

          <Text style={[styles.lblField, isRTL && styles.lblFieldRTL]}>
            {t('email_address')}
          </Text>
          <TextInput
            style={[styles.input, isRTL && styles.inputRTL]}
            placeholder={t('enter_email')}
            keyboardType="email-address"
            value={emailAddress}
            onChangeText={setEmailAddress}
            textContentType="emailAddress"
            maxLength={50}
            textAlign={isRTL ? 'right' : 'left'}
          />

          <Text style={[styles.lblField, isRTL && styles.lblFieldRTL]}>
            {t('phone')}
          </Text>
          <TextInput
            style={[styles.input, isRTL && styles.inputRTL]}
            placeholder={t('enter_phone')}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
            textContentType="telephoneNumber"
            maxLength={12}
            textAlign={isRTL ? 'right' : 'left'}
          />

          <TouchableOpacity style={styles.button} onPress={onRegister}>
            <Text style={styles.buttonText}>{t('submit')}</Text>
          </TouchableOpacity>

          {showAlert && (
            <AlertWithOkBtn
              title={t('success')}
              message={t('registration_successful')}
              onOkPress={handleOkPress}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfdfbaff',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 0,
  },
  lblField: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
    marginTop: 5,
    textAlign: 'left',
  },
  lblFieldRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  loginContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 20,
    shadowRadius: 3,
    width: '100%',
    maxWidth: 500,
    height: 550,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'left',
  },
  inputRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  button: {
    backgroundColor: '#e32828',
    paddingVertical: 15,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default SignUpScreen;
