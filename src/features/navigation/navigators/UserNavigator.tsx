import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../user/screens/LoginScreen";
import RegisterScreen from "../../user/screens/RegisterScreen";
import ProfileScreen from "../../user/screens/ProfileScreen";
import { UserStackParamList } from "../../../shared/types/routeType";

const Stack = createStackNavigator<UserStackParamList>();

const UserNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigator;
