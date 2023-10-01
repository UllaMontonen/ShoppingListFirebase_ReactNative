// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Constants from 'expo-constants'


// Your web app's Firebase configuration
const firebaseConfig = process.env.EXPO_PUBLIC_FIREBASE_CONFIG || Constants.expoConfig.extra.firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig) 
export default getDatabase(app);