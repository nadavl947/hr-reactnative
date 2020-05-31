import React, { useState } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  TextInput,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";

const CreatePost = (props) => {
  const { data, createPostAction } = props;
  const [isModalVisibal, setisModalVisibal] = useState(false);
  const [inputValue, setinputValue] = useState("");

  return (
    <View style={styles.createPost}>
      <Modal visible={isModalVisibal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <View>
              <TextInput
                value={inputValue}
                placeholder="Share with your coworkers..."
                onChangeText={(newValue) => setinputValue(newValue)}
                style={styles.input}
                autoCapitalize="sentences"
                multiline={true}
              />
            </View>
            <View style={styles.btnbox}>
              <Button
                title="Cancel"
                color="red"
                onPress={() => {
                  setisModalVisibal(false);
                  setinputValue("");
                }}
              />
              <Button
                title="Share"
                onPress={() => {
                  createPostAction(inputValue);
                  setisModalVisibal(false);
                  setinputValue("");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setisModalVisibal(true)}>
        <View style={styles.inputContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: data.imageUri }} style={styles.image} />
          </View>
          <Text style={styles.fakePlaceholder}>
            Share with your coworkers...
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  createPost: {
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    height: Dimensions.get("window").width > 600 ? 80 : 60,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: Dimensions.get("window").width > 600 ? 20 : 10,
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width > 600 ? 80 : 60,
    height: Dimensions.get("window").width > 600 ? 80 : 60,
    padding: 10,
    borderRadius: 40,
  },
  image: {
    borderRadius: 100,
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  fakePlaceholder: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 22 : 18,
    color: "#ccc",
    marginHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalBox: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 20,
    borderRadius: 10,
    width: "70%",
    backgroundColor: "white",
    padding: 10,
  },
  input: {
    height: 200,
    width: "100%",
    fontFamily: "open-sans",
    fontSize: 20,
  },
  btnbox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CreatePost;
