import React from "react";
import {
  View,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImageModal = (props) => {
  const { isVisible, closeModal, profileImage, setNewImage, saveImage } = props;

  const verifyPermissions = async (permissionType) => {
    const result = await Permissions.askAsync(permissionType);
    if (result.status !== "granted") {
      Alert.alert("Permission not Granted", [{ text: "Okey" }]);
      return false;
    }
    return true;
  };

  const takeImageHandler = async (permissionType) => {
    let permission;
    if (permissionType === "camera") {
      permission = Permissions.CAMERA;
    } else {
      permission = Permissions.CAMERA_ROLL;
    }
    const hasPermission = await verifyPermissions(permission);
    if (!hasPermission) {
      return;
    }

    let image;
    if (permission === "camera") {
      image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
    } else {
      image = await ImagePicker.launchImageLibraryAsync({
        aspect: [16, 9],
        quality: 0.5,
      });
    }

    setNewImage(image.uri);
  };

  return (
    <Modal visible={isVisible} animated="slid">
      <View style={styles.modalStyle}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={closeModal}>
            <Ionicons
              name={
                Platform.OS === "android"
                  ? "md-close-circle-outline"
                  : "ios-close-circle-outline"
              }
              size={32}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={saveImage}>
            <Ionicons
              name={
                Platform.OS === "android"
                  ? "md-checkmark-circle-outline"
                  : "ios-checkmark-circle-outline"
              }
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: profileImage }} style={styles.image} />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => takeImageHandler("albums")}>
            <Ionicons
              name={Platform.OS === "android" ? "md-albums" : "ios-albums"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => takeImageHandler("camera")}>
            <Ionicons
              name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "black",
    flex: 1,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 2,
    borderRadius: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopColor: "white",
    borderTopWidth: 1,
  },
});

export default ImageModal;
