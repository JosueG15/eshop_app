import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import CountryFlag from "react-native-country-flag";
import CustomForm from "../../components/shared/CustomForm";
import { useNavigation } from "@react-navigation/native";
import { useFormContext } from "react-hook-form";
import { StackNavigationProp } from "@react-navigation/stack";
import { CheckoutStackParamList } from "../../types/routes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type ShippingScreenNavigationProp = StackNavigationProp<
  CheckoutStackParamList,
  "Shipping"
>;

const ShippingScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<ShippingScreenNavigationProp>();
  const {
    control,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext();

  const handleFormSubmit = async () => {
    const isValid = await trigger([
      "phone",
      "shippingAddress1",
      "shippingAddress2",
      "city",
      "state",
      "zipCode",
    ]);

    if (isValid) {
      const formData = getValues();
      console.log("Shipping Form Data Submitted:", formData);
      navigation.navigate("Payment");
    }
  };

  const fields = [
    {
      name: "phone",
      label: "Teléfono",
      placeholder: "Ingrese su número de teléfono",
      keyboardType: "phone-pad" as const,
      required: true,
      isPhoneInput: true,
    },
    {
      name: "shippingAddress1",
      label: "Dirección de Envío 1",
      placeholder: "Ingrese la dirección de envío",
      required: true,
    },
    {
      name: "shippingAddress2",
      label: "Dirección de Envío 2",
      placeholder: "Ingrese la dirección de envío opcional",
    },
    {
      name: "city",
      label: "Ciudad",
      placeholder: "Ingrese su ciudad",
      required: true,
    },
    {
      name: "state",
      label: "Estado",
      placeholder: "Ingrese su estado",
      required: true,
    },
    {
      name: "zipCode",
      label: "Código Postal",
      placeholder: "Ingrese su código postal",
      keyboardType: "numeric" as const,
      required: true,
    },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContent}
        extraScrollHeight={20}
        enableOnAndroid={true}
        viewIsInsideTabBar={true}
      >
        <View style={styles.flagContainer}>
          <CountryFlag isoCode="SV" size={20} />
          <Text style={[styles.text, { color: theme.colors.secondary }]}>
            Información de Envío
          </Text>
        </View>

        <CustomForm
          fields={fields}
          onSubmit={handleFormSubmit}
          control={control}
          errors={errors}
          buttonTitle="Siguiente"
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  flagContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ShippingScreen;
