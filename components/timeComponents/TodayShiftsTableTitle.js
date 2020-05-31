import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const TodayShiftsTableTitle = (props) => {
  return (
    <View style={styles.tableCulName}>
      <Text style={styles.tableCulTitle}>Start</Text>
      <Text style={styles.tableCulTitle}>End</Text>
      <Text style={styles.tableCulTitle}>Duration</Text>
      <Text style={styles.tableCulTitle}>Delete</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tableCulName: {
    flexDirection: "row",
  },
  tableCulTitle: {
    width: "25%",
    textAlign: "center",
    fontFamily: "open-sans-bold",
    color: "#404040",
    fontSize: Dimensions.get("window").width > 600 ? 18 : 14,
  },
});

export default TodayShiftsTableTitle;
