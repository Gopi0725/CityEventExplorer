import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';

interface AppHeaderProps {
  title: string;
  onLogout: () => void;
  onProfile: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, onLogout, onProfile }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <View style={[styles.container, isRTL && styles.containerRTL]}>
      {/* Profile (Right in RTL, Left in LTR) */}
      <TouchableOpacity onPress={onProfile} style={styles.iconWrapper}>
        <Image
          source={require('../assets/images/user.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, isRTL && styles.titleRTL]}>
          {title}
        </Text>
      </View>

      {/* Logout (Left in RTL, Right in LTR) */}
      <TouchableOpacity onPress={onLogout} style={styles.iconWrapper}>
        <Image
          source={require('../assets/images/logout.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  containerRTL: {
    flexDirection: 'row-reverse',
  },
  iconWrapper: {
    padding: 5,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    writingDirection: 'ltr',
  },
  titleRTL: {
    writingDirection: 'rtl',
  },
});
