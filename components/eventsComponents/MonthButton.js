import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const MonthButton = (props) => {
  const { data, currentMonth, changeMonth } = props;

  return (
    <TouchableOpacity
      style={[
        { ...styles.monthContainer },
        currentMonth === data.id.toString() ? { ...styles.correntMonth } : null,
      ]}
      onPress={changeMonth}
    >
      <View>
        <Text style={styles.nameTitle}>
          {Dimensions.get("window").width > 600 ? data.shortName : data.id}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  monthContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  correntMonth: {
    borderBottomColor: "#404040",
    borderBottomWidth: 4,
  },
  nameTitle: {
    fontSize: 22,
    fontFamily: "open-sans",
    color: "#404040",
  },
});

export default MonthButton;
