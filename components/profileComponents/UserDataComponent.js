import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const UserDataComponent = (props) => {
  const { userData, departments, color, openEditModal } = props;
  const {
    name,
    department,
    birthDay,
    position,
    description,
    startDate,
    homeAddress,
  } = userData;
  return (
    <View style={styles.userDataContainer}>
      <View style={styles.userDataHeader}>
        <Text style={styles.headerTitle}>{name}</Text>
        <Text style={styles.headerText}>{position}</Text>
      </View>
      <View style={styles.headerDataSection}>
        <View style={styles.dataItem}>
          <Ionicons
            color={color}
            name={Platform.OS === "android" ? "md-options" : "ios-options"}
            size={30}
          />
          <Text style={styles.dataText}>
            {departments.find((item) => item.id === department).name}
          </Text>
        </View>
        <View style={styles.dataItem}>
          <Ionicons
            color={color}
            name={Platform.OS === "android" ? "md-briefcase" : "ios-briefcase"}
            size={30}
          />
          <Text style={styles.dataText}>
            {moment(startDate).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.dataItem}>
          <Ionicons
            color={color}
            name={Platform.OS === "android" ? "md-gift" : "ios-gift"}
            size={30}
          />
          <Text style={styles.dataText}>
            {moment(birthDay).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.dataItem}>
          <Ionicons
            color={color}
            name={Platform.OS === "android" ? "md-home" : "ios-home"}
            size={30}
          />
          <Text style={styles.dataText}>{homeAddress}</Text>
        </View>
      </View>
      <View style={styles.editContainer}>
        <View style={styles.editLine}></View>
        <TouchableOpacity onPress={openEditModal}>
          <View style={styles.editBtn}>
            <Ionicons
              color={color}
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={35}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.editLine}></View>
      </View>
      <View style={styles.aboutContainer}>
        <Text style={styles.AboutTitle}>About:</Text>
        <Text style={styles.aboutText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userDataContainer: {
    width: "100%",
  },
  userDataHeader: {
    alignItems: "center",
    marginVertical: 10,
  },
  headerTitle: {
    fontFamily: "open-sans-bold",
    color: "#404040",
    fontSize: 28,
  },
  headerText: {
    fontFamily: "open-sans",
    color: "#404040",
    fontSize: 24,
  },
  headerDataSection: {
    flexDirection: Dimensions.get("window").width > 600 ? "row" : "column",
    marginVertical: 20,
    justifyContent: "space-around",
  },
  dataItem: {
    alignItems: "center",
    flexDirection: Dimensions.get("window").width > 600 ? "column" : "row",
    justifyContent: "space-between",
    borderBottomColor: Dimensions.get("window").width > 600 ? null : "#ccc",
    borderBottomWidth: Dimensions.get("window").width > 600 ? null : 1,
  },
  dataText: {
    fontFamily: "open-sans",
    color: "#404040",
    fontSize: 20,
    marginVertical: 15,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  editLine: {
    flex: 1,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  editBtn: {
    marginHorizontal: 20,
  },
  aboutContainer: {},
  AboutTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 26,
    marginVertical: 10,
    color: "#404040",
  },
  aboutText: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "#404040",
  },
});

export default UserDataComponent;
