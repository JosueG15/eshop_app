import { useMemo, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme, Icon } from "@rneui/themed";
import CountryFlag from "react-native-country-flag";
import CustomForm from "../../../shared/components/CustomForm";
import { useNavigation } from "@react-navigation/native";
import { useFormContext, SubmitHandler, FieldValues } from "react-hook-form";
import { CheckoutNavigationProp } from "../../../shared/types/routeType";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const ShippingScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<CheckoutNavigationProp>();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    resetField,
  } = useFormContext();

  const user = useSelector((state: RootState) => state.auth.user);
  const [useProfileInfo, setUseProfileInfo] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = () => {
    navigation.navigate("Payment");
  };

  const handleToggleProfileInfo = () => {
    setUseProfileInfo((prev) => !prev);

    if (!useProfileInfo && user) {
      setValue("phone", user.phone || "");
      setValue("address", user.address || "");
      setValue("address2", user.address2 || "");
      setValue("city", user.city || "");
      setValue("state", user.state || "");
      setValue("zip", user.zip || "");
    } else {
      resetField("phone");
      resetField("address");
      resetField("address2");
      resetField("city");
      resetField("state");
      resetField("zip");
    }
  };

  const fields = [
    {
      name: "phone",
      label: "Telefono",
      placeholder: "Ingrese su numero de telefono",
      keyboardType: "phone-pad" as const,
      required: true,
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
        toggleContainer: {
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
          paddingLeft: 10,
        },
        toggleText: {
          marginLeft: 8,
          fontSize: 16,
          color: theme.colors.secondary,
        },
      }),
    [theme]
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

        <TouchableOpacity
          style={styles.toggleContainer}
          onPress={handleToggleProfileInfo}
        >
          <Icon
            name={useProfileInfo ? "check-box" : "check-box-outline-blank"}
            type="material"
            color={theme.colors.secondary}
            size={24}
          />
          <Text style={styles.toggleText}>Usar información de perfil</Text>
        </TouchableOpacity>

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
