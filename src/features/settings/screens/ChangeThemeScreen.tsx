import React, { useEffect, useRef, useMemo } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "@rneui/themed";

import { RootState } from "../../../store/store";
import { saveTheme } from "../../../store/slices/theme/themeSlice";
import ThemeOption from "../components/ThemeOptionComponent";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";

const ChangeThemeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const themeMode = useSelector((state: RootState) => state.theme.themeMode);
  const animatedValue = useRef(
    new Animated.Value(themeMode === "dark" ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: themeMode === "dark" ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [themeMode]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", "#2C2C2C"],
  });

  const handleThemeChange = (mode: "light" | "dark") => {
    dispatch(saveTheme(mode));
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        },
        title: {
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 50,
          textAlign: "center",
          color: theme.colors.secondary,
        },
        switchContainer: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
        },
      }),
    [theme, themeMode]
  );

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Seleccionar Modo de Visualización</Text>

      <View style={styles.switchContainer}>
        <ThemeOption
          mode="light"
          selectedMode={themeMode}
          handleThemeChange={handleThemeChange}
          iconName="sunny-outline"
          iconColor={theme.colors.themeLightColor || ""}
          label=""
        />
        <ThemeOption
          mode="dark"
          selectedMode={themeMode}
          handleThemeChange={handleThemeChange}
          iconName="moon-outline"
          iconColor={theme.colors.themeDarkIcon || ""}
          label=""
        />
      </View>
    </Animated.View>
  );
};

export default ChangeThemeScreen;
