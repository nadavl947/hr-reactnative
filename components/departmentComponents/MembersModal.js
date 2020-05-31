import React from "react";
import { View, Text, Modal, StyleSheet, Button, Image } from "react-native";

const MembersModal = (props) => {
  const { isVisible, closeModal, departmentName, members, admins } = props;

  const memberItem = (item) => {
    return (
      <View style={styles.memberItem} key={item.id}>
        <View style={styles.itemImage}>
          <Image source={{ uri: item.imageUri }} style={styles.image} />
        </View>
        <View style={styles.itemName}>
          <Text style={styles.nameTitle}>{item.name}</Text>
        </View>
        {admins.includes(item.id) ? (
          <View style={styles.admin}>
            <Text style={styles.adminText}>Admin</Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <Modal transparent={true} visible={isVisible} animated="slid">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text
              style={styles.modalHeaderTitle}
            >{`${departmentName} Members`}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
          <View style={styles.membersList}>
            {members.map((item) => {
              return memberItem(item);
            })}
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
  membersList: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    margin: 10,
  },
  memberItem: {
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  itemImage: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 20,
    borderRadius: 40,
    width: "10%",
  },
  image: {
    overflow: "hidden",
    borderRadius: 40,
    width: "90%",
    height: "100%",
  },
  itemName: {
    width: "80%",
    paddingHorizontal: 10,
  },
  nameTitle: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "#404040",
  },
  admin: {
    width: "10%",
  },
  adminText: {
    color: "red",
    fontFamily: "open-sans",
  },
});

export default MembersModal;
