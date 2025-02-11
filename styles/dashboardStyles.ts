import { StyleSheet } from "react-native";

export const getDashboardStyles = (isDarkMode: boolean) => StyleSheet.create({
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
    subtitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
    menuContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
    chart: { marginVertical: 8, borderRadius: 10 },
    loading: { textAlign: "center", fontSize: 18, marginVertical: 20 },
    errorMessage: { textAlign: "center", fontSize: 16, color: "red", marginVertical: 20 },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" },
    modalText: { fontSize: 16, marginBottom: 10, textAlign: "center" },
    modalButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5 },
    modalButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});