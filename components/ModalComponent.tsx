import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

interface ModalProps {
  visible: boolean;
  type: "info" | "success" | "error";
  message: string;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ visible, type, message, onClose }) => {
  const getColor = () => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { borderColor: getColor() }]}> 
          <Text style={[styles.message, { color: getColor() }]}>{message}</Text>
          <Button title="Cerrar" onPress={onClose} color={getColor()} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalComponent;
