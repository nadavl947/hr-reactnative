import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Picker,
  Dimensions,
  ScrollView,
} from "react-native";

const EditDataModal = (props) => {
  const {
    isVisible,
    closeModal,
    userData,
    companyName,
    color,
    departments,
    saveEdit,
  } = props;
  const { name } = userData;

  const [positionValue, setPositionValue] = useState(userData.position);
  const [departmentValue, setDepartmentValue] = useState(userData.department);
  const [homeAddressValue, setHomeAddressValue] = useState(
    userData.homeAddress
  );
  const [descriptionValue, setdescriptionValue] = useState(
    userData.description
  );

  const PickerItem = (item) => {
    return <Picker.Item value={item.id} label={item.name} key={item.id} />;
  };

  const onSaveClick = () => {
    const data = {
      id: userData.id,
      department: departmentValue,
      position: positionValue,
      description: descriptionValue,
      homeAddress: homeAddressValue,
    };
    saveEdit(data);
    closeModal();
  };

  return (
    <ScrollView>
      <Modal visible={isVisible} animated="slid" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Button title="Cancle" onPress={closeModal} color="red" />
              <Text style={styles.headerTitle}>{`Edit ${name}'s Profile`}</Text>
              <Button title="Save" onPress={() => onSaveClick()} />
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputItem}>
                <Text
                  style={{ ...styles.lable, ...{ color: color } }}
                >{`My position at ${companyName}`}</Text>
                <TextInput
                  value={positionValue}
                  placeholder="My position..."
                  onChangeText={(newValue) => setPositionValue(newValue)}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputItem}>
                <Text style={{ ...styles.lable, ...{ color: color } }}>
                  I live in
                </Text>
                <TextInput
                  value={homeAddressValue}
                  placeholder="I live in..."
                  onChangeText={(newValue) => setHomeAddressValue(newValue)}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputItem}>
                <Text style={{ ...styles.lable, ...{ color: color } }}>
                  About
                </Text>
                <TextInput
                  value={descriptionValue}
                  placeholder="About"
                  onChangeText={(newValue) => setdescriptionValue(newValue)}
                  style={styles.input}
                  multiline={true}
                />
              </View>
              <View style={styles.inputItem}>
                <Text style={{ ...styles.lable, ...{ color: color } }}>
                  Department
                </Text>
                <Picker
                  selectedValue={departmentValue}
                  onValueChange={(newValue) => setDepartmentValue(newValue)}
                  style={styles.picker}
                >
                  {departments.map((item) => PickerItem(item))}
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    height: "85%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 30,
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: Dimensions.get("window").width > 600 ? 20 : 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: Dimensions.get("window").width > 600 ? 10 : 5,
  },
  headerTitle: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 28 : 20,
    color: "#404040",
  },
  formContainer: {
    alignItems: "center",
    marginVertical: Dimensions.get("window").width > 600 ? 10 : null,
  },
  inputItem: {
    marginVertical: 10,
    width: Dimensions.get("window").width > 600 ? "70%" : "100%",
  },
  lable: {
    fontFamily: "open-sans",
    fontSize: Dimensions.get("window").width > 600 ? 22 : 18,
    textAlign: Dimensions.get("window").width > 600 ? "center" : null,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 2,
    padding: Dimensions.get("window").width > 600 ? 10 : 5,
    borderRadius: 10,
    fontFamily: "open-sans",
    fontSize: Dimensions.get("window").width > 600 ? 18 : 16,
    marginVertical: Dimensions.get("window").width > 600 ? 10 : 5,
  },
});

export default EditDataModal;
