import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text } from "react-native";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { useContext } from "react";
import { Button } from "react-native-paper";

import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";

const Settings = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <Text>Settings</Text>
      <Button title="Logout" onPress={() => onLogout()}>
        Logout
      </Button>
    </SafeArea>
  );
};

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
      <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
      <Tab.Screen name="Maps" component={MapScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <MyTabs />
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
