import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CheckoutStackParamList } from "../../../shared/types/routeType";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PaymentOption from "../components/PaymentOption";
import { useFormContext, Controller } from "react-hook-form";
import { PaymentMethod } from "../utils/paymentMethodUtil";

type PaymentScreenNavigationProp = StackNavigationProp<
  CheckoutStackParamList,
  "Payment"
>;

interface PaymentFormValues {
  paymentMethod: PaymentMethod;
}

const PaymentScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const navigation = useNavigation<PaymentScreenNavigationProp>();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<PaymentFormValues>();

  const handleNextPress = () => {
    navigation.navigate("Confirm");
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexGrow: 1,
          padding: 20,
          backgroundColor: colors.background,
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
      }),
    [colors]
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={20}
      enableOnAndroid={true}
    >
      <Controller
        control={control}
        name="paymentMethod"
        rules={{ required: "Debe seleccionar un metodo de pago" }}
        render={({ field: { value, onChange } }) => (
          <>
            <PaymentOption
              title="Pago Contra Entrega"
              description="Recogeremos el pago cuando entreguemos el pedido."
              isSelected={value === "cash"}
              onSelect={() => onChange("cash")}
            />

            <PaymentOption
              title="Transferencia Bancaria"
              description="Por favor realice la transferencia bancaria antes de la entrega."
              isSelected={value === "bank"}
              onSelect={() => onChange("bank")}
            />

            <PaymentOption
              title="Pago con Tarjeta"
              description="El pago se procesará mediante tarjeta de crédito/débito."
              isSelected={value === "card"}
              onSelect={() => onChange("card")}
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
          { backgroundColor: theme.colors.nextColor },
        ]}
        titleStyle={{ color: theme.colors.infoTextColor }}
        accessible
        accessibilityLabel="Siguiente"
      />
    </KeyboardAwareScrollView>
  );
};

export default PaymentScreen;
