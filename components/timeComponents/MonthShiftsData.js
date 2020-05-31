import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import moment from 'moment';

const MonthShiftsData = (props) => {
  const { color, shifts } = props;

  let totalWorkingDuratuin = 0;

  for (var i = 0; i < shifts.length; i++) {
    totalWorkingDuratuin = totalWorkingDuratuin + shifts[i].shiftDurationNumber;
  }
  const hours = Math.floor(totalWorkingDuratuin / 60)
  const minuts = totalWorkingDuratuin % 60

  return (
    <View style={styles.dataContainer}>
      <View style={styles.dataItem}>
        <Text style={{ ...styles.dataTitle, ...{ color: color } }}>
          Total Shifts:
        </Text>
        <Text style={styles.dataText}>{shifts.length}</Text>
      </View>
      <View style={styles.dataItem}>
        <Text style={{ ...styles.dataTitle, ...{ color: color } }}>
          Total Hours:
        </Text>
        <Text style={styles.dataText}>{`${hours}.${minuts}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dataItem: {
    flexDirection: "row",
    marginHorizontal: Dimensions.get("window").width > 600 ? 20 : 10,
    alignItems: "center",
  },
  dataTitle: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 18 : 14,
  },
  dataText: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 18 : 14,
    color: "#404040",
    marginHorizontal: Dimensions.get("window").width > 600 ? 10 : 5,
  },
});

export default MonthShiftsData;
