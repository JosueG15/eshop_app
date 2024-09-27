import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@rneui/themed";

import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import HomeIcon from "../components/HomeIcon";
import CartIcon from "../components/CartIcon";
import UserIcon from "../components/UserIcon";
import SettingsIcon from "../components/SettingsIcon";

const Tab = createBottomTabNavigator();
const BottomNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primaryText,
        tabBarInactiveTintColor: theme.colors.accentColor,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.borderColor,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => <CartIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
