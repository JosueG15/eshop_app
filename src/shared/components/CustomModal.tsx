import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText: string;
  cancelText: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onConfirm,
  message,
  confirmText,
  cancelText,
}) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.modalText, { color: theme.colors.secondary }]}>
            {message}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text
                style={[styles.buttonText, { color: theme.colors.secondary }]}
              >
                {cancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text
                style={[styles.buttonText, { color: theme.colors.infoColor }]}
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

const styles = StyleSheet.create({
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
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default CustomModal;
