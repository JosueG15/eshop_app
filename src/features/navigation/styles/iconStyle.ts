import { StyleSheet } from "react-native";

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

export default styles;
