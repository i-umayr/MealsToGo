import { AppNavigator } from "./app.navigator";
import React, { useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { NavigationContainer } from "@react-navigation/native";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
