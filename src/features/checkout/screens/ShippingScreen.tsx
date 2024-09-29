import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import CountryFlag from "react-native-country-flag";
import CustomForm from "../../../shared/components/CustomForm";
import { useNavigation } from "@react-navigation/native";
import { useFormContext, SubmitHandler, FieldValues } from "react-hook-form";
import { CheckoutNavigationProp } from "../../../shared/types/routeType";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ShippingScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<CheckoutNavigationProp>();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const onSubmit: SubmitHandler<FieldValues> = () => {
    navigation.navigate("Payment");
  };

  const fields = [
    {
      name: "phone",
      label: "Telefono",
      placeholder: "Ingrese su numero de telefono",
      keyboardType: "phone-pad" as const,
      required: true,
      isPhoneInput: true,
    },
    {
      name: "address",
      label: "Direccion",
      placeholder: "Ingrese su direccion",
      required: true,
    },
    {
      name: "address2",
      label: "Punto de referencia (Opcional)",
      placeholder: "Ingrese punto de referencia",
    },
    {
      name: "city",
      label: "Municipio",
      placeholder: "Municipio",
      required: true,
    },
    {
      name: "state",
      label: "Departamento",
      placeholder: "Departamento",
      required: true,
    },
    {
      name: "zip",
      label: "Codigo Postal",
      placeholder: "Codigo Postal",
      keyboardType: "numeric" as const,
      required: true,
    },
  ];

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
      }),
    []
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContent}
        extraScrollHeight={20}
        enableOnAndroid={true}
      >
        <View style={styles.flagContainer}>
          <CountryFlag isoCode="SV" size={20} />
          <Text
            style={[styles.text, { color: theme.colors.secondary }]}
            accessibilityLabel="Informacion de envio"
          >
            Informacion de envio
          </Text>
        </View>

        <CustomForm
          fields={fields}
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          buttonTitle="Siguiente"
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ShippingScreen;
