import { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { FieldValues, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../../../shared/hooks/useAuth";
import CustomForm from "../../../shared/components/CustomForm";
import { Field } from "../../../shared/types/formTypes";
import { LoginFormValues } from "../../../shared/types/userType";
import { UserNavigationProp } from "../../../shared/types/routeType";

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const { colors } = theme;

  const navigation = useNavigation<UserNavigationProp>();
  const { login, isLoadingLogin, errorMessage } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    login(data as LoginFormValues);
  };

  const loginFields: Field[] = [
    {
      name: "email",
      label: "Correo Electrónico",
      placeholder: "Ingrese su correo electrónico",
      keyboardType: "email-address",
      autoCapitalize: "none",
      required: true,
      rules: {
        required: "El correo electrónico es obligatorio",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Dirección de correo no válida",
        },
      },
    },
    {
      name: "password",
      label: "Contraseña",
      placeholder: "Ingrese su contraseña",
      secureTextEntry: true,
      required: true,
      rules: {
        required: "La contraseña es obligatoria",
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
        },
        innerContainer: {
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          backgroundColor: colors.background,
        },
        title: {
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
          color: colors.secondary,
        },
        inputContainer: {
          marginBottom: 20,
        },
        input: {
          paddingHorizontal: 10,
        },
        button: {
          paddingVertical: 15,
          borderRadius: 8,
          marginTop: 10,
        },
        registerContainer: {
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        },
        registerText: {
          fontSize: 16,
          color: colors.secondary,
        },
        registerLink: {
          fontSize: 16,
          fontWeight: "bold",
          marginLeft: 5,
          color: colors.infoColor,
        },
        errorText: {
          fontSize: 14,
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
      <View style={[styles.innerContainer, {}]}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <CustomForm
          fields={loginFields}
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          buttonTitle={isLoadingLogin ? "Cargando..." : "Iniciar Sesión"}
          isLoading={isLoadingLogin}
        />
        {errorMessage && (
          <Text style={[styles.errorText, {}]}>{errorMessage}</Text>
        )}
        <View style={styles.registerContainer}>
          <Text style={[styles.registerText, {}]}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={[styles.registerLink, {}]}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
