import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserStackParamList } from "../../../shared/types/routeType";
import LoginScreen from "../../user/screens/LoginScreen";
import RegisterScreen from "../../user/screens/RegisterScreen";
import ProfileScreen from "../../user/screens/ProfileScreen";
import EditPersonalInfoScreen from "../../user/screens/EditPersonalInfoScreen";

const Stack = createStackNavigator<UserStackParamList>();

const UserNavigator: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="EditPersonalInfo"
            component={EditPersonalInfoScreen}
            options={{
              headerBackTitle: " ",
              headerBackAccessibilityLabel: "Atras",
              headerShown: true,
              headerTitle: "Informacion personal",
            }}
          />
        </>
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
