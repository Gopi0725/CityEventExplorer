import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';

interface CommonHeaderProps {
  title: string;
  onBackPress?: () => void;
  onProfilePress?: () => void;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ title, onBackPress, onProfilePress }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <View style={[styles.container, isRTL && styles.containerRTL]}>
      {/* Back Icon */}
      <TouchableOpacity onPress={onBackPress} style={styles.leftIcon}>
        <Image
          style={[styles.icon, isRTL && styles.iconFlipped]}
          source={require('../assets/images/back.png')}
        />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, isRTL && styles.titleRTL]}>{title}</Text>
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  containerRTL: {
    flexDirection: 'row-reverse',
  },
  leftIcon: {
    padding: 0,
  },
  rightIcon: {
    padding: 0,
    // If you want to conditionally hide/show: add dynamic logic in component
    // display: 'none',
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  iconFlipped: {
    transform: [{ scaleX: -1 }],
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleRTL: {
    textAlign: 'center',
  },
});
