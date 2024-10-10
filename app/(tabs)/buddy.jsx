import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome'dan mikrofon ikonu
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { View, StyleSheet } from 'react-native'; // React Native View kullanımı
import fragmentShader from '../fragmentShader';
import { Sphere } from '@react-three/drei';
import vertexShader from '../vertexShader';
import Constants from 'expo-constants';
import { MathUtils } from "three";
import { Audio } from 'expo-av';
import * as THREE from 'three';
import axios from 'axios';

const AnimatedBlob = () => {
  const mesh = useRef();
  const blobShaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      u_intensity: { value: 0.3 },
      u_time: { value: 0.0 },

    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: false,
  }), []);

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value =
        0.6 * clock.getElapsedTime();

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
        0.10,
        0.1
      );
    }
  });

  return (
    <mesh ref={mesh} material={blobShaderMaterial}>
      <sphereGeometry args={[1, 35, 35]} />
    </mesh>
  );
};


const Buddy = () => {
  const [conversationStarted, setConversationStarted] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [recording, setRecording] = useState(null);

  const serverIp = Constants.expoConfig?.extra?.debuggerHost?.split(':').shift() || 'localhost';
  const serverUrl = `http://${serverIp}:8000`;

  const configureAudioForIOS = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  };
  async function playAudioFromBuffer(base64Audio) {
    const sound = new Audio.Sound();

    try {
      // Load and play audio directly from the base64 data URI
      await sound.loadAsync(
        { uri: `data:audio/wav;base64,${base64Audio}` },
        { shouldPlay: true }
      );
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }

  const handleMicPress = async () => {
    setLoading(true);
    console.log("hey");
    try {
      const response = await axios.post(`${serverUrl}/api/accounts/start_conversation/`, {
        first_run: firstRun,
      });
      console.log("Response received:", response.data);
      setResponseMessage(response.data.message);
      setConversationStarted(true);
      setFirstRun(false);
    } catch (error) {
      console.error("Error starting conversation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (conversationStarted) {
      console.log("Conversation started:", responseMessage);
    }
  }, [conversationStarted, responseMessage]);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={1} />
        <AnimatedBlob />
      </Canvas>
      <View style={styles.microphoneContainer}>
        <Icon name="microphone" size={40} color="#000" onPress={handleMicPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -130 }],
  },
  canvas: {
    height: 300,
    width: 300,
    marginBottom: 30,
  },
  microphoneContainer: {
    marginTop: 10,
    marginBottom: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Buddy;
// below is only activates mic and converts audio to text, just for testing
// const handleMicPress = async () => {
//   try {
//     console.log("Starting recording...");  // Log a message
//     // Make a POST request to your Django backend API
//     const response = await axios.post('http://192.168.1.3:8000//api/accounts/record/');
//     console.log(response.data);  // Log the response
//   } catch (error) {
//     console.error("Error starting recording", error);
//   }
// };


