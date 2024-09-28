import React, { useState } from "react";
import { Input } from "@rneui/themed";
import AppModal from "../../../shared/components/AppModal";
import { showToast } from "../../../shared/components/Toast";

interface QuantitySelectorModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (quantity: number) => void;
  maxQuantity: number;
}

const QuantitySelectorModal: React.FC<QuantitySelectorModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  maxQuantity,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = () => {
    if (quantity > 0 && quantity <= maxQuantity) {
      onConfirm(quantity);
    } else {
      showToast(
        "Error",
        "Por favor ingrese una cantidad igual o menor al producto",
        "error"
      );
    }
  };

  return (
    <AppModal
      visible={visible}
      onCancel={onCancel}
      onConfirm={handleConfirm}
      confirmText="Eliminar"
      title="Seleccionar cantidad a remover"
    >
      <Input
        placeholder="Cantidad"
        keyboardType="numeric"
        value={quantity.toString()}
        onChangeText={(value) => {
          const newValue = parseInt(value, 10);
          if (!isNaN(newValue) && newValue > 0) {
            setQuantity(newValue);
          } else {
            setQuantity(0);
          }
        }}
      />
    </AppModal>
  );
};

export default QuantitySelectorModal;
