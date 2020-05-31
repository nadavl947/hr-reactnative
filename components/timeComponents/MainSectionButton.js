import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MainSectionButton = (props) => {
  const { color, iconName, buttonTitle, onButtonPress } = props;
  return (
    <TouchableOpacity onPress={onButtonPress}>
      <View style={{ ...styles.buttonContainer, ...{ borderColor: color } }}>
        <View style={styles.buttonHeader}>
          <Ionicons
            name={
              Platform.OS === "android" ? `md-${iconName}` : `ios-${iconName}`
            }
            size={Dimensions.get("window").width > 600 ? 30 : 20}
            color={color}
          />
          <Text style={{ ...styles.buttonTitle, ...{ color: color } }}>
            {buttonTitle}
          </Text>
        </View>
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    marginVertical: Dimensions.get("window").width > 600 ? 20 : 10,
    padding: 10,
    borderRadius: 10,
  },
  buttonHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonTitle: {
      fontFamily: 'open-sans-bold',
      fontSize: Dimensions.get("window").width > 600 ? 26 : 20,
      marginHorizontal: 15
  }
});

export default MainSectionButton;
