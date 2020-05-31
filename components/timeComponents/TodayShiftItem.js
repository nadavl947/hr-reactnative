import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const TodayShiftItem = (props) => {
  const { data, deleteShift } = props;

  const handleDeleteClick = () => {
    Alert.alert(
      "Are you sure you want to delete this item?",
      "By deleting all data will be lost...",
      [{ text: "Okey", onPress: deleteShift }, { text: "Cancle" }]
    );
  };

  return (
    <View style={styles.shiftRow}>
      <Text style={styles.text}>
        {moment(data.shiftStartTime).format("HH:mm")}
      </Text>
      <Text style={styles.text}>
        {moment(data.shiftEndTime).isValid() ? moment(data.shiftEndTime).format("HH:mm") : "_ _ : _ _"}
      </Text>
      <Text style={styles.text}>{data.shiftDurationText ? data.shiftDurationText : moment(data.shiftStartTime).fromNow()}</Text>
      <TouchableOpacity style={styles.text} onPress={() => handleDeleteClick()}>
        <Ionicons
          name={
            Platform.OS === "android"
              ? "md-close-circle-outline"
              : "ios-close-circle-outline"
          }
          size={Dimensions.get("window").width > 600 ? 25 : 20}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shiftRow: {
    flexDirection: "row",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  text: {
    paddingVertical: Dimensions.get("window").width > 600 ? 10 : 5,
    width: "25%",
    textAlign: "center",
    alignItems: "center",
    fontFamily: "open-sans",
    color: "#404040",
    fontSize: Dimensions.get("window").width > 600 ? 18 : 14,
  },
});

export default TodayShiftItem;
