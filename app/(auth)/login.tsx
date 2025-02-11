import { useState } from "react";
import { View, Text, TextInput, Button, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";
import useAlert from "@/hooks/useAlert";
import { getMainStyles } from "@/styles/mainStyles";
import { getLoginStyles } from "@/styles/loginStyles";

export default function Login() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const mainStyles = getMainStyles(isDarkMode);
  const loginStyles = getLoginStyles(isDarkMode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showAlert } = useAlert();

  const handleLogin = async (event?: any) => {
    if (event) event.preventDefault(); // Evitar recarga en web

    try {
      const response = await login(username, password);
      if (response.code === true) {
        showAlert("Éxito", "Inicio de sesión exitoso", "success");
        router.push("/dashboard");
      } else {
        showAlert("Error", response.message, "error");
      }
    } catch (error) {
      showAlert("Error", "Ocurrió un problema inesperado", "error");
    }
  };

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.formWrapper}>
        <Text style={loginStyles.title}>Iniciar Sesión</Text>
        <View style={loginStyles.inputGroup}>
          <Text style={mainStyles.text}>Usuario:</Text>
          <TextInput
            style={mainStyles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Ingresa tu usuario"
            placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
          />
        </View>
        <View style={loginStyles.inputGroup}>
          <Text style={mainStyles.text}>Contraseña:</Text>
          <TextInput
            style={mainStyles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Ingresa tu contraseña"
            placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
          />
        </View>
        <View style={mainStyles.button}>
          <Button
            title="Iniciar sesión"
            color={isDarkMode ? "#1e90ff" : "#007BFF"}
            onPress={handleLogin}
          />
        </View>
      </View>
    </View >
  );
}
