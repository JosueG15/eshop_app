import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Button, useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CheckoutStackParamList } from "../../types/routes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PaymentOption from "../../components/checkout/PaymentOption";
import { useForm, Controller } from "react-hook-form";

type PaymentScreenNavigationProp = StackNavigationProp<
  CheckoutStackParamList,
  "Payment"
>;

interface PaymentFormValues {
  paymentMethod: string;
}

const PaymentScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<PaymentScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
  };

  const handleNextPress = (data: PaymentFormValues) => {
    console.log("Payment Method:", data.paymentMethod);
    navigation.navigate("Confirm");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={20}
      enableOnAndroid={true}
    >
      <Text style={[styles.headerText, { color: theme.colors.text }]}>
        Seleccione un método de pago
      </Text>

      <Controller
        control={control}
        name="paymentMethod"
        rules={{ required: "Debe seleccionar un método de pago" }}
        render={({ field: { onChange, value } }) => (
          <>
            <PaymentOption
              title="Pago Contra Entrega"
              description="Recogeremos el pago cuando entreguemos el pedido."
              isSelected={value === "cash"}
              onSelect={() => {
                handleMethodSelect("cash");
                onChange("cash");
              }}
            />

            <PaymentOption
              title="Transferencia Bancaria"
              description="Por favor realice la transferencia bancaria antes de la entrega."
              isSelected={value === "bank"}
              onSelect={() => {
                handleMethodSelect("bank");
                onChange("bank");
              }}
            />

            <PaymentOption
              title="Pago con Tarjeta"
              description="El pago se procesará mediante tarjeta de crédito/débito."
              isSelected={value === "card"}
              onSelect={() => {
                handleMethodSelect("card");
                onChange("card");
              }}
            />
          </>
        )}
      />

      {errors.paymentMethod && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errors.paymentMethod.message}
        </Text>
      )}

      <Button
        title="Siguiente"
        onPress={handleSubmit(handleNextPress)}
        buttonStyle={[
          styles.nextButton,
          { backgroundColor: theme.colors.primary },
        ]}
        titleStyle={{ color: theme.colors.white }}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  nextButton: {
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 30,
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default PaymentScreen;
