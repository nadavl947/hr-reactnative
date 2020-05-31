import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReportsScreen = (props) => {
  return (
    <View>
      <Text>ReportsScreen</Text>
    </View>
  );
};

ReportsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Reportes",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: navData.navigation.getParam("companyColor"),
      height: 100,
    },
  };
};


const styles = StyleSheet.create({});

export default ReportsScreen;
