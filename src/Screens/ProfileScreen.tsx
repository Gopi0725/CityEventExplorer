import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import CommonHeader from '../components/CommonHeader';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const uid = currentUser.uid;
          const doc = await firestore().collection('users').doc(uid).get();
          if (doc.exists()) {
            setUserData(doc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user profile.');
      }
    };

    fetchUserData();
  }, []);

  const capitalFirstLetter = (string: string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return '';
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        title={t('profile')}
        onBackPress={() => navigation.goBack()}
        onProfilePress={() => Alert.alert('Profile Icon', 'Go to profile settings')}
      />
      <View style={styles.containerDetails}>
        <View>
          <Text style={styles.titleText}>User Name:</Text>
          <Text style={styles.valueText}>
            {capitalFirstLetter(userData?.userName ?? 'Guest')}
          </Text>
          <View style={styles.underline} />
        </View>

        <View style={styles.containerField}>
          <Text style={styles.titleText}>Email Address:</Text>
          <Text style={styles.valueText}>{userData?.emailAddress ?? '-'}</Text>
          <View style={styles.underline} />
        </View>

        <View style={styles.containerField}>
          <Text style={styles.titleText}>Phone Number:</Text>
          <Text style={styles.valueText}>{userData?.phoneNumber ?? '-'}</Text>
          <View style={styles.underline} />
        </View>

        <View style={styles.containerField}>
          <Text style={styles.titleText}>UID:</Text>
          <Text style={styles.valueText}>{auth().currentUser?.uid}</Text>
          <View style={styles.underline} />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#dfdfbaff',
    paddingTop: 0,
  },
  containerDetails: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  containerField: {
    marginTop: 15,
  },
  titleText: {
    color: '#8e44ad',
    fontSize: 16,
  },
  valueText: {
    color: '#100',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 5,
  },
  underline: {
    marginTop: 4,
    height: 1,
    backgroundColor: '#bdc3c7',
    width: '100%',
  },
});
