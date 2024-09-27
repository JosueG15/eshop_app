import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button, useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { UserNavigationProp } from "../../../shared/types/routeType";
import { useForm } from "react-hook-form";
import FormInput from "../../../shared/components/FomInput";
import { IUser } from "../../../shared/types/userType";
import { useAuth } from "../../../hooks/useAuth";

const RegisterScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<UserNavigationProp>();
  const { register, isLoadingRegister, errorMessage } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  const onSubmit = (data: IUser) => {
    const userData = {
      ...data,
      country: "El Salvador",
    };
    register(userData);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.secondary }]}>
        Crear Cuenta
      </Text>

      <FormInput
        control={control}
        name="name"
        label="Nombre"
        placeholder="Ingrese su nombre"
        rules={{ required: "El nombre es obligatorio" }}
        error={errors.name}
      />
      <FormInput
        control={control}
        name="email"
        label="Correo Electrónico"
        placeholder="Ingrese su correo electrónico"
        rules={{
          required: "El correo electrónico es obligatorio",
          pattern: { value: /\S+@\S+\.\S+/, message: "Correo no válido" },
        }}
        error={errors.email}
      />
      <FormInput
        control={control}
        name="passwordHash"
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        rules={{
          required: "La contraseña es obligatoria",
          minLength: { value: 6, message: "Mínimo 6 caracteres" },
        }}
        secureTextEntry
        error={errors.passwordHash}
      />
      <FormInput
        control={control}
        name="street"
        label="Calle"
        placeholder="Ingrese su calle"
        rules={{ required: "La calle es obligatoria" }}
        error={errors.street}
      />
      <FormInput
        control={control}
        name="apartment"
        label="Apartamento"
        placeholder="Ingrese su apartamento (Opcional)"
        rules={{}}
        error={errors.apartment}
      />
      <FormInput
        control={control}
        name="city"
        label="Ciudad"
        placeholder="Ingrese su ciudad"
        rules={{ required: "La ciudad es obligatoria" }}
        error={errors.city}
      />
      <FormInput
        control={control}
        name="zip"
        label="Código Postal"
        placeholder="Ingrese su código postal"
        rules={{ required: "El código postal es obligatorio" }}
        error={errors.zip}
      />
      <FormInput
        control={control}
        name="phone"
        label="Teléfono"
        placeholder="Ingrese su teléfono"
        rules={{ required: "El teléfono es obligatorio" }}
        keyboardType="phone-pad"
        error={errors.phone}
      />

      <Button
        title="Crear Cuenta"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={[
          styles.button,
          { backgroundColor: theme.colors.infoColor },
        ]}
        titleStyle={{ color: theme.colors.infoTextColor }}
        loading={isLoadingRegister}
      />

      {errorMessage && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errorMessage}
        </Text>
      )}

      <View style={styles.loginContainer}>
        <Text style={[styles.loginText, { color: theme.colors.secondary }]}>
          ¿Ya tienes una cuenta?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.loginLink, { color: theme.colors.infoColor }]}>
            Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  },
  loginLink: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default RegisterScreen;
