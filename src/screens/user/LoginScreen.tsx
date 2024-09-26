import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Text, Button, Input, useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { UserNavigationProp } from "../../types/routes";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../../hooks/useAuth";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<UserNavigationProp>();
  const { login, isLoading, errorMessage } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={20}
      enableOnAndroid={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[
          styles.innerContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.secondary }]}>
          Iniciar Sesión
        </Text>

        <Controller
          control={control}
          name="email"
          rules={{
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Dirección de correo no válida",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Correo Electrónico"
              placeholder="Ingrese su correo electrónico"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email ? errors.email.message : undefined}
              autoCapitalize="none"
              inputStyle={styles.input}
              containerStyle={styles.inputContainer}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={
                errors.password ? errors.password.message : undefined
              }
              inputStyle={styles.input}
              containerStyle={styles.inputContainer}
            />
          )}
        />

        <Button
          title={isLoading ? "Cargando..." : "Iniciar Sesión"}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          buttonStyle={[
            styles.button,
            { backgroundColor: theme.colors.infoColor },
          ]}
          titleStyle={{ color: theme.colors.infoTextColor }}
        />

        {errorMessage && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {errorMessage}
          </Text>
        )}

        <View style={styles.registerContainer}>
          <Text
            style={[styles.registerText, { color: theme.colors.secondary }]}
          >
            ¿No tienes una cuenta?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={[
                styles.registerLink,
                {
                  textDecorationLine: "underline",
                  color: theme.colors.infoColor,
                },
              ]}
            >
              Regístrate
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  },
  registerLink: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default LoginScreen;
