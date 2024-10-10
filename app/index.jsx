import { StyleSheet, Image, View, ScrollView } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import { router } from 'expo-router'

const DriveBuddy = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image 
            source={images.logo}
            style={styles.logo}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton 
            text="Go to Buddy" 
            backgroundColor="#f1f1f1" 
            textColor="#000000"
            handlePress={() => router.push('/buddy')}
            icon={<Image source={require('../assets/icons/facebook.png')} style={styles.facebookIcon} />}
          />
          <CustomButton 
            text="Login with Apple" 
            backgroundColor="#f1f1f1" 
            textColor="#000000"
            handlePress={() => router.push('/sign-in')}
            icon={<Icon name="apple" size={20} color="#000" />}
          />
          <CustomButton 
            text="Login with Google" 
            handlePress={() => alert('Google Login')}
            backgroundColor="#f1f1f1" 
            textColor="#000000"
            icon={<Image source={require('../assets/icons/google.png')} style={styles.googleIcon} />}
          />
          <CustomButton 
            text="Login with Facebook" 
            backgroundColor="#f1f1f1" 
            textColor="#000000"
            handlePress={() => alert('Facebook Login')}
            icon={<Image source={require('../assets/icons/facebook.png')} style={styles.facebookIcon} />}
          />
          <CustomButton 
            text="Login with Email" 
            backgroundColor="#f1f1f1" 
            textColor="#000000"
            handlePress={() => router.push('/sign-in')}
            icon={<Image source={require('../assets/icons/outlook.png')} style={styles.outlookIcon} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 150, // Space between logo and buttons
  },
  logo: {
    width: 250, // Logo size
    height: 120,
  },
  buttonContainer: {
    width: 300,
    alignItems: 'center',
    marginBottom: -120,
  },
  googleIcon: {
    width: 35,
    height: 35,
  },
  facebookIcon: {
    width: 25,
    height: 25,
  },
  outlookIcon: {
    width: 20,
    height: 20,
  },
})

export default DriveBuddy
