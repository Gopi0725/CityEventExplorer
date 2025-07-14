import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Image,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';

interface InputFieldProps extends TextInputProps {
  icon: any;
  placeholder: string;
}

const InputTextField: React.FC<InputFieldProps> = ({ icon, placeholder, ...props }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <View style={[styles.inputContainer, isRTL && styles.inputContainerRTL]}>
      <Image
        source={icon}
        style={[styles.icon, isRTL && styles.iconRTL]}
      />
      <TextInput
        style={[styles.input, isRTL && styles.inputRTL]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
};

export default InputTextField;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 48,
  },
  inputContainerRTL: {
    flexDirection: 'row-reverse',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  iconRTL: {
    marginRight: 0,
    marginLeft: 10,
    transform: [{ scaleX: -1 }], // Optional: flip icon for RTL
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  inputRTL: {
    textAlign: 'right',
  },
});
