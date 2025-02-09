import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Storage } from "@/utils/storage";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await Storage.removeItem("token");
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Dashboard</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
