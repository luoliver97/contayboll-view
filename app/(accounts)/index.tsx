import { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getAccounts, updateAccount } from "@/services/accountsService";
import ModalComponent from "@/components/ModalComponent";

export default function PageAccounts() {
  const router = useRouter();
  const [cuentas, setCuentas] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ visible: false, message: "", type: "info" });

  useEffect(() => {
    fetchCuentas();
  }, []);

  const fetchCuentas = async () => {
    setLoading(true);
    const response = await getAccounts();
    if (response.code) {
      setCuentas(response.data);
    } else {
      setModal({ visible: true, message: response.message, type: "error" });
    }
    setLoading(false);
  };

  const toggleCuentaStatus = async (id: string, status: boolean) => {
    // const response = await updateAccount(id, status);
    // if (response.code) {
    //   fetchCuentas();
    // } else {
    //   setModal({ visible: true, message: response.message, type: "error" });
    // }
  };

  const filteredCuentas = cuentas.filter((cuenta) => cuenta.nombre.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuentas</Text>
      <Button title="Agregar Cuenta" onPress={() => router.push("/(accounts)/add")} />
      <TextInput style={styles.input} placeholder="Buscar" value={search} onChangeText={setSearch} />
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={filteredCuentas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.nombre}</Text>
              <Text>{item.descripcion}</Text>
              <Text>Valor: {item.valor_actual}</Text>
              <Button title="Editar" onPress={() => router.push(`/(accounts)/update/${item.id}`)} />
              <Button
                title={item.activo ? "Inactivar" : "Activar"}
                onPress={() => toggleCuentaStatus(item.id, !item.activo)}
              />
            </View>
          )}
        />
      )}
      <ModalComponent {...modal} onClose={() => setModal({ ...modal, visible: false })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  card: { padding: 15, borderWidth: 1, marginBottom: 10 },
});
