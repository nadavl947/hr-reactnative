import React from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";

const AdminDataModal = (props) => {
  const { isModalVisible, closeModal } = props;

  const modalContant = () => {
    let modalHtml = {};
    if (isModalVisible === 1) {
      modalHtml = (
        <View style={styles.contant}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>About Adding New User:</Text>
            <Text style={styles.text}>
              Adding a new employee to the company is an easy step for HR-APP.
              All you need to do is write some basic data, which you new
              employee can edit later.
            </Text>
          </View>
        </View>
      );
    } else {
      modalHtml = (
        <View>
          <Text>2222</Text>
        </View>
      );
    }
    return modalHtml;
  };

  return (
    <Modal visible={!!isModalVisible} transparent animated="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Button title="Close" onPress={closeModal} color="red" />
          </View>
          {modalContant()}
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
    alignItems: "flex-start",
  },
  contant: {
    margin: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    color: "#404040",
    marginVertical: 10,
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "#404040",
    marginBottom: 10,
  },
});

export default AdminDataModal;
