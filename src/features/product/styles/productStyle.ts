import { StyleSheet } from "react-native";
import { Colors } from "@rneui/themed";

export const styles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginVertical: 15,
      paddingHorizontal: 10,
    },
    scrollView: {
      paddingHorizontal: 5,
      backgroundColor: colors.background,
    },
    scrollViewContent: {
      paddingVertical: 15,
      alignItems: "center",
    },
    listItem: {
      padding: 0,
      margin: 0,
      borderRadius: 0,
      backgroundColor: "transparent",
    },
    touchable: {
      alignItems: "center",
    },
    badgeContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 8,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor: colors.borderColor,
    },
    badgeContainerUnselected: {
      opacity: 0.2,
    },
    badgeStyle: {
      borderWidth: 0,
      backgroundColor: "transparent",
    },
    badgeText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.secondary,
    },
    clearButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
      marginTop: 10,
      borderRadius: 20,
      alignSelf: "center",
      backgroundColor: colors.primary,
      shadowOpacity: 0.25,
      shadowRadius: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
    },
    clearButtonText: {
      marginLeft: 8,
      fontSize: 14,
      fontWeight: "bold",
      color: colors.secondary,
    },
  });
