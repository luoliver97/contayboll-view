import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const getLoginStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isDarkMode ? "#242c40" : "#f5f5f5",
  },
  formWrapper: {
    width: width > 600 ? "40%" : "100%", // 40% en pantallas grandes, 100% en móviles
    padding: 20,
    backgroundColor: isDarkMode ? "#333" : "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: isDarkMode ? "#fff" : "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 10,
  },
});
