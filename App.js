import "./gesture-handler";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { React } from "react";
import { Oswald_400Regular, useFonts } from "@expo-google-fonts/oswald";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigation } from "./src/infrastructure/navigation";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";
import { initializeApp } from "firebase/app";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyBBczL7cRmsMWwB0zo6ec5A0RpRpJW-hJo",
    authDomain: "mealstogo-ca682.firebaseapp.com",
    projectId: "mealstogo-ca682",
    storageBucket: "mealstogo-ca682.firebasestorage.app",
    messagingSenderId: "150047645470",
    appId: "1:150047645470:web:14a78b6ad2d3b4b574f30f",
  };

  // Initialize Firebase app only once
  initializeApp(firebaseConfig);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <FavouritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider>
                <Navigation />
              </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavouritesContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
