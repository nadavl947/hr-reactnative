import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as allActions from "../../store/actions/actions";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Picker,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import moment from "moment";

import HeaderButtonFunc from "../../components/HeaderButton";
import AdminDataModal from "../../components/adminComponents/AdminDataModal";

const AdminUsers = (props) => {
  const companyData = useSelector((state) => state.companyReducer);
  const [isDataModalVisible, setIsDataModalVisible] = useState(0);

  const [newUserName, setNewUserName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [address, setAddress] = useState("");

  const [newUserPosition, setNewUserPosition] = useState("");
  const [departmentValue, setDepartmentValue] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [userType, setUserType] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const { navigation } = props;
    navigation.setParams({
      companyName: companyData.name,
    });
  }, []);

  const PickerItem = (item) => {
    return <Picker.Item value={item.id} label={item.name} key={item.id} />;
  };

  const iosDepartmentObject = (listToRender) => {
    let departments = [];
    for (var i = 0; i < listToRender.length; i++) {
      const newDepartment = {
        label: listToRender[i].name,
        value: listToRender[i].id,
        key: listToRender[i].id,
      };
      departments.push(newDepartment);
    }
    return departments;
  };

  const placeholder = {
    label: "Select a Department...",
    value: null,
    color: "#404040",
  };

  const placeholderType = {
    label: "Select a User Type...",
    value: null,
    color: "#404040",
  };

  const onCreateNewUser = () => {
    const data = {
      name: newUserName,
      companyId: companyData.id,
      department: departmentValue,
      birthDay: new Date(
        Number(birthYear),
        Number(birthMonth) - 1,
        Number(birthDay)
      ),
      position: newUserPosition,
      description: "",
      imageUri: "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
      startDate: moment(),
      homeAddress: address,
      email: newUserEmail,
      password: `${newUserName}-${companyData.name}`
        .replace(/\s/g, "")
        .toLowerCase(),
      userType: userType,
    };
    dispatch(allActions.createNewUserAction(data));
  };

  return (
    <View style={styles.screen}>
      <AdminDataModal
        isModalVisible={isDataModalVisible}
        closeModal={() => setIsDataModalVisible(false)}
      />
      <TouchableOpacity onPress={() => setIsDataModalVisible(1)}>
        <View style={styles.screenTitle}>
          <Text style={styles.title}>Add New Employee</Text>
          <Ionicons
            name={
              Platform.OS === "android"
                ? "md-information-circle"
                : "ios-information-circle"
            }
            color={companyData.defaultColor}
            size={25}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.personalData}>
        <Text style={styles.subTitle}>New Employee Personal Info:</Text>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Name:</Text>
          <TextInput
            style={styles.input}
            value={newUserName}
            onChangeText={(newValue) => setNewUserName(newValue)}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>BirthDay:</Text>
          <View style={styles.birthInputsContainer}>
            <TextInput
              style={styles.dateinput}
              value={birthDay}
              onChangeText={(newValue) => setBirthDay(newValue)}
              placeholder="DD"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.dateinput}
              value={birthMonth}
              onChangeText={(newValue) => setBirthMonth(newValue)}
              placeholder="MM"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.dateinput}
              value={birthYear}
              onChangeText={(newValue) => setBirthYear(newValue)}
              placeholder="YYYY"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Address:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(newValue) => setAddress(newValue)}
          />
        </View>
      </View>
      <View style={styles.personalData}>
        <Text style={styles.subTitle}>New Employee Company Info:</Text>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Position:</Text>
          <TextInput
            style={styles.input}
            value={newUserPosition}
            onChangeText={(newValue) => setNewUserPosition(newValue)}
          />
        </View>
        {Platform.OS === "android" ? (
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Department:</Text>
            <Picker
              selectedValue={departmentValue}
              onValueChange={(newValue) => setDepartmentValue(newValue)}
              style={styles.picker}
            >
              {companyData.departments.map((item) => PickerItem(item))}
            </Picker>
          </View>
        ) : (
          <View style={styles.iosPickerContainer}>
            <Text style={styles.iosPickerLabel}>Department:</Text>
            <View style={styles.iosPicker}>
              <RNPickerSelect
                onValueChange={(value) => setDepartmentValue(value)}
                placeholder={placeholder}
                items={iosDepartmentObject(companyData.departments)}
                value={departmentValue}
                style={{
                  inputIOS: {
                    fontFamily: "open-sans",
                    fontSize: 20,
                  },
                  placeholder: {
                    fontFamily: "open-sans",
                    fontSize: 20,
                  },
                }}
              />
            </View>
          </View>
        )}
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.input}
            value={newUserEmail}
            onChangeText={(newValue) => setNewUserEmail(newValue)}
            autoCapitalize="none"
          />
        </View>
        {Platform.OS === "android" ? (
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>User Type:</Text>
            <Picker
              selectedValue={userType}
              onValueChange={(newValue) => setUserType(newValue)}
              style={styles.picker}
            >
              {companyData.userTypes.map((item) => PickerItem(item))}
            </Picker>
          </View>
        ) : (
          <View style={styles.iosPickerContainer}>
            <Text style={styles.iosPickerLabel}>User Type:</Text>
            <View style={styles.iosPicker}>
              <RNPickerSelect
                onValueChange={(value) => setUserType(value)}
                placeholder={placeholderType}
                items={iosDepartmentObject(companyData.userTypes)}
                value={userType}
                style={{
                  inputIOS: {
                    fontFamily: "open-sans",
                    fontSize: 20,
                  },
                  placeholder: {
                    fontFamily: "open-sans",
                    fontSize: 20,
                  },
                }}
              />
            </View>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={() => onCreateNewUser()}>
        <View style={styles.createUser}>
          <Text
            style={{
              ...styles.createTitle,
              ...{ backgroundColor: companyData.defaultColor },
            }}
          >
            Create
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

AdminUsers.navigationOptions = (navData) => {
  return {
    headerTitle: `${navData.navigation.getParam("companyName")} - Admin`,
    headerTintColor: "white",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonFunc}>
        <Item
          title="back"
          iconName={
            Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
          }
          onPress={() => navData.navigation.navigate("MainLogScreen")}
          color="white"
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 30,
  },
  screenTitle: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    color: "#404040",
    marginHorizontal: 10,
  },
  subTitle: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "#404040",
    marginBottom: 10,
  },
  personalData: {
    marginVertical: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
  },
  inputItem: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    marginVertical: 5,
  },
  pickerLabel: {
    fontFamily: "open-sans",
    fontSize: 20,
  },
  inputLabel: {
    fontFamily: "open-sans",
    fontSize: 20,
    width: "15%",
  },
  input: {
    fontFamily: "open-sans",
    fontSize: 20,
    width: "85%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  birthInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dateinput: {
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
    width: "28%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iosPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  iosPickerLabel: {
    fontFamily: "open-sans",
    fontSize: 20,
    width: "20%",
  },
  iosPicker: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "80%",
  },
  createUser: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20
  },
  createTitle: {
    color: "white",
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    padding: 10,
  },
});

export default AdminUsers;
