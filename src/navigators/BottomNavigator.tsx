import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme, Badge } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import { RootState } from "../store/store";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { theme } = useTheme();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.cardShadow,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" style={styles.icon} color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Icon
                name="shopping-cart"
                style={styles.icon}
                color={color}
                size={30}
              />
              {totalCartItems > 0 && (
                <Badge
                  value={totalCartItems}
                  status="error"
                  containerStyle={styles.badgeContainer}
                  textStyle={styles.badgeText}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" style={styles.icon} color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" style={styles.icon} color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "relative",
  },
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -10,
  },
  badgeText: {
    fontSize: 12,
  },
});

export default BottomNavigator;
