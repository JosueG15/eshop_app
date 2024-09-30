import React, { ReactNode, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { darkTheme, lightTheme } from "../styles/themes";
import { PaperProvider } from "react-native-paper";
import Toast from "../components/Toast";
import Error from "../components/Error";
import { loadTheme } from "../../store/slices/theme/themeSlice";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { loadTokenFromStorage } from "../../store/slices/auth/authSlice";

const queryClient = new QueryClient();

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
      <PaperProvider>
        <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary FallbackComponent={Error}>
              {children}
              <Toast />
            </ErrorBoundary>
          </QueryClientProvider>
        </ThemeProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};
