import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TimeStampAdmin = (props) => {
  return (
    <View>
      <Text>TimeStampAdmin</Text>
    </View>
  );
};

TimeStampAdmin.navigationOptions = (navData) => {
  return {
    headerTitle: "My Reportes",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "red",
      height: 100,
    },
  };
};

const styles = StyleSheet.create({});

export default TimeStampAdmin;
