
import React, { useState } from 'react';
import { Text, View,StyleSheet, TouchableOpacity, Alert } from 'react-native';


const DisplayButton = ({ btnText, btnClick }) => {
    return (
       
            <TouchableOpacity style={styles.button} onPress={btnClick}>
                <Text style={styles.buttonText}>{btnText}</Text>
            </TouchableOpacity>
      

    )
}
export default DisplayButton;

const styles = StyleSheet.create({

  
    button: {
        backgroundColor: '#e32828',
        borderRadius: 8,
        width: '45%',
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        alignSelf:'center'
        
    },
    buttonText: {
        color: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 18,
    },

});
