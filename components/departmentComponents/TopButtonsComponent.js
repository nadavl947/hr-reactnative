import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const TopButtonsComponent = (props) => {
  const { onMembersPress, onOptionPress, isChatBlock } = props;
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.buttonItem} onPress={onMembersPress}>
        <View>
          <Text style={styles.buttonText}>Members</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonItem}
        onPress={onOptionPress}
        disabled={isChatBlock}
      >
        <View>
          <Text
            style={{
              ...styles.buttonText,
              ...{ color: isChatBlock ? "#ccc" : null },
            }}
          >
            Options
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonItem: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").width / 10,
  },
  buttonText: {
    fontFamily: "open-sans-bold",
    color: "#404040",
    fontSize: 18,
  },
});

export default TopButtonsComponent;
