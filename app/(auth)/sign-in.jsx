import { StyleSheet, Image, View, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, useRouter } from 'expo-router';

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://192.168.1.3:8000/api/accounts/sign-in/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign-in successful:', data.message);
        // Navigate to the Buddy page if sign-up is successful
        router.push('/buddy');
      } else {
        console.log('Sign-in error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps='handled' // Ensure taps are handled while keyboard is open
        >
          <View style={styles.container}>
            <Image
              source={images.logo}
              style={styles.logo}
            />
            <Text style={styles.title}>
              Log in to Drive Buddy!
            </Text>

            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles={styles.formField}
              autoCapitalize="none"
            />
            <View style={{ height: 20 }} />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles={styles.formField}
              secureTextEntry={true}
            />

            <CustomButton
              text="Sign In"
              backgroundColor="#f1f1f1"
              textColor="#000000"
              handlePress={submit}
              containerStyles={styles.button}
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-sm text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link href="/sign-up" className='text-sm font-semipbold text-primary'>Sign Up</Link>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 30, // Reduce the vertical padding to bring the content up
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center', // View içeriğini yatayda ortalar
    paddingHorizontal: 25,
    paddingTop: 30, // Increase top padding to move content down a bit
  },
  logo: {
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: '#000',
    marginTop: 80,
    marginBottom: 60,// Reduce margin to move title up
  },
  formField: {
    marginBottom: 80,
    width: '100%',
    height: 50, // Adjust height as necessary
    paddingVertical: 10, // Add padding for better visual
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 350, // Increase marginTop to move button down
    width: '100%', // Buton genişliği %100 olacak
    alignItems: 'center', // Buton metnini ortalar
    paddingVertical: 20, // Buton ile ekranın altı arasına boşluk ekler
  },
})

export default SignIn
