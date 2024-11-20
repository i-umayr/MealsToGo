import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { React } from "react";
import { Oswald_400Regular, useFonts } from "@expo-google-fonts/oswald";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { SafeArea } from "./src/components/utility/safe-area.component";
import { Ionicons } from "@expo/vector-icons";
import { restaurantsRequest } from "./src/services/restaurants/restaurants.service";

const Settings = () => (
  <SafeArea>
    <Text>Settings</Text>
  </SafeArea>
);
const Maps = () => (
  <SafeArea>
    <Text>Maps</Text>
  </SafeArea>
);

const icons = {
  Restaurants: "restaurant",
  Maps: "map",
  Settings: "settings",
};

const createScreenOptions = (route) => {
  return {
    tabBarIcon: ({ color, size }) => (
      <Ionicons name={icons[route.name]} size={size} color={color} />
    ),
    headerShown: false,
    tabBarActiveTintColor: "tomato",
  };
};

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...createScreenOptions(route),
      })}
    >
      <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
      <Tab.Screen name="Maps" component={Maps} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
