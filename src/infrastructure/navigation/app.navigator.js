import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";

import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { SettingsNavigator } from "./settings.navigator";

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
      <Tab.Screen name="Settings" component={SettingsNavigator} />
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
