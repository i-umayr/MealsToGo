import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBczL7cRmsMWwB0zo6ec5A0RpRpJW-hJo",
  authDomain: "mealstogo-ca682.firebaseapp.com",
  projectId: "mealstogo-ca682",
  storageBucket: "mealstogo-ca682.firebasestorage.app",
  messagingSenderId: "150047645470",
  appId: "1:150047645470:web:14a78b6ad2d3b4b574f30f",
};

// Initialize Firebase app only once
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
