import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const PunchButton = (props) => {
  const { isNewShift, startShift, onEndShift } = props;

  const punchState = isNewShift
    ? { color: "#32CD32", title: "Punch-In", onPress: startShift }
    : { color: "#FF4500", title: "Punch-Out", onPress: onEndShift };

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={punchState.onPress}
    >
      <View
        style={{
          ...styles.buttonSection,
          ...{ backgroundColor: punchState.color },
        }}
      >
        <Text style={styles.punchTitle}>{punchState.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "50%",
  },
  buttonSection: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    backgroundColor: "white",
    elevation: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Dimensions.get("window").width > 600 ? 30 : 15,
  },
  punchTitle: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 22 : 16,
    color: "white",
  },
});

export default PunchButton;
