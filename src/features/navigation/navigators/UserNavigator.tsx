import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserStackParamList } from "../../../shared/types/routeType";
import LoginScreen from "../../user/screens/LoginScreen";
import RegisterScreen from "../../user/screens/RegisterScreen";
import ProfileScreen from "../../user/screens/ProfileScreen";

const Stack = createStackNavigator<UserStackParamList>();

const UserNavigator: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default UserNavigator;
