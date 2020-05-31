import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChatInput = (props) => {
  const { color, sendNewMessage } = props;
  const [value, setValue] = useState("");

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputSection}>
        <TextInput
          value={value}
          onChangeText={(newValue) => setValue(newValue)}
          autoCapitalize="sentences"
          style={styles.input}
        />
      </View>
      <View style={styles.btnSection}>
        <TouchableOpacity onPress={() => {
          sendNewMessage(value)
          setValue("")
          }} disabled={!value.length} >
          <Ionicons
            name={Platform.OS === "android" ? "md-send" : "ios-send"}
            color={color}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  inputSection: {
    width: "80%",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    height: 30,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 20,
    paddingHorizontal: 10
  },
  btnSection: {
    width: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default ChatInput;
