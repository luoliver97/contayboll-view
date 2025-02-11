import Toast from "react-native-toast-message";

type AlertType = "success" | "error" | "info";

export default function useAlert() {
  const showAlert = (title: string, message: string, type: AlertType = "info") => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  return { showAlert };
}
