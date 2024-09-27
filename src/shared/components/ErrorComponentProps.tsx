import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";

interface ErrorComponentProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.colors.error,
    },
    message: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 30,
      paddingHorizontal: 10,
      color: theme.colors.secondary,
    },
    button: {
      backgroundColor: theme.colors.buttonColor,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
    },
    buttonText: {
      color: theme.colors.infoTextColor,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/error.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Oops! Algo salio mal.</Text>
      <Text style={styles.message}>{error.message}</Text>
      <TouchableOpacity onPress={resetErrorBoundary} style={styles.button}>
        <Text style={styles.buttonText}>Intenta de nuevo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorComponent;
