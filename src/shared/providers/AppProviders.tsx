import React, { ReactNode, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { ThemeProvider } from "@rneui/themed";
import { ErrorBoundary } from "react-error-boundary";
import { View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { PaperProvider } from "react-native-paper";

import { RootState } from "../../store/store";
import { STRIPE_PUBLISHABLE_KEY } from "@env";
import { darkTheme, lightTheme } from "../styles/themes";
import Toast from "../components/Toast";
import Error from "../components/Error";
import { loadTheme } from "../../store/slices/theme/themeSlice";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { loadTokenFromStorage } from "../../store/slices/auth/authSlice";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.themeMode);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(loadTheme());
      await dispatch(loadTokenFromStorage());
      setIsAppReady(true);
    };

    initializeApp();
  }, [dispatch]);

  if (!isAppReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <PaperProvider>
          <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
            <ErrorBoundary FallbackComponent={Error}>
              {children}
              <Toast />
            </ErrorBoundary>
          </ThemeProvider>
        </PaperProvider>
      </StripeProvider>
    </NavigationContainer>
  );
};
