import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../../settings/screens/SettingsScreen";
import ChangeThemeScreen from "../../settings/screens/ChangeThemeScreen";
import { SettingStackParamList } from "../../../shared/types/routeType";

const Stack = createStackNavigator<SettingStackParamList>();

const SettingsNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChangeTheme" component={ChangeThemeScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
