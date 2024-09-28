import { useMemo } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";

interface AppModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
}

const AppModal: React.FC<AppModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  children,
}) => {
  const { theme } = useTheme();
  const { colors } = theme;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalContent: {
          width: "80%",
          padding: 20,
          borderRadius: 10,
          backgroundColor: colors.background,
        },
        modalTitle: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          color: colors.secondary,
          textAlign: "center",
        },
        modalText: {
          fontSize: 16,
          marginBottom: 20,
          color: colors.secondary,
          textAlign: "center",
        },
        buttonContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        },
        button: {
          padding: 10,
          borderRadius: 5,
          backgroundColor: colors.infoColor,
        },
        cancelButtonText: {
          fontSize: 16,
          color: colors.infoTextColor,
        },
        confirmButtonText: {
          fontSize: 16,
          color: colors.infoTextColor,
        },
      }),
    [colors]
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {title && (
            <Text style={styles.modalTitle} accessibilityLabel={`${title}`}>
              {title}
            </Text>
          )}
          {message && (
            <Text style={styles.modalText} accessibilityLabel={`${message}`}>
              {message}
            </Text>
          )}
          {children}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text
                style={styles.cancelButtonText}
                accessibilityLabel={`${cancelText}`}
              >
                {cancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text
                style={styles.confirmButtonText}
                accessibilityLabel={`${confirmText}`}
              >
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;
