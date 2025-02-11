import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Storage } from "@/utils/storage";
import Toast from "react-native-toast-message";

// Evita que se oculte el Splash Screen antes de tiempo
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const isMounted = useRef(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    isMounted.current = true; // Marca el componente como montado
    return () => {
      isMounted.current = false; // Lo desmarca cuando se desmonta
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await Storage.getItem("token");
        if (!token || token.trim() === "" || token === "undefined" || token === "null") {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error obteniendo el token:", error);
        setIsAuthenticated(false);
      } finally {
        if (isMounted.current) {
          SplashScreen.hideAsync();
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated === true) {
      const currentPath = router.pathname; // Obtener la ruta actual
  
      // Si ya está en una página válida, no lo redirijas a /dashboard
      if (currentPath === "/" || currentPath === "/dashboard") {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated]);
  

  if (!loaded || isAuthenticated === null) {
    return null; // Evita renderizar antes de estar listo
  }

  return (
    <>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="(accounts)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ title: "Login", headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      <Toast />
    </>
  );
}
