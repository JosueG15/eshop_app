import React from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { StyleSheet } from "react-native";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
}

export const showToast = (message: string, type: ToastType) => {
  Toast.show({
    type: type,
    text1: message,
  });
};

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      text1Style={styles.toastText}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      text1Style={styles.toastText}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={styles.infoToast}
      text1Style={styles.toastText}
    />
  ),
};

const ToastComponent: React.FC<ToastProps> = () => {
  return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: "green",
  },
  errorToast: {
    borderLeftColor: "red",
  },
  infoToast: {
    borderLeftColor: "blue",
  },
  toastText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ToastComponent;
