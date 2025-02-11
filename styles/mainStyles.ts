import { StyleSheet } from "react-native";

export const getMainStyles = (isDarkMode: boolean) => StyleSheet.create({
  text: {
    fontSize: 16,
    color: isDarkMode ? "#ffffff" : "#333333",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: isDarkMode ? "#555" : "#ccc",
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    color: isDarkMode ? "#fff" : "#000",
    backgroundColor: isDarkMode ? "#333" : "#fff",
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
});
