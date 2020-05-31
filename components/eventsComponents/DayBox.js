import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const DayBox = (props) => {
  const { data, color, focusDay, onDayClick, dailyEvents } = props;

  return (
    <TouchableOpacity
      style={[
        { ...styles.dayContainer },
        !data.isThisMonth ? { ...{ backgroundColor: "#f2f2f2" } } : null,
        Number(data.day) === Number(focusDay)
          ? { ...styles.correntDay, ...{ borderColor: color } }
          : null,
      ]}
      onPress={onDayClick}
    >
      <View>
        <Text style={styles.dayTitle}>{data.day}</Text>
        {dailyEvents.map((item) => {
          return (
            <Text
              key={item.id}
              lineBreakMode="tail"
              numberOfLines={1}
              style={{ color: "red" }}
            >
              {item.eventName}
            </Text>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "white",
    width: Dimensions.get("window").width / 7 - 4,
    height: Dimensions.get("window").width / 8,
    padding: 5,
  },
  correntDay: {
    borderWidth: 3,
  },
  dayTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});

export default DayBox;
