import React from "react";
import { View, Text, Modal, StyleSheet, Button } from "react-native";

const OptionsModal = (props) => {
  const { isVisible, closeModal } = props;

  return (
    <Modal transparent={true} visible={isVisible} animated="slid">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>Options</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    height: "80%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 30,
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalHeaderTitle: {
    fontFamily: "open-sans-bold",
    color: "#404040",
    fontSize: 22,
  },
});

export default OptionsModal;
