import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as loginActions from "../store/actions/actions";

const DrawerComponent = (props) => {
  const { navigation } = props;
  const userReducer = useSelector((state) => state.currentUserReducer);
  const usersListReducer = useSelector((state) => state.usersReducer.usersList);
  const companyData = useSelector((state) => state.companyReducer);

  const dispatch = useDispatch();
  const currentUser = usersListReducer.find(
    (item) => item.id === userReducer.currentUserId
  );

  const departmentItem = (item) => {
    return (
      <View style={styles.departmentItem}>
        {Platform.OS === "android" ? (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("DepartmentScreen", {
                companyData: companyData,
                departmentData: item,
                userId: userReducer.currentUserId,
              });
            }}
          >
            <Text style={styles.androindDepartmentBtns}>{item.name}</Text>
          </TouchableOpacity>
        ) : (
          <Button
            title={item.name}
            onPress={() => {
              props.navigation.navigate("DepartmentScreen", {
                companyData: companyData,
                departmentData: item,
                userId: userReducer.currentUserId,
              });
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.drawerContainer}>
      {currentUser !== undefined ? (
        <View style={styles.drawerHeader}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: currentUser.imageUri }}
              style={styles.image}
            />
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.name}>{currentUser.name}</Text>
            <Button
              title="View profile"
              onPress={() => props.navigation.navigate("ProfileScreen")}
            />
          </View>
        </View>
      ) : null}
      <View style={styles.departmentsContainer}>
        <Text style={styles.departmentsTitle}>Departments</Text>
        <FlatList
          data={companyData.departments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => departmentItem(itemData.item)}
        />
      </View>
      <View style={styles.logOutContainer}>
        {currentUser !== undefined
          ? currentUser.userType === 2 && (
              <Button
                title="Go to Admin Mode"
                color="red"
                onPress={() => navigation.navigate("MainAdminScreen")}
              />
            )
          : null}
        <Button
          title="Log Out"
          onPress={() => {
            dispatch(loginActions.logOutAction());
            navigation.navigate("loginScreen");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 40,
    height: "100%",
  },
  drawerHeader: {
    flexDirection: "row",
    height: "10%",
  },
  imageContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 40,
    width: Dimensions.get("window").width > 600 ? "30%" : "25%",
    marginHorizontal: 10,
  },
  image: {
    overflow: "hidden",
    borderRadius: 40,
    width: "100%",
    height: "100%",
  },
  headerContent: {
    alignItems: "center",
    flex: 1,
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  departmentsTitle: {
    fontFamily: "open-sans",
    fontSize: 18,
    marginVertical: Dimensions.get("window").width > 600 ? 15 : 10,
  },
  departmentsContainer: {
    flexGrow: 6,
    marginVertical: 10,
  },
  departmentItem: {
    alignItems: "flex-start",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  androindDepartmentBtns: {
    fontFamily: "open-sans",
    fontSize: 18,
    marginVertical: Dimensions.get("window").width > 600 ? 15 : 10,
    color: "blue"
  },
  logOutContainer: {
    justifyContent:
      Dimensions.get("window").width > 600 ? "flex-end" : "space-between",
    alignItems: "flex-start",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    flexDirection: Dimensions.get("window").width > 600 ? "column" : "row",
  },
});

export default DrawerComponent;
