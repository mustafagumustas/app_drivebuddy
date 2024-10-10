// CustomButton.jsx
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { isLoading } from 'expo-font'

const CustomButton = ({ text, handlePress, backgroundColor, textColor, icon }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }]} 
      onPress={handlePress}
      activeOpacity={0.8}
      
    
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 60,
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    elevation: 3, // Adds a subtle shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
})
