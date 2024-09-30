import React, { useMemo } from "react";
import { useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../../settings/screens/SettingsScreen";
import ChangeThemeScreen from "../../settings/screens/ChangeThemeScreen";
import { SettingStackParamList } from "../../../shared/types/routeType";
import { RootState } from "../../../store/store";
import ManageCategoriesScreen from "../../settings/screens/ManageCategoriesScreen";

const Stack = createStackNavigator<SettingStackParamList>();

const SettingsNavigator: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { theme } = useTheme();

  const commonScreenOptions = useMemo(
    () => ({
      headerBackTitle: " ",
      headerBackAccessibilityLabel: "Atrás",
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTintColor: theme.colors.primaryText,
    }),
    [theme]
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="ChangeTheme"
        options={{
          ...commonScreenOptions,
          headerTitle: "Modo de visualizacion",
        }}
        component={ChangeThemeScreen}
      />
      {user?.isAdmin && (
        <Stack.Screen
          name="ManageCategories"
          component={ManageCategoriesScreen}
        />
      )}
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
