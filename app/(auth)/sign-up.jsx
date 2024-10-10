import { StyleSheet, Image, View, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router'; // Import useRouter from expo-router


const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);  // State to handle errors
  const router = useRouter(); // Initialize router for navigation

  const submit = async () => {
    setIsSubmitting(true);
    setError(null);  // Clear previous error messages
    try {
      const response = await fetch('http://192.168.1.3:8000/api/accounts/sign-up/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign up successful:', data);
        // Navigate to the Buddy page if sign-up is successful
        router.push('/buddy'); // Change '/buddy' to the appropriate route for your Buddy page
      } else {
        console.log('Sign up error:', data);  // Log the error response
        setError(data);  // Set error to show to the user
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Image
              source={images.logo}
              style={styles.logo}
            />
            <Text style={styles.title}>
              Sign Up to Drive Buddy!
            </Text>

            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles={styles.formField}
            />
            <View style={{ height: 20 }} />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles={styles.formField}
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
              text="Sign Up" // Change the button text to "Sign Up"
              backgroundColor="#f1f1f1"
              textColor="#000000"
              handlePress={submit}
              containerStyles={styles.button}
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-sm text-gray-100 font-pregular">
                Have an account already?
              </Text>
              <Link href="/sign-in" className='text-sm font-semipbold text-primary'>Sign In</Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
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
    paddingVertical: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: -30,
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
    marginBottom: 60,
  },
  formField: {
    marginBottom: 80,
    width: '100%',
  },
  button: {
    marginTop: 350,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default SignUp;
