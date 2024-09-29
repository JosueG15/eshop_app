import { useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";

import CustomForm from "../../../shared/components/CustomForm";
import { Field } from "../../../shared/types/formTypes";
import { IUser } from "../../../shared/types/userType";
import { RootState } from "../../../store/store";
import { useUser } from "../hooks/useUser";

const EditPersonalInfoScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { theme } = useTheme();
  const { colors } = theme;
  const { updateUser, isLoading } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IUser>>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      passwordHash: "",
    },
  });

  const onSubmit = (data: FieldValues) => {
    const updateData: Partial<IUser> = {
      name: data.name,
      email: data.email,
    };

    if (data.passwordHash) {
      updateData.passwordHash = data.passwordHash;
    }

    updateUser(updateData);
  };

  const fields: Field[] = [
    {
      name: "name",
      label: "Nombre",
      placeholder: "Ingrese su nombre",
      required: true,
    },
    {
      name: "email",
      label: "Correo Electrónico",
      placeholder: "Ingrese su correo electrónico",
      keyboardType: "email-address",
      autoCapitalize: "none",
      required: true,
      rules: {
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Dirección de correo no válida",
        },
      },
    },
    {
      name: "passwordHash",
      label: "Nueva Contraseña (Opcional)",
      placeholder: "Ingrese su nueva contraseña",
      secureTextEntry: true,
      required: false,
      rules: {
        minLength: {
          value: 6,
          message: "La contraseña debe tener al menos 6 caracteres",
        },
      },
    },
  ];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
          backgroundColor: colors.background,
        },
        title: {
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
          color: colors.secondary,
        },
        button: {
          paddingVertical: 15,
          borderRadius: 8,
          marginTop: 10,
        },
        loginContainer: {
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        },
        loginText: {
          fontSize: 16,
          color: colors.secondary,
        },
        loginLink: {
          fontSize: 16,
          fontWeight: "bold",
          marginLeft: 5,
          textDecorationLine: "underline",
          color: colors.infoColor,
        },
        errorText: {
          textAlign: "center",
          marginVertical: 10,
          color: colors.error,
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
      <CustomForm
        fields={fields}
        control={control}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        buttonTitle={isLoading ? "Guardando..." : "Guardar"}
        isLoading={isLoading}
      />
    </KeyboardAwareScrollView>
  );
};

export default EditPersonalInfoScreen;
