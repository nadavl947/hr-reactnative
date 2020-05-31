import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonFunc from "../../components/HeaderButton";

const MainAdminScreen = (props) => {
  const companyData = useSelector((state) => state.companyReducer);

  useEffect(() => {
    const { navigation } = props;
    navigation.setParams({
      companyName: companyData.name,
    });
  }, []);

  return (
    <View>
      <Text>MainAdminScreen</Text>
    </View>
  );
};

MainAdminScreen.navigationOptions = (navData) => {
  return {
    headerTitle: `${navData.navigation.getParam("companyName")} - Admin`,
    headerTintColor: "white",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonFunc}>
        <Item
          title="back"
          iconName={Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"}
          onPress={() => navData.navigation.navigate("MainLogScreen")}
          color="white"
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default MainAdminScreen;
