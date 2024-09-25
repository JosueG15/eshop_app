import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet, Alert } from "react-native";
import { Input } from "@rneui/themed";

interface QuantitySelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  maxQuantity: number;
}

const QuantitySelectorModal: React.FC<QuantitySelectorModalProps> = ({
  visible,
  onClose,
  onConfirm,
  maxQuantity,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = () => {
    if (quantity > 0 && quantity <= maxQuantity) {
      onConfirm(quantity);
    } else {
      Alert.alert("Invalid quantity", "Please enter a valid quantity.");
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Quantity to Remove</Text>

          <Input
            placeholder="Quantity"
            keyboardType="numeric"
            defaultValue={quantity.toString()}
            onChangeText={(value) => {
              const newValue = parseInt(value);
              if (!isNaN(newValue) && newValue > 0) {
                setQuantity(newValue);
              }
            }}
          />

          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Confirm" onPress={handleConfirm} />
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
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default QuantitySelectorModal;
