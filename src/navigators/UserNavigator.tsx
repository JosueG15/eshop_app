import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../features/user/screens/LoginScreen";
import RegisterScreen from "../features/user/screens/RegisterScreen";
import ProfileScreen from "../features/user/screens/ProfileScreen";
import { UserStackParamList } from "../shared/types/routeType";

const Stack = createStackNavigator<UserStackParamList>();

const UserNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
