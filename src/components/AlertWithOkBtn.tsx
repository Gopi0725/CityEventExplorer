import React, { useEffect } from 'react';
import { Alert } from 'react-native';

const AlertWithOkBtn = ({ title, message, onOkPress }) => {
  
  useEffect(() => {
    if (title && message) {
      Alert.alert(
        title,
        message,            
        [
          {
            text: "OK",        
            onPress: onOkPress,  
          },
        ],
        { cancelable: false }   
      );
    }
  }, [title, message, onOkPress]);  
  return null;  
};

export default AlertWithOkBtn;
