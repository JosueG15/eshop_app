import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              style={{ position: "relative" }}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
