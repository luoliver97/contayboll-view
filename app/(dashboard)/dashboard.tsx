import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, useColorScheme, Modal, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { getMonthlyBalance } from "@/services/balanceService";
import { getDashboardStyles } from "@/styles/dashboardStyles";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const dashboardStyles = getDashboardStyles(isDarkMode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMonthlyBalance(new Date().getFullYear(), new Date().getMonth() + 1);
        if (response.code === true) {
          setData(response.data);
        } else {
          throw new Error("Error en la respuesta del servidor");
        }
      } catch (error) {
        setError("No se pudo cargar el balance mensual. Inténtalo más tarde.");
        setModalVisible(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView>
      <Text style={dashboardStyles.title}>Dashboard</Text>
      
      <View style={dashboardStyles.menuContainer}>
        <Button title="Cuentas" onPress={() => router.push("/(accounts)")} />
        <Button title="Gastos" onPress={() => router.push("/gastos")} />
        <Button title="Ingresos" onPress={() => router.push("/ingresos")} />
        <Button title="Balance" onPress={() => router.push("/balance")} />
        <Button title="Presupuesto" onPress={() => router.push("/presupuesto")} />
      </View>

      {loading ? (
        <Text style={dashboardStyles.loading}>Cargando...</Text>
      ) : error ? (
        <Text style={dashboardStyles.errorMessage}>No se pudo cargar la información.</Text>
      ) : (
        <>
          <Text style={dashboardStyles.subtitle}>Balance Mensual</Text>
          {/* <LineChart
            data={{
              labels: ["Ingreso", "Sobrante", "Gasto", "Total Cuentas"],
              datasets: [{ data: [data.ingreso_mes, data.sobrante_mes_anterior, data.gasto_mes, data.total_cuentas_actuales] }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            }}
            style={dashboardStyles.chart}
          /> */}
          
          <Text style={dashboardStyles.subtitle}>Distribución del Balance</Text>
          <PieChart
            data={[
              { name: "Ingreso", population: data.ingreso_mes, color: "green", legendFontColor: "#7F7F7F", legendFontSize: 15 },
              { name: "Gasto", population: data.gasto_mes, color: "red", legendFontColor: "#7F7F7F", legendFontSize: 15 },
              { name: "Sobrante", population: data.sobrante_mes_anterior, color: "blue", legendFontColor: "#7F7F7F", legendFontSize: 15 },
            ]}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={"population"}
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </>
      )}

      {/* Modal de error */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={dashboardStyles.modalContainer}>
          <View style={dashboardStyles.modalContent}>
            <Text style={dashboardStyles.modalText}>{error}</Text>
            <TouchableOpacity style={dashboardStyles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={dashboardStyles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}