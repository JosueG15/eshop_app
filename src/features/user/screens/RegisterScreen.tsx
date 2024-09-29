import { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { FieldValues, useForm } from "react-hook-form";
import { useAuth } from "../../../shared/hooks/useAuth";
import CustomForm from "../../../shared/components/CustomForm";
import { Field } from "../../../shared/types/formTypes";
import { IUser } from "../../../shared/types/userType";
import { UserNavigationProp } from "../../../shared/types/routeType";

const RegisterScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const navigation = useNavigation<UserNavigationProp>();
  const { register, isLoadingRegister, errorMessage } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    register({ ...data, country: "El Salvador" } as IUser);
  };

  const registerFields: Field[] = [
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
          message: "Correo no válido",
        },
      },
    },
    {
      name: "passwordHash",
      label: "Contraseña",
      placeholder: "Ingrese su contraseña",
      secureTextEntry: true,
      required: true,
      rules: {
        minLength: {
          value: 6,
          message: "Mínimo 6 caracteres",
        },
      },
    },
    {
      name: "phone",
      label: "Telefono",
      placeholder: "Ingrese su numero de telefono",
      keyboardType: "phone-pad",
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
      label: "Punto de referencia",
      placeholder: "Punto de referencia (opcional)",
    },
    {
      name: "city",
      label: "Municipio",
      placeholder: "Ingrese su municipio",
      required: true,
    },
    {
      name: "state",
      label: "Departamento",
      placeholder: "Ingrese su Departamento",
      required: true,
    },
    {
      name: "zip",
      label: "Codigo Postal",
      placeholder: "Ingrese su Codigo Postal",
      keyboardType: "numeric",
      required: true,
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <CustomForm
        fields={registerFields}
        control={control}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        buttonTitle={isLoadingRegister ? "Cargando..." : "Crear Cuenta"}
        isLoading={isLoadingRegister}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
