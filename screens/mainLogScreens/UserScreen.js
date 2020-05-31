import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonFunc from "../../components/HeaderButton";
import moment from "moment";

const UserScreen = (props) => {
  const { navigation } = props;

  const userData = navigation.getParam("userData");
  const companyData = navigation.getParam("companyData");

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.userHeader}>
          <View style={styles.headerImageSection}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: userData.imageUri }} style={styles.image} />
            </View>
          </View>
          <View style={styles.imageTextContainer}>
            <Text style={styles.title}>{userData.name}</Text>
            <Text style={styles.subTitle}>{userData.position}</Text>
          </View>
          <View style={styles.headerDataSection}>
            <View style={styles.dataItem}>
              <Ionicons
                color={companyData.defaultColor}
                name={Platform.OS === "android" ? "md-options" : "ios-options"}
                size={30}
              />
              <Text style={styles.dataText}>
                {
                  companyData.departments.find(
                    (item) => item.id === userData.department
                  ).name
                }
              </Text>
            </View>
            <View style={styles.dataItem}>
              <Ionicons
                color={companyData.defaultColor}
                name={
                  Platform.OS === "android" ? "md-briefcase" : "ios-briefcase"
                }
                size={30}
              />
              <Text style={styles.dataText}>
                {moment(userData.startDate).format("DD/MM/YYYY")}
              </Text>
            </View>
            <View style={styles.dataItem}>
              <Ionicons
                color={companyData.defaultColor}
                name={Platform.OS === "android" ? "md-gift" : "ios-gift"}
                size={30}
              />
              <Text style={styles.dataText}>
                {moment(userData.birthDay).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.AboutTitle}>About:</Text>
          <Text style={styles.aboutText}>{userData.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

UserScreen.navigationOptions = (navData) => {
  const userData = navData.navigation.getParam("userData");
  const currentUserData = navData.navigation.getParam("currentUserData");
  const companyData = navData.navigation.getParam("companyData");
  return {
    headerTitle: userData.name,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: companyData.defaultColor,
      height: 100,
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonFunc}>
        {currentUserData.currentUserId !== userData.id ? (
          <Item
            title="message"
            iconName={
              Platform.OS === "android" ? "md-chatboxes" : "ios-chatboxes"
            }
            onPress={() => {}}
            color="white"
          />
        ) : (
          <Item
            title="message"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {}}
            color="white"
          />
        )}
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  userHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "white",
  },
  imageContainer: {
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: Dimensions.get("window").width / 2,
  },
  image: {
    overflow: "hidden",
    borderRadius: Dimensions.get("window").width / 2,
    width: "100%",
    height: "100%",
  },
  title: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 26,
    marginVertical: 10,
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: 20,
    marginVertical: 10,
  },
  headerDataSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
  },
  dataItem: {
    alignItems: "center",
    marginVertical: 10,
  },
  dataText: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 10,
  },
  aboutContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 20,
    backgroundColor: "white",
  },
  AboutTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 26,
    marginVertical: 10,
  },
  aboutText: {
    fontFamily: "open-sans",
    fontSize: 18,
    marginVertical: 10,
  },
});

export default UserScreen;
